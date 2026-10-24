"""Local LAN hardware discovery utilities for Home Miner Studio."""

from __future__ import annotations

import asyncio
import json
import logging
import re
import socket
from typing import Any

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import (
    CONF_COIN,
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_NAME,
    CONF_PORT,
    DEFAULT_PORT_BITAXE,
    DEFAULT_PORT_CGMINER,
    DOMAIN,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_NERDMINER,
    TYPE_NERDQAXE,
)

_LOGGER = logging.getLogger(__name__)

IP_PATTERN = re.compile(r"^(\d{1,3}\.\d{1,3}\.\d{1,3})\.(\d{1,3})$")


def _detect_local_subnet_prefixes(configured_hosts: set[str]) -> list[str]:
    """Determine local /24 subnet prefixes to scan."""
    prefixes: list[str] = []
    for h in configured_hosts:
        m = IP_PATTERN.match(h)
        if m and m.group(1) not in prefixes:
            prefixes.append(m.group(1))

    if not prefixes:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.connect(("192.168.1.1", 80))
                local_ip = s.getsockname()[0]
                m = IP_PATTERN.match(local_ip)
                if m:
                    prefixes.append(m.group(1))
        except Exception:
            pass

    if not prefixes:
        prefixes.append("192.168.1")

    return prefixes[:2]


async def _probe_host(
    session: aiohttp.ClientSession,
    ip: str,
    sem: asyncio.Semaphore,
) -> dict[str, Any] | None:
    """Probe a single LAN IP for AxeOS HTTP (port 80) or CGMiner RPC (port 4028)."""
    async with sem:
        # 1. Check port 80 (AxeOS / Bitaxe / NerdQaxe / NerdMiner)
        try:
            conn = asyncio.open_connection(ip, DEFAULT_PORT_BITAXE)
            reader, writer = await asyncio.wait_for(conn, timeout=0.45)
            writer.close()
            try:
                await writer.wait_closed()
            except Exception:
                pass

            timeout = aiohttp.ClientTimeout(total=1.2)
            async with session.get(f"http://{ip}/api/system/info", timeout=timeout) as resp:
                if resp.status == 200:
                    data = await resp.json(content_type=None)
                    if isinstance(data, dict) and ("hashRate" in data or "ASICModel" in data or "hostname" in data):
                        hostname = str(data.get("hostname") or data.get("deviceModel") or "").strip()
                        asic = str(data.get("ASICModel") or "").lower()
                        board = str(data.get("boardVersion") or data.get("deviceModel") or "").lower()
                        if "qaxe" in hostname.lower() or "qaxe" in board or "nerdqaxe" in board:
                            mtype = TYPE_NERDQAXE
                        elif "nerdminer" in hostname.lower() or "nerdminer" in asic:
                            mtype = TYPE_NERDMINER
                        else:
                            mtype = TYPE_BITAXE
                        return {
                            CONF_NAME: hostname or f"{mtype.title()} ({ip})",
                            CONF_MINER_TYPE: mtype,
                            CONF_HOST: ip,
                            CONF_PORT: DEFAULT_PORT_BITAXE,
                            CONF_COIN: "BTC",
                            "source_integration": "lan_axeos",
                        }
        except Exception:
            pass

        # 2. Check port 4028 (CGMiner / Avalon / Antminer / Whatsminer RPC)
        try:
            conn = asyncio.open_connection(ip, DEFAULT_PORT_CGMINER)
            reader, writer = await asyncio.wait_for(conn, timeout=0.45)
            writer.write(b'{"command":"version"}')
            await writer.drain()
            raw = await asyncio.wait_for(reader.read(2048), timeout=0.8)
            writer.close()
            try:
                await writer.wait_closed()
            except Exception:
                pass

            if raw:
                text = raw.decode("utf-8", errors="ignore").rstrip("\x00").strip()
                parsed = json.loads(text)
                if isinstance(parsed, dict) and ("VERSION" in parsed or "STATUS" in parsed):
                    ver_list = parsed.get("VERSION", [{}])
                    ver_info = ver_list[0] if ver_list else {}
                    prod = str(ver_info.get("PROD") or ver_info.get("Type") or ver_info.get("Miner") or "CGMiner Rig").strip()
                    return {
                        CONF_NAME: f"{prod} ({ip})",
                        CONF_MINER_TYPE: TYPE_CGMINER_RPC,
                        CONF_HOST: ip,
                        CONF_PORT: DEFAULT_PORT_CGMINER,
                        CONF_COIN: "BTC",
                        "source_integration": "lan_cgminer",
                    }
        except Exception:
            pass

    return None


async def async_discover_existing_miners(hass: HomeAssistant, include_all: bool = False) -> list[dict[str, Any]]:
    """Scan local LAN subnet for active mining hardware without accessing foreign integrations."""
    discovered: list[dict[str, Any]] = []
    configured_hosts: set[str] = set()
    seen_hosts: set[str] = set()

    # Collect hosts already configured in home_miner_studio
    for entry in hass.config_entries.async_entries(DOMAIN):
        host = entry.data.get(CONF_HOST)
        if not host:
            continue
        host_clean = str(host).strip()
        configured_hosts.add(host_clean.lower())
        if include_all and host_clean.lower() not in seen_hosts:
            seen_hosts.add(host_clean.lower())
            discovered.append({
                CONF_NAME: entry.title or entry.data.get(CONF_NAME, f"Miner ({host_clean})"),
                CONF_MINER_TYPE: entry.data.get(CONF_MINER_TYPE, TYPE_BITAXE),
                CONF_HOST: host_clean,
                CONF_PORT: int(entry.data.get(CONF_PORT, DEFAULT_PORT_BITAXE)),
                CONF_COIN: entry.data.get(CONF_COIN, "BTC"),
                "source_integration": DOMAIN,
                "already_configured": True,
            })

    prefixes = await hass.async_add_executor_job(_detect_local_subnet_prefixes, configured_hosts)
    session = async_get_clientsession(hass)
    sem = asyncio.Semaphore(48)

    tasks = []
    for prefix in prefixes:
        for last_octet in range(1, 255):
            ip = f"{prefix}.{last_octet}"
            if ip.lower() in configured_hosts:
                continue
            tasks.append(_probe_host(session, ip, sem))

    if tasks:
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for res in results:
            if isinstance(res, dict) and res.get(CONF_HOST):
                h_lower = str(res[CONF_HOST]).lower()
                if h_lower not in seen_hosts:
                    seen_hosts.add(h_lower)
                    res["already_configured"] = h_lower in configured_hosts
                    discovered.append(res)

    return discovered


async def async_auto_import_miners(hass: HomeAssistant) -> list[str]:
    """Import LAN-discovered miners into Home Miner Studio when explicitly requested by admin."""
    discovered = await async_discover_existing_miners(hass, include_all=False)
    imported_names: list[str] = []

    for item in discovered:
        if item.get("already_configured"):
            continue
        try:
            entry_data = {
                CONF_NAME: item[CONF_NAME],
                CONF_MINER_TYPE: item[CONF_MINER_TYPE],
                CONF_HOST: item[CONF_HOST],
                CONF_PORT: item[CONF_PORT],
                CONF_COIN: item.get(CONF_COIN, "BTC"),
            }
            res = await hass.config_entries.flow.async_init(
                DOMAIN,
                context={"source": "import"},
                data=entry_data,
            )
            if res and res.get("type") in ("create_entry", "abort"):
                imported_names.append(item[CONF_NAME])
                _LOGGER.info("Imported LAN miner '%s' (%s)", item[CONF_NAME], item[CONF_HOST])
        except Exception as err:
            _LOGGER.error("Failed to import miner '%s': %s", item.get(CONF_NAME), err)

    return imported_names
