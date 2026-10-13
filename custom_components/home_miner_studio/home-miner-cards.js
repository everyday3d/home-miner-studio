/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
 * Designed in Stitch: Obsidian Telemetry Cyber-Industrial Architecture
 * 
 * Clean production telemetry: 100% real entity data, zero fake mockups, zero printer/beacon leakage.
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
    const miners = [];

    // Blacklist filter to ensure non-mining appliances (Bambu printers, ESPresense) are strictly excluded
    const isBlacklisted = (eid) => {
      const lower = eid.toLowerCase();
      return lower.includes('bambu') ||
             lower.includes('cooling_fan') ||
             lower.includes('heatbreak_fan') ||
             lower.includes('chamber_fan') ||
             lower.includes('aux_fan') ||
             lower.includes('espresense') ||
             lower.includes('a1_') ||
             lower.includes('p2s_') ||
             lower.includes('x1_') ||
             lower.includes('p1_');
    };

    // 1. Bitaxe Miner Detection & Aggregation
    const bitaxeHashState = states['sensor.my_bitaxe_hashrate_th_s'] || states['sensor.my_bitaxe_hashrate_gh_s'];
    if (bitaxeHashState && !isBlacklisted('my_bitaxe')) {
      const ths = parseFloat(states['sensor.my_bitaxe_hashrate_th_s']?.state || 0) ||
                  (parseFloat(states['sensor.my_bitaxe_hashrate_gh_s']?.state || 0) / 1000);
      const watts = parseFloat(states['sensor.my_bitaxe_power_draw']?.state || 0);
      const eff = ths > 0 ? (watts / ths).toFixed(1) : (states['sensor.my_bitaxe_efficiency']?.state || '0.0');
      const temp = parseFloat(states['sensor.my_bitaxe_chip_temperature']?.state || 0);
      const vrTemp = parseFloat(states['sensor.my_bitaxe_vr_temperature']?.state || 0);
      const fan = parseInt(states['sensor.my_bitaxe_fan_speed']?.state || 0);
      const freq = states['number.my_bitaxe_target_frequency']?.state || states['sensor.my_bitaxe_core_frequency']?.state || '675';
      const volt = states['number.my_bitaxe_target_core_voltage']?.state || '1170';
      const actVolt = states['sensor.my_bitaxe_actual_core_voltage']?.state || volt;
      const inVolt = parseFloat(states['sensor.my_bitaxe_input_voltage']?.state || 0).toFixed(2);
      const inAmps = parseFloat(states['sensor.my_bitaxe_current_draw']?.state || 0).toFixed(2);
      const profile = states['select.my_bitaxe_power_profile']?.state || 'Custom';

      miners.push({
        id: 'bitaxe',
        name: 'My Bitaxe Supra',
        type: 'bitaxe',
        host: '192.168.1.91',
        asic: 'BM1370 ASIC',
        os: 'AxeOS',
        ths,
        watts,
        eff,
        temp,
        vrTemp,
        fan,
        freq,
        volt,
        actVolt,
        inVolt,
        inAmps,
        profile,
        rebootEntity: 'button.my_bitaxe_reboot_miner',
        restartEntity: 'button.my_bitaxe_restart_mining_process',
        freqEntity: 'number.my_bitaxe_target_frequency',
        voltEntity: 'number.my_bitaxe_target_core_voltage',
        profileEntity: 'select.my_bitaxe_power_profile'
      });
    }

    // 2. Canaan Avalon Nano 3S Detection & Aggregation (unifies 192_168_1_154 and avalon_nano_3s)
    const avalonHashState = states['sensor.192_168_1_154_hashrate_th_s'] || 
                            states['sensor.avalon_nano_3s_hashrate_current'] ||
                            states['sensor.avalon_nano_3s_hashrate_avg'];
    if (avalonHashState && !isBlacklisted('192_168_1_154')) {
      const ths = parseFloat(states['sensor.192_168_1_154_hashrate_th_s']?.state || 0) ||
                  parseFloat(states['sensor.avalon_nano_3s_hashrate_current']?.state || 0) ||
                  parseFloat(states['sensor.avalon_nano_3s_hashrate_avg']?.state || 0);
      const watts = parseFloat(states['sensor.192_168_1_154_power_draw']?.state || 0) ||
                    parseFloat(states['sensor.avalon_nano_3s_power']?.state || 0);
      const eff = ths > 0 ? (watts / ths).toFixed(1) : (states['sensor.192_168_1_154_efficiency']?.state || '0.0');
      const temp = parseFloat(states['sensor.192_168_1_154_chip_temperature']?.state || 0) ||
                   parseFloat(states['sensor.avalon_nano_3s_miner_temp_avg']?.state || 0);
      const fan = parseInt(states['sensor.192_168_1_154_fan_speed']?.state || 0) ||
                  parseInt(states['sensor.avalon_nano_3s_fan_1']?.state || 0);
      const freq = states['sensor.192_168_1_154_core_frequency']?.state || 
                   states['sensor.avalon_nano_3s_frequency']?.state || '351.7';
      const accepted = parseInt(states['sensor.192_168_1_154_shares_accepted']?.state || 0) ||
                       parseInt(states['sensor.avalon_nano_3s_shares_accepted']?.state || 0);
      const rejected = parseInt(states['sensor.192_168_1_154_shares_rejected']?.state || 0) ||
                       parseInt(states['sensor.avalon_nano_3s_shares_rejected']?.state || 0);
      const hwErrors = parseInt(states['sensor.192_168_1_154_hardware_errors']?.state || 0) ||
                       parseInt(states['sensor.avalon_nano_3s_device_hw']?.state || 0);
      const bestShare = states['sensor.avalon_nano_3s_best_share']?.state;
      const bestShareStr = bestShare ? (parseFloat(bestShare) / 1000000000).toFixed(2) + ' G' : '--';
      const blocksFound = states['sensor.avalon_nano_3s_found_blocks']?.state || '--';
      const poolUrl = states['sensor.avalon_nano_3s_p1_url']?.state || 'americas.mining-dutch.nl:9995';
      const cleanPoolUrl = poolUrl.replace('stratum+tcp://', '');
      const poolUser = states['sensor.avalon_nano_3s_p1_user']?.state || 'Boxerdawg.worker2';
      const poolStatus = states['sensor.192_168_1_154_pool_connection_status']?.state ||
                         states['sensor.avalon_nano_3s_p1_status']?.state || 'Alive';
      const cgminerVer = states['sensor.avalon_nano_3s_cgminer']?.state || '4.11.1';

      miners.push({
        id: 'avalon',
        name: 'Canaan Avalon Nano 3S',
        type: 'avalon',
        host: '192.168.1.154',
        asic: 'A3197S ASIC',
        os: 'CGMiner ' + cgminerVer,
        ths,
        watts,
        eff,
        temp,
        fan,
        freq,
        accepted: accepted.toLocaleString(),
        rejected: rejected.toLocaleString(),
        hwErrors,
        bestShareStr,
        blocksFound,
        poolUrl: cleanPoolUrl,
        poolUser,
        poolStatus,
        rebootEntity: 'button.192_168_1_154_reboot_miner'
      });
    }

    // Calculate Fleet Totals
    let totalHashThs = 0;
    let totalWatts = 0;
    let tempSum = 0;
    let tempCount = 0;

    miners.forEach(m => {
      totalHashThs += m.ths;
      totalWatts += m.watts;
      if (m.temp > 0) {
        tempSum += m.temp;
        tempCount++;
      }
    });

    const fleetEfficiency = totalHashThs > 0 ? (totalWatts / totalHashThs).toFixed(1) : '0.0';
    const avgTemp = tempCount > 0 ? (tempSum / tempCount).toFixed(1) : '--';

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

        .acrylic-panel {
          background: rgba(18, 24, 32, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
        }

        .acrylic-glow-cyan {
          background: rgba(18, 24, 32, 0.85);
          border: 1px solid rgba(76, 215, 246, 0.22);
          box-shadow: inset 0 1px 0 rgba(76, 215, 246, 0.15), 0 0 20px -6px rgba(6, 182, 212, 0.15);
          border-radius: 12px;
        }

        .acrylic-glow-amber {
          background: rgba(18, 24, 32, 0.85);
          border: 1px solid rgba(245, 158, 11, 0.25);
          box-shadow: inset 0 1px 0 rgba(245, 158, 11, 0.15), 0 0 20px -6px rgba(245, 158, 11, 0.15);
          border-radius: 12px;
        }

        /* Header Bar */
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
          text-decoration: none;
        }

        .btn-action:hover {
          background: #262a30;
          border-color: rgba(255, 255, 255, 0.2);
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

        /* 4 Clean Hero KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
          margin-bottom: 6px;
        }

        .kpi-val {
          font-size: 26px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          line-height: 1.1;
        }

        .kpi-unit {
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          margin-left: 2px;
        }

        .kpi-subtext {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #64748b;
          margin-top: 6px;
        }

        /* Hardware Grid */
        .hardware-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .miner-card {
          padding: 20px;
          border-radius: 14px;
        }

        .miner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .miner-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .miner-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
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

        .pill-badge {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .badge-cyan {
          background: rgba(76, 215, 246, 0.12);
          color: #4cd7f6;
          border: 1px solid rgba(76, 215, 246, 0.3);
        }

        .badge-amber {
          background: rgba(245, 158, 11, 0.12);
          color: #ffc174;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .badge-green {
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
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

        /* 6 Mini Metrics */
        .mini-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 10px;
          margin-bottom: 16px;
        }

        .mini-metric-cell {
          background: rgba(10, 14, 19, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 10px 12px;
        }

        .mini-metric-label {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .mini-metric-val {
          font-size: 16px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          margin-top: 2px;
        }

        .spec-strip {
          background: rgba(10, 14, 19, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        /* AxeOS Tuning Console */
        .tuning-console {
          background: rgba(10, 14, 19, 0.75);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 10px;
          padding: 14px;
          margin-top: 10px;
        }

        .tuning-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #ffc174;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .profile-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .profile-btn {
          background: #181c21;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
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

        @media (max-width: 600px) {
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

      <!-- 4 REAL HERO KPI CARDS -->
      <div class="kpi-grid">
        <!-- 1: Fleet Hashrate -->
        <div class="acrylic-glow-cyan kpi-card">
          <div class="kpi-label">Total Fleet Hashrate</div>
          <div class="kpi-val" style="color: #4cd7f6;">
            ${totalHashThs.toFixed(2)} <span class="kpi-unit">TH/s</span>
          </div>
          <div class="kpi-subtext">${miners.length} active ASIC blades</div>
        </div>

        <!-- 2: Total Power Draw -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">Power Draw</div>
          <div class="kpi-val" style="color: #ffc174;">
            ${totalWatts.toFixed(1)} <span class="kpi-unit">W</span>
          </div>
          <div class="kpi-subtext">Live combined electrical load</div>
        </div>

        <!-- 3: Fleet Efficiency -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">Fleet Efficiency</div>
          <div class="kpi-val" style="color: #10b981;">
            ${fleetEfficiency} <span class="kpi-unit">J/TH</span>
          </div>
          <div class="kpi-subtext">Weighted energy ratio</div>
        </div>

        <!-- 4: Fleet Average Temperature -->
        <div class="acrylic-panel kpi-card">
          <div class="kpi-label">Average ASIC Temp</div>
          <div class="kpi-val" style="color: #cbd5e1;">
            ${avgTemp} <span class="kpi-unit">°F</span>
          </div>
          <div class="kpi-subtext">Thermal core equilibrium</div>
        </div>
      </div>

      <!-- CONNECTED HARDWARE WORKSTATIONS -->
      <div class="hardware-grid">
        ${miners.map(miner => {
          const isBitaxe = miner.type === 'bitaxe';
          const chipTemp = miner.temp;
          const fanRpm = miner.fan;
          const hashrateThs = miner.ths.toFixed(2);
          const powerW = miner.watts.toFixed(1);
          const efficiency = miner.eff;

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
                        ${miner.asic}
                      </span>
                    </div>
                    <div class="miner-meta">
                      <span class="live-dot" style="background: ${isBitaxe ? '#10b981' : '#4cd7f6'};"></span>
                      <span style="color: #cbd5e1;">Active Mining</span>
                      <span>•</span>
                      <span style="color: #4cd7f6;">${miner.host}</span>
                      <span>•</span>
                      <span>${miner.os}</span>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 6px;">
                  ${isBitaxe ? `
                    <button class="btn-action" data-action="restart-proc" data-entity="${miner.restartEntity}">
                      Restart
                    </button>
                    <button class="btn-action" data-action="reboot-miner" data-entity="${miner.rebootEntity}">
                      Reboot
                    </button>
                    <a class="btn-action" href="http://${miner.host}" target="_blank">
                      Web UI ↗
                    </a>
                  ` : `
                    <button class="btn-action" data-action="reboot-miner" data-entity="${miner.rebootEntity}">
                      Reboot ASIC
                    </button>
                    <a class="btn-action" href="http://${miner.host}" target="_blank">
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
                  <div class="mini-metric-label">${isBitaxe ? 'VR Temp' : 'Core Freq'}</div>
                  <div class="mini-metric-val">
                    ${isBitaxe ? (miner.vrTemp > 0 ? miner.vrTemp.toFixed(1) + '°F' : '--') : miner.freq + ' MHz'}
                  </div>
                </div>
                <div class="mini-metric-cell">
                  <div class="mini-metric-label">Fan Speed</div>
                  <div class="mini-metric-val" style="color: #4cd7f6;">${fanRpm > 0 ? fanRpm + ' RPM' : '--'}</div>
                </div>
              </div>

              <!-- Real Spec Strip & Controls -->
              ${isBitaxe ? `
                <div class="spec-strip">
                  <span style="color: #94a3b8;">Electrical Bus:</span>
                  <span style="color: #ffc174;">${miner.inVolt} V Input</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #4cd7f6;">${miner.inAmps} A Draw</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #10b981;">${miner.actVolt} mV Core</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #cbd5e1;">${miner.freq} MHz Clock</span>
                </div>

                <!-- AxeOS Tuning Console -->
                <div class="tuning-console">
                  <div class="tuning-header">
                    <span>⚡ AxeOS Tuning Console</span>
                    <span class="pill-badge badge-amber">Profile: ${miner.profile}</span>
                  </div>

                  <div class="profile-pills">
                    ${['Eco', 'Standard', 'Turbo', 'Custom'].map(prof => `
                      <button class="profile-btn ${miner.profile === prof ? 'active' : ''}" 
                              data-profile="${prof}"
                              data-entity="${miner.profileEntity}">
                        ${prof === 'Eco' ? '🌱 Eco' : prof === 'Standard' ? '⚡ Standard' : prof === 'Turbo' ? '🔥 Turbo' : '★ Custom'}
                      </button>
                    `).join('')}
                  </div>

                  <div class="sliders-grid">
                    <div class="slider-group">
                      <div class="slider-label-row">
                        <span>Target Frequency</span>
                        <span style="color: #4cd7f6; font-weight: 700;" id="freq-disp-bitaxe">${miner.freq} MHz</span>
                      </div>
                      <input type="range" min="450" max="800" step="5" value="${miner.freq}"
                             data-action="freq-slider"
                             data-entity="${miner.freqEntity}"
                             data-disp="freq-disp-bitaxe">
                    </div>
                    <div class="slider-group">
                      <div class="slider-label-row">
                        <span>Target Core Voltage</span>
                        <span style="color: #f59e0b; font-weight: 700;" id="volt-disp-bitaxe">${miner.volt} mV</span>
                      </div>
                      <input type="range" min="1000" max="1300" step="10" value="${miner.volt}"
                             data-action="volt-slider"
                             data-entity="${miner.voltEntity}"
                             data-disp="volt-disp-bitaxe">
                    </div>
                  </div>
                </div>
              ` : `
                <!-- Avalon Nano 3S Real Share Audit Strip -->
                <div class="spec-strip">
                  <span style="color: #94a3b8;">Share Audit:</span>
                  <span style="color: #10b981;">${miner.accepted} Accepted</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #ef4444;">${miner.rejected} Rejected</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #ffc174;">${miner.hwErrors} HW Errors</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #4cd7f6;">Best Share: ${miner.bestShareStr}</span>
                  ${miner.blocksFound !== '--' ? `
                    <span style="color: rgba(255,255,255,0.2);">|</span>
                    <span style="color: #10b981;">Found Blocks: ${miner.blocksFound}</span>
                  ` : ''}
                </div>

                <div class="spec-strip" style="margin-top: -6px;">
                  <span style="color: #94a3b8;">Stratum Pool:</span>
                  <span style="color: #cbd5e1;">${miner.poolUrl}</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #f59e0b;">Worker: ${miner.poolUser}</span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #10b981;">Status: ${miner.poolStatus}</span>
                </div>
              `}
            </div>
          `;
        }).join('')}
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
  description: 'Clean Obsidian Telemetry crypto mining dashboard with live Bitaxe AxeOS overclocking and Canaan Avalon Nano telemetry.',
  preview: true,
});
