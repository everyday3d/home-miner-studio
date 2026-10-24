"""Cryptocurrency Market Engine & Historical Price Timeseries for Home Miner Studio."""

from __future__ import annotations

import logging
import time
from typing import Any

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

# Supported coin definitions and CoinGecko IDs
COIN_DEFINITIONS: dict[str, dict[str, str]] = {
    "BTC": {"id": "bitcoin", "name": "Bitcoin", "sign": "₿"},
    "LTC": {"id": "litecoin", "name": "Litecoin", "sign": "Ł"},
    "DOGE": {"id": "dogecoin", "name": "Dogecoin", "sign": "Ð"},
    "KAS": {"id": "kaspa", "name": "Kaspa", "sign": "⚡"},
    "BCH": {"id": "bitcoin-cash", "name": "Bitcoin Cash", "sign": "₿"},
    "ETC": {"id": "ethereum-classic", "name": "Ethereum Classic", "sign": "Ξ"},
    "RVN": {"id": "ravencoin", "name": "Ravencoin", "sign": "🦅"},
    "ALPH": {"id": "alephium", "name": "Alephium", "sign": "ℵ"},
    "BELLS": {"id": "bellcoin", "name": "Bellcoin", "sign": "🔔"},
    "DGB": {"id": "digibyte", "name": "DigiByte", "sign": "Ɗ"},
    "WOJAK": {"id": "wojak", "name": "Wojak", "sign": "🎭"},
    "WJK": {"id": "wojak", "name": "Wojak", "sign": "🎭"},
    "PEPE": {"id": "pepe", "name": "Pepe", "sign": "🐸"},
}

FALLBACK_PRICES: dict[str, float] = {
    "BTC": 68000.0,
    "BCH": 480.0,
    "LTC": 85.0,
    "DOGE": 0.14,
    "KAS": 0.12,
    "BELLS": 0.85,
    "DGB": 0.0092,
    "WOJAK": 0.000024,
    "WJK": 0.000024,
    "PEPE": 0.0000095,
}

# 15-minute cache TTL (900 seconds)
PRICE_CACHE_TTL = 900.0

# Global in-memory market cache keyed by uppercase coin symbol
_GLOBAL_MARKET_CACHE: dict[str, dict[str, Any]] = {}


def _downsample_series(raw_points: list[list[float]], target_count: int) -> list[dict[str, Any]]:
    """Downsample timestamp/price tuples to a fixed count with clean timestamps."""
    if not raw_points:
        return []
    if len(raw_points) <= target_count:
        return [{"t": int(p[0] / 1000), "p": round(float(p[1]), 2 if float(p[1]) >= 1 else 6)} for p in raw_points]

    step = len(raw_points) / target_count
    downsampled: list[dict[str, Any]] = []
    for i in range(target_count):
        idx = min(int(i * step), len(raw_points) - 1)
        pt = raw_points[idx]
        downsampled.append({"t": int(pt[0] / 1000), "p": round(float(pt[1]), 2 if float(pt[1]) >= 1 else 6)})

    # Always ensure the latest point is included
    last_pt = raw_points[-1]
    last_entry = {"t": int(last_pt[0] / 1000), "p": round(float(last_pt[1]), 2 if float(last_pt[1]) >= 1 else 6)}
    if downsampled and downsampled[-1]["t"] != last_entry["t"]:
        downsampled[-1] = last_entry

    return downsampled


def _generate_synthetic_history(base_price: float, change_24h_pct: float) -> dict[str, list[dict[str, Any]]]:
    """Generate resilient fallback historical curve if external chart API is unavailable."""
    now = int(time.time())
    history: dict[str, list[dict[str, Any]]] = {"24h": [], "7d": [], "30d": [], "1y": []}

    # 24H series (24 hourly points)
    start_price = base_price / (1.0 + (change_24h_pct / 100.0))
    for i in range(24):
        pct = i / 23.0
        t = now - int((23 - i) * 3600)
        # Small curve variation
        p = start_price + (base_price - start_price) * pct
        history["24h"].append({"t": t, "p": round(p, 2 if p >= 1 else 6)})

    # 7D series (28 points)
    seven_d_start = base_price * 0.96
    for i in range(28):
        pct = i / 27.0
        t = now - int((27 - i) * 6 * 3600)
        p = seven_d_start + (base_price - seven_d_start) * pct
        history["7d"].append({"t": t, "p": round(p, 2 if p >= 1 else 6)})

    # 30D series (30 daily points)
    thirty_d_start = base_price * 0.92
    for i in range(30):
        pct = i / 29.0
        t = now - int((29 - i) * 86400)
        p = thirty_d_start + (base_price - thirty_d_start) * pct
        history["30d"].append({"t": t, "p": round(p, 2 if p >= 1 else 6)})

    # 1Y series (52 weekly points)
    one_y_start = base_price * 0.75
    for i in range(52):
        pct = i / 51.0
        t = now - int((51 - i) * 7 * 86400)
        p = one_y_start + (base_price - one_y_start) * pct
        history["1y"].append({"t": t, "p": round(p, 2 if p >= 1 else 6)})

    return history


async def async_get_coin_market_data(hass: HomeAssistant, coin: str = "BTC") -> dict[str, Any]:
    """Fetch live coin price, 24h change, and multi-timeframe historical series with 15m caching."""
    coin_clean = (coin or "BTC").strip().upper()
    now = time.time()

    # Check 15-minute global cache
    if coin_clean in _GLOBAL_MARKET_CACHE:
        cached = _GLOBAL_MARKET_CACHE[coin_clean]
        if now - cached.get("last_updated", 0) < PRICE_CACHE_TTL:
            return cached

    coin_def = COIN_DEFINITIONS.get(coin_clean, {"id": coin_clean.lower(), "name": coin_clean, "sign": "🪙"})
    coin_id = coin_def["id"]

    headers = {"User-Agent": "HomeMinerStudio/0.5.2"}
    price = 0.0
    change_24h = 0.0
    raw_24h_prices: list[list[float]] = []
    raw_yearly_prices: list[list[float]] = []

    timeout = aiohttp.ClientTimeout(total=8)
    session = async_get_clientsession(hass)

    # 1. Fetch live price and 24h change from CoinGecko
    try:
        url_simple = f"https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies=usd&include_24hr_change=true"
        async with session.get(url_simple, headers=headers, timeout=timeout) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                cdata = data.get(coin_id, {})
                price = float(cdata.get("usd", 0.0))
                change_24h = float(cdata.get("usd_24h_change", 0.0))
    except Exception as err:
        _LOGGER.debug("CoinGecko simple price fetch for %s failed: %s", coin_clean, err)

    # 1b. Fallback to Kraken if CoinGecko failed for BTC/LTC/DOGE
    if price <= 0 and coin_clean in ("BTC", "XBT"):
        try:
            url_kraken = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD"
            async with session.get(url_kraken, timeout=timeout) as resp:
                if resp.status == 200:
                    data = await resp.json(content_type=None)
                    result = data.get("result", {})
                    xbt = result.get("XXBTZUSD", result.get("XBTUSD", {}))
                    price = float(xbt.get("c", [0.0])[0])
                    open_p = float(xbt.get("o", [price])[0])
                    if open_p > 0:
                        change_24h = ((price - open_p) / open_p) * 100.0
        except Exception as k_err:
            _LOGGER.debug("Kraken ticker fallback failed: %s", k_err)

    # If still 0, use last cached price or reasonable baseline
    if price <= 0:
        if coin_clean in _GLOBAL_MARKET_CACHE:
            price = _GLOBAL_MARKET_CACHE[coin_clean].get("price_usd", 68000.0)
            change_24h = _GLOBAL_MARKET_CACHE[coin_clean].get("change_24h_pct", 0.0)
        else:
            price = FALLBACK_PRICES.get(coin_clean, 1.0)

    # 2. Fetch 24H intraday price curve
    try:
        url_24h = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=1"
        async with session.get(url_24h, headers=headers, timeout=timeout) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                raw_24h_prices = data.get("prices", [])
    except Exception as err_24:
        _LOGGER.debug("CoinGecko 24h market chart for %s failed: %s", coin_clean, err_24)

    # 3. Fetch 365-day daily price curve (serves 7D, 30D, and 1Y views)
    try:
        url_year = f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart?vs_currency=usd&days=365&interval=daily"
        async with session.get(url_year, headers=headers, timeout=timeout) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                raw_yearly_prices = data.get("prices", [])
    except Exception as err_y:
        _LOGGER.debug("CoinGecko 365d market chart for %s failed: %s", coin_clean, err_y)

    # 4. Downsample multi-timeframe series
    history: dict[str, list[dict[str, Any]]] = {}

    if raw_24h_prices and len(raw_24h_prices) >= 5:
        history["24h"] = _downsample_series(raw_24h_prices, 24)
    else:
        synth = _generate_synthetic_history(price, change_24h)
        history["24h"] = synth["24h"]

    if raw_yearly_prices and len(raw_yearly_prices) >= 14:
        # 7D: last 7 daily points
        history["7d"] = _downsample_series(raw_yearly_prices[-7:], 14)
        # 30D: last 30 daily points
        history["30d"] = _downsample_series(raw_yearly_prices[-30:], 30)
        # 1Y: all 365 daily points downsampled to 52 weekly points
        history["1y"] = _downsample_series(raw_yearly_prices, 52)
    else:
        synth = _generate_synthetic_history(price, change_24h)
        history["7d"] = synth["7d"]
        history["30d"] = synth["30d"]
        history["1y"] = synth["1y"]

    # 5. Calculate High, Low, and Net Change for each timeframe
    def calc_stats(pts: list[dict[str, Any]]) -> dict[str, float]:
        if not pts:
            return {"high": price, "low": price, "change_pct": change_24h}
        vals = [p["p"] for p in pts]
        first_val = pts[0]["p"]
        last_val = pts[-1]["p"]
        pct = ((last_val - first_val) / first_val * 100.0) if first_val > 0 else 0.0
        return {
            "high": round(max(vals), 2),
            "low": round(min(vals), 2),
            "change_pct": round(pct, 2),
        }

    stats = {
        "24h": calc_stats(history["24h"]),
        "7d": calc_stats(history["7d"]),
        "30d": calc_stats(history["30d"]),
        "1y": calc_stats(history["1y"]),
    }

    result = {
        "coin": coin_clean,
        "coin_name": coin_def["name"],
        "coin_sign": coin_def["sign"],
        "price_usd": round(price, 2 if price >= 1 else 6),
        "change_24h_pct": round(change_24h, 2),
        "history_24h": history["24h"],
        "history_7d": history["7d"],
        "history_30d": history["30d"],
        "history_1y": history["1y"],
        "stats": stats,
        "last_updated": now,
    }

    _GLOBAL_MARKET_CACHE[coin_clean] = result
    _LOGGER.info("Fetched updated market telemetry for %s: $%s (%s%% 24h)", coin_clean, price, change_24h)
    return result
