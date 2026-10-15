# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Dropdown & Modal Premature Close Resolution** ([#34](https://github.com/everyday3d/home-miner-studio/issues/34)):
  - Fixed an issue where clicking on dropdown selectors (`#pipeline-coin-select`, `#lottery-coin-select`, `#stratum-coin-preset`, `#stratum-target-miner`, `#modal-type`, and `#modal-pool`) caused the menu or dialog to abruptly close when attempting to select an option.
  - Implemented `_isUserInputActive()` guard in `set hass(hass)` and `render()` to freeze background DOM re-rendering whenever any input or select element has focus or active interaction (`_selectActive` / `shadowRoot.activeElement`).
  - Hardened modal backdrop dismissal with two-phase click validation (`_bindModalBackdrop`), ensuring dialogs only dismiss if mouse/touch down and up both occur directly on the backdrop, preventing select popup menu dismissals outside `.modal-box` from triggering `_closeModals()`.
  - Added full pointer/mouse event suppression (`click`, `mousedown`, `pointerdown`, `touchstart`) on `.pipeline-coin-wrap`, `.lottery-coin-wrap`, and all modal selects (`_bindSelectSafety`).
  - Updated collapsible header toggle handlers with `e.composedPath()` guards preventing accidental collapse when interacting with embedded coin selectors.

### Added
- **Repository Feature Spotlight Showcase & Animated Stratum Visualizer** ([#35](https://github.com/everyday3d/home-miner-studio/issues/35)):
  - Authored a comprehensive visual feature showcase (`## 🌟 Feature Spotlight & Visual Showcase`) in `README.md` highlighting all core platform capabilities with crisp, high-DPI screenshots and concise technical blurbs.
  - Engineered an animated GIF demonstration (`assets/stratum_pipeline_animated.gif`) for the Stratum Visual Particle Pipeline showcasing live 4-stage block assembly, nonce particle conduits, golden nonce detection, and multi-coin switching across Mining-Dutch & HeliosPool SHA-256 ecosystems.
  - Rendered dedicated high-resolution visual spotlight assets across all interactive modules:
    - **Live Stratum Particle Pipeline**: `assets/stratum_pipeline_animated.gif`
    - **Solo Block Lottery Radar & Acoustic Telemetry**: `assets/solo_lottery_radar.png`
    - **Fleet Holographic Workstations & Machine Art**: `assets/fleet_workstations.png`
    - **Multi-Coin Live Yield Matrix**: `assets/yield_market_matrix.png`
    - **Decentralized Chronicles & Historical Trophy Room**: `assets/chronicles_trophy_room.png`
    - **1-Click Stratum Pool Switcher Modal**: `assets/stratum_switcher_modal.png`
    - **Automated Subnet Rig Discovery Console**: `assets/network_discovery_console.png`
    - **Mobile Companion HUD & Responsive Glass Layout**: `assets/mobile_companion_hud.png`
- **Mining-Dutch & HeliosPool SHA-256 Ecosystem Expansion** ([#33](https://github.com/everyday3d/home-miner-studio/issues/33)):
  - Expanded the Stratum Visual Pipeline Architecture with comprehensive SHA-256 coin profiles grouped into distinct pool categories (`Mining-Dutch`, `HeliosPool Solo`, and `Auxiliary & Community Networks`):
    - **Mining-Dutch Ecosystem**: Bitcoin (BTC), Wojakcoin (WOJAK), Bitcoin Cash (BCH), Bitcoin SV (BSV), Fractal Bitcoin (FB), DigiByte (DGB), Peercoin (PPC), eCash (XEC), Namecoin (NMC), Emercoin (EMC), Terracoin (TRC), Demcat/Chi (CHI), FixedTrade (FIX), Ring (XRG), SpaceCoin (SPACE), FreeCash (FCH), Bitcoin2 (BC2), and DeviantCoin (DVT) with corresponding stratum ports (e.g. 3465, 9995, 3703, 3433, 3335, 3471, 3408, 3445, 3407).
    - **HeliosPool Solo SHA-256 Ecosystem**: Bitcoin (BTC), Bitcoin Cash (BCH), DigiByte (DGB), Cheetahcoin (CHTA), Wojakcoin (WJK), FixedCoin (FIX), and eCash (XEC) configured for `pool.heliosmining.io:3333`.
    - **Auxiliary Networks**: Bellscoin (BELLS), Pepecoin (PEPE), Public-Pool.io (BTC), and Kaspa (KAS).
  - Categorized coin selectors (`#pipeline-coin-select` and `#stratum-coin-preset`) with stylized `<optgroup>` headers for clear visual navigation.
  - Enhanced miner detection and profile resolution supporting symbol and alias mappings (`WJK` <-> `WOJAK`, pool-specific keys like `BTC_HELIOS`).
- **Configurable Multi-Coin Stratum Visual Pipeline Architecture** ([#32](https://github.com/everyday3d/home-miner-studio/issues/32)):
  - Added an interactive Coin Selector dropdown (`#pipeline-coin-select`) in the Stratum Particle Pipeline header to dynamically toggle visual telemetry and block assembly across major mineable networks: Bitcoin (BTC), WOJAK (WJK), Bitcoin Cash (BCH), Fractal Bitcoin (FB), DigiByte (DGB), Bellscoin (BELLS), Pepecoin (PEPE), and Kaspa (KAS).
  - Integrated dynamic telemetry adaptation across all 4 pipeline stages:
    - Stage 1 (Stratum Ingress): Displays network algorithm (`SHA-256`, `Scrypt`, `kHeavyHash`), ingress stratum port, and active pool host (resolving active miner pool endpoints or preset defaults).
    - Stage 2 (Nonce Stream): Maintains live particle conduit animation with hashrate and ASIC blade counters.
    - Stage 3 (Diff Filter): Dynamically formats difficulty gate target thresholds (e.g., `85.0M`, `14.1G`, `500.0G`, `12.5T`, `250.0M`, `1.20P`).
    - Stage 4 (Block Assembly): Displays coin-specific block subsidy reward (`3.125 BTC`, `10,000 WJK`, `3.125 BCH`, `25 FB`, `420 DGB`, `500 BELLS`, `10,000 PEPE`, `22.5 KAS`), target zero requirements (`data-zeros`), dynamic block height, and adaptive golden nonce ticker zero-prefix matching the network target difficulty.
  - Added persistent storage in `safeStorage` (`miner_pipeline_coin`) and support for card YAML configuration (`pipeline_coin`) with automatic fallback to active fleet mining coin.
  - Hardened header interaction preventing accidental collapse or expansion when selecting coins from the dropdown.

## [0.6.1] - 2026-10-14

### Added
- **Hardware Architecture Spotlight Showcase & Documentation Matrix** ([#31](https://github.com/everyday3d/home-miner-studio/issues/31)):
  - Built an extensive visual Hardware Architecture Spotlight showcase graphic (`assets/hardware_spotlight_showcase.png`) and comprehensive documentation matrix in `README.md` spotlighting 7 verified hardware architectures.
  - Detailed hardware class ratings, hashrate capabilities, power envelopes, electrical efficiency ($J/\text{TH}$), acoustic noise ratings, firmware protocols, and Home Assistant 1-click preset configurations.
- **Extended Machine Art Custom Vector Iconset & Model Support** ([#31](https://github.com/everyday3d/home-miner-studio/issues/31)):
  - Extended custom vector icon library on `window.customIcons['miner']` with official machine artwork:
    - `miner:nerdminer` / `miner:nerdaxe`: LilyGO T-Display S3 ESP32 board with cypherpunk glasses.
    - `miner:futurebit` / `miner:apollo`: Apollo multi-blade turbine intake.
    - `miner:luckyminer`: Lucky Miner four-leaf clover emblem.
    - `miner:whatsminer`: MicroBT dual-barrel aerodynamic server chassis.
    - `miner:antminer`: Bitmain APW12 server rack chassis.
  - Added native constants `TYPE_FUTUREBIT` and `TYPE_LUCKYMINER` in `const.py` and updated config flow/card modals with 1-click dropdown options.
- **Authentic Machine Art Vector Icons (`miner:` Custom Iconset)** ([#30](https://github.com/everyday3d/home-miner-studio/issues/30)):
  - Designed and registered a custom SVG iconset (`miner:`) on `window.customIcons` and `window.customIconsets` providing authentic hardware art:
    - `miner:bitaxe`: Official Skot9000 Bitaxe pixel battleaxe logo.
    - `miner:avalon`: Official Canaan Creative Avalon stylized 'A' dragon emblem.
    - `miner:fleet`: Crossed mining pickaxes & ASIC fleet emblem.
    - `miner:whatsminer`: MicroBT Whatsminer dual-fan server chassis icon.
    - `miner:antminer`: Bitmain Antminer hashblade icon.
  - Updated Home Assistant Lovelace dashboard configuration for `crypto-miners` to use `miner:fleet`, `miner:bitaxe`, and `miner:avalon` in place of generic MDI icons (`mdi:pickaxe`, `mdi:chip`, `mdi:server`).
  - Updated hardware workstation pod headers to display luminous machine vector SVG logos with neon drop-shadow glow instead of emojis (`⚡`, `🖥️`).
- **Comprehensive Mobile UX & Small-Screen Responsiveness Optimization Pass** ([#29](https://github.com/everyday3d/home-miner-studio/issues/29)):
  - Optimized dashboard layout across narrow viewports (360px – 640px) ensuring fluid responsive collapse, touch-friendly UI, and zero horizontal page scrolling on smartphones and mobile companion apps.
  - Implemented `@media (max-width: 640px)` stylesheet adaptations in `home-miner-cards.js`:
    - Compact card padding (`12px 8px` on `:host`, `14px 12px` on `.glass-card`) maximizing usable horizontal space.
    - Stacked `.top-bar` header with an adaptive 2x2 grid for `.top-actions` featuring 36px touch-target action buttons.
    - Single-column stacked `.hero-orbit-grid` with centered 105px SVG radial ring gauges.
    - Responsive `.pipeline-card` with hidden non-critical summary pills and scaled Stratum stage tiles.
    - Sticky-friendly `.workspace-tab-bar` with momentum flick-scrolling (`-webkit-overflow-scrolling: touch`) and icon-first compact tab pills.
    - Full-width single-column `.workstations-grid` with 2-column action buttons (`Edit`, `Delete`, `Restart`, `Reboot`), 2-column telemetry tiles, and 2-column tuning presets.
    - Scaled 96px Level Orb and wrapping telemetry chips in `.rpg-hero-banner`.
    - Single-column collapse for `.trophy-grid`, `.chronicles-grid`, and `.theme-cards-grid` with swipeable horizontal filter pill bars.
    - Momentum touch-scroll wrapper (`.yield-table-wrap`) for the multi-coin yield matrix with compact cell padding.
    - Viewport-clamped `.modal-box` (`max-height: 90vh; overflow-y: auto;`) preventing dialog offscreen clipping on discovery and chronicle modals.
- **Mining History & Decentralized Chronicles (Level 10-500 Unlocks)** ([#27](https://github.com/everyday3d/home-miner-studio/issues/27)):
  - Built an educational lore system featuring 50 unlockable chapters unlocked every 10 levels (Level 10, 20, 30 ... 500) within the `Trophies` workspace.
  - Authored concise, captivating historical narratives spanning:
    - *Origins & Cypherpunk Pioneers*: 1993 Proof of Work Genesis (Dwork & Naor), 1997 Hashcash (Adam Back), 1998 B-Money & Bit Gold (Wei Dai & Nick Szabo), 2004 RPOW (Hal Finney).
    - *Genesis & First Breakthroughs*: 2008 Satoshi Whitepaper, 2009 Genesis Block & Block #1, 2010 Pizza Day & GPU mining, 2011 Slush Pool & Stratum protocol.
    - *Hardware & Semiconductor Epochs*: 2012 FPGA epoch & First Halving, 2013 Canaan Avalon 1 (first ASIC), 2014 Bitmain 28nm race, 2016 Antminer S9, 2020 MicroBT Whatsminer, 2023 Bitaxe open-source hardware, 2024 Canaan Avalon Nano 3/3s home heaters.
    - *Demystified Core Concepts*: Plain-English explanations demystifying nonces, target difficulty & 2,016-block retargets, why shares aren't blocks, double-SHA-256d mechanics, Merkle roots, ExtraNonce dimensions, solo mining odds, stale vs rejected shares, 51% attack economic game theory, PPLNS vs PPS+ payouts, silicon lottery binning, and electromigration prevention.
    - *Thermodynamics, Energy & Future*: Home space-heating thermal scavenging, demand-response grid balancing, oilfield flare gas harvesting, geothermal volcano mining, rooftop solar surplus dynamic throttling, and the 2140 zero-subsidy fee market transition.
  - Implemented interactive Chronicle Reader modal (`#chronicle-modal`) with clean typography, unlock level badge, era tag, full narrative, and dedicated "Key Demystification for Home Miners" summary takeaway callout.
  - Added filter pills (`All Chapters`, `🔓 Unlocked`, `🔒 Locked`) with live unlock counters.

### Changed
- **RPG XP Gain Rebalancing & Sustainable Progression Curve** ([#27](https://github.com/everyday3d/home-miner-studio/issues/27)):
  - Significantly reduced XP gain velocity across all mining activities to establish a realistic, long-term progression path up to Level 500.
  - Rebalanced share reward from 15 XP per share down to 1 XP per verified accepted share (15x reduction).
  - Replaced linear difficulty divisor (`diff / 50000`) with a log-scaled bonus (`Math.floor(Math.log10(diff) * 5)`), rewarding rare high-difficulty share submissions (up to 50 XP) without allowing a single lucky lottery share to skip progression.
  - Rebalanced level progression formula to `Math.floor(75 * Math.pow(lvl - 1, 1.85))` ([#28](https://github.com/everyday3d/home-miner-studio/issues/28)), scaling progression so Level 10 unlock requires ~4,370 shares, Level 25 requires ~26,800 shares, Level 100 Theme Engine requires ~368,900 shares, and Level 500 Apex Cap requires ~7,354,400 shares.
  - Updated Hero Banner telemetry chips and individual workstation cards to reflect rebalanced XP formulas.
- **Collapsible Live Stratum Particle Pipeline & Visual Block Assembly Module** ([#26](https://github.com/everyday3d/home-miner-studio/issues/26)):
  - Built real-time 4-stage visual pipeline (`.pipeline-card`) rendering the continuous flow of cryptographic operations:
    1. **Stratum Ingress**: Live pool host/port socket connection indicator, live Job ID tracker, and pulsing blue conduit transmission bar.
    2. **Nonce Stream**: Multi-colored HTML5 Canvas particle stream (24 particles, 60fps) visualizing real-time fleet hashing throughput and nonces computed per second.
    3. **Diff Filter**: Real-time Merkle root display, network diff gate target validator, and cumulative accepted fleet shares tracker.
    4. **Block Assembly**: Candidate block height tracker, 125ms rolling golden nonce scanner (`0x0000000000...`), and target block subsidy reward.
  - Designed compact vertical footprint (<38px collapsed, ~140px expanded) positioned between the Hero Gauges and the Workspace Tab Bar.
  - Implemented 1-click collapse/expand accordion toggle with persistent state saved in `safeStorage` (`miner_pipeline_collapsed`).
  - Added particle animation pause/resume button with persistent state (`miner_pipeline_anim_paused`) allowing users to pause canvas rendering on low-power dashboards and mobile devices.
  - Included lifecycle safety in `disconnectedCallback()` to ensure zero memory leaks or stray animation loops when card unmounts.
- **Automated Lovelace Resource Cache-Busting Pipeline** ([#25](https://github.com/everyday3d/home-miner-studio/issues/25)):
  - Built automated deployment pipeline (`scripts/deploy_ha.mjs` and `scripts/deploy_ha.ps1`) that copies card bundles to both `custom_components/` and `www/` network shares, and updates Home Assistant's in-memory Lovelace resource registry over WebSocket (`lovelace/resources/update`) with a live timestamp parameter (`?v=<timestamp>`).
  - Implemented Python-side automatic Lovelace resource synchronization in `custom_components/home_miner_studio/__init__.py`: on integration startup, automatically inspects `lovelace.resources` and updates the registered resource URL with manifest version + file mtime query string (`?v=<version>.<mtime>`).
  - Added `home_miner_studio.bust_card_cache` Home Assistant service allowing users and dashboard scripts to trigger an instant resource cache-bust on demand.
  - Integrated in-browser startup build banner (`console.info`) and a clickable `v0.5.3-rpg 🔄` hard cache purge link on the card's top header (plus `Shift+Click` on the Refresh Fleet button) which purges `window.caches`, calls the cache bust service, and performs a clean hard page reload.
  - Updated workspace rules mandating execution of the automated deploy pipeline on every local push.
- **Prestige Theme Engine & 5 Milestone Aesthetic Glass Themes (Lvl 100-500 Unlocks)** ([#23](https://github.com/everyday3d/home-miner-studio/issues/23)):
  - Built the **Prestige Theme Engine** which automatically unlocks when the fleet reaches **Level 100 (*Volt Tamer*)**, featuring a teaser progress bar before Level 100 and a 6-theme luxury selection console once unlocked.
  - Designed 5 elegant, shiny, and enticing milestone aesthetic glass finishes unlocked at each 100th level:
    - **Default**: *💎 Cyber Obsidian* (Classic Aero-Glass deep obsidian navy with cyan `#38bdf8` and gold neon accents).
    - **Level 100**: *☀️ Solar Flare Gold* (Luminous golden champagne & incandescent solar amber glass with golden specular highlights).
    - **Level 200**: *🔥 Thermal Magma* (Fiery molten crimson & radiant ruby magma glass with volcanic glow aura).
    - **Level 300**: *❇️ Emerald Matrix* (Luminous cyber emerald & jade crystalline glass with radioactive green neon highlights).
    - **Level 400**: *🔮 Amethyst Nebula* (Royal violet & ultraviolet cosmic starlight glass with celestial lilac glow).
    - **Level 500 (Apex MAX)**: *👑 Celestial Diamond* (Prismatic iridescent platinum diamond glass with chromatic rainbow refraction).
  - Integrated dynamic CSS custom properties (`--theme-accent`, `--theme-glow`, `--theme-pill-gradient`, `--theme-hero-bg`) that transform the entire dashboard's lighting, gauge rings, active tabs, and glass card borders upon theme selection.
  - Persisted user theme preference across browser sessions using `safeStorage` (`miner_active_theme`).
- **RPG Fleet Gamification System (Lvl 500 Cap) & Expanded Trophy Cabinet** ([#22](https://github.com/everyday3d/home-miner-studio/issues/22)):
  - Built an Aero-Glass RPG Progression System with mathematical leveling formula ($XP = 15 \times \text{Shares} + \lfloor\text{Diff}/50,000\rfloor$) scaling from Level 1 up to **Level 500 Cap**.
  - Created 21 distinct milestone rank titles awarded at every 25th level: Level 1 (*Novice Breadboarder*), Level 25 (*Silicon Apprentice*), Level 50 (*Stratum Journeyman*), Level 75 (*Frequency Enthusiast*), Level 100 (*Volt Tamer*), Level 125 (*Heatsink Warden*), Level 150 (*Hashrate Vanguard*), Level 175 (*Difficulty Crusher*), Level 200 (*Thermal Dominator*), Level 225 (*Silicon Alchemist*), Level 250 (*Megahash Overlord*), Level 275 (*ASIC Architect*), Level 300 (*Crypto Colossus*), Level 325 (*Zero-Latency Phantom*), Level 350 (*Quantum Proofmaster*), Level 375 (*Sub-Zero Cryomancer*), Level 400 (*Consensus Sovereign*), Level 425 (*Genesis Archon*), Level 450 (*Celestial Hasher*), Level 475 (*Blockchain Demiurge*), up to Level 500 (*Satoshi Slayer [MAX]*).
  - Integrated dedicated `🏆 Trophies` tab into the Aero-Glass workspace tab bar with live badge `Lvl <level> ⚔️`.
  - Designed an Aero-Glass **Hero Level Banner** featuring a 124px glowing circular Level Orb with radial SVG circular progress ring, rank badge, gradient XP track, and telemetry breakdown chips.
  - Implemented 20 achievement trophy milestone cards with category filter pills (`All`, `⛏️ Nonces & Shares`, `🎯 Difficulty & Luck`, `⚙️ Tuning & Hardware`, `🌐 Stratum & Ops`, `🌟 Prestige Tiers`) featuring real-time percentage progress bars and lock/unlock indicators.
  - Added horizontal **Fleet Rank Progression Roadmap** strip rendering all 21 milestone tiers with custom dark-glass scrollbars.
  - Injected individual miner workstation level and title pills (`⚔️ Lvl <level> • <Rank Title>`) onto each hardware pod card.
- **Synthesized Web Audio Share Geiger Counter & Acoustic Telemetry** ([#20](https://github.com/everyday3d/home-miner-studio/issues/20)):
  - Built pure synthesized in-browser Web Audio API sound generator with zero external media files or CDN dependencies.
  - Added **Geiger Counter mode**: simulates hardware hash crunching with bandpass-filtered acoustic clicks (1800Hz-2400Hz, 15ms) on newly accepted mining shares.
  - Added **Milestone Chimes mode**: synthesizes dual-tone harmonic sci-fi bell chords for high-difficulty share submissions (>10M, >100M, >1G).
  - Designed interactive Aero-Glass Sound Controller Pill in top command bar with 3 toggle states (`🔇 Audio: OFF`, `🔊 Geiger: ON`, `✨ Chimes: ON`), defaulting to **Muted** to respect user privacy.
  - Integrated `[🔊 Test Share Audio]` preview trigger on Solo Block Radar console to test sound bursts without waiting for live pool shares.
  - Persisted user sound mode preference across browser sessions using `safeStorage` (`miner_sound_mode`).
- **Tabbed Workspace Switcher & Zero-Scroll Aero-Glass Dashboard Layout** ([#18](https://github.com/everyday3d/home-miner-studio/issues/18)):
  - Built segmented Aero-Glass **Workspace Tab Bar** (`.workspace-tab-bar`) featuring dynamic pill tabs with live telemetry badges:
    - `🖥️ Fleet & Hardware` (live blade count badge)
    - `⚡ Yield Matrix & Stratum` (live #1 top yield coin badge)
    - `🎯 Solo Block Radar` (live expected time odds badge)
    - `📈 Market Intelligence` (live 24h market move badge)
    - `🌐 Overview (All)` (full kiosk-mode stacked layout)
  - Pinned Header Command Bar, quick action buttons, and Hero Radial Gauges (Hashrate, Watts/Efficiency, Thermal Core) permanently across all workspaces.
  - Implemented responsive 2-column `.workstations-grid` for desktop/tablet viewports to eliminate vertical scroll fatigue.
  - Added smooth CSS transition animations (`tabFadeIn`) on tab changes with aero-glass frosted backgrounds (`backdrop-filter: blur(16px)`).
  - Persisted user's active tab selection across page refreshes and browser sessions using `safeStorage` (`miner_active_tab`).
- **Multi-Coin Live Yield Matrix & 1-Click Stratum Pool Switcher** ([#17](https://github.com/everyday3d/home-miner-studio/issues/17)):
  - Built real-time **Multi-Coin SHA-256 Profitability & Yield Leaderboard** matrix comparing top SHA-256 and micro-cap mineable cryptocurrencies (`WOJAK`, `BELLS`, `DGB`, `BCH`, `PEPE`, `BTC`) ranked dynamically by net 24h profitability (`#1 TOP YIELD 👑`).
  - Added real-time coin mathematics calculating network difficulty, block reward value, estimated daily coin production based on fleet hashrate, gross USD revenue, fleet power cost deduction, and net daily/monthly profit.
  - Implemented backend Home Assistant service `home_miner_studio.switch_stratum` supporting live pool re-targeting across AxeOS Bitaxes (`PATCH /api/system`) and CGMiner RPC ASICs (`addpool` socket command).
  - Designed an Aero-Glass **1-Click Stratum Switcher Modal** (`#stratum-modal`) with pre-configured pool presets (Mining-Dutch, Helios Pool, Public-Pool) and target rig targeting (Entire Fleet or individual miners).
  - Extended `/api/home_miner_studio/market` backend HTTP view with multi-coin query support (`?coins=BTC,WOJAK,BCH,BELLS,DGB,PEPE`) and fallback pricing engine.
  - Added auto-reconnect fallback and domain setup hooks ensuring custom HTTP endpoints and services initialize seamlessly without `configuration.yaml` declarations.
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
- **Workspace Tab Bar Horizontal Overflow & Audio Test Playback** ([#21](https://github.com/everyday3d/home-miner-studio/issues/21)):
  - Added `overflow-x: auto`, `scrollbar-width: none`, and `flex-shrink: 0` to `.workspace-tab-bar` and `.tab-pill` so the 5th tab (`🌐 Overview`) never clips off-screen or overflows the card boundary on narrower Lovelace dashboards.
  - Streamlined tab titles and pill badges (`Fleet`, `Yield Matrix`, `Solo Radar`, `Market`, `Overview`) reducing overall bar width footprint from ~990px to ~650px.
  - Resolved `[🔊 Test Share Audio]` button silence by adding unconditional `force` playback flag, eliminating synchronous sound mode reset race conditions.
  - Enhanced synthesized Web Audio acoustic waveforms: extended Geiger click to 50ms with dual-oscillator frequency drop (1400Hz -> 150Hz) and upgraded milestone chime to 450ms crystal harmonic chord (E6/B6) for crisp audibility across all device speakers.
  - Added real-time visual tactile feedback on the audio test button (`🔊 Playing Audio...`).
- **Dashboard Screen Flashing on State Telemetry Updates** ([#19](https://github.com/everyday3d/home-miner-studio/issues/19)):
  - Removed unconditional `tabFadeIn` (`from { opacity: 0 }`) CSS keyframe animation from `.tab-pane` to eliminate whole-screen flashing whenever DOM re-renders.
  - Implemented entity signature change-detection helper (`_computeMinerStateSignature`) inside `set hass(hass)` that filters out non-mining entities (3D printers, lights, weather, media players, automations) and skips re-rendering when mining/market states are identical.
  - Ensured manual user interactions (tab changes, timeframe toggles, coin selections) immediately invalidate signature cache and render seamlessly.
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
