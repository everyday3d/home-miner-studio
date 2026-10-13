"""Home Miner Studio Home Assistant Integration."""

from __future__ import annotations

import logging
import os
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components.http import StaticPathConfig

from .const import CARD_FILE, CARD_URL, DOMAIN, PLATFORMS
from .coordinator import MinerDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up Home Miner Studio component and serve Lovelace card."""
    hass.data.setdefault(DOMAIN, {})

    # Register static path to serve home-miner-cards.js
    card_path = os.path.join(os.path.dirname(__file__), CARD_FILE)
    if os.path.exists(card_path):
        try:
            await hass.http.async_register_static_paths([
                StaticPathConfig(CARD_URL, card_path, cache_headers=False)
            ])
            _LOGGER.info("Registered Home Miner Studio card at %s", CARD_URL)
        except Exception as err:
            _LOGGER.warning("Could not register static path for cards: %s", err)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Home Miner Studio from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    coordinator = MinerDataUpdateCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)

    return unload_ok
