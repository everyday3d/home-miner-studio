"""Button platform for Home Miner Studio."""

from __future__ import annotations

import logging
from homeassistant.components.button import ButtonEntity, ButtonEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN
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

# Canaan Avalon only: hand fan control back to the firmware after a fixed Fan Speed was set.
AVALON_FAN_AUTO = ButtonEntityDescription(
    key="fan_auto",
    name="Fan Auto",
    icon="mdi:fan-auto",
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio buttons."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    descriptions = list(BUTTON_TYPES)
    if (coordinator.data or {}).get("fan_percent") is not None:
        descriptions.append(AVALON_FAN_AUTO)
    async_add_entities(
        HomeMinerButton(coordinator, entry, description)
        for description in descriptions
    )


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
        """Handle button press: reboot, restart the mining process, or (Avalon) return the fan to auto."""
        key = self.entity_description.key
        if key == "reboot":
            ok = await self.coordinator.async_reboot_miner()
        elif key == "restart_mining":
            ok = await self.coordinator.async_restart_mining()
        elif key == "fan_auto":
            ok = await self.coordinator.async_set_avalon_fan(-1)
        else:
            return
        if not ok:
            _LOGGER.error("%s failed on %s", self.entity_description.name, self._entry.data.get(CONF_HOST))
