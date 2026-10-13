"""Home Miner Studio Home Assistant Integration."""

from __future__ import annotations

import logging
import os
from aiohttp import web
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

import voluptuous as vol

from .const import (
    CARD_FILE,
    CARD_URL,
    DOMAIN,
    PLATFORMS,
    SERVICE_APPLY_SOLAR_CURTAILMENT,
    SERVICE_IMPORT_EXISTING,
    SERVICE_REBOOT_MINER,
    SERVICE_RESTART_MINING,
    SERVICE_SET_AXEOS_PROFILE,
    SERVICE_SET_AXEOS_TUNING,
)
from .coordinator import MinerDataUpdateCoordinator
from .discovery import async_auto_import_miners, async_discover_existing_miners

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up Home Miner Studio component, APIs, and serve Lovelace card."""
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

    # Register HTTP views for discovering and importing miners
    hass.http.register_view(HomeMinerDiscoverView)
    hass.http.register_view(HomeMinerImportView)

    def _get_target_coordinators(call: ServiceCall) -> list[MinerDataUpdateCoordinator]:
        coordinators = [
            coord for coord in hass.data.get(DOMAIN, {}).values()
            if isinstance(coord, MinerDataUpdateCoordinator)
        ]
        target_host = call.data.get("host")
        if target_host:
            coordinators = [c for c in coordinators if c.host == target_host]
        return coordinators

    # Register HA service: home_miner_studio.import_existing_miners
    async def handle_import_service(call: ServiceCall) -> None:
        """Handle manual or automated trigger to import miners."""
        imported = await async_auto_import_miners(hass)
        _LOGGER.info("Home Miner Studio auto-imported %d miners: %s", len(imported), imported)

    async def handle_curtailment_service(call: ServiceCall) -> None:
        """Handle solar curtailment mode automation trigger."""
        mode = call.data.get("mode", "eco")
        for coord in _get_target_coordinators(call):
            await coord.async_apply_solar_curtailment(mode)

    async def handle_set_tuning_service(call: ServiceCall) -> None:
        """Handle manual frequency & voltage tuning."""
        freq = call.data.get("frequency", 500)
        volt = call.data.get("core_voltage", 1150)
        for coord in _get_target_coordinators(call):
            await coord.async_set_bitaxe_tuning(frequency=freq, core_voltage=volt)

    async def handle_set_profile_service(call: ServiceCall) -> None:
        """Handle preset performance profile assignment."""
        profile = call.data.get("profile", "Eco")
        for coord in _get_target_coordinators(call):
            await coord.async_set_bitaxe_profile(profile)

    async def handle_reboot_service(call: ServiceCall) -> None:
        """Handle miner reboot service call."""
        for coord in _get_target_coordinators(call):
            await coord.async_reboot_miner()

    async def handle_restart_mining_service(call: ServiceCall) -> None:
        """Handle mining process restart service call."""
        for coord in _get_target_coordinators(call):
            await coord.async_restart_mining()

    hass.services.async_register(
        DOMAIN,
        SERVICE_IMPORT_EXISTING,
        handle_import_service,
        schema=vol.Schema({}),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_APPLY_SOLAR_CURTAILMENT,
        handle_curtailment_service,
        schema=vol.Schema({
            vol.Required("mode"): cv.string,
            vol.Optional("host"): cv.string,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_AXEOS_TUNING,
        handle_set_tuning_service,
        schema=vol.Schema({
            vol.Required("frequency"): cv.positive_int,
            vol.Required("core_voltage"): cv.positive_int,
            vol.Optional("host"): cv.string,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_AXEOS_PROFILE,
        handle_set_profile_service,
        schema=vol.Schema({
            vol.Required("profile"): cv.string,
            vol.Optional("host"): cv.string,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_REBOOT_MINER,
        handle_reboot_service,
        schema=vol.Schema({
            vol.Optional("host"): cv.string,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_RESTART_MINING,
        handle_restart_mining_service,
        schema=vol.Schema({
            vol.Optional("host"): cv.string,
        }),
    )

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


class HomeMinerDiscoverView(HomeAssistantView):
    """View to list unimported miners discovered in Home Assistant."""

    url = "/api/home_miner_studio/discover"
    name = "api:home_miner_studio:discover"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Return discovered miners JSON."""
        hass: HomeAssistant = request.app["hass"]
        miners = await async_discover_existing_miners(hass)
        return self.json({"discovered": miners, "count": len(miners)})


class HomeMinerImportView(HomeAssistantView):
    """View to trigger auto-import of all discovered miners."""

    url = "/api/home_miner_studio/import"
    name = "api:home_miner_studio:import"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        """Execute auto-import and return results."""
        hass: HomeAssistant = request.app["hass"]
        imported = await async_auto_import_miners(hass)
        return self.json({"imported": imported, "count": len(imported)})
