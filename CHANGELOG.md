# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
