"""Button platform for Home Miner Studio."""

from __future__ import annotations

import asyncio
import json
import logging
import aiohttp
from homeassistant.components.button import ButtonEntity, ButtonEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_NAME,
    CONF_PORT,
    DOMAIN,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_NERDQAXE,
)
from .coordinator import MinerDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

BUTTON_TYPES: tuple[ButtonEntityDescription, ...] = (
    ButtonEntityDescription(
        key="reboot",
        name="Reboot Miner",
        icon="mdi:restart",
    ),
    ButtonEntityDescription(
        key="restart_mining",
        name="Restart Mining Process",
        icon="mdi:reload",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio buttons."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    entities = [
        HomeMinerButton(coordinator, entry, description)
        for description in BUTTON_TYPES
    ]
    async_add_entities(entities)


class HomeMinerButton(CoordinatorEntity[MinerDataUpdateCoordinator], ButtonEntity):
    """Representation of a Home Miner Studio button entity."""

    def __init__(
        self,
        coordinator: MinerDataUpdateCoordinator,
        entry: ConfigEntry,
        description: ButtonEntityDescription,
    ) -> None:
        """Initialize the button."""
        super().__init__(coordinator)
        self.entity_description = description
        self._entry = entry
        miner_name = entry.data.get(CONF_NAME, "Miner")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "miner")

        self._attr_name = f"{miner_name} {description.name}"
        self._attr_unique_id = f"{entry.entry_id}_{description.key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Home Miner Studio",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    async def async_press(self) -> None:
        """Handle button press to restart miner or process."""
        miner_type = self._entry.data.get(CONF_MINER_TYPE)
        host = self._entry.data.get(CONF_HOST)
        port = self._entry.data.get(CONF_PORT, 80)

        if miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
            url = f"http://{host}:{port}/api/system/restart"
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(url) as resp:
                        _LOGGER.info("Bitaxe/NerdQaxe reboot command sent to %s (status %s)", host, resp.status)
            except Exception as err:
                _LOGGER.error("Failed to reboot Bitaxe/NerdQaxe at %s: %s", host, err)

        elif miner_type == TYPE_CGMINER_RPC:
            cmd = "restart" if self.entity_description.key == "reboot" else "stats"
            try:
                reader, writer = await asyncio.open_connection(host, port)
                writer.write(json.dumps({"command": cmd}).encode("utf-8"))
                await writer.drain()
                writer.close()
                await writer.wait_closed()
                _LOGGER.info("CGMiner %s sent to %s:%s", cmd, host, port)
            except Exception as err:
                _LOGGER.error("Failed to send %s to CGMiner at %s:%s: %s", cmd, host, port, err)
