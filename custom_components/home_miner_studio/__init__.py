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
    CONF_COIN,
    CONF_ELECTRICITY_RATE_SENSOR,
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_NAME,
    CONF_PASSWORD,
    CONF_POOL_PROVIDER,
    CONF_POOL_TOKEN,
    CONF_POOL_WALLET,
    CONF_PORT,
    CONF_SCAN_INTERVAL,
    DEFAULT_PORT_BITAXE,
    DOMAIN,
    PLATFORMS,
    SERVICE_ADD_MINER,
    SERVICE_APPLY_SOLAR_CURTAILMENT,
    SERVICE_DELETE_MINER,
    SERVICE_EDIT_MINER,
    SERVICE_IMPORT_EXISTING,
    SERVICE_REBOOT_MINER,
    SERVICE_RESTART_MINING,
    SERVICE_SET_AXEOS_PROFILE,
    SERVICE_SET_AXEOS_TUNING,
    TYPE_BITAXE,
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

    async def handle_add_miner_service(call: ServiceCall) -> None:
        """Handle adding a new miner programmatically."""
        data = dict(call.data)
        from homeassistant import config_entries
        await hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": config_entries.SOURCE_IMPORT},
            data=data,
        )

    async def handle_edit_miner_service(call: ServiceCall) -> None:
        """Handle editing an existing miner programmatically."""
        host = call.data.get(CONF_HOST)
        entry_id = call.data.get("entry_id")
        target = None
        for e in hass.config_entries.async_entries(DOMAIN):
            if (entry_id and e.entry_id == entry_id) or (host and e.data.get(CONF_HOST) == host):
                target = e
                break

        new_title = call.data.get(CONF_NAME)

        if target:
            if not new_title:
                new_title = target.title
            new_data = {**target.data, **call.data}
            if CONF_NAME in call.data:
                new_data[CONF_NAME] = call.data[CONF_NAME]
            hass.config_entries.async_update_entry(
                target,
                title=new_title,
                data=new_data,
            )
            try:
                from homeassistant.helpers import device_registry as dr, entity_registry as er
                dev_reg = dr.async_get(hass)
                ent_reg = er.async_get(hass)
                device = dev_reg.async_get_device(identifiers={(DOMAIN, target.entry_id)})
                if device and new_title:
                    dev_reg.async_update_device(device.id, name_by_user=new_title)
                    for ent in ent_reg.entities.values():
                        if ent.device_id == device.id:
                            base_sensor = ent.original_name or ent.entity_id.split(".")[-1]
                            ent_reg.async_update_entity(ent.entity_id, name=f"{new_title} {base_sensor}")
            except Exception as d_err:
                _LOGGER.warning("Could not update device/entity registry name: %s", d_err)
            await hass.config_entries.async_reload(target.entry_id)
        else:
            try:
                from homeassistant.helpers import device_registry as dr, entity_registry as er
                dev_reg = dr.async_get(hass)
                ent_reg = er.async_get(hass)
                found_dev = None
                if host:
                    devices_list = getattr(dev_reg, "devices", [])
                    for dev in (devices_list.values() if hasattr(devices_list, "values") else devices_list):
                        if dev.configuration_url and host in str(dev.configuration_url):
                            found_dev = dev
                            break
                        for _, conn_val in dev.connections:
                            if host in str(conn_val):
                                found_dev = dev
                                break
                if found_dev and new_title:
                    dev_reg.async_update_device(found_dev.id, name_by_user=new_title)
                    for ent in ent_reg.entities.values():
                        if ent.device_id == found_dev.id:
                            base_sensor = ent.original_name or ent.entity_id.split(".")[-1]
                            ent_reg.async_update_entity(ent.entity_id, name=f"{new_title} {base_sensor}")
                    _LOGGER.info("Updated device and entities for external miner %s to '%s'", host, new_title)
            except Exception as dev_err:
                _LOGGER.warning("Could not update external miner device: %s", dev_err)

    async def handle_delete_miner_service(call: ServiceCall) -> None:
        """Handle deleting a miner programmatically."""
        host = call.data.get(CONF_HOST)
        entry_id = call.data.get("entry_id")
        target = None
        for e in hass.config_entries.async_entries(DOMAIN):
            if (entry_id and e.entry_id == entry_id) or (host and e.data.get(CONF_HOST) == host):
                target = e
                break
        if target:
            await hass.config_entries.async_remove(target.entry_id)

    hass.services.async_register(
        DOMAIN,
        SERVICE_ADD_MINER,
        handle_add_miner_service,
        schema=vol.Schema({
            vol.Required(CONF_HOST): cv.string,
            vol.Optional(CONF_NAME): cv.string,
            vol.Optional(CONF_MINER_TYPE, default=TYPE_BITAXE): cv.string,
            vol.Optional(CONF_PORT, default=DEFAULT_PORT_BITAXE): cv.port,
            vol.Optional(CONF_PASSWORD): cv.string,
            vol.Optional(CONF_COIN, default="BTC"): cv.string,
            vol.Optional(CONF_POOL_PROVIDER, default="none"): cv.string,
            vol.Optional(CONF_POOL_WALLET): cv.string,
            vol.Optional(CONF_POOL_TOKEN): cv.string,
            vol.Optional(CONF_ELECTRICITY_RATE_SENSOR): cv.string,
            vol.Optional(CONF_SCAN_INTERVAL, default=30): cv.positive_int,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_EDIT_MINER,
        handle_edit_miner_service,
        schema=vol.Schema({
            vol.Optional(CONF_HOST): cv.string,
            vol.Optional("entry_id"): cv.string,
            vol.Optional(CONF_NAME): cv.string,
            vol.Optional(CONF_PORT): cv.port,
            vol.Optional(CONF_PASSWORD): cv.string,
            vol.Optional(CONF_COIN): cv.string,
            vol.Optional(CONF_POOL_PROVIDER): cv.string,
            vol.Optional(CONF_POOL_WALLET): cv.string,
            vol.Optional(CONF_POOL_TOKEN): cv.string,
            vol.Optional(CONF_ELECTRICITY_RATE_SENSOR): cv.string,
            vol.Optional(CONF_SCAN_INTERVAL): cv.positive_int,
        }),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_DELETE_MINER,
        handle_delete_miner_service,
        schema=vol.Schema({
            vol.Optional(CONF_HOST): cv.string,
            vol.Optional("entry_id"): cv.string,
        }),
    )

    # Register HTTP views for discovering, importing, and managing miners
    hass.http.register_view(HomeMinerDiscoverView)
    hass.http.register_view(HomeMinerImportView)
    hass.http.register_view(HomeMinerManagerView)
    hass.http.register_view(HomeMinerMarketView)

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


class HomeMinerMarketView(HomeAssistantView):
    """View to return market telemetry and historical price series for any coin."""

    url = "/api/home_miner_studio/market"
    name = "api:home_miner_studio:market"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Return coin price and historical timeseries."""
        from .market import async_get_coin_market_data
        hass: HomeAssistant = request.app["hass"]
        coin = request.query.get("coin", "BTC")
        data = await async_get_coin_market_data(hass, coin)
        return self.json(data)


class HomeMinerDiscoverView(HomeAssistantView):
    """View to list unimported miners discovered in Home Assistant."""

    url = "/api/home_miner_studio/discover"
    name = "api:home_miner_studio:discover"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Return discovered miners JSON."""
        hass: HomeAssistant = request.app["hass"]
        include_all = request.query.get("include_all", "0").lower() in ("1", "true", "yes")
        miners = await async_discover_existing_miners(hass, include_all=include_all)
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


class HomeMinerManagerView(HomeAssistantView):
    """View to list, add, edit, and delete miners."""

    url = "/api/home_miner_studio/miners"
    name = "api:home_miner_studio:miners"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Return list of all configured miners."""
        hass: HomeAssistant = request.app["hass"]
        entries = hass.config_entries.async_entries(DOMAIN)
        miners = []
        for e in entries:
            miners.append({
                "entry_id": e.entry_id,
                "name": e.title or e.data.get(CONF_NAME, "Miner"),
                "miner_type": e.data.get(CONF_MINER_TYPE, TYPE_BITAXE),
                "host": e.data.get(CONF_HOST, ""),
                "port": e.data.get(CONF_PORT, 80),
                "coin": e.data.get(CONF_COIN, "BTC"),
                "pool_provider": e.data.get(CONF_POOL_PROVIDER, "none"),
                "pool_wallet": e.data.get(CONF_POOL_WALLET, ""),
                "pool_token": e.data.get(CONF_POOL_TOKEN, ""),
                "electricity_rate_sensor": e.data.get(CONF_ELECTRICITY_RATE_SENSOR, ""),
                "scan_interval": e.data.get(CONF_SCAN_INTERVAL, 30),
            })
        return self.json({"miners": miners, "count": len(miners)})

    async def post(self, request: web.Request) -> web.Response:
        """Add a new miner configuration entry."""
        hass: HomeAssistant = request.app["hass"]
        try:
            payload = await request.json()
        except Exception:
            return self.json({"error": "Invalid JSON body"}, status=400)

        host = payload.get(CONF_HOST)
        if not host:
            return self.json({"error": "Host / IP address is required"}, status=400)

        miner_type = payload.get(CONF_MINER_TYPE, TYPE_BITAXE)
        port = int(payload.get(CONF_PORT, DEFAULT_PORT_BITAXE))
        name = payload.get(CONF_NAME, f"{miner_type.title()} ({host})")

        # Check existing entries
        for e in hass.config_entries.async_entries(DOMAIN):
            if e.data.get(CONF_HOST) == host and e.data.get(CONF_PORT) == port:
                return self.json({"error": f"Miner at {host}:{port} already exists"}, status=409)

        data = {
            CONF_NAME: name,
            CONF_MINER_TYPE: miner_type,
            CONF_HOST: host,
            CONF_PORT: port,
            CONF_PASSWORD: payload.get(CONF_PASSWORD, ""),
            CONF_COIN: payload.get(CONF_COIN, "BTC"),
            CONF_POOL_PROVIDER: payload.get(CONF_POOL_PROVIDER, "none"),
            CONF_POOL_WALLET: payload.get(CONF_POOL_WALLET, ""),
            CONF_POOL_TOKEN: payload.get(CONF_POOL_TOKEN, ""),
            CONF_ELECTRICITY_RATE_SENSOR: payload.get(CONF_ELECTRICITY_RATE_SENSOR, ""),
            CONF_SCAN_INTERVAL: int(payload.get(CONF_SCAN_INTERVAL, 30)),
        }

        from homeassistant import config_entries
        flow_result = await hass.config_entries.flow.async_init(
            DOMAIN,
            context={"source": config_entries.SOURCE_IMPORT},
            data=data,
        )

        return self.json({"success": True, "result": flow_result})

    async def patch(self, request: web.Request) -> web.Response:
        """Edit / update an existing miner configuration entry."""
        hass: HomeAssistant = request.app["hass"]
        try:
            payload = await request.json()
        except Exception:
            return self.json({"error": "Invalid JSON body"}, status=400)

        entry_id = payload.get("entry_id")
        host = payload.get(CONF_HOST)

        target_entry = None
        for e in hass.config_entries.async_entries(DOMAIN):
            if (entry_id and e.entry_id == entry_id) or (host and e.data.get(CONF_HOST) == host):
                target_entry = e
                break

        if not target_entry:
            return self.json({"error": "Miner entry not found"}, status=404)

        updated_data = {**target_entry.data}
        for k in (
            CONF_NAME,
            CONF_HOST,
            CONF_PORT,
            CONF_PASSWORD,
            CONF_COIN,
            CONF_POOL_PROVIDER,
            CONF_POOL_WALLET,
            CONF_POOL_TOKEN,
            CONF_ELECTRICITY_RATE_SENSOR,
            CONF_SCAN_INTERVAL,
        ):
            if k in payload:
                updated_data[k] = payload[k]

        new_title = payload.get(CONF_NAME, target_entry.title)
        hass.config_entries.async_update_entry(
            target_entry,
            title=new_title,
            data=updated_data,
        )
        await hass.config_entries.async_reload(target_entry.entry_id)

        return self.json({"success": True, "entry_id": target_entry.entry_id})

    async def delete(self, request: web.Request) -> web.Response:
        """Delete / remove a miner configuration entry."""
        hass: HomeAssistant = request.app["hass"]
        entry_id = request.query.get("entry_id")
        host = request.query.get("host")

        if not entry_id and not host:
            try:
                body = await request.json()
                entry_id = body.get("entry_id")
                host = body.get("host")
            except Exception:
                pass

        target_entry = None
        for e in hass.config_entries.async_entries(DOMAIN):
            if (entry_id and e.entry_id == entry_id) or (host and e.data.get(CONF_HOST) == host):
                target_entry = e
                break

        if not target_entry:
            return self.json({"error": "Miner entry not found"}, status=404)

        removed = await hass.config_entries.async_remove(target_entry.entry_id)
        return self.json({"success": removed, "entry_id": target_entry.entry_id})
