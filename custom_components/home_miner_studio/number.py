"""Number platform for Home Miner Studio (Frequency & Voltage tuning)."""

from __future__ import annotations

import logging
from homeassistant.components.number import NumberDeviceClass, NumberEntity, NumberEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, EntityCategory, UnitOfFrequency
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    AVALON_MODE_FAN_KEYS,
    AVALON_WORK_MODES,
    CONF_HOST,
    CONF_MINER_TYPE,
    CONF_NAME,
    DOMAIN,
    TYPE_BITAXE,
    TYPE_NERDQAXE,
)
from .coordinator import MinerDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

TUNING_NUMBERS: tuple[NumberEntityDescription, ...] = (
    NumberEntityDescription(
        key="frequency_mhz",
        name="Target Frequency",
        device_class=NumberDeviceClass.FREQUENCY,
        native_unit_of_measurement=UnitOfFrequency.MEGAHERTZ,
        native_min_value=200,
        native_max_value=750,
        native_step=25,
        icon="mdi:speedometer",
    ),
    NumberEntityDescription(
        key="core_voltage_mv",
        name="Target Core Voltage",
        native_unit_of_measurement="mV",
        native_min_value=900,
        native_max_value=1350,
        native_step=25,
        icon="mdi:flash-outline",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio number entities."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    if coordinator.miner_type in (TYPE_BITAXE, TYPE_NERDQAXE):
        async_add_entities(
            HomeMinerTuningNumber(coordinator, entry, description)
            for description in TUNING_NUMBERS
        )
    elif (coordinator.data or {}).get("fan_percent") is not None:
        entities: list[NumberEntity] = [HomeMinerAvalonFanNumber(coordinator, entry)]
        if (coordinator.data or {}).get("work_mode") is not None:
            entities += [
                HomeMinerAvalonModeFanNumber(coordinator, entry, mode_name, level)
                for mode_name, level in AVALON_WORK_MODES.items()
            ]
        async_add_entities(entities)


class HomeMinerTuningNumber(CoordinatorEntity[MinerDataUpdateCoordinator], NumberEntity):
    """Representation of a Bitaxe tuning slider entity."""

    def __init__(
        self,
        coordinator: MinerDataUpdateCoordinator,
        entry: ConfigEntry,
        description: NumberEntityDescription,
    ) -> None:
        """Initialize the number entity."""
        super().__init__(coordinator)
        self.entity_description = description
        self._entry = entry
        miner_name = entry.data.get(CONF_NAME, "Bitaxe")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "bitaxe")

        self._attr_name = f"{miner_name} {description.name}"
        self._attr_unique_id = f"{entry.entry_id}_{description.key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Open Hardware",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    @property
    def native_value(self) -> float | None:
        """Return the current value."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get(self.entity_description.key)

    async def async_set_native_value(self, value: float) -> None:
        """Update the tuning value on the Bitaxe."""
        val = int(value)
        if self.entity_description.key == "frequency_mhz":
            await self.coordinator.async_set_bitaxe_tuning(frequency=val)
        elif self.entity_description.key == "core_voltage_mv":
            await self.coordinator.async_set_bitaxe_tuning(core_voltage=val)


class HomeMinerAvalonFanNumber(CoordinatorEntity[MinerDataUpdateCoordinator], NumberEntity):
    """Canaan Avalon fan duty (15-100 %). The "Fan Auto" button returns it to automatic."""

    _attr_native_min_value = 15
    _attr_native_max_value = 100
    _attr_native_step = 1
    _attr_native_unit_of_measurement = PERCENTAGE
    _attr_icon = "mdi:fan"

    def __init__(self, coordinator: MinerDataUpdateCoordinator, entry: ConfigEntry) -> None:
        """Initialize the fan speed number."""
        super().__init__(coordinator)
        miner_name = entry.data.get(CONF_NAME, "Miner")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "miner")

        self._attr_name = f"{miner_name} Fan Speed"
        self._attr_unique_id = f"{entry.entry_id}_fan_speed"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Home Miner Studio",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    @property
    def native_value(self) -> float | None:
        """Return the current fan duty."""
        return (self.coordinator.data or {}).get("fan_percent")

    async def async_set_native_value(self, value: float) -> None:
        """Set a fixed fan duty."""
        if await self.coordinator.async_set_avalon_fan(int(value)) and self.coordinator.data:
            # Show the change now; the next refresh confirms it.
            self.coordinator.data["fan_percent"] = max(15, min(100, int(value)))
            self.async_write_ha_state()


class HomeMinerAvalonModeFanNumber(CoordinatorEntity[MinerDataUpdateCoordinator], NumberEntity):
    """Fan duty to apply automatically when the Avalon switches to a given work mode (0 = leave the fan alone)."""

    _attr_native_min_value = 0
    _attr_native_max_value = 100
    _attr_native_step = 1
    _attr_native_unit_of_measurement = PERCENTAGE
    _attr_entity_category = EntityCategory.CONFIG
    _attr_icon = "mdi:fan-chevron-up"

    def __init__(self, coordinator: MinerDataUpdateCoordinator, entry: ConfigEntry, mode_name: str, level: int) -> None:
        """Initialize the per-mode fan setting."""
        super().__init__(coordinator)
        self._entry = entry
        self._level = level
        self._key = AVALON_MODE_FAN_KEYS[level]
        miner_name = entry.data.get(CONF_NAME, "Miner")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "miner")

        self._attr_name = f"{miner_name} Fan for {mode_name} Mode"
        self._attr_unique_id = f"{entry.entry_id}_{self._key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Home Miner Studio",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )

    @property
    def native_value(self) -> float | None:
        """Return the configured fan duty for this mode."""
        return self.coordinator.mode_fan_setting(self._level)

    async def async_set_native_value(self, value: float) -> None:
        """Save the setting (values 1-14 become 15, the firmware minimum) and apply it if this mode is active."""
        percent = int(value)
        if 0 < percent < 15:
            percent = 15
        self.hass.config_entries.async_update_entry(self._entry, data={**self._entry.data, self._key: percent})
        self.async_write_ha_state()
        if percent > 0 and (self.coordinator.data or {}).get("work_mode") == self._level:
            await self.coordinator.async_apply_mode_fan(self._level)
