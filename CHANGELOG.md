# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Full Miner Lifecycle Management (Add, Edit, Delete)**:
  - Interactive Glass Modal in `home-miner-cards.js` enabling 1-click miner addition (`+ Add Miner`), editing (`⚙️ Edit`), and deletion (`🗑️ Delete` with confirmation modal).
  - Implemented Home Assistant Options Flow (`HomeMinerStudioOptionsFlow`) and `async_step_reconfigure` in `config_flow.py` for full native UI configuration.
  - Added REST API endpoint `/api/home_miner_studio/miners` supporting `GET` (list), `POST` (create), `PATCH` (edit), and `DELETE` (remove).
  - Registered Home Assistant services `home_miner_studio.add_miner`, `home_miner_studio.edit_miner`, and `home_miner_studio.delete_miner` with complete schema validation in `services.yaml`.
- **Helios Pool Support & Solo CKPool Telemetry**:
  - Direct integration with Helios Pool (`stats-btc.heliospool.com/users/<wallet>`) pulling live worker counts, `hashrate1m`/`hashrate5m` scale parsing (P/T/G/M), and best share difficulty (`pool_best_share`).
  - Added Helios Pool to `config_flow.py` and constants list.
- **Solar Curtailment & Power Automation Services**:
  - Registered Home Assistant service `home_miner_studio.apply_solar_curtailment` with `eco`, `standard`, `turbo`, and `pause` operational modes.
  - Native HA Energy Dashboard cumulative tracker (`total_energy_kwh`) with `device_class: energy` and `state_class: total_increasing`.
  - Tuning & control services: `home_miner_studio.set_axeos_tuning`, `home_miner_studio.set_axeos_profile`, `home_miner_studio.reboot_miner`, and `home_miner_studio.restart_mining`.
- **Market Economics & Profitability Engine**:
  - Live Bitcoin price sensor (`sensor.*_bitcoin_price`) with automated CoinGecko and Kraken fallback fetching and 300s cache.
  - Real-time gross daily revenue (`sensor.*_daily_gross_revenue`) and net profit (`sensor.*_daily_net_profit`) computed against grid electricity rate sensor.
  - Mining-Dutch (`mining-dutch.nl`) and Public-Pool (`public-pool.io`) REST API telemetry.
- **Hardware Fleet Expansion**:
  - Added Whatsminer, Antminer / Braiins OS, HiveOS API, and NerdMiner hardware definitions.
- **Scratch Script Git Exclusion**:
  - Moved local test scripts to external scratch storage and updated `.gitignore` to prevent scratch files from tracking.
- **Canaan Avalon Nano 3S Bracket Parser & Telemetry** ([#3](https://github.com/everyday3d/home-miner-studio/issues/3)):
  - Dedicated bracket notation parser (`MM ID`) for Canaan Avalon Nano 3S extracting real-time chip temperature (`TAvg`), PCB temperature (`TMax`), fan speed (`Fan1`), real-time hashrate (`GHSspd`), core frequency (`Freq`), and power output (`MPO` / 95W).
  - Power draw and efficiency calculation (J/TH, daily kWh, daily electricity cost) for Avalon ASICs.
  - Automatic fallback between `GHS` and `MHS` units in CGMiner `summary` responses.
- **Bitaxe AxeOS Telemetry Scaling** ([#3](https://github.com/everyday3d/home-miner-studio/issues/3)):
  - Automatic scaling of input voltage (mV to V) and current draw (mA to A).
  - Explicit fan speed resolution reading `fanrpm` RPM metric over percentage.
- **Integration Infrastructure & Compatibility** ([#3](https://github.com/everyday3d/home-miner-studio/issues/3)):
  - Added `services.yaml` defining `home_miner_studio.import_existing_miners`.
  - Migrated service registration schema to `vol.Schema({})` for domain-level execution.
  - Resolved Home Assistant 2025/2026 deprecation warnings for `device_registry.devices` iteration and entity lookup.
  - Enhanced `home-miner-cards.js` regex to seamlessly support both `hashrate_th_s` and `hashrate_ths` entity ID naming.

- **Auto-Import & Integration Discovery Engine** ([#2](https://github.com/everyday3d/home-miner-studio/issues/2)):
  - Automatic detection of miners across existing Home Assistant integrations (`bitaxe`, `ha_bitaxe`, `axeos`, `antminer`, `whatsminer`, `braiins`, `hiveos`, `nicehash`, `nerdminer`).
  - Device Registry and Entity Registry deep scanner extracting miner IPs from `configuration_url` or hardware connection tuples.
  - Discovered miner picker in `config_flow.py` for instant pre-population with zero manual typing.
  - Registered Home Assistant service `home_miner_studio.import_existing_miners`.
  - REST API endpoints `/api/home_miner_studio/discover` and `/api/home_miner_studio/import`.
  - 1-Click Auto-Import trigger button embedded inside `home-miner-cards.js`.
- **Bitaxe / AxeOS Tuning & Power Profiles** ([#1](https://github.com/everyday3d/home-miner-studio/issues/1)):
  - Target Frequency slider (`number.*_target_frequency`) and Target Core Voltage slider (`number.*_target_core_voltage`).
  - 1-click Power Profile selector (`select.*_power_profile`: Eco, Standard, Turbo, Custom) via HTTP PATCH `/api/system`.
  - Additional board sensors: Actual Core Voltage (`mV`), Input Voltage (`V`), Current Draw (`A`), and Voltage Regulator (VR) Temperature (`°C`).
- **CGMiner / BMM Multi-Chain Socket Telemetry** ([#1](https://github.com/everyday3d/home-miner-studio/issues/1)):
  - Raw TCP RPC parsing for `summary`, `stats`, and `pools`.
  - Multi-hashboard chain PCB and chip temperatures, fan RPM sensors, active chips (`chain_acn`), and hardware error tracking.
- **Mining Pool Integration** ([#1](https://github.com/everyday3d/home-miner-studio/issues/1)):
  - 2Miners, Braiins Pool, and ViaBTC integration in config flow.
  - Sensors for pool unpaid balance, 24-hour revenue, active worker counts, and reported hashrate.
- **Enhanced Lovelace Card** (`home-miner-cards.js`):
  - Interactive profile buttons for on-the-fly overclocking/underclocking.
  - Temperature color threshold highlights (<65°C green, 65-75°C amber, >75°C red).
  - 1-click reboot button calling Home Assistant button entity.
