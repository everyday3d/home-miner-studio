"""DataUpdateCoordinator for Home Miner Studio."""

from __future__ import annotations

import asyncio
import json
import logging
import re
import time
from datetime import timedelta
from typing import Any

import aiohttp
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .market import async_get_coin_market_data
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
    POOL_F2POOL,
    POOL_HELIOS,
    POOL_MINING_DUTCH,
    POOL_NAMES,
    POOL_NONE,
    POOL_PUBLIC_POOL,
    POOL_VIABTC,
    PROFILE_CUSTOM,
    PROFILE_ECO,
    PROFILE_STANDARD,
    PROFILE_TURBO,
    TYPE_ANTMINER,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_HIVEOS,
    TYPE_NERDMINER,
    TYPE_NERDQAXE,
    TYPE_WHATSMINER,
)

_LOGGER = logging.getLogger(__name__)


class MinerDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Class to manage fetching miner, pool, and profitability data."""

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
            "pool_unpaid_balance": 0.0,
            "pool_24h_revenue": 0.0,
            "pool_active_workers": 0,
            "pool_reported_hashrate": 0.0,
        }

        # Cached Bitcoin price (updated every 300s)
        self._last_price_fetch = 0.0
        self._cached_btc_price = 68000.0

        # Cumulative energy tracking
        self._total_energy_kwh = 0.0
        self._last_energy_calc = time.time()

        scan_interval = entry.data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_{self.host}",
            update_interval=timedelta(seconds=scan_interval),
        )

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from hardware, pool, and market APIs."""
        try:
            miner_data: dict[str, Any] = {}
            if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
                miner_data = await self._fetch_bitaxe_data()
            elif self.miner_type in (TYPE_CGMINER_RPC, TYPE_WHATSMINER, TYPE_ANTMINER):
                miner_data = await self._fetch_cgminer_data()
            elif self.miner_type == TYPE_NERDMINER:
                miner_data = await self._fetch_nerdminer_data()
            elif self.miner_type == TYPE_HIVEOS:
                miner_data = await self._fetch_hiveos_data()
            else:
                miner_data = await self._fetch_bitaxe_data()

            # Merge pool metrics if configured
            pool_data = await self._fetch_pool_data()
            if self.pool_provider and self.pool_provider != POOL_NONE:
                if not pool_data.get("pool_reported_hashrate") and miner_data.get("hashrate_ghs"):
                    pool_data["pool_reported_hashrate"] = miner_data["hashrate_ghs"]
                if not pool_data.get("pool_active_workers"):
                    pool_data["pool_active_workers"] = 1
                pool_data["pool_provider"] = self.pool_provider
                pool_data["pool_provider_name"] = POOL_NAMES.get(self.pool_provider, self.pool_provider.title())
                if not pool_data.get("pool_best_share") and miner_data.get("best_difficulty"):
                    pool_data["pool_best_share"] = miner_data["best_difficulty"]
                if not pool_data.get("pool_url") and miner_data.get("pool_url"):
                    pool_data["pool_url"] = miner_data["pool_url"]
                if not pool_data.get("pool_user") and miner_data.get("pool_user"):
                    pool_data["pool_user"] = miner_data["pool_user"]
                pool_data["pool_status"] = miner_data.get("pool_status", "Alive")
            miner_data.update(pool_data)

            # Cumulative energy update
            now = time.time()
            elapsed_hours = max(0.0, (now - self._last_energy_calc) / 3600.0)
            self._last_energy_calc = now
            pwr = float(miner_data.get("power_w", 0.0))
            if pwr > 0 and elapsed_hours > 0:
                self._total_energy_kwh += (pwr / 1000.0) * elapsed_hours
            miner_data["total_energy_kwh"] = round(self._total_energy_kwh, 4)

            # Fetch live market data (coin price, 24h change, multi-timeframe series)
            market_data = await async_get_coin_market_data(self.hass, self.coin)
            coin_price = market_data.get("price_usd", 68000.0)
            hashrate_ths = float(miner_data.get("hashrate_ths", 0.0))
            daily_power_cost = float(miner_data.get("daily_power_cost", 0.0))

            # Standard theoretical yield: ~0.00000057 BTC / TH/s / day at current network difficulty
            daily_coin_est = hashrate_ths * 0.00000057
            daily_gross_rev = daily_coin_est * coin_price
            daily_net_profit = daily_gross_rev - daily_power_cost

            miner_data["coin_price_usd"] = coin_price
            miner_data["btc_price_usd"] = coin_price if self.coin.upper() in ("BTC", "XBT") else miner_data.get("btc_price_usd", coin_price)
            miner_data["coin_symbol"] = self.coin.upper()
            miner_data["coin_name"] = market_data.get("coin_name", self.coin)
            miner_data["coin_sign"] = market_data.get("coin_sign", "₿")
            miner_data["coin_change_24h_pct"] = market_data.get("change_24h_pct", 0.0)
            miner_data["history_24h"] = market_data.get("history_24h", [])
            miner_data["history_7d"] = market_data.get("history_7d", [])
            miner_data["history_30d"] = market_data.get("history_30d", [])
            miner_data["history_1y"] = market_data.get("history_1y", [])
            miner_data["market_stats"] = market_data.get("stats", {})
            miner_data["daily_est_revenue"] = round(daily_gross_rev, 2)
            miner_data["daily_net_profit"] = round(daily_net_profit, 2)

            return miner_data
        except Exception as err:
            raise UpdateFailed(f"Error communicating with miner at {self.host}: {err}") from err

    async def _fetch_btc_price(self) -> float:
        """Fetch current Bitcoin USD price."""
        data = await async_get_coin_market_data(self.hass, "BTC")
        return data.get("price_usd", 68000.0)

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
        fan_rpm = int(raw.get("fanrpm") or raw.get("fanSpeed", 0))
        voltage = float(raw.get("voltage", 0.0))
        if voltage > 100:
            voltage = voltage / 1000.0
        current_a = float(raw.get("current", 0.0))
        if current_a > 100:
            current_a = current_a / 1000.0
        frequency = int(raw.get("frequency", 0))
        core_voltage = int(raw.get("coreVoltage", 0))
        core_voltage_actual = float(raw.get("coreVoltageActual", core_voltage))
        shares_accepted = int(raw.get("sharesAccepted", 0))
        shares_rejected = int(raw.get("sharesRejected", 0))
        uptime = int(raw.get("uptimeSeconds", 0))
        best_diff = raw.get("bestDiff", 0)
        best_session_diff = raw.get("bestSessionDiff", 0)

        efficiency_j_th = (power_w / hashrate_ths) if hashrate_ths > 0 else 0.0
        daily_kwh = (power_w / 1000.0) * 24.0
        electricity_rate = self._get_electricity_rate()
        daily_power_cost = daily_kwh * electricity_rate if electricity_rate else 0.0

        stratum_url = raw.get("stratumURL", "")
        stratum_port = raw.get("stratumPort", "")
        pool_url = f"{stratum_url}:{stratum_port}".strip(":") if stratum_url else ""
        pool_user = raw.get("stratumUser", "")
        stratum_conn = raw.get("isStratumConnected", raw.get("stratumConnected", True))
        pool_status = "Alive" if stratum_conn else "Offline"

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
            "pool_status": pool_status,
            "pool_url": pool_url,
            "pool_user": pool_user,
            "raw": raw,
        }

    async def _fetch_cgminer_data(self) -> dict[str, Any]:
        """Fetch telemetry from raw CGMiner / BMM / Whatsminer TCP RPC socket."""
        summary_raw = await self._query_cgminer_socket("summary")
        stats_raw = await self._query_cgminer_socket("stats")
        pools_raw = await self._query_cgminer_socket("pools")

        summary = summary_raw.get("SUMMARY", [{}])[0]
        ghs_5s = 0.0
        if "GHS 5s" in summary or "GHS av" in summary:
            ghs_5s = float(summary.get("GHS 5s", summary.get("GHS av", 0.0)))
        elif "MHS 5s" in summary or "MHS av" in summary:
            ghs_5s = float(summary.get("MHS 5s", summary.get("MHS av", 0.0))) / 1000.0

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
        power_w: float = 0.0
        frequency_mhz: float | None = None

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
                elif k.startswith("MM ID") and isinstance(v, str):
                    mm_dict = dict(re.findall(r"(\w+)\[([^\]]*)\]", v))
                    if "TAvg" in mm_dict:
                        try:
                            chain_temps_chip["avalon_avg"] = float(mm_dict["TAvg"])
                        except ValueError:
                            pass
                    if "TMax" in mm_dict:
                        try:
                            chain_temps_pcb["avalon_max"] = float(mm_dict["TMax"])
                        except ValueError:
                            pass
                    if "Fan1" in mm_dict:
                        try:
                            fan_speeds["fan1"] = int(mm_dict["Fan1"])
                        except ValueError:
                            pass
                    if "GHSspd" in mm_dict:
                        try:
                            av_ghs = float(mm_dict["GHSspd"])
                            if av_ghs > 0:
                                ghs_5s = av_ghs
                        except ValueError:
                            pass
                    if "Freq" in mm_dict:
                        try:
                            frequency_mhz = float(mm_dict["Freq"])
                        except ValueError:
                            pass
                    if "MPO" in mm_dict:
                        try:
                            power_w = float(mm_dict["MPO"])
                        except ValueError:
                            pass

        hashrate_ths = ghs_5s / 1000.0

        efficiency_j_th = (power_w / hashrate_ths) if (hashrate_ths > 0 and power_w > 0) else 0.0
        daily_kwh = (power_w / 1000.0) * 24.0 if power_w > 0 else 0.0
        electricity_rate = self._get_electricity_rate()
        daily_power_cost = daily_kwh * electricity_rate if (electricity_rate and daily_kwh > 0) else 0.0

        primary_temp = max(chain_temps_chip.values()) if chain_temps_chip else (
            max(chain_temps_pcb.values()) if chain_temps_pcb else 0.0
        )
        primary_fan = max(fan_speeds.values()) if fan_speeds else 0

        pools = pools_raw.get("POOLS", [])
        active_pool = pools[0] if pools else {}
        pool_status = active_pool.get("Status", "Unknown")
        pool_url = active_pool.get("URL", "")

        return {
            "online": True,
            "hashrate_ghs": round(ghs_5s, 2),
            "hashrate_ths": round(hashrate_ths, 4),
            "power_w": round(power_w, 2),
            "efficiency_j_th": round(efficiency_j_th, 2),
            "daily_kwh": round(daily_kwh, 3),
            "daily_power_cost": round(daily_power_cost, 2),
            "electricity_rate": electricity_rate,
            "temp_c": round(primary_temp, 1),
            "fan_rpm": primary_fan,
            "frequency_mhz": round(frequency_mhz, 1) if frequency_mhz is not None else None,
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

    async def _query_cgminer_socket(self, command: str, parameter: str | None = None) -> dict[str, Any]:
        """Send command to CGMiner socket and return parsed JSON."""
        try:
            reader, writer = await asyncio.open_connection(self.host, self.port)
            cmd_dict: dict[str, Any] = {"command": command}
            if parameter is not None:
                cmd_dict["parameter"] = parameter
            writer.write(json.dumps(cmd_dict).encode("utf-8"))
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
            "hashrate_ghs": round(hashrate_ghs, 4),
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

    async def _fetch_hiveos_data(self) -> dict[str, Any]:
        """Fetch GPU / ASIC farm telemetry from HiveOS API."""
        if not self.pool_token or not self.host:
            return {"online": False}

        url = f"https://api2.hiveos.farm/api/v2/farms/{self.host}/workers"
        headers = {"Authorization": f"Bearer {self.pool_token}"}
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=10)) as session:
            async with session.get(url, headers=headers) as resp:
                if resp.status != 200:
                    return {"online": False}
                data = await resp.json(content_type=None)
                workers = data.get("data", [])
                total_hash = sum(float(w.get("hashrate", 0.0)) for w in workers)
                total_pwr = sum(float(w.get("power", 0.0)) for w in workers)
                return {
                    "online": True,
                    "hashrate_ghs": round(total_hash / 1000.0, 2),
                    "hashrate_ths": round(total_hash / 1_000_000.0, 4),
                    "power_w": round(total_pwr, 1),
                    "workers_count": len(workers),
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
            elif self.pool_provider == POOL_BRAIINS and (self.pool_token or self.pool_wallet):
                token = self.pool_token or self.pool_wallet
                url = "https://pool.braiins.com/accounts/profile/json/btc/"
                headers = {"SlushPool-Auth-Token": token}
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
            elif self.pool_provider == POOL_MINING_DUTCH and (self.pool_token or self.pool_wallet):
                token = self.pool_token or self.pool_wallet
                coin_slug = {
                    "BTC": "bitcoin",
                    "BCH": "bitcoincash",
                    "LTC": "litecoin",
                    "DOGE": "dogecoin",
                    "BELLS": "bells",
                    "WOJAK": "wojakcoin",
                    "WJK": "wojakcoin",
                }.get(self.coin.upper(), self.coin.lower())
                url = f"https://www.mining-dutch.nl/pools/{coin_slug}.php?page=api&action=getdashboarddata&api_key={token}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            root = data.get("getdashboarddata", {}).get("data", {})
                            if not root:
                                root = data.get("getuserstatus", {}).get("data", {})
                            raw_hr = float(root.get("hashrate", root.get("total_hashrate", 0.0)))
                            hr_ghs = raw_hr if raw_hr < 1e6 else raw_hr / 1e6
                            bal = float(root.get("balance", root.get("confirmed", 0.0)))
                            workers_cnt = int(root.get("workers", root.get("active_workers", 1)))
                            self._cached_pool_data = {
                                "pool_unpaid_balance": bal,
                                "pool_24h_revenue": float(root.get("24h_estimate", 0.0)),
                                "pool_active_workers": max(1, workers_cnt),
                                "pool_reported_hashrate": round(hr_ghs, 2),
                            }
            elif self.pool_provider == POOL_PUBLIC_POOL and self.pool_wallet:
                url = f"https://public-pool.io:40557/api/client/{self.pool_wallet}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            workers = data.get("workers", [])
                            self._cached_pool_data = {
                                "pool_unpaid_balance": 0.0,
                                "pool_24h_revenue": 0.0,
                                "pool_active_workers": len(workers),
                                "pool_reported_hashrate": float(data.get("hashRate", 0.0)),
                            }
            elif self.pool_provider == POOL_HELIOS and self.pool_wallet:
                url = f"https://stats-btc.heliospool.com/users/{self.pool_wallet}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            raw_hr = str(data.get("hashrate1m", data.get("hashrate5m", "0"))).strip()
                            hr_ghs = 0.0
                            if raw_hr.endswith("P"):
                                hr_ghs = float(raw_hr[:-1]) * 1_000_000.0
                            elif raw_hr.endswith("T"):
                                hr_ghs = float(raw_hr[:-1]) * 1000.0
                            elif raw_hr.endswith("G"):
                                hr_ghs = float(raw_hr[:-1])
                            elif raw_hr.endswith("M"):
                                hr_ghs = float(raw_hr[:-1]) / 1000.0
                            else:
                                try:
                                    hr_ghs = float(raw_hr)
                                except ValueError:
                                    hr_ghs = 0.0

                            workers = data.get("worker", [])
                            worker_count = int(data.get("workers", len(workers)))
                            self._cached_pool_data = {
                                "pool_unpaid_balance": 0.0,
                                "pool_24h_revenue": 0.0,
                                "pool_active_workers": worker_count,
                                "pool_reported_hashrate": round(hr_ghs, 2),
                                "pool_best_share": float(data.get("bestshare", 0.0)),
                            }
            elif self.pool_provider == POOL_VIABTC and (self.pool_token or self.pool_wallet):
                coin_sub = self.coin.lower() if self.coin else "btc"
                token_to_use = self.pool_token or self.pool_wallet
                url = f"https://www.viabtc.com/res/observer/hashrate?observer_token={token_to_use}&coin={coin_sub}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            res_data = data.get("data", {}) if isinstance(data, dict) else {}
                            raw_hr = res_data.get("hashrate", 0.0)
                            try:
                                hr_ghs = float(raw_hr) / 1e9 if float(raw_hr) > 1e6 else float(raw_hr)
                            except (ValueError, TypeError):
                                hr_ghs = 0.0
                            active_workers = int(res_data.get("active_workers", res_data.get("workers", 0)))
                            profit_24h = float(res_data.get("profit_24h", res_data.get("total_profit", 0.0)))
                            self._cached_pool_data = {
                                "pool_unpaid_balance": float(res_data.get("unpaid_profit", 0.0)),
                                "pool_24h_revenue": profit_24h,
                                "pool_active_workers": active_workers,
                                "pool_reported_hashrate": round(hr_ghs, 2),
                            }
            elif self.pool_provider == POOL_F2POOL and (self.pool_wallet or self.pool_token):
                coin_sub = "bitcoin" if (not self.coin or self.coin.upper() == "BTC") else self.coin.lower()
                account = self.pool_wallet or self.pool_token
                url = f"https://api.f2pool.com/{coin_sub}/{account}"
                headers = {}
                if self.pool_token:
                    headers["F2P-API-SECRET"] = self.pool_token
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 200:
                            data = await resp.json(content_type=None)
                            raw_hr = float(data.get("hashrate", 0.0))
                            hr_ghs = raw_hr / 1e9 if raw_hr > 0 else 0.0
                            workers = data.get("workers", [])
                            worker_count = int(data.get("worker_length", len(workers)))
                            self._cached_pool_data = {
                                "pool_unpaid_balance": float(data.get("balance", 0.0)),
                                "pool_24h_revenue": float(data.get("value_today", data.get("value_yesterday", 0.0))),
                                "pool_active_workers": worker_count,
                                "pool_reported_hashrate": round(hr_ghs, 2),
                            }
        except Exception as err:
            _LOGGER.debug("Pool data update error: %s", err)

        if self.pool_provider and self.pool_provider != POOL_NONE:
            if not self._cached_pool_data.get("pool_active_workers"):
                self._cached_pool_data["pool_active_workers"] = 1
            self._cached_pool_data["pool_status"] = "Alive"
            self._cached_pool_data["pool_provider"] = self.pool_provider
            self._cached_pool_data["pool_provider_name"] = POOL_NAMES.get(self.pool_provider, self.pool_provider.title())

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

    async def async_apply_solar_curtailment(self, mode: str) -> bool:
        """Apply solar curtailment mode (eco, standard, turbo, pause)."""
        mode_lower = mode.lower()
        if mode_lower == "eco":
            if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
                return await self.async_set_bitaxe_profile(PROFILE_ECO)
        elif mode_lower == "turbo":
            if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
                return await self.async_set_bitaxe_profile(PROFILE_TURBO)
        elif mode_lower == "standard":
            if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
                return await self.async_set_bitaxe_profile(PROFILE_STANDARD)
        elif mode_lower == "pause":
            # Call pause via socket or REST
            if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
                return await self.async_set_bitaxe_tuning(frequency=300, core_voltage=1000)
            return await self._query_cgminer_socket("pause") is not None
        return False

    async def async_reboot_miner(self) -> bool:
        """Send reboot command to miner."""
        if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
            url = f"http://{self.host}:{self.port}/api/system/restart"
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, timeout=aiohttp.ClientTimeout(total=8)) as resp:
                        return resp.status in (200, 204)
            except Exception as err:
                _LOGGER.error("Bitaxe/NerdQaxe reboot failed: %s", err)
                return False
        else:
            res = await self._query_cgminer_socket("restart")
            return bool(res)

    async def async_restart_mining(self) -> bool:
        """Restart mining process without hardware reboot."""
        if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
            url = f"http://{self.host}:{self.port}/api/system/restart"
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(url, timeout=aiohttp.ClientTimeout(total=8)) as resp:
                        return resp.status in (200, 204)
            except Exception as err:
                _LOGGER.error("Bitaxe/NerdQaxe process restart failed: %s", err)
                return False
        return False

    async def async_switch_stratum(
        self,
        stratum_url: str,
        stratum_port: int,
        stratum_user: str | None = None,
        stratum_password: str | None = None,
        coin: str | None = None,
    ) -> bool:
        """Switch active stratum mining pool and coin on this miner."""
        success = False
        if self.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
            url = f"http://{self.host}:{self.port}/api/system"
            payload: dict[str, Any] = {
                "stratumURL": stratum_url,
                "stratumPort": int(stratum_port),
            }
            if stratum_user:
                payload["stratumUser"] = stratum_user
            if stratum_password is not None:
                payload["stratumPassword"] = stratum_password

            try:
                async with aiohttp.ClientSession() as session:
                    async with session.patch(url, json=payload, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status in (200, 204):
                            _LOGGER.info("Switched Bitaxe stratum on %s to %s:%s", self.host, stratum_url, stratum_port)
                            success = True
                        else:
                            _LOGGER.warning("Bitaxe stratum switch returned status %s", resp.status)
            except Exception as err:
                _LOGGER.error("Failed to switch Bitaxe stratum on %s: %s", self.host, err)
        elif self.miner_type in (TYPE_CGMINER_RPC, TYPE_WHATSMINER, TYPE_ANTMINER):
            pool_str = f"stratum+tcp://{stratum_url}:{stratum_port}" if not stratum_url.startswith("stratum") else stratum_url
            user_str = stratum_user or self.pool_wallet or "user"
            pass_str = stratum_password or "x"
            res = await self._query_cgminer_socket("addpool", f"{pool_str},{user_str},{pass_str}")
            if res and res.get("STATUS", [{}])[0].get("STATUS") in ("S", "W", "I"):
                success = True
                _LOGGER.info("Added and switched CGMiner pool on %s to %s", self.host, pool_str)
            else:
                _LOGGER.warning("CGMiner addpool returned: %s", res)
                success = bool(res)
        else:
            _LOGGER.info("Stratum switching not supported for miner type %s", self.miner_type)
            success = True

        if success and coin:
            self.coin = coin.upper()
            if self.entry:
                new_data = dict(self.entry.data)
                new_data[CONF_COIN] = self.coin
                if stratum_user:
                    new_data[CONF_POOL_WALLET] = stratum_user
                self.hass.config_entries.async_update_entry(self.entry, data=new_data)

        if success:
            await self.async_request_refresh()

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
