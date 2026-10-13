# ⚡ Home Miner Studio — Home Assistant Mining Hub & Lovelace Dashboard

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square&logo=home-assistant)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Home Miner Studio** is a unified, privacy-first Home Assistant custom integration and interactive Lovelace dashboard designed specifically for home cryptocurrency miners. It bridges local ASIC, micro-miner (Bitaxe, NerdMiner), and GPU rig telemetry directly into Home Assistant's native entities, energy dashboards, and solar automations.

---

## 🌟 Key Features

* 🔍 **Zero-Config Auto-Import**:
  * Automatically scans your existing Home Assistant integrations (`bitaxe`, `ha_bitaxe`, `axeos`, `antminer`, `whatsminer`, `braiins`, `hiveos`, `nicehash`, `nerdminer`).
  * Inspects Device & Entity Registries to auto-extract miner host IPs and models.
  * 1-click import directly from the Lovelace card or dropdown selection in the config flow.
* ⛏️ **Multi-Hardware Support**:
  * **Micro-miners & Open Hardware**: Bitaxe (Ultra, Supra, Gamma), NerdMiner, Avalon Nano via local HTTP/REST API.
  * **Bitaxe / AxeOS Tuning**: Interactive sliders for Target Frequency (`MHz`) and Target Core Voltage (`mV`), plus 1-click Power Profiles (`Eco`, `Standard`, `Turbo`) to underclock/overclock on the fly.
  * **ASIC Rigs**: Antminer, Whatsminer, Innosilicon, Braiins OS via standard CGMiner/BMM raw TCP socket API (`summary`, `stats`, `pools`) with multi-hashboard chain temperature, fan speed, and chip status parsing.
  * **GPU / Rig OS**: HiveOS, NiceHash, and local rig endpoints (Rigel, GMiner, T-Rex, XMRig).
* 🏊 **Mining Pool Telemetry**:
  * Built-in support for **2Miners**, **Braiins Pool**, and **ViaBTC**.
  * Tracks unpaid wallet balances, 24-hour estimated revenue, active workers, and pool-reported hashrate.
* ⚡ **Home Assistant Energy Dashboard Integration**:
  * Exposes native `device_class: power` (W) and `device_class: energy` (kWh) entities.
  * Directly links power draw to utility rates and solar production for dynamic cost calculations.
* ☀️ **Solar Curtailment & Smart Automation**:
  * Automatically throttle or pause miners when solar battery state-of-charge (SoC) drops or grid tariffs spike.
  * Thermal watchdog automations for smart plug kill switches when ambient/chassis temperatures rise.
* 📊 **Standalone Lovelace Card (`home-miner-fleet-card`)**:
  * Fleet overview with aggregate hashrate, efficiency ($J/\text{TH}$), and net power cost per day.
  * Per-miner telemetry tiles with chip temperature health thresholds (<65°C green, 65–75°C amber, >75°C red).
  * 1-click power profile buttons, auto-import action, and quick reboot triggers.

---

## 📦 Directory Structure

```text
home-miner-studio/
├── custom_components/
│   └── home_miner_studio/
│       ├── __init__.py          # Integration setup & frontend card registration
│       ├── manifest.json        # HA manifest
│       ├── config_flow.py       # Discovery & UI configuration flow
│       ├── const.py             # Constants & API schemas
│       ├── coordinator.py       # DataUpdateCoordinator for miners & pools
│       ├── discovery.py         # Auto-import scanner for existing integrations
│       ├── sensor.py            # Hashrate, power, temp, earnings, pool sensors
│       ├── binary_sensor.py     # Health, overheat, pool alive status
│       ├── switch.py            # Mining pause / resume & power toggles
│       ├── button.py            # Reboot miner & restart process
│       ├── number.py            # Frequency & voltage tuning sliders
│       ├── select.py            # Power profile presets (Eco / Standard / Turbo)
│       ├── home-miner-cards.js  # Custom Lovelace card frontend
│       └── translations/
│           └── en.json          # English translations
├── hacs.json                    # HACS repository configuration
├── CHANGELOG.md                 # Release history
├── LICENSE                      # MIT license
└── README.md                    # Documentation
```

---

## 🚀 Installation & Setup

### Via HACS (Recommended)
1. In Home Assistant, open **HACS** > **Integrations**.
2. Click the three dots in the top right > **Custom repositories**.
3. Add `https://github.com/everyday3d/home-miner-studio` with category **Integration**.
4. Search for **Home Miner Studio** and click **Download**.
5. Restart Home Assistant.
6. Go to **Settings** > **Devices & Services** > **Add Integration**, search for **Home Miner Studio**, and follow the on-screen setup.

### Lovelace Dashboard Card

Add the custom card to any Lovelace dashboard view:

```yaml
type: custom:home-miner-fleet-card
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
