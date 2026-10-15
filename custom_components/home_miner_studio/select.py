"""Select platform for Home Miner Studio (Tuning Profiles)."""

from __future__ import annotations

import logging
from homeassistant.components.select import SelectEntity, SelectEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN, TUNING_PROFILES, TYPE_BITAXE, TYPE_NERDQAXE
from .coordinator import MinerDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio select entities."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    if coordinator.miner_type not in (TYPE_BITAXE, TYPE_NERDQAXE):
        return

    async_add_entities([HomeMinerProfileSelect(coordinator, entry)])


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
