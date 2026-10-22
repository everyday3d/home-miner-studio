"""Light platform for Home Miner Studio (Canaan Avalon status LED)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.light import ATTR_BRIGHTNESS, ATTR_RGB_COLOR, ColorMode, LightEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import CONF_HOST, CONF_MINER_TYPE, CONF_NAME, DOMAIN
from .coordinator import MinerDataUpdateCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Avalon LED light (only for miners that report an LED state)."""
    coordinator: MinerDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]

    if not (coordinator.data or {}).get("led_state"):
        return

    async_add_entities([HomeMinerAvalonLed(coordinator, entry)])


def _scale_rgb(base: tuple[int, int, int], percent: int) -> tuple[int, int, int]:
    """Scale a base color by brightness like the Avalon firmware does (one channel stays >= 13)."""
    r, g, b = (round(c * percent / 100) for c in base)
    if max(r, g, b) < 13:
        if r >= g and r >= b:
            r = 13
        elif g >= b:
            g = 13
        else:
            b = 13
    return r, g, b


class HomeMinerAvalonLed(CoordinatorEntity[MinerDataUpdateCoordinator], LightEntity):
    """The Avalon status LED: on/off, brightness and RGB color."""

    _attr_supported_color_modes = {ColorMode.RGB}
    _attr_color_mode = ColorMode.RGB
    _attr_icon = "mdi:led-on"

    def __init__(self, coordinator: MinerDataUpdateCoordinator, entry: ConfigEntry) -> None:
        """Initialize the LED light."""
        super().__init__(coordinator)
        miner_name = entry.data.get(CONF_NAME, "Miner")
        miner_host = entry.data.get(CONF_HOST, "")
        miner_type = entry.data.get(CONF_MINER_TYPE, "miner")

        self._attr_name = f"{miner_name} LED"
        self._attr_unique_id = f"{entry.entry_id}_led"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=miner_name,
            manufacturer="Home Miner Studio",
            model=miner_type.replace("_", " ").title(),
            configuration_url=f"http://{miner_host}",
        )
        # Unscaled color the user picked; the firmware stores the brightness-scaled RGB.
        self._base_rgb: tuple[int, int, int] = (255, 255, 255)
        self._update_from_state()

    def _led(self) -> dict[str, int]:
        return (self.coordinator.data or {}).get("led_state") or {}

    def _update_from_state(self) -> None:
        led = self._led()
        if not led:
            return
        self._attr_is_on = led.get("effect", 0) != 0
        percent = max(5, led.get("brightness", 100))
        self._attr_brightness = round(percent / 100 * 255) if self._attr_is_on else 0
        rgb = (led.get("r", 0), led.get("g", 0), led.get("b", 0))
        if self._attr_is_on:
            self._attr_rgb_color = rgb
            self._base_rgb = tuple(min(255, round(c * 100 / percent)) for c in rgb)  # type: ignore[assignment]

    @callback
    def _handle_coordinator_update(self) -> None:
        self._update_from_state()
        super()._handle_coordinator_update()

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the LED on, optionally changing brightness and/or color."""
        if ATTR_RGB_COLOR in kwargs:
            self._base_rgb = tuple(kwargs[ATTR_RGB_COLOR])  # type: ignore[assignment]
        brightness = kwargs.get(ATTR_BRIGHTNESS) or self._attr_brightness or 128
        percent = max(5, round(brightness / 255 * 100))
        r, g, b = _scale_rgb(self._base_rgb, percent)
        if await self.coordinator.async_set_avalon_led(1, percent, r, g, b):
            # Show the change now; the coordinator's debounced refresh confirms it a few seconds later.
            self._attr_is_on = True
            self._attr_brightness = round(percent / 100 * 255)
            self._attr_rgb_color = (r, g, b)
            self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the LED off."""
        if await self.coordinator.async_set_avalon_led(0, 5, 0, 0, 0):
            self._attr_is_on = False
            self._attr_brightness = 0
            self.async_write_ha_state()
