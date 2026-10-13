"""DataUpdateCoordinator for Home Miner Studio."""

from __future__ import annotations

import asyncio
import json
import logging
from datetime import timedelta
from typing import Any

import aiohttp
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    CONF_COIN,
    CONF_ELECTRICITY_RATE_SENSOR,
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_NERDMINER,
)

_LOGGER = logging.getLogger(__name__)


class MinerDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Class to manage fetching miner data from hardware and APIs."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the miner coordinator."""
        self.entry = entry
        self.miner_type = entry.data.get(CONF_MINER_TYPE, TYPE_BITAXE)
        self.host = entry.data.get(CONF_HOST, "")
        self.port = entry.data.get(CONF_PORT, 80)
        self.coin = entry.data.get(CONF_COIN, "BTC")
        self.rate_sensor = entry.data.get(CONF_ELECTRICITY_RATE_SENSOR)

        scan_interval = entry.data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_{self.host}",
            update_interval=timedelta(seconds=scan_interval),
        )

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from the miner hardware."""
        try:
            if self.miner_type == TYPE_BITAXE:
                return await self._fetch_bitaxe_data()
            elif self.miner_type == TYPE_CGMINER_RPC:
                return await self._fetch_cgminer_data()
            elif self.miner_type == TYPE_NERDMINER:
                return await self._fetch_nerdminer_data()
            else:
                return await self._fetch_bitaxe_data()
        except Exception as err:
            raise UpdateFailed(f"Error communicating with miner at {self.host}: {err}") from err

    async def _fetch_bitaxe_data(self) -> dict[str, Any]:
        """Fetch telemetry from Bitaxe / AxeOS REST API."""
        url = f"http://{self.host}:{self.port}/api/system/info"
        timeout = aiohttp.ClientTimeout(total=10)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.get(url) as resp:
                if resp.status != 200:
                    raise UpdateFailed(f"Bitaxe HTTP error status: {resp.status}")
                raw = await resp.json(content_type=None)

        # Parse Bitaxe telemetry fields
        hashrate_ghs = float(raw.get("hashRate", 0.0))
        hashrate_ths = hashrate_ghs / 1000.0
        power_w = float(raw.get("power", 0.0))
        temp = float(raw.get("temp", 0.0))
        vr_temp = float(raw.get("vrTemp", 0.0)) if "vrTemp" in raw else None
        fan_rpm = int(raw.get("fanSpeed", 0))
        voltage = float(raw.get("voltage", 0.0))
        frequency = int(raw.get("frequency", 0))
        shares_accepted = int(raw.get("sharesAccepted", 0))
        shares_rejected = int(raw.get("sharesRejected", 0))
        uptime = int(raw.get("uptimeSeconds", 0))
        best_diff = raw.get("bestDiff", 0)

        # Efficiency calculation (Joules per Terahash: J/TH = W / TH/s)
        efficiency_j_th = (power_w / hashrate_ths) if hashrate_ths > 0 else 0.0

        # Calculate electric cost
        daily_kwh = (power_w / 1000.0) * 24.0
        electricity_rate = self._get_electricity_rate()
        daily_power_cost = daily_kwh * electricity_rate if electricity_rate else 0.0

        return {
            "online": True,
            "hashrate_ghs": round(hashrate_ghs, 2),
            "hashrate_ths": round(hashrate_ths, 4),
            "power_w": round(power_w, 2),
            "efficiency_j_th": round(efficiency_j_th, 2),
            "temp_c": round(temp, 1),
            "vr_temp_c": round(vr_temp, 1) if vr_temp is not None else None,
            "fan_rpm": fan_rpm,
            "voltage_v": round(voltage, 3),
            "frequency_mhz": frequency,
            "shares_accepted": shares_accepted,
            "shares_rejected": shares_rejected,
            "best_difficulty": best_diff,
            "uptime_seconds": uptime,
            "daily_kwh": round(daily_kwh, 3),
            "daily_power_cost": round(daily_power_cost, 2),
            "electricity_rate": electricity_rate,
            "raw": raw,
        }

    async def _fetch_cgminer_data(self) -> dict[str, Any]:
        """Fetch telemetry from raw CGMiner / BMM TCP RPC socket."""
        loop = asyncio.get_running_loop()
        cmd = json.dumps({"command": "summary"}).encode("utf-8")

        reader, writer = await asyncio.open_connection(self.host, self.port)
        try:
            writer.write(cmd)
            await writer.drain()
            raw_bytes = await reader.read(4096)
        finally:
            writer.close()
            await writer.wait_closed()

        clean_str = raw_bytes.decode("utf-8", errors="ignore").replace("\x00", "").strip()
        data = json.loads(clean_str)
        summary = data.get("SUMMARY", [{}])[0]

        # GH/s to TH/s
        ghs_5s = float(summary.get("GHS 5s", summary.get("GHS av", 0.0)))
        hashrate_ths = ghs_5s / 1000.0
        accepted = int(summary.get("Accepted", 0))
        rejected = int(summary.get("Rejected", 0))
        hw_errors = int(summary.get("Hardware Errors", 0))
        uptime = int(summary.get("Elapsed", 0))

        # Default power estimation or external meter power
        power_w = 0.0
        efficiency_j_th = (power_w / hashrate_ths) if hashrate_ths > 0 else 0.0

        return {
            "online": True,
            "hashrate_ghs": round(ghs_5s, 2),
            "hashrate_ths": round(hashrate_ths, 4),
            "power_w": power_w,
            "efficiency_j_th": round(efficiency_j_th, 2),
            "temp_c": 0.0,
            "fan_rpm": 0,
            "shares_accepted": accepted,
            "shares_rejected": rejected,
            "hw_errors": hw_errors,
            "uptime_seconds": uptime,
            "raw": data,
        }

    async def _fetch_nerdminer_data(self) -> dict[str, Any]:
        """Fetch telemetry from NerdMiner HTTP endpoint."""
        url = f"http://{self.host}:{self.port}/api/stats"
        timeout = aiohttp.ClientTimeout(total=10)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.get(url) as resp:
                if resp.status != 200:
                    raise UpdateFailed(f"NerdMiner HTTP error status: {resp.status}")
                raw = await resp.json(content_type=None)

        hashrate_khs = float(raw.get("hashrate", 0.0))
        hashrate_ghs = hashrate_khs / 1_000_000.0
        temp = float(raw.get("temp", 0.0))
        shares = int(raw.get("validShares", 0))
        uptime = int(raw.get("uptime", 0))

        return {
            "online": True,
            "hashrate_ghs": round(hashrate_ghs, 6),
            "hashrate_ths": round(hashrate_ghs / 1000.0, 9),
            "power_w": 1.5,  # ESP32 standard draw
            "efficiency_j_th": 0.0,
            "temp_c": round(temp, 1),
            "fan_rpm": 0,
            "shares_accepted": shares,
            "shares_rejected": 0,
            "uptime_seconds": uptime,
            "raw": raw,
        }

    def _get_electricity_rate(self) -> float | None:
        """Fetch current electricity price ($/kWh) from Home Assistant entity."""
        if not self.rate_sensor:
            return None
        state = self.hass.states.get(self.rate_sensor)
        if state and state.state not in ("unknown", "unavailable"):
            try:
                return float(state.state)
            except ValueError:
                return None
        return None
