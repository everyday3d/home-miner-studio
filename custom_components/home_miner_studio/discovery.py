"""Discovery and auto-import utilities for existing miner integrations in Home Assistant."""

from __future__ import annotations

import logging
import re
from typing import Any
from urllib.parse import urlparse

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

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
    TYPE_HIVEOS,
    TYPE_NERDMINER,
)

_LOGGER = logging.getLogger(__name__)

# Known Home Assistant miner integration domains
KNOWN_MINER_DOMAINS = {
    "bitaxe": TYPE_BITAXE,
    "ha_bitaxe": TYPE_BITAXE,
    "axeos": TYPE_BITAXE,
    "avalon_nano3s": TYPE_CGMINER_RPC,
    "avalon_nano_3s": TYPE_CGMINER_RPC,
    "antminer": TYPE_CGMINER_RPC,
    "whatsminer": TYPE_CGMINER_RPC,
    "braiins": TYPE_CGMINER_RPC,
    "braiinsos": TYPE_CGMINER_RPC,
    "hiveos": TYPE_HIVEOS,
    "nerdminer": TYPE_NERDMINER,
}

# Regex to validate IPv4 addresses
IP_PATTERN = re.compile(r"^(?:https?://)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d+))?")


async def async_discover_existing_miners(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Scan existing Home Assistant integrations and device registry for unimported miners."""
    discovered: list[dict[str, Any]] = []
    already_configured_hosts: set[str] = set()

    # Collect hosts already in home_miner_studio
    for entry in hass.config_entries.async_entries(DOMAIN):
        host = entry.data.get(CONF_HOST)
        if host:
            already_configured_hosts.add(host.lower())

    # 1. Scan known miner config entries
    for domain, inferred_type in KNOWN_MINER_DOMAINS.items():
        entries = hass.config_entries.async_entries(domain)
        for entry in entries:
            data = entry.data
            host = data.get("host") or data.get("ip") or data.get("ip_address")
            if not host:
                continue

            host_clean = str(host).strip()
            if host_clean.lower() in already_configured_hosts:
                continue

            port = data.get("port")
            if not port:
                port = DEFAULT_PORT_BITAXE if inferred_type == TYPE_BITAXE else DEFAULT_PORT_CGMINER

            name = data.get("name") or data.get("device_name") or entry.title or f"{inferred_type.title()} ({host_clean})"

            discovered.append({
                CONF_NAME: name,
                CONF_MINER_TYPE: inferred_type,
                CONF_HOST: host_clean,
                CONF_PORT: int(port),
                CONF_COIN: data.get("coin", "BTC"),
                "password": data.get("password") or data.get("web_password"),
                "source_integration": domain,
            })
            already_configured_hosts.add(host_clean.lower())

    # 2. Scan Device Registry for Bitaxe / ASIC devices with configuration_url
    device_registry = dr.async_get(hass)
    devices_list = getattr(device_registry, "devices", [])
    for device in (devices_list.values() if hasattr(devices_list, "values") else devices_list):
        name = device.name or device.name_by_user or ""
        model = device.model or ""
        manufacturer = device.manufacturer or ""
        combined_text = f"{name} {model} {manufacturer}".lower()

        is_bitaxe = "bitaxe" in combined_text or "axeos" in combined_text
        is_nerdminer = "nerdminer" in combined_text
        is_asic = any(k in combined_text for k in ("antminer", "whatsminer", "avalon", "braiins"))

        if not (is_bitaxe or is_nerdminer or is_asic):
            continue

        host: str | None = None
        port: int = DEFAULT_PORT_BITAXE

        # Extract from configuration_url (e.g. http://192.168.1.120:80)
        if device.configuration_url and not str(device.configuration_url).startswith("homeassistant:"):
            parsed = urlparse(device.configuration_url)
            if parsed.hostname and parsed.hostname != "hacs":
                host = parsed.hostname
                port = parsed.port or (DEFAULT_PORT_BITAXE if is_bitaxe or is_nerdminer else DEFAULT_PORT_CGMINER)

        # Fallback: check device connections (e.g. IP tuples)
        if not host:
            for conn_type, conn_val in device.connections:
                ip_match = IP_PATTERN.match(str(conn_val))
                if ip_match:
                    host = ip_match.group(1)
                    if ip_match.group(2):
                        port = int(ip_match.group(2))
                    break

        if host and host.lower() not in already_configured_hosts:
            inferred_type = TYPE_BITAXE if is_bitaxe else (TYPE_NERDMINER if is_nerdminer else TYPE_CGMINER_RPC)
            discovered.append({
                CONF_NAME: name or f"{inferred_type.title()} ({host})",
                CONF_MINER_TYPE: inferred_type,
                CONF_HOST: host,
                CONF_PORT: port,
                CONF_COIN: "BTC",
                "source_integration": "device_registry",
            })
            already_configured_hosts.add(host.lower())

    # 3. Scan Entity Registry for entities matching miner patterns
    entity_registry = er.async_get(hass)
    entities_list = getattr(entity_registry, "entities", [])
    for entity in (entities_list.values() if hasattr(entities_list, "values") else entities_list):
        eid = entity.entity_id
        if not eid.startswith("sensor."):
            continue

        # Look for hashrate sensors
        if "hashrate" in eid or "hash_rate" in eid:
            state = hass.states.get(eid)
            if not state:
                continue

            # Look up parent device
            if entity.device_id:
                dev = device_registry.async_get(entity.device_id)
                if dev and dev.configuration_url:
                    parsed = urlparse(dev.configuration_url)
                    if parsed.hostname and parsed.hostname.lower() not in already_configured_hosts:
                        dev_name = dev.name or entity.name or "Imported Miner"
                        discovered.append({
                            CONF_NAME: dev_name,
                            CONF_MINER_TYPE: TYPE_BITAXE if "bitaxe" in dev_name.lower() else TYPE_CGMINER_RPC,
                            CONF_HOST: parsed.hostname,
                            CONF_PORT: parsed.port or DEFAULT_PORT_BITAXE,
                            CONF_COIN: "BTC",
                            "source_integration": "entity_registry",
                        })
                        already_configured_hosts.add(parsed.hostname.lower())

    return discovered


async def async_auto_import_miners(hass: HomeAssistant) -> list[str]:
    """Automatically import all discovered miners into Home Miner Studio."""
    discovered = await async_discover_existing_miners(hass)
    imported_names: list[str] = []

    for item in discovered:
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
                _LOGGER.info("Successfully imported miner '%s' from %s", item[CONF_NAME], item.get("source_integration"))
        except Exception as err:
            _LOGGER.error("Failed to auto-import miner '%s': %s", item.get(CONF_NAME), err)

    return imported_names
