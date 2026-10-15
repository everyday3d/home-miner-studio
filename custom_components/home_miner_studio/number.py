"""Number platform for Home Miner Studio (Frequency & Voltage tuning)."""

from __future__ import annotations

import logging
from homeassistant.components.number import NumberDeviceClass, NumberEntity, NumberEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfFrequency
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN, TYPE_BITAXE, TYPE_NERDQAXE
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

    if coordinator.miner_type not in (TYPE_BITAXE, TYPE_NERDQAXE):
        return

    entities = [
        HomeMinerTuningNumber(coordinator, entry, description)
        for description in TUNING_NUMBERS
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
