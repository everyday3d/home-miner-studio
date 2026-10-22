"""Sensor platform for Home Miner Studio."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    PERCENTAGE,
    EntityCategory,
    UnitOfElectricCurrent,
    UnitOfEnergy,
    UnitOfFrequency,
    UnitOfPower,
    UnitOfTemperature,
    UnitOfTime,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN, POOL_NAMES, POOL_NONE, TYPE_CGMINER_RPC
from .coordinator import MinerDataUpdateCoordinator

# Extra telemetry read from the CGMiner API (summary / stats / version); created for CGMiner RPC miners only.
CGMINER_SENSOR_TYPES: tuple[SensorEntityDescription, ...] = (
    SensorEntityDescription(
        key="found_blocks",
        name="Found Blocks",
        icon="mdi:cube-scan",
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="fan_percent",
        name="Fan Duty",
        icon="mdi:fan",
        native_unit_of_measurement=PERCENTAGE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="firmware_version",
        name="Firmware Version",
        icon="mdi:chip",
        entity_category=EntityCategory.DIAGNOSTIC,
    ),
)

SENSOR_TYPES: tuple[SensorEntityDescription, ...] = (
    SensorEntityDescription(
        key="hashrate_ths",
        name="Hashrate (TH/s)",
        icon="mdi:pickaxe",
        native_unit_of_measurement="TH/s",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="hashrate_ghs",
        name="Hashrate (GH/s)",
        icon="mdi:pickaxe",
        native_unit_of_measurement="GH/s",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="power_w",
        name="Power Draw",
        device_class=SensorDeviceClass.POWER,
        native_unit_of_measurement=UnitOfPower.WATT,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="efficiency_j_th",
        name="Efficiency",
        icon="mdi:lightning-bolt-outline",
        native_unit_of_measurement="J/TH",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="daily_kwh",
        name="Daily Energy",
        device_class=SensorDeviceClass.ENERGY,
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="total_energy_kwh",
        name="Total Energy",
        device_class=SensorDeviceClass.ENERGY,
        native_unit_of_measurement=UnitOfEnergy.KILO_WATT_HOUR,
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="daily_power_cost",
        name="Daily Electricity Cost",
        device_class=SensorDeviceClass.MONETARY,
        native_unit_of_measurement="$",
        state_class=SensorStateClass.TOTAL,
    ),
    SensorEntityDescription(
        key="btc_price_usd",
        name="Bitcoin Price",
        device_class=SensorDeviceClass.MONETARY,
        native_unit_of_measurement="$",
        icon="mdi:currency-btc",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="coin_price_usd",
        name="Coin Price",
        device_class=SensorDeviceClass.MONETARY,
        native_unit_of_measurement="$",
        icon="mdi:cash-multiple",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="daily_est_revenue",
        name="Daily Gross Revenue",
        device_class=SensorDeviceClass.MONETARY,
        native_unit_of_measurement="$",
        icon="mdi:cash-plus",
        state_class=SensorStateClass.TOTAL,
    ),
    SensorEntityDescription(
        key="daily_net_profit",
        name="Daily Net Profit",
        device_class=SensorDeviceClass.MONETARY,
        native_unit_of_measurement="$",
        icon="mdi:cash-check",
        state_class=SensorStateClass.TOTAL,
    ),
    SensorEntityDescription(
        key="temp_c",
        name="Chip Temperature",
        device_class=SensorDeviceClass.TEMPERATURE,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="vr_temp_c",
        name="VR Temperature",
        device_class=SensorDeviceClass.TEMPERATURE,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="fan_rpm",
        name="Fan Speed",
        icon="mdi:fan",
        native_unit_of_measurement="RPM",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="voltage_v",
        name="Core Voltage",
        device_class=SensorDeviceClass.VOLTAGE,
        native_unit_of_measurement="V",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="core_voltage_actual",
        name="Actual Core Voltage",
        native_unit_of_measurement="mV",
        icon="mdi:flash-outline",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="input_voltage",
        name="Input Voltage",
        device_class=SensorDeviceClass.VOLTAGE,
        native_unit_of_measurement="V",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="current_a",
        name="Current Draw",
        device_class=SensorDeviceClass.CURRENT,
        native_unit_of_measurement=UnitOfElectricCurrent.AMPERE,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="frequency_mhz",
        name="Core Frequency",
        device_class=SensorDeviceClass.FREQUENCY,
        native_unit_of_measurement=UnitOfFrequency.MEGAHERTZ,
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="shares_accepted",
        name="Shares Accepted",
        icon="mdi:check-circle-outline",
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="shares_rejected",
        name="Shares Rejected",
        icon="mdi:close-circle-outline",
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="hw_errors",
        name="Hardware Errors",
        icon="mdi:alert-circle-outline",
        state_class=SensorStateClass.TOTAL_INCREASING,
    ),
    SensorEntityDescription(
        key="best_difficulty",
        name="Best Difficulty",
        icon="mdi:trophy-outline",
    ),
    SensorEntityDescription(
        key="uptime_seconds",
        name="Uptime",
        device_class=SensorDeviceClass.DURATION,
        native_unit_of_measurement=UnitOfTime.SECONDS,
    ),
    # Mining Pool Telemetry
    SensorEntityDescription(
        key="pool_unpaid_balance",
        name="Pool Unpaid Balance",
        icon="mdi:wallet-outline",
        state_class=SensorStateClass.TOTAL,
    ),
    SensorEntityDescription(
        key="pool_24h_revenue",
        name="Pool 24h Revenue",
        icon="mdi:cash-clock",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="pool_active_workers",
        name="Pool Active Workers",
        icon="mdi:account-hard-hat",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="pool_reported_hashrate",
        name="Pool Reported Hashrate",
        icon="mdi:cloud-sync",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="pool_best_share",
        name="Pool Best Share",
        icon="mdi:trophy-award",
        state_class=SensorStateClass.MEASUREMENT,
    ),
    SensorEntityDescription(
        key="pool_status",
        name="Pool Connection Status",
        icon="mdi:server-network",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Home Miner Studio sensor platform."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    descriptions = SENSOR_TYPES
    if coordinator.miner_type == TYPE_CGMINER_RPC:
        descriptions = SENSOR_TYPES + CGMINER_SENSOR_TYPES
    entities: list[SensorEntity] = [
        HomeMinerSensor(coordinator, entry, description)
        for description in descriptions
    ]

    async_add_entities(entities)


class HomeMinerSensor(CoordinatorEntity[MinerDataUpdateCoordinator], SensorEntity):
    """Representation of a Home Miner Studio sensor."""

    def __init__(
        self,
        coordinator: MinerDataUpdateCoordinator,
        entry: ConfigEntry,
        description: SensorEntityDescription,
    ) -> None:
        """Initialize the sensor."""
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

    @property
    def native_value(self) -> Any:
        """Return the native value of the sensor."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get(self.entity_description.key)

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return sensor state attributes."""
        if self.entity_description.key == "pool_status":
            cdata = self.coordinator.data or {}
            prov = self.coordinator.pool_provider or cdata.get("pool_provider", POOL_NONE)
            return {
                "pool_provider": prov,
                "pool_provider_name": cdata.get("pool_provider_name", POOL_NAMES.get(prov, prov.replace("_", " ").title())),
                "pool_wallet": self.coordinator.pool_wallet or cdata.get("pool_wallet") or cdata.get("pool_user"),
                "pool_url": cdata.get("pool_url"),
                "pool_user": cdata.get("pool_user"),
                "pool_is_active": bool(prov and prov != POOL_NONE),
            }
        if self.entity_description.key in ("btc_price_usd", "coin_price_usd"):
            cdata = self.coordinator.data or {}
            return {
                "coin": cdata.get("coin_symbol", self.coordinator.coin),
                "coin_name": cdata.get("coin_name", "Bitcoin"),
                "coin_sign": cdata.get("coin_sign", "₿"),
                "change_24h_pct": cdata.get("coin_change_24h_pct", 0.0),
                "history_24h": cdata.get("history_24h", []),
                "history_7d": cdata.get("history_7d", []),
                "history_30d": cdata.get("history_30d", []),
                "history_1y": cdata.get("history_1y", []),
                "market_stats": cdata.get("market_stats", {}),
            }
        if self.entity_description.key == "firmware_version":
            cdata = self.coordinator.data or {}
            return {
                "cgminer_version": cdata.get("cgminer_version"),
                "hardware_model": cdata.get("hardware_model"),
            }
        return None
