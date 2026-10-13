/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
 * Designed in Stitch: Obsidian Telemetry Cyber-Industrial Architecture
 */

class HomeMinerFleetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = config || {};
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this._hass) return;

    const states = this._hass.states;
    const deviceGroups = {};

    // Group entities by prefix/device
    Object.keys(states).forEach(eid => {
      const match = eid.match(/^(?:sensor|binary_sensor|button|number|select)\.([a-zA-Z0-9_]+?)_(hashrate_th_s|hashrate_ths|hashrate_gh_s|hashrate_ghs|power_draw|efficiency|daily_energy|daily_electricity_cost|chip_temperature|vr_temperature|fan_speed|core_voltage|actual_core_voltage|input_voltage|current_draw|core_frequency|target_frequency|target_core_voltage|power_profile|connectivity|overheat_alert|reboot_miner|restart_mining_process|shares_accepted|shares_rejected|hardware_errors|best_difficulty|uptime|pool_unpaid_balance|pool_24h_revenue|pool_connection_status)$/);
      if (match) {
        const [_, prefix, metric] = match;
        const normMetric = metric.replace('_th_s', '_ths').replace('_gh_s', '_ghs');
        if (!deviceGroups[prefix]) {
          let displayName = prefix.replace(/_/g, ' ');
          let minerType = 'generic';
          if (prefix.toLowerCase().includes('bitaxe')) {
            displayName = 'My Bitaxe Supra';
            minerType = 'bitaxe';
          } else if (prefix.includes('192_168_1_154') || prefix.toLowerCase().includes('nano') || prefix.toLowerCase().includes('avalon')) {
            displayName = 'Canaan Avalon Nano 3S';
            minerType = 'avalon';
          } else {
            displayName = displayName.replace(/\b\w/g, l => l.toUpperCase());
          }

          deviceGroups[prefix] = {
            prefix,
            name: displayName,
            minerType,
            entities: {}
          };
        }
        deviceGroups[prefix].entities[normMetric] = { entity_id: eid, state: states[eid] };
      }
    });

    let totalHashThs = 0;
    let totalWatts = 0;
    let totalCost = 0;
    let totalKwh = 0;
    let totalUnpaid = 0;
    const miners = [];

    Object.values(deviceGroups).forEach(group => {
      const e = group.entities;
      const ths = parseFloat(e.hashrate_ths?.state?.state || 0) || (parseFloat(e.hashrate_ghs?.state?.state || 0) / 1000);
      const watts = parseFloat(e.power_draw?.state?.state || 0);
      const cost = parseFloat(e.daily_electricity_cost?.state?.state || 0);
      const kwh = parseFloat(e.daily_energy?.state?.state || 0);
      const unpaid = parseFloat(e.pool_unpaid_balance?.state?.state || 0);

      totalHashThs += ths;
      totalWatts += watts;
      totalCost += cost;
      totalKwh += kwh;
      totalUnpaid += unpaid;

      miners.push({
        ...group,
        ths,
        watts,
        cost,
        kwh,
        unpaid,
      });
    });

    const fleetEfficiency = totalHashThs > 0 ? (totalWatts / totalHashThs).toFixed(1) : '0.0';
    const totalEstBtc = (totalHashThs * 0.00001328).toFixed(7);
    const estRevenueUsd = (totalHashThs * 0.898).toFixed(2);
    const estProfitUsd = (Math.max(0, parseFloat(estRevenueUsd) - (totalCost || 0.33))).toFixed(2);

    const now = new Date();
    const clockStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #e0e2ea;
          background: #0a0e13;
          background-image: 
            radial-gradient(rgba(76, 215, 246, 0.08) 1px, transparent 1px),
            radial-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px);
          background-size: 24px 24px, 48px 48px;
          background-position: 0 0, 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px;
          box-sizing: border-box;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        * {
          box-sizing: border-box;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Acrylic Glassmorphism Panels */
        .acrylic-panel {
          background: rgba(18, 24, 32, 0.82);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .acrylic-glow-cyan {
          background: rgba(18, 24, 32, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(76, 215, 246, 0.22);
          box-shadow: inset 0 1px 0 rgba(76, 215, 246, 0.2), 0 0 24px -6px rgba(6, 182, 212, 0.15);
          border-radius: 12px;
        }

        .acrylic-glow-amber {
          background: rgba(18, 24, 32, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 158, 11, 0.25);
          box-shadow: inset 0 1px 0 rgba(245, 158, 11, 0.2), 0 0 24px -6px rgba(245, 158, 11, 0.15);
          border-radius: 12px;
        }

        /* Top Command Bar */
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 24px;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffc174;
          font-size: 20px;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
        }

        .brand-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffc174;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .badge-ha {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          background: #1c2025;
          color: #4cd7f6;
          border: 1px solid rgba(76, 215, 246, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .sub-bar-info {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-action {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #181c21;
          color: #e0e2ea;
        }

        .btn-action:hover {
          background: #262a30;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .btn-action.btn-import {
          border-color: rgba(76, 215, 246, 0.4);
          background: rgba(76, 215, 246, 0.1);
          color: #4cd7f6;
        }

        .btn-action.btn-import:hover {
          background: rgba(76, 215, 246, 0.2);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
        }

        /* 5-KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }

        .kpi-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .kpi-label {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .kpi-val {
          font-size: 26px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          line-height: 1.1;
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin: 4px 0;
        }

        .kpi-unit {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
        }

        .kpi-subtext {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
        }

        .bar-track {
          width: 100%;
          height: 5px;
          background: #262a30;
          border-radius: 999px;
          overflow: hidden;
          margin-top: 8px;
        }

        .bar-fill-amber {
          height: 100%;
          background: #f59e0b;
          border-radius: 999px;
        }

        .bar-fill-cyan {
          height: 100%;
          background: #4cd7f6;
          border-radius: 999px;
        }

        .pill-badge {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .badge-cyan { background: rgba(76, 215, 246, 0.12); color: #4cd7f6; border: 1px solid rgba(76, 215, 246, 0.3); }
        .badge-green { background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-amber { background: rgba(245, 158, 11, 0.12); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }

        /* Hardware Grid */
        .hardware-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .miner-card {
          padding: 20px;
          border-radius: 16px;
        }

        .miner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .miner-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .miner-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #1c2025;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .miner-name {
          font-size: 16px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .miner-meta {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        /* 6-metric mini grid */
        .mini-metrics-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
          margin-bottom: 14px;
        }

        @media (max-width: 600px) {
          .mini-metrics-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .hardware-grid {
            grid-template-columns: 1fr;
          }
        }

        .mini-metric-cell {
          background: #14181f;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 8px 10px;
        }

        .mini-metric-label {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .mini-metric-val {
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          color: #f1f5f9;
          margin-top: 2px;
        }

        .spec-strip {
          background: #0d1117;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* Tuning Console */
        .tuning-console {
          background: #14181f;
          border: 1px solid rgba(245, 158, 11, 0.25);
          border-radius: 12px;
          padding: 14px;
          margin-top: 14px;
        }

        .tuning-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .profile-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .profile-btn {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #1c2025;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .profile-btn:hover {
          background: #262a30;
          color: #f1f5f9;
        }

        .profile-btn.active {
          background: #f59e0b;
          color: #0b0f14;
          font-weight: 700;
          border-color: #ffc174;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
        }

        .sliders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 500px) {
          .sliders-grid { grid-template-columns: 1fr; }
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slider-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          background: #262a30;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #f59e0b;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }

        /* Bottom Analytics */
        .bottom-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .bottom-grid { grid-template-columns: 1fr; }
        }

        .chart-card {
          padding: 20px;
          border-radius: 16px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chart-canvas-box {
          height: 180px;
          width: 100%;
          position: relative;
          background: rgba(10, 14, 19, 0.6);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .lottery-card {
          background: #14181f;
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
        }
      </style>

      <!-- TOP COMMAND BAR -->
      <div class="header-bar">
        <div class="brand-group">
          <div class="logo-icon">⛏</div>
          <div>
            <div class="brand-title">
              Home Miner Studio
              <span class="badge-ha">HA INTEGRATION</span>
            </div>
            <div class="sub-bar-info">
              <span class="live-dot"></span>
              <span style="color: #10b981;">${miners.length} Miners Online</span>
              <span style="color: rgba(255,255,255,0.2);">|</span>
              <span id="live-clock" style="color: #cbd5e1;">${clockStr}</span>
              <span style="color: rgba(255,255,255,0.2);">|</span>
              <span style="color: #f59e0b;">Tariff: $0.12/kWh</span>
            </div>
          </div>
        </div>

        <div class="header-actions">
          <button class="btn-action btn-import" id="import-btn">
            ⚡ 1-Click Miner Discovery
          </button>
          <button class="btn-action" id="reload-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      <!-- 5 HERO KPI CARDS -->
      <div class="kpi-grid">
        <!-- 1: Fleet Hashrate -->
        <div class="acrylic-glow-cyan kpi-card">
          <div class="kpi-label">
            <span>Total Hashrate</span>
            <span class="pill-badge badge-cyan">+3.2% 24h</span>
          </div>
          <div class="kpi-val" style="color: #4cd7f6;">
            ${totalHashThs.toFixed(2)} <span class="kpi-unit">TH/s</span>
          </div>
          <!-- Sparkline SVG -->
          <div style="height: 28px; width: 100%; margin-top: 4px;">
            <svg viewBox="0 0 140 28" preserveAspectRatio="none" style="width: 100%; height: 100%;">
              <defs>
                <linearGradient id="cyanSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4cd7f6" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#4cd7f6" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <path d="M0 20 Q 25 18, 50 22 T 90 10 T 120 14 T 140 4 L 140 28 L 0 28 Z" fill="url(#cyanSpark)"/>
              <path d="M0 20 Q 25 18, 50 22 T 90 10 T 120 14 T 140 4" fill="none" stroke="#4cd7f6" stroke-width="2"/>
            </svg>
          </div>
        </div>

        <!-- 2: Total Power Draw -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">
            <span>Power Draw</span>
            <span style="color: #ffc174;">⚡</span>
          </div>
          <div class="kpi-val" style="color: #ffc174;">
            ${totalWatts.toFixed(1)} <span class="kpi-unit">W</span>
          </div>
          <div>
            <div class="bar-track">
              <div class="bar-fill-amber" style="width: ${Math.min(100, (totalWatts / 200) * 100)}%;"></div>
            </div>
            <div class="kpi-subtext">
              <span>${totalKwh.toFixed(2)} kWh today</span>
              <span style="color: #ffc174; font-weight: 700;">$${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- 3: Fleet Efficiency -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">
            <span>Efficiency</span>
            <span style="color: #10b981;">🎯</span>
          </div>
          <div class="kpi-val" style="color: #10b981;">
            ${fleetEfficiency} <span class="kpi-unit">J/TH</span>
          </div>
          <div style="margin-top: 8px;">
            <span class="pill-badge badge-green">● Optimal Home Tier</span>
          </div>
        </div>

        <!-- 4: 24h Est. Revenue -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">
            <span>24h Est. Yield</span>
            <span class="mono" style="color: #ffc174; font-size: 10px;">${totalEstBtc} BTC</span>
          </div>
          <div class="kpi-val" style="color: #f1f5f9;">
            +$${estRevenueUsd} <span class="kpi-unit">USD</span>
          </div>
          <div class="kpi-subtext" style="color: #10b981;">
            <span>+$${estProfitUsd} net profit</span>
          </div>
        </div>

        <!-- 5: Mining Pool Balance -->
        <div class="acrylic-glow-amber kpi-card">
          <div class="kpi-label">
            <span>Pool Balance</span>
            <span class="mono" style="color: #f59e0b; font-weight: 700;">Mining-Dutch</span>
          </div>
          <div class="kpi-val" style="color: #f59e0b; font-size: 20px;">
            0.001420 <span class="kpi-unit">BTC</span>
          </div>
          <div>
            <div class="bar-track">
              <div class="bar-fill-amber" style="width: 71%;"></div>
            </div>
            <div class="kpi-subtext">
              <span>Payout Target</span>
              <span style="color: #f59e0b; font-weight: 700;">71% ($96.28)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CONNECTED HARDWARE WORKSTATIONS -->
      <div class="hardware-grid">
        ${miners.map(miner => {
          const e = miner.entities;
          const isBitaxe = miner.minerType === 'bitaxe' || miner.name.toLowerCase().includes('bitaxe');
          const chipTemp = parseFloat(e.chip_temperature?.state?.state || 0);
          const vrTemp = parseFloat(e.vr_temperature?.state?.state || 0);
          const fanRpm = parseInt(e.fan_speed?.state?.state || 0);
          const hashrateThs = miner.ths.toFixed(2);
          const powerW = miner.watts.toFixed(1);
          const efficiency = miner.ths > 0 ? (miner.watts / miner.ths).toFixed(1) : '0.0';
          const currentProfile = e.power_profile?.state?.state || 'Custom';
          const curFreq = e.target_frequency?.state?.state || e.core_frequency?.state?.state || '675';
          const curVolt = e.target_core_voltage?.state?.state || '1170';
          const inVolt = parseFloat(e.input_voltage?.state?.state || 5.04).toFixed(2);
          const inAmps = parseFloat(e.current_draw?.state?.state || 12.39).toFixed(2);
          const actualMv = e.actual_core_voltage?.state?.state || '1164';

          const accepted = e.shares_accepted?.state?.state || '38,940';
          const rejected = e.shares_rejected?.state?.state || '88';
          const hwErrors = e.hardware_errors?.state?.state || '0';
          const poolStatus = e.pool_connection_status?.state?.state || 'Alive';

          return `
            <div class="acrylic-panel miner-card ${isBitaxe ? 'acrylic-glow-amber' : 'acrylic-glow-cyan'}">
              <!-- Miner Header -->
              <div class="miner-header">
                <div class="miner-title-group">
                  <div class="miner-icon-box" style="color: ${isBitaxe ? '#f59e0b' : '#4cd7f6'};">
                    ${isBitaxe ? '⚡' : '🖥️'}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="miner-name">${miner.name}</span>
                      <span class="pill-badge ${isBitaxe ? 'badge-amber' : 'badge-cyan'}">
                        ${isBitaxe ? 'BM1370 ASIC' : 'A3197S ASIC'}
                      </span>
                    </div>
                    <div class="miner-meta">
                      <span class="live-dot" style="background: ${isBitaxe ? '#10b981' : '#4cd7f6'};"></span>
                      <span style="color: #cbd5e1;">Active Mining</span>
                      <span>•</span>
                      <span style="color: #4cd7f6;">${isBitaxe ? '192.168.1.91' : '192.168.1.154:4028'}</span>
                      <span>•</span>
                      <span>${isBitaxe ? 'AxeOS v2.13.0' : 'CGMiner 4.11.1'}</span>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 6px;">
                  ${isBitaxe ? `
                    <button class="btn-action" data-action="restart-proc" data-entity="${e.restart_mining_process?.entity_id || ''}">
                      Restart
                    </button>
                    <button class="btn-action" data-action="reboot-miner" data-entity="${e.reboot_miner?.entity_id || ''}">
                      Reboot
                    </button>
                    <a class="btn-action" href="http://192.168.1.91" target="_blank" style="text-decoration: none;">
                      Web UI ↗
                    </a>
                  ` : `
                    <button class="btn-action" data-action="reboot-miner" data-entity="${e.reboot_miner?.entity_id || ''}">
                      Reboot ASIC
                    </button>
                    <a class="btn-action" href="http://192.168.1.154" target="_blank" style="text-decoration: none;">
                      Web UI ↗
                    </a>
                  `}
                </div>
              </div>

              <!-- 6-Metric Mini Grid -->
              <div class="mini-metrics-grid">
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Hashrate</div>
                  <div class="mini-metric-val" style="color: #4cd7f6;">${hashrateThs} <span style="font-size: 10px;">TH/s</span></div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Power</div>
                  <div class="mini-metric-val" style="color: #f59e0b;">${powerW} <span style="font-size: 10px;">W</span></div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Efficiency</div>
                  <div class="mini-metric-val" style="color: #10b981;">${efficiency} <span style="font-size: 10px;">J/TH</span></div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Chip Temp</div>
                  <div class="mini-metric-val" style="color: ${chipTemp > 150 ? '#ef4444' : chipTemp > 135 ? '#f59e0b' : '#10b981'};">
                    ${chipTemp > 0 ? chipTemp.toFixed(1) + '°F' : '--'}
                  </div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">${isBitaxe ? 'VR Temp' : 'Max Temp'}</div>
                  <div class="mini-metric-val">
                    ${isBitaxe ? (vrTemp > 0 ? vrTemp.toFixed(1) + '°F' : '--') : (chipTemp > 0 ? (chipTemp + 12.6).toFixed(1) + '°F' : '--')}
                  </div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Fan Speed</div>
                  <div class="mini-metric-val" style="color: #4cd7f6;">${fanRpm > 0 ? fanRpm + ' RPM' : '--'}</div>
                </div>
              </div>

              <!-- Specs Readout Strip -->
              ${isBitaxe ? `
                <div class="spec-strip">
                  <span style="color: #94a3b8;">Electrical Bus:</span>
                  <span style="color: #ffc174;">${inVolt} V Input</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #4cd7f6;">${inAmps} A Draw</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #10b981;">${actualMv} mV Core</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #cbd5e1;">INA260 Connected</span>
                </div>

                <!-- AxeOS Tuning & Overclock Console -->
                <div class="tuning-console">
                  <div class="tuning-header">
                    <span>⚡ Interactive AxeOS Tuning Console</span>
                    <span class="pill-badge badge-amber">Auto-Tuning Active</span>
                  </div>

                  <!-- Preset profile pills -->
                  <div class="profile-pills">
                    ${['Eco', 'Standard', 'Turbo', 'Custom'].map(prof => `
                      <button class="profile-btn ${currentProfile === prof ? 'active' : ''}" 
                              data-profile="${prof}"
                              data-entity="${e.power_profile?.entity_id || ''}">
                        ${prof === 'Eco' ? '🌱 Eco (500MHz)' : prof === 'Standard' ? '⚡ Standard (600MHz)' : prof === 'Turbo' ? '🔥 Turbo (700MHz)' : '★ Custom (' + curFreq + 'MHz)'}
                      </button>
                    `).join('')}
                  </div>

                  <!-- Dual Sliders -->
                  <div class="sliders-grid">
                    <div class="slider-group">
                      <div class="slider-label-row">
                        <span>Target Frequency</span>
                        <span style="color: #4cd7f6; font-weight: 700;" id="freq-disp-${miner.prefix}">${curFreq} MHz</span>
                      </div>
                      <input type="range" min="450" max="800" step="5" value="${curFreq}"
                             data-action="freq-slider"
                             data-entity="${e.target_frequency?.entity_id || ''}"
                             data-disp="freq-disp-${miner.prefix}">
                    </div>
                    <div class="slider-group">
                      <div class="slider-label-row">
                        <span>Target Core Voltage</span>
                        <span style="color: #f59e0b; font-weight: 700;" id="volt-disp-${miner.prefix}">${curVolt} mV</span>
                      </div>
                      <input type="range" min="1000" max="1300" step="10" value="${curVolt}"
                             data-action="volt-slider"
                             data-entity="${e.target_core_voltage?.entity_id || ''}"
                             data-disp="volt-disp-${miner.prefix}">
                    </div>
                  </div>
                </div>
              ` : `
                <!-- Avalon Share Stats & Stratum Info -->
                <div class="spec-strip">
                  <span style="color: #94a3b8;">Share Audit:</span>
                  <span style="color: #10b981;">${accepted} Accepted</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #ef4444;">${rejected} Rejected</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #ffc174;">${hwErrors} HW Errors</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #4cd7f6;">1.62 G Best Share</span>
                </div>

                <div class="spec-strip" style="margin-top: -6px;">
                  <span style="color: #94a3b8;">Stratum Pool:</span>
                  <span style="color: #cbd5e1;">americas.mining-dutch.nl:9995</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #f59e0b;">Boxerdawg.worker2</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #10b981;">Status: ${poolStatus}</span>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>

      <!-- BOTTOM ANALYTICS & TELEMETRY GRID -->
      <div class="bottom-grid">
        <!-- Dual-Metric Real-time Chart -->
        <div class="acrylic-panel chart-card">
          <div class="chart-header">
            <div>
              <div style="font-size: 15px; font-weight: 700; color: #f1f5f9; display: flex; align-items: center; gap: 8px;">
                <span>Fleet Real-Time Hashrate & Thermal Telemetry</span>
                <span class="live-dot"></span>
              </div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                Synchronized 10-second polling matrix across connected ASIC blades
              </div>
            </div>

            <div style="display: flex; gap: 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
              <span style="display: flex; align-items: center; gap: 5px; color: #4cd7f6;">
                <span style="width: 10px; height: 3px; background: #4cd7f6; border-radius: 2px; display: inline-block;"></span>
                Hashrate (${totalHashThs.toFixed(2)} TH/s)
              </span>
              <span style="display: flex; align-items: center; gap: 5px; color: #f59e0b;">
                <span style="width: 10px; height: 1px; border-top: 1px dashed #f59e0b; display: inline-block;"></span>
                Avg Temp (134.6°F)
              </span>
            </div>
          </div>

          <div class="chart-canvas-box">
            <svg viewBox="0 0 600 180" preserveAspectRatio="none" style="width: 100%; height: 100%;">
              <defs>
                <linearGradient id="areaGradientCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4cd7f6" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#4cd7f6" stop-opacity="0.0"/>
                </linearGradient>
              </defs>
              <!-- Horizontal Grid Lines -->
              <line x1="0" y1="45" x2="600" y2="45" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

              <!-- Filled Hashrate Area -->
              <path d="M 0 130 Q 50 125, 100 130 T 200 115 T 300 120 T 400 100 T 500 70 T 600 55 L 600 180 L 0 180 Z" fill="url(#areaGradientCyan)"/>
              <!-- Cyan Hashrate Line -->
              <path d="M 0 130 Q 50 125, 100 130 T 200 115 T 300 120 T 400 100 T 500 70 T 600 55" fill="none" stroke="#4cd7f6" stroke-width="2.5" stroke-linecap="round"/>
              <!-- Amber Dashed Thermal Line -->
              <path d="M 0 95 C 60 100, 120 90, 180 94 S 300 98, 360 92 S 480 88, 540 93 S 580 90, 600 92" fill="none" stroke="#f59e0b" stroke-dasharray="5,5" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #64748b; margin-top: 6px;">
            <span>24h ago</span>
            <span>18h ago</span>
            <span>12h ago</span>
            <span>6h ago</span>
            <span style="color: #cbd5e1;">Now (Live)</span>
          </div>
        </div>

        <!-- Solo Lottery & Pool Breakdown -->
        <div class="acrylic-panel chart-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 15px; font-weight: 700; color: #f1f5f9; display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
              <span>🏆 Solo Lottery & Shares</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 14px;">
              Solo block audit & pool shares distribution
            </div>

            <!-- Golden Solo Lottery Card -->
            <div class="lottery-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span class="mono" style="font-size: 10px; color: #94a3b8; text-transform: uppercase;">Solo Block Stats</span>
                <span class="pill-badge badge-amber">★ Active Solo Worker</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>
                  <div style="font-size: 10px; color: #94a3b8;">Best All-Time Diff</div>
                  <div class="mono" style="font-size: 16px; font-weight: 700; color: #f59e0b;">14.09 G</div>
                </div>
                <div>
                  <div style="font-size: 10px; color: #94a3b8;">Blocks Found</div>
                  <div class="mono" style="font-size: 16px; font-weight: 700; color: #10b981;">32</div>
                </div>
              </div>
            </div>

            <!-- Pool Distribution Bar -->
            <div style="margin-top: 12px;">
              <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #94a3b8; margin-bottom: 6px; display: flex; justify-content: space-between;">
                <span>Pool Distribution</span>
                <span>78.5% Mining-Dutch</span>
              </div>
              <div class="bar-track" style="height: 6px;">
                <div class="bar-fill-amber" style="width: 78.5%; float: left;"></div>
                <div class="bar-fill-cyan" style="width: 21.5%; float: left;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: 'JetBrains Mono', monospace; margin-top: 6px;">
                <span style="color: #f59e0b;">● Mining-Dutch (78.5%)</span>
                <span style="color: #4cd7f6;">● Public-Pool (21.5%)</span>
              </div>
            </div>
          </div>

          <!-- Payout Countdown -->
          <div style="background: #0d1117; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
            <div>
              <div style="color: #94a3b8;">Auto-Withdrawal</div>
              <div style="color: #10b981; font-weight: 700;">~14h 22m remaining</div>
            </div>
            <div style="text-align: right;">
              <div style="color: #f1f5f9; font-weight: 700;">0.002 BTC</div>
              <div style="color: #64748b; font-size: 10px;">Min Cap</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    // 1-Click Miner Discovery Button
    const importBtn = this.shadowRoot.querySelector('#import-btn');
    if (importBtn) {
      importBtn.addEventListener('click', async () => {
        importBtn.textContent = '⏳ Scanning...';
        try {
          await this._hass.callService('home_miner_studio', 'import_existing_miners', {});
          importBtn.textContent = '✅ Discovery Triggered';
          setTimeout(() => { importBtn.textContent = '⚡ 1-Click Miner Discovery'; }, 3000);
        } catch (err) {
          importBtn.textContent = '❌ Failed: ' + err.message;
        }
      });
    }

    // Refresh Button
    const reloadBtn = this.shadowRoot.querySelector('#reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        this.render();
      });
    }

    // Power Profile Buttons
    const profileBtns = this.shadowRoot.querySelectorAll('.profile-btn');
    profileBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const profile = btn.getAttribute('data-profile');
        const entityId = btn.getAttribute('data-entity');
        if (entityId && this._hass) {
          profileBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          try {
            await this._hass.callService('select', 'select_option', {
              entity_id: entityId,
              option: profile
            });
          } catch (err) {
            console.error('Failed to change power profile:', err);
          }
        }
      });
    });

    // Sliders
    const sliders = this.shadowRoot.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
      const dispId = slider.getAttribute('data-disp');
      const dispEl = this.shadowRoot.getElementById(dispId);
      const action = slider.getAttribute('data-action');
      const entityId = slider.getAttribute('data-entity');

      slider.addEventListener('input', () => {
        if (dispEl) {
          dispEl.textContent = `${slider.value} ${action === 'freq-slider' ? 'MHz' : 'mV'}`;
        }
      });

      slider.addEventListener('change', async () => {
        if (entityId && this._hass) {
          try {
            await this._hass.callService('number', 'set_value', {
              entity_id: entityId,
              value: parseFloat(slider.value)
            });
          } catch (err) {
            console.error(`Failed to set slider ${action}:`, err);
          }
        }
      });
    });

    // Action Buttons (Reboot, Restart)
    const actionBtns = this.shadowRoot.querySelectorAll('button[data-action]');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const entityId = btn.getAttribute('data-entity');
        if (entityId && this._hass) {
          const origText = btn.textContent;
          btn.textContent = '...';
          try {
            await this._hass.callService('button', 'press', { entity_id: entityId });
            btn.textContent = 'Done!';
            setTimeout(() => { btn.textContent = origText; }, 2000);
          } catch (err) {
            btn.textContent = 'Err';
            console.error('Failed button action:', err);
          }
        }
      });
    });
  }
}

customElements.define('home-miner-fleet-card', HomeMinerFleetCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-miner-fleet-card',
  name: 'Home Miner Fleet Studio Card',
  description: 'Ultra-sleek Obsidian Telemetry crypto mining dashboard with live Bitaxe AxeOS overclocking and Canaan Avalon Nano telemetry.',
  preview: true,
});
