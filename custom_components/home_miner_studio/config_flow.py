"""Config flow for Home Miner Studio integration."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.helpers import selector

from .const import (
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
    DEFAULT_PORT_CGMINER,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    MINER_TYPES,
    POOL_PROVIDERS,
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
)
from .discovery import async_discover_existing_miners

_LOGGER = logging.getLogger(__name__)

CONF_DISCOVERED_DEVICE = "discovered_device"


class HomeMinerStudioConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Home Miner Studio."""

    VERSION = 1

    def __init__(self) -> None:
        """Initialize the config flow."""
        self._data: dict[str, Any] = {}
        self._discovered_miners: list[dict[str, Any]] = []

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> config_entries.FlowResult:
        """Handle the initial hardware connection step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            disc_choice = user_input.get(CONF_DISCOVERED_DEVICE)
            if disc_choice and disc_choice != "manual":
                # Find the selected discovered miner
                selected = next((m for m in self._discovered_miners if m[CONF_HOST] == disc_choice), None)
                if selected:
                    self._data.update({
                        CONF_NAME: selected[CONF_NAME],
                        CONF_MINER_TYPE: selected[CONF_MINER_TYPE],
                        CONF_HOST: selected[CONF_HOST],
                        CONF_PORT: selected[CONF_PORT],
                        CONF_COIN: selected.get(CONF_COIN, "BTC"),
                    })
                    return await self.async_step_optional_config()

            if not user_input.get(CONF_HOST):
                errors[CONF_HOST] = "cannot_connect"
            else:
                self._data.update(user_input)
                self._data.pop(CONF_DISCOVERED_DEVICE, None)
                return await self.async_step_optional_config()

        # Discover any existing miners in other integrations or device registry
        self._discovered_miners = await async_discover_existing_miners(self.hass)

        fields: dict[Any, Any] = {}
        if self._discovered_miners:
            options = [{"value": "manual", "label": "⚙️ Manual Configuration"}]
            for m in self._discovered_miners:
                source = m.get("source_integration", "integration")
                options.append({
                    "value": m[CONF_HOST],
                    "label": f"⚡ [Import] {m[CONF_NAME]} ({m[CONF_MINER_TYPE].title()} @ {m[CONF_HOST]}:{m[CONF_PORT]}) from {source}",
                })

            fields[vol.Optional(CONF_DISCOVERED_DEVICE, default=self._discovered_miners[0][CONF_HOST])] = (
                selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=options,
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                )
            )

        fields.update({
            vol.Required(CONF_NAME, default="My Miner"): str,
            vol.Required(CONF_MINER_TYPE, default=TYPE_BITAXE): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=[
                        {"value": m, "label": m.replace("_", " ").title()}
                        for m in MINER_TYPES
                    ],
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional(CONF_HOST): str,
            vol.Optional(CONF_PORT, default=DEFAULT_PORT_BITAXE): int,
            vol.Optional(CONF_PASSWORD): str,
        })

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(fields),
            errors=errors,
        )

    async def async_step_optional_config(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Handle the second step for pools and electricity tracking."""
        if user_input is not None:
            self._data.update(user_input)
            unique_id = f"{self._data[CONF_MINER_TYPE]}_{self._data[CONF_HOST]}_{self._data[CONF_PORT]}"
            await self.async_set_unique_id(unique_id)
            self._abort_if_unique_id_configured()

            return self.async_create_entry(
                title=self._data.get(CONF_NAME, "Home Miner"),
                data=self._data,
            )

        data_schema = vol.Schema({
            vol.Optional(CONF_COIN, default=self._data.get(CONF_COIN, "BTC")): str,
            vol.Optional(CONF_POOL_PROVIDER, default="none"): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=[
                        {"value": p, "label": "None" if p == "none" else p.title()}
                        for p in POOL_PROVIDERS
                    ],
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional(CONF_POOL_WALLET): str,
            vol.Optional(CONF_POOL_TOKEN): str,
            vol.Optional(CONF_ELECTRICITY_RATE_SENSOR): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="sensor")
            ),
            vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): selector.NumberSelector(
                selector.NumberSelectorConfig(min=10, max=300, step=5, unit_of_measurement="s")
            ),
        })

        return self.async_show_form(
            step_id="optional_config",
            data_schema=data_schema,
        )

    async def async_step_import(self, import_data: dict[str, Any]) -> config_entries.FlowResult:
        """Handle automatic programmatic import from existing integrations."""
        miner_type = import_data.get(CONF_MINER_TYPE, TYPE_BITAXE)
        host = import_data[CONF_HOST]
        port = import_data.get(CONF_PORT, DEFAULT_PORT_BITAXE)
        unique_id = f"{miner_type}_{host}_{port}"

        await self.async_set_unique_id(unique_id)
        self._abort_if_unique_id_configured()

        return self.async_create_entry(
            title=import_data.get(CONF_NAME, f"{miner_type.title()} ({host})"),
            data=import_data,
        )
