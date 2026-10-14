# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Multi-Coin Solo Block Lottery Radar & Dynamic Coin Selector** ([#16](https://github.com/everyday3d/home-miner-studio/issues/16)):
  - Added an interactive **Track Coin** selector dropdown (`#lottery-coin-select`) in the Radar header row, allowing users to dynamically switch the tracked cryptocurrency across active fleet coins (e.g. `WOJAK (Mining ⛏️)`, `BTC (Mining ⛏️)`) and popular mineable coins (`BCH`, `BELLS`, `DGB`, `LTC`, `DOGE`, `PEPE`, `KAS`).
  - Automatically defaults the radar to the coin currently being mined by the fleet (e.g. Wojak) rather than forcibly defaulting to Bitcoin.
  - Implemented coin-specific network difficulty parameters and block rewards across all supported algorithms (Wojak: 10,000 WJK @ 50M diff; Bitcoin: 3.125 BTC @ 109.80T diff; Bitcoin Cash: 3.125 BCH @ 650G diff; Bellscoin: 50 BEL @ 120M diff; Dogecoin: 10,000 DOGE @ 18M diff; Litecoin: 6.25 LTC @ 45M diff; etc.).
  - Dynamically recalculates solo win probability (e.g. ~1.8 days for Wojak vs ~10,800 years for Bitcoin), daily chance percentage, and block bounty jackpot value in USD and native cryptocurrency tokens.
  - Added dynamic milestone progress bar ticks tailored to the target coin's difficulty scale, with automatic detection when a miner's best share exceeds target difficulty (`🎉 100% EXCEEDS TARGET`).
  - Persisted user's coin tracking preference across browser reloads via `safeStorage`.
- **Solo Block Lottery Radar & Neon Mega-Share VFX Celebration** ([#14](https://github.com/everyday3d/home-miner-studio/issues/14)):
  - Built an interactive **Solo Block Lottery Radar Console** on the dashboard displaying real-time mathematical odds (expected days/years, daily probability percentage) based on active fleet TH/s against Bitcoin network difficulty (109.80 T).
  - Integrated real-time Block Bounty Jackpot valuation (3.125 BTC * Spot Price) highlighting potential solo block bounty reward.
  - Implemented high-tech SVG circular radar sweep with 360° rotating gradient beam, range rings, crosshairs, and pulsing target blips for highest difficulty hits.
  - Added logarithmic milestone progress bar mapping lifetime best share difficulty (1M -> 100T) to track proximity to solving a valid block.
  - Injected **Mega-Share Card Aura** and shimmery gold pill badges (`🏆 MEGA-SHARE 14.09 G`) on miner workstation cards exceeding 1 G difficulty.
  - Built pure in-browser celebration system with zero CDN dependencies: HTML5 canvas particle burst physics and Web Audio API synthesized 4-note victory fanfare chime (`🎉 Test Win Celebration`).

### Fixed
- **Desktop Lovelace Configuration Error & Lifecycle Guards** ([#15](https://github.com/everyday3d/home-miner-studio/issues/15)):
  - Added `safeStorage` helper (`get`, `set`, `remove`) with `try...catch` guards replacing all naked `localStorage` accesses, preventing desktop browsers with strict privacy partition policies or iframe sandboxes from throwing uncaught `SecurityError`.
  - Guarded `customElements.define('home-miner-fleet-card')` registration with `if (!customElements.get('home-miner-fleet-card'))`, eliminating uncaught `NotSupportedError` / `DOMException` upon re-evaluating or hot-reloading Lovelace cards.
  - Implemented `static getStubConfig()` and `getLayoutOptions()` on `HomeMinerFleetCard` for seamless compatibility with Home Assistant 2026.10 section/grid desktop layouts.
  - Wrapped `render()` execution in safe `try...catch` and verified `this._hass.states` readiness before evaluating entity dictionaries, preventing race conditions during fast desktop dashboard initialization.
  - Added null guards to `_attachModalListeners()` ensuring `#modal-root`, `#miner-modal`, and `#delete-modal` checks never throw when elements have not yet mounted.
  - Updated live Home Assistant Lovelace resource registry in memory via WebSocket (`lovelace/resources/update`) to bust browser cache across desktop sessions.

## [0.5.2] - 2026-10-13

### Added
- **Single-Miner Filtering & Full Dashboard Aero-Glass Unification**:
  - Added `miner_type` and `miner_host` configuration properties to `HomeMinerFleetCard` enabling dedicated single-rig workstation views on distinct Lovelace dashboard tabs.
  - Unified the entire Home Assistant `crypto-miners` dashboard (Fleet Studio, Bitaxe Studio, and Avalon Nano 3S tabs) in full aero-glass styling with dedicated radial ring gauges.
  - Injected interactive Market Intelligence Console into card DOM with live sub-penny price formatting, period stats, multi-coin toggle pills (`[🎭 WOJAK]`, `[₿ BTC]`), and timeframe selection (`24H`, `7D`, `30D`, `1Y`).
- **Interactive Auto-Import Discovery Modal & Hardware Illustrations** ([#11](https://github.com/everyday3d/home-miner-studio/issues/11)):
  - Replaced blind auto-import service invocation on "⚡ 1-Click Discovery" with an interactive Glassmorphic modal displaying all detected LAN hardware.
  - Rendered custom vector SVG hardware graphics for Bitaxe, Canaan Avalon Nano, Antminer / Whatsminer, and NerdMiner with real-time selection checkmarks.
  - Tagged miners with `already_configured` status to distinguish already managed nodes from newly discoverable rigs.
  - Added "Select All", "Deselect All", and selective multi-rig batch import triggering `home_miner_studio.add_miner` sequentially.
  - Maintained complete modal keypress containment (`e.stopPropagation()`) and backdrop dismissal.
- **Per-Rig Coin Price Ticker & Multi-Timeframe Valuation Chart** ([#11](https://github.com/everyday3d/home-miner-studio/issues/11)):
  - Built 15-minute background market polling engine (`market.py`) with CoinGecko and Kraken fallback fetching and global domain-level caching.
  - Multi-coin market support covering BTC, BCH, LTC, DOGE, KAS, BELLS, PEPE, and XMR with custom currency symbols.
  - Exposed 24-hour, 7-day, 30-day, and 1-year historical price series (`history_24h`, `history_7d`, `history_30d`, `history_1y`) and stats (`high`, `low`, `change_pct`) on `coin_price_usd` sensor entities.
  - Injected Per-Rig Active Coin Valuation Bar into individual workstation cards.
  - Designed interactive Luminous Market Intelligence Console with responsive cubic Bezier spline SVG chart, neon gradient fill, timeframe pills (`24H`, `7D`, `30D`, `1Y`), and hover scrubber with price/time tooltip.

### Fixed
- **Bitaxe Public-Pool Reversion Fix & WOJAK Market Integration** ([#13](https://github.com/everyday3d/home-miner-studio/issues/13)):
  - Removed hardcoded `public-pool.io:21496` fallbacks in `home-miner-cards.js` that forcibly defaulted Bitaxe cards to Public-Pool before stratum discovery completed.
  - Added full WOJAK (WJK) cryptocurrency support to `market.py` and CoinGecko telemetry with mask badge (`🎭`), 24h change, and multi-timeframe historical price charts.
  - Added sub-cent dynamic floating precision (`formatCoinPrice`) to gracefully format micro-penny tokens like Wojak ($0.00002513) without collapsing to $0.00.
  - Linked active coin selector `#modal-coin` to `edit_miner` service call and per-host client cache (`miner_coin_${host}`), keeping configured coins synced.
  - Mapped WOJAK / WJK to `wojakcoin.php` for Mining-Dutch pool API dashboard queries.
- **Active Pool Telemetry & High-Contrast Modal Dropdowns** ([#12](https://github.com/everyday3d/home-miner-studio/issues/12)):
  - Fixed white-on-white dropdown rendering across browser select popups by applying explicit dark high-contrast styling (`background-color: #0f172a !important; color: #f8fafc !important;`) and inline styles to all `<select>` and `<option>` elements.
  - Enabled active pool telemetry for Mining-Dutch and Braiins by accepting credentials from either `pool_token` or `pool_wallet` and querying authenticated endpoints (`pools/{coin_slug}.php?page=api&action=getdashboarddata&api_key=...`).
  - Added fallback synthesis in `_async_update_data()` ensuring that whenever a mining pool is selected in miner configuration, active worker count, reported hashrate, connection status, and pool provider name are immediately populated from hardware stratum telemetry.
  - Bound `_minerPools` and `_minerWallets` into client-side cache and `localStorage` to guarantee instant visual updates upon saving changes in the edit modal.
  - Highlighted active mining pools in the top Fleet Supported Pool Providers rack with dynamic green status orbs (`🟢 Mining-Dutch (1 Active)`).
  - Injected dedicated **Active Pool Integration Strip** into each miner's workstation card displaying active pool name, worker identity, live status, and current hashrate.
- **Modal DOM Isolation & Keyboard Event Containment** ([#10](https://github.com/everyday3d/home-miner-studio/issues/10)):
  - Completely isolated modal dialogs into a permanent `#modal-root` container separated from dynamic card content `#card-root`, preventing card re-renders from destroying open dialog markup or stealing input focus.
  - Intercepted and stopped event propagation (`e.stopPropagation()`) for `keydown`, `keyup`, and `keypress` on `#modal-root`, modal dialogs, and text/select inputs, preventing Home Assistant Lovelace from interpreting typed letters ('e', 'c', 'm', 'd', Escape) as global dashboard shortcuts.
  - Added event containment to `.modal-box` to prevent click and text-selection bubbling from triggering unintended backdrop dismissal.
  - Implemented clean Escape key dismissal handler across all modals.
  - Enhanced `handle_edit_miner_service` in `__init__.py` to update both `device_registry` and all associated sensor entities in `entity_registry`, with fallback resolution for external discovered miners.
  - Bound in-memory card cache (`this._minerNames`) and `localStorage` to guarantee instantaneous friendly name updates on save and persistence across reloads.
- **Complete Mining Pool Coverage & Telemetry Rack** ([#9](https://github.com/everyday3d/home-miner-studio/issues/9)):
  - Exhaustively documented and surfaced all 7 supported mining pool providers: **Helios Pool**, **Mining-Dutch**, **Public-Pool**, **2Miners**, **Braiins Pool**, **ViaBTC**, and **F2Pool**.
  - Added dedicated **Supported Mining Pool Providers** telemetry rack to `home-miner-cards.js` displaying active pool worker count, pool reported hashrate, total unpaid balances, and fleet best share.
  - Added **ViaBTC** and **F2Pool** options to `#modal-pool` dropdown and `services.yaml` for `add_miner` and `edit_miner`.
  - Added `extra_state_attributes` (`pool_provider`, `pool_wallet`, `pool_url`, `pool_user`) to `pool_status` sensor in `sensor.py`.
  - Implemented ViaBTC observer API and F2Pool account API handlers in `coordinator.py`.
  - Added Stratum pool telemetry strip (pool URL, worker, pool status, accepted/rejected shares, best share) to all miner cards including Bitaxe.
  - Automatically populated `modal-pool` and `modal-wallet` fields when opening the edit miner modal.

## [0.5.0] - 2026-10-13

### Fixed
- **Modal Render Freeze & Dynamic Miner Name Resolution** ([#4](https://github.com/everyday3d/home-miner-studio/issues/4)):
  - Added `_modalOpen` guard to prevent background Home Assistant sensor ticks from re-rendering the card and unexpectedly closing the Add/Edit dialog while typing.
  - Implemented `getMinerName()` dynamic resolver with browser `localStorage` caching and Home Assistant `device_registry` synchronization so renamed miners persist immediately and survive reloads.
  - Added backdrop click dismissal listeners to cleanly close modals and release the render lock.

### Added
- **Full Miner Lifecycle Management (Add, Edit, Delete)** ([#5](https://github.com/everyday3d/home-miner-studio/issues/5)):
  - Interactive Glass Modal in `home-miner-cards.js` enabling 1-click miner addition (`+ Add Miner`), editing (`⚙️ Edit`), and deletion (`🗑️ Delete` with confirmation modal).
  - Implemented Home Assistant Options Flow (`HomeMinerStudioOptionsFlow`) and `async_step_reconfigure` in `config_flow.py` for full native UI configuration.
  - Added REST API endpoint `/api/home_miner_studio/miners` supporting `GET` (list), `POST` (create), `PATCH` (edit), and `DELETE` (remove).
  - Registered Home Assistant services `home_miner_studio.add_miner`, `home_miner_studio.edit_miner`, and `home_miner_studio.delete_miner` with complete schema validation in `services.yaml`.
- **Helios Pool Support & Solo CKPool Telemetry** ([#6](https://github.com/everyday3d/home-miner-studio/issues/6)):
  - Direct integration with Helios Pool (`stats-btc.heliospool.com/users/<wallet>`) pulling live worker counts, `hashrate1m`/`hashrate5m` scale parsing (P/T/G/M), and best share difficulty (`pool_best_share`).
  - Added Helios Pool to `config_flow.py` and constants list.
- **Solar Curtailment & Power Automation Services** ([#6](https://github.com/everyday3d/home-miner-studio/issues/6)):
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
