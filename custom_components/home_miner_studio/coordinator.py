"""DataUpdateCoordinator for Home Miner Studio."""

from __future__ import annotations

import asyncio
import json
import logging
import time
from datetime import timedelta
from typing import Any

import aiohttp
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    BITAXE_PROFILE_CONFIGS,
    CONF_COIN,
    CONF_ELECTRICITY_RATE_SENSOR,
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_POOL_PROVIDER,
    CONF_POOL_TOKEN,
    CONF_POOL_WALLET,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    POOL_2MINERS,
    POOL_BRAIINS,
    POOL_VIABTC,
    PROFILE_CUSTOM,
    PROFILE_ECO,
    PROFILE_STANDARD,
    PROFILE_TURBO,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_NERDMINER,
)

_LOGGER = logging.getLogger(__name__)


class MinerDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Class to manage fetching miner and pool data."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the miner coordinator."""
        self.entry = entry
        self.miner_type = entry.data.get(CONF_MINER_TYPE, TYPE_BITAXE)
        self.host = entry.data.get(CONF_HOST, "")
        self.port = entry.data.get(CONF_PORT, 80)
        self.coin = (entry.data.get(CONF_COIN) or "BTC").upper()
        self.rate_sensor = entry.data.get(CONF_ELECTRICITY_RATE_SENSOR)

        # Pool configurations
        self.pool_provider = entry.data.get(CONF_POOL_PROVIDER)
        self.pool_wallet = entry.data.get(CONF_POOL_WALLET)
        self.pool_token = entry.data.get(CONF_POOL_TOKEN)

        # Current profile state
        self.current_profile = PROFILE_STANDARD

        # Cached pool metrics (updated every 60s to avoid rate limits)
        self._last_pool_fetch = 0.0
        self._cached_pool_data: dict[str, Any] = {
            "unpaid_balance": 0.0,
            "reward_24h": 0.0,
            "active_workers": 0,
            "reported_hashrate": 0.0,
        }

        scan_interval = entry.data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_{self.host}",
            update_interval=timedelta(seconds=scan_interval),
        )

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from hardware and pool APIs."""
        try:
            miner_data: dict[str, Any] = {}
            if self.miner_type == TYPE_BITAXE:
                miner_data = await self._fetch_bitaxe_data()
            elif self.miner_type == TYPE_CGMINER_RPC:
                miner_data = await self._fetch_cgminer_data()
            elif self.miner_type == TYPE_NERDMINER:
                miner_data = await self._fetch_nerdminer_data()
            else:
                miner_data = await self._fetch_bitaxe_data()

            # Merge pool metrics if configured
            pool_data = await self._fetch_pool_data()
            miner_data.update(pool_data)

            return miner_data
        except Exception as err:
            raise UpdateFailed(f"Error communicating with miner at {self.host}: {err}") from err

    async def _fetch_bitaxe_data(self) -> dict[str, Any]:
        """Fetch complete telemetry from Bitaxe / AxeOS REST API."""
        url = f"http://{self.host}:{self.port}/api/system/info"
        timeout = aiohttp.ClientTimeout(total=10)
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.get(url) as resp:
                if resp.status != 200:
                    raise UpdateFailed(f"Bitaxe HTTP error status: {resp.status}")
                raw = await resp.json(content_type=None)

        hashrate_ghs = float(raw.get("hashRate", 0.0))
        hashrate_ths = hashrate_ghs / 1000.0
        power_w = float(raw.get("power", 0.0))
        temp = float(raw.get("temp", 0.0))
        vr_temp = float(raw.get("vrTemp", 0.0)) if "vrTemp" in raw else None
        fan_rpm = int(raw.get("fanSpeed", 0))
        voltage = float(raw.get("voltage", 0.0))
        current_a = float(raw.get("current", 0.0))
        frequency = int(raw.get("frequency", 0))
        core_voltage = int(raw.get("coreVoltage", 0))
        core_voltage_actual = float(raw.get("coreVoltageActual", core_voltage))
        shares_accepted = int(raw.get("sharesAccepted", 0))
        shares_rejected = int(raw.get("sharesRejected", 0))
        uptime = int(raw.get("uptimeSeconds", 0))
        best_diff = raw.get("bestDiff", 0)
        best_session_diff = raw.get("bestSessionDiff", 0)

        # Efficiency (J/TH = W / TH/s)
        efficiency_j_th = (power_w / hashrate_ths) if hashrate_ths > 0 else 0.0

        # Cost tracking
        daily_kwh = (power_w / 1000.0) * 24.0
        electricity_rate = self._get_electricity_rate()
        daily_power_cost = daily_kwh * electricity_rate if electricity_rate else 0.0

        # Infer profile
        self._infer_bitaxe_profile(frequency, core_voltage)

        return {
            "online": True,
            "hashrate_ghs": round(hashrate_ghs, 2),
            "hashrate_ths": round(hashrate_ths, 4),
            "power_w": round(power_w, 2),
            "efficiency_j_th": round(efficiency_j_th, 2),
            "temp_c": round(temp, 1),
            "vr_temp_c": round(vr_temp, 1) if vr_temp is not None else None,
            "fan_rpm": fan_rpm,
            "input_voltage": round(voltage, 3),
            "current_a": round(current_a, 3),
            "frequency_mhz": frequency,
            "core_voltage_mv": core_voltage,
            "core_voltage_actual": round(core_voltage_actual, 1),
            "shares_accepted": shares_accepted,
            "shares_rejected": shares_rejected,
            "best_difficulty": best_diff,
            "best_session_diff": best_session_diff,
            "uptime_seconds": uptime,
            "profile": self.current_profile,
            "daily_kwh": round(daily_kwh, 3),
            "daily_power_cost": round(daily_power_cost, 2),
            "electricity_rate": electricity_rate,
            "raw": raw,
        }

    async def _fetch_cgminer_data(self) -> dict[str, Any]:
        """Fetch telemetry from raw CGMiner / BMM TCP RPC socket across chains."""
        summary_raw = await self._query_cgminer_socket("summary")
        stats_raw = await self._query_cgminer_socket("stats")
        pools_raw = await self._query_cgminer_socket("pools")

        summary = summary_raw.get("SUMMARY", [{}])[0]
        ghs_5s = float(summary.get("GHS 5s", summary.get("GHS av", 0.0)))
        hashrate_ths = ghs_5s / 1000.0
        accepted = int(summary.get("Accepted", 0))
        rejected = int(summary.get("Rejected", 0))
        hw_errors = int(summary.get("Hardware Errors", 0))
        uptime = int(summary.get("Elapsed", 0))

        # Parse fans & multi-chain temps from STATS
        fan_speeds: dict[str, int] = {}
        chain_temps_pcb: dict[str, float] = {}
        chain_temps_chip: dict[str, float] = {}
        chain_rates: dict[str, float] = {}
        chain_acn: dict[str, int] = {}

        stats_list = stats_raw.get("STATS", [])
        for block in stats_list:
            for k, v in block.items():
                if k.startswith("fan") and isinstance(v, (int, float)) and v > 0:
                    fan_speeds[k] = int(v)
                elif "temp" in k.lower() and isinstance(v, (int, float)) and v > 0:
                    if "chip" in k.lower():
                        chain_temps_chip[k] = float(v)
                    else:
                        chain_temps_pcb[k] = float(v)
                elif k.startswith("chain_rate") and isinstance(v, (int, float)):
                    chain_rates[k] = float(v)
                elif k.startswith("chain_acn") and isinstance(v, (int, float)):
                    chain_acn[k] = int(v)

        # Primary chip temp is highest chip temp or average
        primary_temp = max(chain_temps_chip.values()) if chain_temps_chip else (
            max(chain_temps_pcb.values()) if chain_temps_pcb else 0.0
        )
        primary_fan = max(fan_speeds.values()) if fan_speeds else 0

        # Parse pool status
        pools = pools_raw.get("POOLS", [])
        active_pool = pools[0] if pools else {}
        pool_status = active_pool.get("Status", "Unknown")
        pool_url = active_pool.get("URL", "")

        return {
            "online": True,
            "hashrate_ghs": round(ghs_5s, 2),
            "hashrate_ths": round(hashrate_ths, 4),
            "power_w": 0.0,
            "efficiency_j_th": 0.0,
            "temp_c": round(primary_temp, 1),
            "fan_rpm": primary_fan,
            "shares_accepted": accepted,
            "shares_rejected": rejected,
            "hw_errors": hw_errors,
            "uptime_seconds": uptime,
            "fan_speeds": fan_speeds,
            "chain_temps_pcb": chain_temps_pcb,
            "chain_temps_chip": chain_temps_chip,
            "chain_rates": chain_rates,
            "chain_acn": chain_acn,
            "pool_status": pool_status,
            "pool_url": pool_url,
            "raw": {"summary": summary_raw, "stats": stats_raw, "pools": pools_raw},
        }

    async def _query_cgminer_socket(self, command: str) -> dict[str, Any]:
        """Send command to CGMiner socket and return parsed JSON."""
        try:
            reader, writer = await asyncio.open_connection(self.host, self.port)
            writer.write(json.dumps({"command": command}).encode("utf-8"))
            await writer.drain()
            raw_bytes = await reader.read(8192)
            writer.close()
            await writer.wait_closed()

            clean_str = raw_bytes.decode("utf-8", errors="ignore").replace("\x00", "").strip()
            return json.loads(clean_str)
        except Exception as err:
            _LOGGER.debug("CGMiner socket query '%s' failed on %s: %s", command, self.host, err)
            return {}

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
            "power_w": 1.5,
            "efficiency_j_th": 0.0,
            "temp_c": round(temp, 1),
            "fan_rpm": 0,
            "shares_accepted": shares,
            "shares_rejected": 0,
            "uptime_seconds": uptime,
            "raw": raw,
        }

    async def _fetch_pool_data(self) -> dict[str, Any]:
        """Fetch remote mining pool metrics with 60s throttling."""
        now = time.time()
        if now - self._last_pool_fetch < 60.0:
            return self._cached_pool_data

        if not self.pool_provider or self.pool_provider == "none":
            return self._cached_pool_data

        try:
            if self.pool_provider == POOL_2MINERS and self.pool_wallet:
                coin_sub = self.coin.lower()
                url = f"https://{coin_sub}.2miners.com/api/accounts/{self.pool_wallet}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            stats = data.get("stats", {})
                            self._cached_pool_data = {
                                "pool_unpaid_balance": float(stats.get("balance", 0.0)) / 1e8,
                                "pool_24h_revenue": float(data.get("24hreward", 0.0)) / 1e8,
                                "pool_active_workers": int(data.get("workersTotal", 0)),
                                "pool_reported_hashrate": float(data.get("currentHashrate", 0.0)),
                            }
            elif self.pool_provider == POOL_BRAIINS and self.pool_token:
                url = "https://pool.braiins.com/accounts/profile/json/btc/"
                headers = {"SlushPool-Auth-Token": self.pool_token}
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            btc = data.get("btc", {})
                            self._cached_pool_data = {
                                "pool_unpaid_balance": float(btc.get("unconfirmed_reward", 0.0)),
                                "pool_24h_revenue": float(btc.get("estimated_reward", 0.0)),
                                "pool_active_workers": 1,
                                "pool_reported_hashrate": 0.0,
                            }
            self._last_pool_fetch = now
        except Exception as err:
            _LOGGER.debug("Pool data update error: %s", err)

        return self._cached_pool_data

    def _infer_bitaxe_profile(self, freq: int, volt: int) -> None:
        """Infer current profile from frequency and core voltage."""
        for name, cfg in BITAXE_PROFILE_CONFIGS.items():
            if cfg["frequency"] == freq and cfg["core_voltage"] == volt:
                self.current_profile = name
                return
        self.current_profile = PROFILE_CUSTOM

    async def async_set_bitaxe_tuning(self, frequency: int | None = None, core_voltage: int | None = None) -> bool:
        """Send tuning updates to Bitaxe / AxeOS."""
        payload: dict[str, Any] = {}
        if frequency is not None:
            payload["frequency"] = int(frequency)
        if core_voltage is not None:
            payload["coreVoltage"] = int(core_voltage)

        if not payload:
            return False

        url = f"http://{self.host}:{self.port}/api/system"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.patch(url, json=payload, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                    if resp.status in (200, 204):
                        _LOGGER.info("Bitaxe tuning updated on %s: %s", self.host, payload)
                        await self.async_request_refresh()
                        return True
                    _LOGGER.warning("Bitaxe tuning returned status %s", resp.status)
        except Exception as err:
            _LOGGER.error("Failed to update Bitaxe tuning: %s", err)
        return False

    async def async_set_bitaxe_profile(self, profile: str) -> bool:
        """Apply a preset tuning profile to Bitaxe."""
        if profile not in BITAXE_PROFILE_CONFIGS:
            return False
        cfg = BITAXE_PROFILE_CONFIGS[profile]
        success = await self.async_set_bitaxe_tuning(
            frequency=cfg["frequency"],
            core_voltage=cfg["core_voltage"],
        )
        if success:
            self.current_profile = profile
            self.async_set_updated_data({**self.data, "profile": profile})
        return success

    def _get_electricity_rate(self) -> float | None:
        """Fetch electricity price ($/kWh) from Home Assistant entity."""
        if not self.rate_sensor:
            return None
        state = self.hass.states.get(self.rate_sensor)
        if state and state.state not in ("unknown", "unavailable"):
            try:
                return float(state.state)
            except ValueError:
                return None
        return None
