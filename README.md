# ⚡ Home Miner Studio — Home Assistant Mining Hub & Lovelace Dashboard

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square&logo=home-assistant)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Home Miner Studio** is a unified, privacy-first Home Assistant integration and interactive Lovelace dashboard designed specifically for home cryptocurrency miners. It bridges local ASIC, micro-miner (Bitaxe, NerdMiner), and GPU rig telemetry directly into Home Assistant's native entities, energy dashboards, and solar automations.

---

## 🌟 Key Features

* ⛏️ **Multi-Hardware Support**:
  * **Micro-miners & Open Hardware**: Bitaxe (Ultra, Supra, Gamma), NerdMiner, Avalon Nano via local HTTP/REST API.
  * **ASIC Rigs**: Antminer, Whatsminer, Innosilicon, Braiins OS via standard CGMiner/BMM raw TCP socket API (`summary`, `stats`, `pools`).
  * **GPU / Rig OS**: HiveOS API, NiceHash API, and local rig endpoints (Rigel, GMiner, T-Rex, XMRig).
* ⚡ **Home Assistant Energy Dashboard Integration**:
  * Exposes native `device_class: power` (W) and `device_class: energy` (kWh) entities.
  * Directly links power draw to utility rates and solar production for dynamic cost calculations.
* ☀️ **Solar Curtailment & Smart Automation**:
  * Automatically throttle or pause miners when solar battery state-of-charge (SoC) drops or grid tariffs spike.
  * Thermal watchdog automations for smart plug kill switches when ambient/chassis temperatures rise.
* 📊 **Standalone Lovelace Cards**:
  * Complete fleet overview with aggregate hashrate, efficiency ($J/\text{TH}$ or $W/\text{MH}$), and net profit per day.
  * Per-miner telemetry tiles with chip temperature gauges, fan speed dials, and pool connection health.

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
│       ├── sensor.py            # Hashrate, power, temp, earnings sensors
│       ├── binary_sensor.py     # Health, overheat, pool alive status
│       ├── switch.py            # Mining pause / resume & power toggles
│       ├── button.py            # Reboot miner & restart process
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

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
