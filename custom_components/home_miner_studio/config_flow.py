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

_LOGGER = logging.getLogger(__name__)


class HomeMinerStudioConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Home Miner Studio."""

    VERSION = 1

    def __init__(self) -> None:
        """Initialize the config flow."""
        self._data: dict[str, Any] = {}

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> config_entries.FlowResult:
        """Handle the initial hardware connection step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            self._data.update(user_input)
            return await self.async_step_optional_config()

        data_schema = vol.Schema({
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
            vol.Required(CONF_HOST): str,
            vol.Required(CONF_PORT, default=DEFAULT_PORT_BITAXE): int,
            vol.Optional(CONF_PASSWORD): str,
        })

        return self.async_show_form(
            step_id="user",
            data_schema=data_schema,
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
            vol.Optional(CONF_COIN, default="BTC"): str,
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
