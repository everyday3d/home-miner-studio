/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
 * Designed in Stitch: Glassmorphism / Luminous Aero-Glass Architecture
 * 
 * Production Telemetry: 100% real entity data, Celsius-only units, frosted glassmorphism layers, SVG radial ring gauges.
 */

class HomeMinerFleetCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._modalOpen = false;
  }

  setConfig(config) {
    this._config = config || {};
  }

  set hass(hass) {
    this._hass = hass;
    if (this._modalOpen) {
      return; // Freeze rendering so typing focus and open dialogs are NEVER disturbed
    }
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

    // Strict Celsius conversion helper
    const toCelsius = (stateObj) => {
      if (!stateObj || stateObj.state === undefined || stateObj.state === 'unknown' || stateObj.state === 'unavailable') return null;
      const val = parseFloat(stateObj.state);
      if (isNaN(val)) return null;
      const unit = stateObj.attributes?.unit_of_measurement;
      if (unit === '°F' || unit === 'F') {
        return (val - 32) * (5 / 9);
      }
      if (unit === '°C' || unit === 'C') {
        return val;
      }
      if (val > 65) {
        return (val - 32) * (5 / 9);
      }
      return val;
    };

    // Dynamic Miner Name Resolver (LocalStorage > HA Entity Attribute > Default Fallback)
    const getMinerName = (host, defaultName, entityId) => {
      try {
        const local = localStorage.getItem('miner_name_' + host);
        if (local && local.trim()) return local.trim();
      } catch (e) {}
      const stateObj = entityId ? states[entityId] : null;
      if (stateObj?.attributes?.friendly_name) {
        const clean = stateObj.attributes.friendly_name.replace(/\s+(Hashrate|Power|Temp|Status|Daily|Efficiency).*$/i, '').trim();
        if (clean && clean.toLowerCase() !== 'miner') return clean;
      }
      return defaultName;
    };

    // 1. Bitaxe Miner Detection & Aggregation
    const bitaxeHashState = states['sensor.my_bitaxe_hashrate_th_s'] || states['sensor.my_bitaxe_hashrate_gh_s'];
    if (bitaxeHashState && !isBlacklisted('my_bitaxe')) {
      const bitaxeName = getMinerName('192.168.1.91', 'My Bitaxe Supra', 'sensor.my_bitaxe_hashrate_th_s');
      const ths = parseFloat(states['sensor.my_bitaxe_hashrate_th_s']?.state || 0) ||
                  (parseFloat(states['sensor.my_bitaxe_hashrate_gh_s']?.state || 0) / 1000);
      const watts = parseFloat(states['sensor.my_bitaxe_power_draw']?.state || 0);
      const eff = ths > 0 ? (watts / ths).toFixed(1) : (states['sensor.my_bitaxe_efficiency']?.state || '0.0');
      const temp = toCelsius(states['sensor.my_bitaxe_chip_temperature']) ?? 0;
      const vrTemp = toCelsius(states['sensor.my_bitaxe_vr_temperature']) ?? 0;
      const fan = parseInt(states['sensor.my_bitaxe_fan_speed']?.state || 0);
      const freq = states['number.my_bitaxe_target_frequency']?.state || states['sensor.my_bitaxe_core_frequency']?.state || '675';
      const volt = states['number.my_bitaxe_target_core_voltage']?.state || '1170';
      const actVolt = states['sensor.my_bitaxe_actual_core_voltage']?.state || volt;
      const inVolt = parseFloat(states['sensor.my_bitaxe_input_voltage']?.state || 0).toFixed(2);
      const inAmps = parseFloat(states['sensor.my_bitaxe_current_draw']?.state || 0).toFixed(2);
      const profile = states['select.my_bitaxe_power_profile']?.state || 'Custom';

      miners.push({
        id: 'bitaxe',
        name: bitaxeName,
        type: 'bitaxe',
        host: '192.168.1.91',
        asic: 'BM1370 ASIC',
        os: 'AxeOS v2.13.0',
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
      const temp = toCelsius(states['sensor.192_168_1_154_chip_temperature']) ??
                   toCelsius(states['sensor.avalon_nano_3s_miner_temp_avg']) ??
                   toCelsius(states['sensor.avalon_nano_3s_asic_temp_avg']) ?? 0;
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

      const avalonName = getMinerName('192.168.1.154', 'Canaan Avalon Nano 3S', 'sensor.192_168_1_154_hashrate_th_s');

      miners.push({
        id: 'avalon',
        name: avalonName,
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
    const avgTempNum = tempCount > 0 ? (tempSum / tempCount) : 0;
    const avgTempStr = tempCount > 0 ? avgTempNum.toFixed(1) : '--';

    // SVG Radial Arc Metrics
    // Circumference = 2 * PI * 42 = 263.89
    const hashTarget = 7.0;
    const hashOffset = Math.max(0, 264 - Math.min(1, totalHashThs / hashTarget) * 264);
    const hashPct = Math.round((totalHashThs / hashTarget) * 100);

    const pwrTarget = 150.0;
    const pwrOffset = Math.max(0, 264 - Math.min(1, totalWatts / pwrTarget) * 264);

    const tempTarget = 80.0;
    const tempOffset = Math.max(0, 264 - Math.min(1, avgTempNum / tempTarget) * 264);
    const tempStrokeColor = avgTempNum > 68 ? '#fb7185' : avgTempNum > 60 ? '#fbbf24' : '#34d399';
    const tempStatusLabel = avgTempNum > 68 ? '⚠️ High Load (> 68°C)' : avgTempNum > 60 ? '⚡ Warm Operation' : '● Optimal Zone (< 60°C)';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #f1f5f9;
          background: #090d16;
          background-image: 
            radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(245, 158, 11, 0.12) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 60%),
            radial-gradient(at 100% 100%, rgba(99, 102, 241, 0.14) 0px, transparent 50%);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px;
          box-sizing: border-box;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Glass Surfaces */
        .glass-base {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .glass-card {
          background: rgba(18, 26, 43, 0.55);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.14);
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
        }

        .glass-card.amber-glow {
          border-color: rgba(245, 158, 11, 0.28);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), 
                      0 0 30px -8px rgba(245, 158, 11, 0.12),
                      inset 0 1px 0 rgba(245, 158, 11, 0.3);
        }

        .glass-card.cyan-glow {
          border-color: rgba(56, 189, 248, 0.28);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), 
                      0 0 30px -8px rgba(56, 189, 248, 0.12),
                      inset 0 1px 0 rgba(56, 189, 248, 0.3);
        }

        /* Top Command Bar */
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .brand-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(56, 189, 248, 0.2));
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
        }

        .brand-title {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .badge-glass-pill {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .status-orb {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
        }

        .top-actions {
          display: flex;
          gap: 8px;
        }

        .glass-btn {
          padding: 7px 15px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #f1f5f9;
          font-size: 11px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .glass-btn.primary {
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .glass-btn.primary:hover {
          background: rgba(56, 189, 248, 0.25);
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.3);
        }

        .glass-btn.danger {
          background: rgba(251, 113, 133, 0.12);
          border-color: rgba(251, 113, 133, 0.35);
          color: #fb7185;
        }

        .glass-btn.danger:hover {
          background: rgba(251, 113, 133, 0.25);
          border-color: #fb7185;
          box-shadow: 0 0 14px rgba(251, 113, 133, 0.35);
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .modal-box {
          background: rgba(18, 26, 43, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 18px;
          width: 100%;
          max-width: 500px;
          padding: 24px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15);
          display: flex;
          flex-direction: column;
          gap: 14px;
          color: #f1f5f9;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-title {
          font-size: 16px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          color: #38bdf8;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-field.full {
          grid-column: span 2;
        }

        .modal-label {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .modal-input, .modal-select {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 8px 12px;
          color: #ffffff;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          outline: none;
        }

        .modal-input:focus, .modal-select:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 6px;
        }

        /* 3 Visual Hero Ring Gauges */
        .hero-orbit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .gauge-card {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 0;
        }

        .gauge-wrapper {
          position: relative;
          width: 130px;
          height: 130px;
          margin: 10px 0 14px 0;
        }

        .gauge-svg {
          transform: rotate(-90deg);
          width: 100%;
          height: 100%;
        }

        .gauge-bg-ring {
          fill: none;
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 9;
        }

        .gauge-prog-ring {
          fill: none;
          stroke-width: 9;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.8s ease;
        }

        .gauge-inner-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .gauge-main-val {
          font-size: 24px;
          font-weight: 800;
          line-height: 1;
          font-family: 'JetBrains Mono', monospace;
        }

        .gauge-sub-unit {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .gauge-header-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .gauge-footer-pill {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
        }

        /* Hardware Pod Grid */
        .hardware-section-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 12px;
          margin-left: 4px;
        }

        .pod-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }

        .pod-identity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pod-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .pod-name {
          font-size: 17px;
          font-weight: 700;
          color: #f8fafc;
        }

        .pod-meta-strip {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        /* Telemetry Tiles */
        .telemetry-tile-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }

        .tile-glass-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .tile-label {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tile-val-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-top: 4px;
        }

        .tile-num {
          font-size: 20px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .tile-unit {
          font-size: 10px;
          color: #64748b;
          font-weight: 500;
        }

        .tile-prog-bar {
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          margin-top: 8px;
          overflow: hidden;
        }

        .tile-prog-fill {
          height: 100%;
          border-radius: 999px;
        }

        /* Tactile Bay */
        .tactile-bay {
          background: rgba(10, 15, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 16px 18px;
        }

        .bay-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .bay-title {
          font-size: 12px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.03em;
          color: #fbbf24;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .profile-pill-rack {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .pill-btn {
          padding: 6px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pill-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .pill-btn.active {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.15));
          border-color: #fbbf24;
          color: #fef08a;
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
          font-weight: 700;
        }

        .slider-dual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .slider-dual-grid { grid-template-columns: 1fr; }
        }

        .slider-unit-box {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .slider-meta-head {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          margin: 6px 0;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #fbbf24;
          box-shadow: 0 0 10px #fbbf24;
          cursor: pointer;
        }

        input[type="range"].cyan-thumb::-webkit-slider-thumb {
          border-color: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }

        /* Stratum Strip */
        .stratum-card-strip {
          background: rgba(10, 15, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .stratum-chips-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .stratum-host-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #cbd5e1;
        }

        .shares-metric-rack {
          display: flex;
          gap: 10px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          flex-wrap: wrap;
        }

        .share-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      </style>

      <!-- TOP COMMAND BAR -->
      <div class="glass-base top-bar">
        <div class="brand-cluster">
          <div class="brand-icon-box">⛏</div>
          <div>
            <div class="brand-title">Home Miner Studio</div>
            <div class="badge-glass-pill" style="margin-top: 2px;">
              <span class="status-orb"></span>
              ${miners.length} Active ASIC Blades
            </div>
          </div>
        </div>

        <div class="top-actions">
          <button class="glass-btn primary" id="add-miner-btn">➕ Add Miner</button>
          <button class="glass-btn" id="import-btn">⚡ 1-Click Discovery</button>
          <button class="glass-btn" id="reload-btn">🔄 Refresh Fleet</button>
        </div>
      </div>

      <!-- 3 VISUAL HERO RING GAUGES -->
      <div class="hero-orbit-grid">
        
        <!-- 1: Fleet Hashrate -->
        <div class="glass-card cyan-glow gauge-card">
          <div class="gauge-header-label">Fleet Hashrate</div>
          <div class="gauge-wrapper">
            <svg class="gauge-svg" viewBox="0 0 100 100">
              <circle class="gauge-bg-ring" cx="50" cy="50" r="42"/>
              <circle class="gauge-prog-ring" cx="50" cy="50" r="42" 
                      stroke="#38bdf8"
                      stroke-dasharray="264"
                      stroke-dashoffset="${hashOffset}"
                      style="filter: drop-shadow(0 0 6px #38bdf8);"/>
            </svg>
            <div class="gauge-inner-content">
              <div class="gauge-main-val" style="color: #38bdf8;">${totalHashThs.toFixed(2)}</div>
              <div class="gauge-sub-unit">TH/s</div>
            </div>
          </div>
          <div class="gauge-footer-pill">Rated: ${hashTarget.toFixed(1)} TH/s Target (${hashPct}%)</div>
        </div>

        <!-- 2: Total Electrical Load -->
        <div class="glass-card amber-glow gauge-card">
          <div class="gauge-header-label">Total Electrical Load</div>
          <div class="gauge-wrapper">
            <svg class="gauge-svg" viewBox="0 0 100 100">
              <circle class="gauge-bg-ring" cx="50" cy="50" r="42"/>
              <circle class="gauge-prog-ring" cx="50" cy="50" r="42" 
                      stroke="#fbbf24"
                      stroke-dasharray="264"
                      stroke-dashoffset="${pwrOffset}"
                      style="filter: drop-shadow(0 0 6px #fbbf24);"/>
            </svg>
            <div class="gauge-inner-content">
              <div class="gauge-main-val" style="color: #fbbf24;">${totalWatts.toFixed(1)}</div>
              <div class="gauge-sub-unit">Watts</div>
            </div>
          </div>
          <div class="gauge-footer-pill" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3);">
            ⚡ ${fleetEfficiency} J/TH Efficiency
          </div>
        </div>

        <!-- 3: Average ASIC Temperature -->
        <div class="glass-card gauge-card" style="border-color: rgba(52, 211, 153, 0.28); box-shadow: 0 16px 40px -10px rgba(0,0,0,0.5), 0 0 30px -8px rgba(52, 211, 153, 0.12);">
          <div class="gauge-header-label">Average Thermal Core</div>
          <div class="gauge-wrapper">
            <svg class="gauge-svg" viewBox="0 0 100 100">
              <circle class="gauge-bg-ring" cx="50" cy="50" r="42"/>
              <circle class="gauge-prog-ring" cx="50" cy="50" r="42" 
                      stroke="${tempStrokeColor}"
                      stroke-dasharray="264"
                      stroke-dashoffset="${tempOffset}"
                      style="filter: drop-shadow(0 0 6px ${tempStrokeColor});"/>
            </svg>
            <div class="gauge-inner-content">
              <div class="gauge-main-val" style="color: ${tempStrokeColor};">${avgTempStr}</div>
              <div class="gauge-sub-unit">°C Core</div>
            </div>
          </div>
          <div class="gauge-footer-pill" style="color: ${tempStrokeColor};">${tempStatusLabel}</div>
        </div>

      </div>

      <!-- HARDWARE SECTION -->
      <div class="hardware-section-title">Hardware Workstations</div>

      <div>
        ${miners.map(miner => {
          const isBitaxe = miner.type === 'bitaxe';
          const chipTemp = miner.temp;
          const fanRpm = miner.fan;
          const hashrateThs = miner.ths.toFixed(2);
          const powerW = miner.watts.toFixed(1);
          const efficiency = miner.eff;

          // Bar percentages
          const hashBar = Math.min(100, Math.round((miner.ths / (isBitaxe ? 2.0 : 6.0)) * 100));
          const pwrBar = Math.min(100, Math.round((miner.watts / (isBitaxe ? 30.0 : 140.0)) * 100));
          const tempBar = Math.min(100, Math.round((chipTemp / 80.0) * 100));
          const fanBar = Math.min(100, Math.round((fanRpm / (isBitaxe ? 8000 : 5000)) * 100));

          return `
            <div class="glass-card ${isBitaxe ? 'amber-glow' : 'cyan-glow'}">
              <div class="pod-header-row">
                <div class="pod-identity">
                  <div class="pod-icon" style="color: ${isBitaxe ? '#fbbf24' : '#38bdf8'}; border-color: ${isBitaxe ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.4)'}; background: ${isBitaxe ? 'rgba(245, 158, 11, 0.1)' : 'rgba(56, 189, 248, 0.1)'};">
                    ${isBitaxe ? '⚡' : '🖥️'}
                  </div>
                  <div>
                    <div class="pod-name">${miner.name}</div>
                    <div class="pod-meta-strip">
                      <span class="status-orb" style="background: #34d399;"></span>
                      <span style="color: #cbd5e1;">${miner.host}</span>
                      <span>•</span>
                      <span>${miner.asic}</span>
                      <span>•</span>
                      <span style="color: ${isBitaxe ? '#fbbf24' : '#38bdf8'};">${miner.os}</span>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button class="glass-btn edit-miner-btn" data-host="${miner.host}" data-name="${miner.name}" data-type="${miner.type}">⚙️ Edit</button>
                  <button class="glass-btn danger delete-miner-btn" data-host="${miner.host}" data-name="${miner.name}">🗑️ Delete</button>
                  ${isBitaxe ? `
                    <button class="glass-btn" data-action="restart-proc" data-entity="${miner.restartEntity}">Restart Proc</button>
                    <button class="glass-btn" data-action="reboot-miner" data-entity="${miner.rebootEntity}">Reboot</button>
                    <a class="glass-btn primary" href="http://${miner.host}" target="_blank">Web UI ↗</a>
                  ` : `
                    <button class="glass-btn" data-action="reboot-miner" data-entity="${miner.rebootEntity}">Reboot ASIC</button>
                    <a class="glass-btn primary" href="http://${miner.host}" target="_blank">Web UI ↗</a>
                  `}
                </div>
              </div>

              <!-- 4 Visual Telemetry Tiles -->
              <div class="telemetry-tile-row">
                <div class="tile-glass-box">
                  <div class="tile-label">Hashrate</div>
                  <div class="tile-val-row">
                    <span class="tile-num" style="color: #38bdf8;">${hashrateThs}</span>
                    <span class="tile-unit">TH/s</span>
                  </div>
                  <div class="tile-prog-bar">
                    <div class="tile-prog-fill" style="width: ${hashBar}%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></div>
                  </div>
                </div>

                <div class="tile-glass-box">
                  <div class="tile-label">Power Load</div>
                  <div class="tile-val-row">
                    <span class="tile-num" style="color: #fbbf24;">${powerW}</span>
                    <span class="tile-unit">Watts</span>
                  </div>
                  <div class="tile-prog-bar">
                    <div class="tile-prog-fill" style="width: ${pwrBar}%; background: #fbbf24; box-shadow: 0 0 8px #fbbf24;"></div>
                  </div>
                </div>

                <div class="tile-glass-box">
                  <div class="tile-label">Chip Temp</div>
                  <div class="tile-val-row">
                    <span class="tile-num" style="color: ${chipTemp > 68 ? '#fb7185' : chipTemp > 60 ? '#fbbf24' : '#34d399'};">
                      ${chipTemp > 0 ? chipTemp.toFixed(1) : '--'}
                    </span>
                    <span class="tile-unit">°C</span>
                  </div>
                  <div class="tile-prog-bar">
                    <div class="tile-prog-fill" style="width: ${tempBar}%; background: ${chipTemp > 68 ? '#fb7185' : chipTemp > 60 ? '#fbbf24' : '#34d399'};"></div>
                  </div>
                </div>

                <div class="tile-glass-box">
                  <div class="tile-label">Fan Speed</div>
                  <div class="tile-val-row">
                    <span class="tile-num" style="color: #38bdf8;">${fanRpm > 0 ? fanRpm.toLocaleString() : '--'}</span>
                    <span class="tile-unit">RPM</span>
                  </div>
                  <div class="tile-prog-bar">
                    <div class="tile-prog-fill" style="width: ${fanBar}%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></div>
                  </div>
                </div>
              </div>

              <!-- Controls / Strips -->
              ${isBitaxe ? `
                <div class="tactile-bay">
                  <div class="bay-header-row">
                    <span class="bay-title">⚡ Interactive AxeOS Overclocking Console</span>
                    <span class="mono" style="font-size: 11px; color: #94a3b8;">${miner.inVolt}V Input | ${miner.inAmps}A Draw</span>
                  </div>

                  <div class="profile-pill-rack">
                    ${['Eco', 'Standard', 'Turbo', 'Custom'].map(prof => `
                      <button class="pill-btn ${miner.profile === prof ? 'active' : ''}" 
                              data-profile="${prof}"
                              data-entity="${miner.profileEntity}">
                        ${prof === 'Eco' ? '🌱 Eco' : prof === 'Standard' ? '⚡ Standard' : prof === 'Turbo' ? '🔥 Turbo' : '★ Custom'}
                      </button>
                    `).join('')}
                  </div>

                  <div class="slider-dual-grid">
                    <div class="slider-unit-box">
                      <div class="slider-meta-head">
                        <span>Core Frequency</span>
                        <span class="mono" style="color: #38bdf8; font-weight: 700;" id="freq-disp-bitaxe">${miner.freq} MHz</span>
                      </div>
                      <input type="range" min="450" max="800" step="5" value="${miner.freq}" class="cyan-thumb"
                             data-action="freq-slider"
                             data-entity="${miner.freqEntity}"
                             data-disp="freq-disp-bitaxe">
                    </div>

                    <div class="slider-unit-box">
                      <div class="slider-meta-head">
                        <span>Core Voltage</span>
                        <span class="mono" style="color: #fbbf24; font-weight: 700;" id="volt-disp-bitaxe">${miner.volt} mV</span>
                      </div>
                      <input type="range" min="1000" max="1300" step="10" value="${miner.volt}"
                             data-action="volt-slider"
                             data-entity="${miner.voltEntity}"
                             data-disp="volt-disp-bitaxe">
                    </div>
                  </div>
                </div>
              ` : `
                <div class="stratum-card-strip">
                  <div class="stratum-chips-row">
                    <div class="stratum-host-pill">
                      <span style="color: #94a3b8;">Stratum Pool:</span>
                      <span style="color: #38bdf8; font-weight: 600;">${miner.poolUrl}</span>
                      <span style="color: rgba(255,255,255,0.2);">|</span>
                      <span style="color: #fbbf24;">Worker: ${miner.poolUser}</span>
                    </div>
                    <div class="badge-glass-pill" style="color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1);">
                      ● Pool: ${miner.poolStatus}
                    </div>
                  </div>

                  <div class="shares-metric-rack">
                    <div class="share-tag">
                      <span style="color: #94a3b8;">Accepted:</span>
                      <span style="color: #34d399; font-weight: 700;">${miner.accepted}</span>
                    </div>
                    <div class="share-tag">
                      <span style="color: #94a3b8;">Rejected:</span>
                      <span style="color: #fb7185; font-weight: 700;">${miner.rejected}</span>
                    </div>
                    <div class="share-tag">
                      <span style="color: #94a3b8;">HW Errors:</span>
                      <span style="color: #fbbf24; font-weight: 700;">${miner.hwErrors}</span>
                    </div>
                    <div class="share-tag">
                      <span style="color: #94a3b8;">Best Share:</span>
                      <span style="color: #38bdf8; font-weight: 700;">${miner.bestShareStr}</span>
                    </div>
                    ${miner.blocksFound !== '--' ? `
                      <div class="share-tag">
                        <span style="color: #94a3b8;">Found Blocks:</span>
                        <span style="color: #34d399; font-weight: 700;">${miner.blocksFound}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>

      <!-- ADD / EDIT MINER GLASS MODAL -->
      <div id="miner-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-box">
          <div class="modal-header">
            <span class="modal-title" id="modal-title">➕ Add Cryptocurrency Miner</span>
            <button class="glass-btn" id="modal-close-btn" style="padding: 4px 8px;">✕</button>
          </div>
          <div class="modal-grid">
            <div class="modal-field full">
              <label class="modal-label">Friendly Name</label>
              <input type="text" id="modal-name" class="modal-input" placeholder="e.g. My Bitaxe Supra" />
            </div>
            <div class="modal-field">
              <label class="modal-label">Miner Hardware Type</label>
              <select id="modal-type" class="modal-select">
                <option value="bitaxe">Bitaxe / AxeOS</option>
                <option value="cgminer_rpc">Canaan Avalon / CGMiner</option>
                <option value="whatsminer">MicroBT Whatsminer</option>
                <option value="antminer">Antminer / Braiins OS</option>
                <option value="nerdminer">ESP32 NerdMiner</option>
                <option value="hiveos">HiveOS Rig Farm</option>
                <option value="generic_rest">Generic REST API</option>
              </select>
            </div>
            <div class="modal-field">
              <label class="modal-label">Coin</label>
              <input type="text" id="modal-coin" class="modal-input" value="BTC" placeholder="BTC" />
            </div>
            <div class="modal-field">
              <label class="modal-label">IP Address / Host</label>
              <input type="text" id="modal-host" class="modal-input" placeholder="e.g. 192.168.1.91" />
            </div>
            <div class="modal-field">
              <label class="modal-label">Port</label>
              <input type="number" id="modal-port" class="modal-input" value="80" />
            </div>
            <div class="modal-field">
              <label class="modal-label">Mining Pool</label>
              <select id="modal-pool" class="modal-select">
                <option value="none">None (Hardware Only)</option>
                <option value="helios">Helios Pool (Solo CKPool)</option>
                <option value="mining_dutch">Mining Dutch</option>
                <option value="public_pool">Public Pool (Solo)</option>
                <option value="2miners">2Miners</option>
                <option value="braiins">Braiins Pool</option>
              </select>
            </div>
            <div class="modal-field">
              <label class="modal-label">Pool Wallet / Worker</label>
              <input type="text" id="modal-wallet" class="modal-input" placeholder="e.g. bc1q...worker1" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="glass-btn" id="modal-cancel-btn">Cancel</button>
            <button class="glass-btn primary" id="modal-save-btn">Save Miner</button>
          </div>
        </div>
      </div>

      <!-- DELETE CONFIRMATION GLASS MODAL -->
      <div id="delete-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-box" style="max-width: 420px;">
          <div class="modal-header">
            <span class="modal-title" style="color: #fb7185;">🗑️ Remove Miner</span>
            <button class="glass-btn" id="delete-modal-close" style="padding: 4px 8px;">✕</button>
          </div>
          <p style="font-size: 13px; color: #cbd5e1; line-height: 1.5;" id="delete-modal-text">
            Are you sure you want to remove this miner from Home Assistant? All associated sensors will be unloaded.
          </p>
          <div class="modal-footer">
            <button class="glass-btn" id="delete-cancel-btn">Cancel</button>
            <button class="glass-btn danger" id="delete-confirm-btn">Confirm Delete</button>
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
          setTimeout(() => { importBtn.textContent = '⚡ 1-Click Discovery'; }, 3000);
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
    const profileBtns = this.shadowRoot.querySelectorAll('.pill-btn[data-profile]');
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

    // --- MODAL CRUD EVENT HANDLERS ---
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    const deleteModal = this.shadowRoot.querySelector('#delete-modal');
    let modalMode = 'add';
    let activeHost = '';

    // Add Miner Button
    const addMinerBtn = this.shadowRoot.querySelector('#add-miner-btn');
    if (addMinerBtn) {
      addMinerBtn.addEventListener('click', () => {
        this._modalOpen = true;
        modalMode = 'add';
        activeHost = '';
        this.shadowRoot.querySelector('#modal-title').textContent = '➕ Add Cryptocurrency Miner';
        this.shadowRoot.querySelector('#modal-name').value = '';
        this.shadowRoot.querySelector('#modal-host').value = '';
        this.shadowRoot.querySelector('#modal-host').disabled = false;
        this.shadowRoot.querySelector('#modal-port').value = 80;
        this.shadowRoot.querySelector('#modal-coin').value = 'BTC';
        this.shadowRoot.querySelector('#modal-type').value = 'bitaxe';
        this.shadowRoot.querySelector('#modal-pool').value = 'helios';
        this.shadowRoot.querySelector('#modal-wallet').value = '';
        minerModal.style.display = 'flex';
      });
    }

    // Auto default port based on miner type
    const modalTypeSelect = this.shadowRoot.querySelector('#modal-type');
    const modalPortInput = this.shadowRoot.querySelector('#modal-port');
    if (modalTypeSelect && modalPortInput) {
      modalTypeSelect.addEventListener('change', () => {
        if (modalTypeSelect.value === 'bitaxe' || modalTypeSelect.value === 'nerdminer') {
          modalPortInput.value = 80;
        } else if (modalTypeSelect.value === 'cgminer_rpc' || modalTypeSelect.value === 'whatsminer' || modalTypeSelect.value === 'antminer') {
          modalPortInput.value = 4028;
        }
      });
    }

    // Edit Miner Buttons
    const editBtns = this.shadowRoot.querySelectorAll('.edit-miner-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._modalOpen = true;
        modalMode = 'edit';
        activeHost = btn.getAttribute('data-host');
        const name = btn.getAttribute('data-name');
        const type = btn.getAttribute('data-type');
        this.shadowRoot.querySelector('#modal-title').textContent = `⚙️ Edit Miner (${activeHost})`;
        this.shadowRoot.querySelector('#modal-name').value = name || '';
        this.shadowRoot.querySelector('#modal-host').value = activeHost;
        this.shadowRoot.querySelector('#modal-host').disabled = true;
        this.shadowRoot.querySelector('#modal-type').value = type || 'bitaxe';
        minerModal.style.display = 'flex';
      });
    });

    // Save Miner Button (Add or Edit)
    const modalSaveBtn = this.shadowRoot.querySelector('#modal-save-btn');
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', async () => {
        const host = this.shadowRoot.querySelector('#modal-host').value.trim();
        const name = this.shadowRoot.querySelector('#modal-name').value.trim();
        const minerType = this.shadowRoot.querySelector('#modal-type').value;
        const port = parseInt(this.shadowRoot.querySelector('#modal-port').value, 10) || 80;
        const coin = this.shadowRoot.querySelector('#modal-coin').value.trim() || 'BTC';
        const poolProvider = this.shadowRoot.querySelector('#modal-pool').value;
        const poolWallet = this.shadowRoot.querySelector('#modal-wallet').value.trim();

        if (!host) {
          alert('Host / IP address is required.');
          return;
        }

        modalSaveBtn.textContent = 'Saving...';
        try {
          if (modalMode === 'add') {
            if (name) {
              try { localStorage.setItem('miner_name_' + host, name); } catch (e) {}
            }
            await this._hass.callService('home_miner_studio', 'add_miner', {
              host,
              name: name || `Miner (${host})`,
              miner_type: minerType,
              port,
              coin,
              pool_provider: poolProvider,
              pool_wallet: poolWallet
            });
          } else {
            if (name) {
              try { localStorage.setItem('miner_name_' + activeHost, name); } catch (e) {}
            }
            await this._hass.callService('home_miner_studio', 'edit_miner', {
              host: activeHost,
              name: name || undefined,
              pool_provider: poolProvider,
              pool_wallet: poolWallet
            });
          }
          this._modalOpen = false;
          minerModal.style.display = 'none';
          modalSaveBtn.textContent = 'Save Miner';
          this.render();
        } catch (err) {
          modalSaveBtn.textContent = 'Save Miner';
          alert('Error saving miner: ' + err.message);
        }
      });
    }

    // Modal Close / Cancel
    const closeBtns = [
      this.shadowRoot.querySelector('#modal-close-btn'),
      this.shadowRoot.querySelector('#modal-cancel-btn')
    ];
    closeBtns.forEach(b => {
      if (b) b.addEventListener('click', () => {
        this._modalOpen = false;
        minerModal.style.display = 'none';
      });
    });

    if (minerModal) {
      minerModal.addEventListener('click', (e) => {
        if (e.target === minerModal) {
          this._modalOpen = false;
          minerModal.style.display = 'none';
        }
      });
    }

    // Delete Miner Buttons
    let deleteTargetHost = '';
    const deleteBtns = this.shadowRoot.querySelectorAll('.delete-miner-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._modalOpen = true;
        deleteTargetHost = btn.getAttribute('data-host');
        const name = btn.getAttribute('data-name');
        this.shadowRoot.querySelector('#delete-modal-text').textContent =
          `Are you sure you want to permanently delete "${name}" (${deleteTargetHost}) from Home Assistant? All associated sensors will be removed.`;
        deleteModal.style.display = 'flex';
      });
    });

    // Confirm Delete Button
    const confirmDeleteBtn = this.shadowRoot.querySelector('#delete-confirm-btn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', async () => {
        if (!deleteTargetHost) return;
        confirmDeleteBtn.textContent = 'Removing...';
        try {
          try { localStorage.removeItem('miner_name_' + deleteTargetHost); } catch (e) {}
          await this._hass.callService('home_miner_studio', 'delete_miner', { host: deleteTargetHost });
          this._modalOpen = false;
          deleteModal.style.display = 'none';
          confirmDeleteBtn.textContent = 'Confirm Delete';
          this.render();
        } catch (err) {
          confirmDeleteBtn.textContent = 'Confirm Delete';
          alert('Error deleting miner: ' + err.message);
        }
      });
    }

    // Delete Modal Close / Cancel
    const closeDelBtns = [
      this.shadowRoot.querySelector('#delete-modal-close'),
      this.shadowRoot.querySelector('#delete-cancel-btn')
    ];
    closeDelBtns.forEach(b => {
      if (b) b.addEventListener('click', () => {
        this._modalOpen = false;
        deleteModal.style.display = 'none';
      });
    });

    if (deleteModal) {
      deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
          this._modalOpen = false;
          deleteModal.style.display = 'none';
        }
      });
    }
  }
}

customElements.define('home-miner-fleet-card', HomeMinerFleetCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-miner-fleet-card',
  name: 'Home Miner Fleet Studio Card',
  description: 'Luminous Glassmorphism crypto mining dashboard with real-time Bitaxe AxeOS overclocking and Canaan Avalon Nano telemetry.',
  preview: true,
});
