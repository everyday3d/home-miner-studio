"""Select platform for Home Miner Studio (Tuning Profiles)."""

from __future__ import annotations

import logging
from homeassistant.components.select import SelectEntity, SelectEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import AVALON_WORK_MODES, CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN, TUNING_PROFILES, TYPE_BITAXE, TYPE_NERDQAXE
from .coordinator import MinerDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio select entities."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    if coordinator.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
        async_add_entities([HomeMinerProfileSelect(coordinator, entry)])
    elif (coordinator.data or {}).get("work_mode") is not None:
        async_add_entities([HomeMinerAvalonWorkModeSelect(coordinator, entry)])


class HomeMinerProfileSelect(CoordinatorEntity[MinerDataUpdateCoordinator], SelectEntity):
    """Representation of a Bitaxe tuning profile select entity."""

    def __init__(
        self,
        coordinator: MinerDataUpdateCoordinator,
        entry: ConfigEntry,
    ) -> None:
        """Initialize the select entity."""
        super().__init__(coordinator)
        self._entry = entry
        miner_name = entry.data.get(CONF_NAME, "Bitaxe")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "bitaxe")

        self._attr_name = f"{miner_name} Power Profile"
        self._attr_unique_id = f"{entry.entry_id}_power_profile"
        self._attr_options = TUNING_PROFILES
        self._attr_icon = "mdi:tune"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Open Hardware",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    @property
    def current_option(self) -> str | None:
        """Return the current selected profile."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get("profile", self.coordinator.current_profile)

    async def async_select_option(self, option: str) -> None:
        """Change the current profile."""
        await self.coordinator.async_set_bitaxe_profile(option)


class HomeMinerAvalonWorkModeSelect(CoordinatorEntity[MinerDataUpdateCoordinator], SelectEntity):
    """Canaan Avalon work mode (Low / Mid / High)."""

    _attr_options = list(AVALON_WORK_MODES)
    _attr_icon = "mdi:speedometer"

    def __init__(self, coordinator: MinerDataUpdateCoordinator, entry: ConfigEntry) -> None:
        """Initialize the work mode select."""
        super().__init__(coordinator)
        miner_name = entry.data.get(CONF_NAME, "Miner")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "miner")

        self._attr_name = f"{miner_name} Work Mode"
        self._attr_unique_id = f"{entry.entry_id}_work_mode"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Home Miner Studio",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    @property
    def current_option(self) -> str | None:
        """Return the current work mode."""
        level = (self.coordinator.data or {}).get("work_mode")
        return next((name for name, value in AVALON_WORK_MODES.items() if value == level), None)

    async def async_select_option(self, option: str) -> None:
        """Change the work mode."""
        if await self.coordinator.async_set_avalon_work_mode(AVALON_WORK_MODES[option]) and self.coordinator.data:
            # Show the change now; the next refresh confirms it.
            self.coordinator.data["work_mode"] = AVALON_WORK_MODES[option]
            self.async_write_ha_state()
