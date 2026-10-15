# ⚡ Home Miner Studio `v0.7.2`

[![Release v0.7.2](https://img.shields.io/badge/Release-v0.7.2%20(Official)-00e676?style=flat-square&logo=github)](https://github.com/everyday3d/home-miner-studio/releases/latest)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square&logo=home-assistant)](https://www.home-assistant.io/)

> **👋 Hello miners!** This is a project built from the ground up for home crypto miners who want all their desktop solo miners, ASICs, and micro-rigs on a single, clean Home Assistant screen.
>
> Glancing at live hashrates, chip thermals, power draws, electricity costs, and solo block difficulty proximity without bouncing between AxeOS web interfaces, pool dashboards, or third-party apps has been an absolute game-changer. It automatically discovers LAN miners, supports 1-click stratum switching across multi-coin pools (Mining-Dutch, HeliosPool, Public Pool), and protects against grid price spikes with solar curtailment.
>
> Please report any suggestions or feedback on the **[Issue Tracker](https://github.com/everyday3d/home-miner-studio/issues)** or join our **[Community Discussions](https://github.com/everyday3d/home-miner-studio/discussions/7)**!

A unified, privacy-first Home Assistant custom integration and interactive Lovelace dashboard designed for cryptocurrency mining hardware: **Bitaxe** (`Max`, `Ultra`, `Supra`, `Gamma`), **NerdQaxe**, **Avalon Nano 3S**, **Antminer**, **Whatsminer**, and **NerdMiner**.

---

## ✨ Key Highlights

- **🔌 100% Standalone Local Hub (`Zero External Dependencies`)**: Direct HTTP REST and socket polling over local LAN—zero cloud relays, zero account lock-in, and zero external tracking.
- **⚡ Real-Time Multi-Rig Telemetry**: Sub-second tracking of real-time and 24h average hashrates (`GH/s`, `TH/s`), electrical wattage (`W`), chip and VR thermals (`°C`), fan RPM, and core voltages.
- **🌊 Animated Stratum Particle Pipeline**: Real-time visual block assembly canvas with live difficulty zero scanners, dynamic coin profiles, and live stratum ping monitoring.
- **🎯 Solo Block Lottery Radar & Acoustic Feedback**: 360° sweeping phosphor radar visualizer tracking distance to network block targets with optional Geiger counter audio clicks and golden nonce chimes.
- **👑 Multi-Coin Live Yield Matrix & 1-Click Stratum Switcher**: Live profitability comparisons across SHA-256 coins (**BTC**, **BCH**, **KAS**, **WOJAK**, **BELLS**, **DGB**, **PEPE**) and instant stratum pool switching without manually logging into miner web portals.
- **☀️ Solar Curtailment & Smart Energy Automation**: Automatically throttle or pause miners when solar battery storage drops or grid electricity tariffs spike.
- **🏆 RPG Fleet Progression & Trophies**: Unlock mining achievement trophies, earn XP based on cumulative hashes, level up your fleet (1–500), and unlock prestige color themes.
- **🛡️ Zero Jump-Back Scroll Architecture**: Persistent horizontal scroll preservation across tabs, matrix tables, and filter strips with active gesture freezing on desktop and mobile.

---

## 🛠️ Supported Hardware Matrix

| Hardware Platform | Protocol / Port | Real-Time Telemetry | Interactive Tuning | 1-Click Stratum Switching |
| :--- | :---: | :---: | :---: | :---: |
| **Bitaxe** (Max / Ultra / Supra / Gamma) | HTTP REST (`:80`) | Hashrate, Watts, Thermals, Best Share | Frequency (MHz) & Core Voltage (mV) | ✅ Native |
| **NerdQaxe** (Quad-ASIC Desktop) | HTTP REST (`:80`) | 4-Die Aggregate TH/s, Watts, Thermals | Frequency (MHz) & Core Voltage (mV) | ✅ Native |
| **Avalon Nano 3S** | CGMiner Socket (`:4028`) | Hashrate, Watts, Fan RPM, VR Temp | Low / Med / High Power Modes | ✅ Native |
| **Whatsminer** (M20/M30/M50) | CGMiner API (`:4028`) | Hashrate, Board Thermals, Power | Normal / High Power Modes | ✅ Native |
| **Antminer** (S9/S19/S21) | CGMiner API (`:4028`) | Hashrate, Hashboards, Fan RPM | Restart / Sleep Controls | ✅ Native |
| **NerdMiner v2** | HTTP REST (`:80`) | Hashrate, Valid Shares, Best Diff | Reboot / Reset | Read-Only |

---

## 🚀 Quick Start Lovelace YAML

Add the custom card to any Lovelace dashboard view:

```yaml
type: custom:home-miner-fleet-card
title: Home Miner Studio
```

For bug reports, hardware verification requests, and feature ideas, visit the **[Issue Tracker](https://github.com/everyday3d/home-miner-studio/issues)**.
