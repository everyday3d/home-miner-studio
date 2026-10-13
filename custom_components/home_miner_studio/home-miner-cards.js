/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
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

    // Discover all home_miner_studio entities
    const states = this._hass.states;
    const minerSensors = Object.keys(states).filter(eid => 
      eid.startsWith('sensor.') && (eid.includes('hashrate_ths') || eid.includes('hashrate_ghs'))
    );

    let totalHashThs = 0;
    let totalWatts = 0;
    let totalCost = 0;
    const miners = [];

    // Group entities by prefix/device
    const deviceGroups = {};
    Object.keys(states).forEach(eid => {
      if (eid.startsWith('sensor.') || eid.startsWith('binary_sensor.') || eid.startsWith('button.')) {
        const match = eid.match(/^(?:sensor|binary_sensor|button)\.([a-zA-Z0-9_]+?)_(hashrate_ths|hashrate_ghs|power_draw|efficiency|daily_electricity_cost|chip_temperature|fan_speed|connectivity|overheat_alert|reboot_miner)$/);
        if (match) {
          const [_, prefix, metric] = match;
          if (!deviceGroups[prefix]) deviceGroups[prefix] = { prefix, name: prefix.replace(/_/g, ' ') };
          deviceGroups[prefix][metric] = states[eid];
        }
      }
    });

    Object.values(deviceGroups).forEach(group => {
      const ths = parseFloat(group.hashrate_ths?.state || 0) || (parseFloat(group.hashrate_ghs?.state || 0) / 1000);
      const watts = parseFloat(group.power_draw?.state || 0);
      const cost = parseFloat(group.daily_electricity_cost?.state || 0);
      totalHashThs += ths;
      totalWatts += watts;
      totalCost += cost;
      miners.push({ ...group, ths, watts, cost });
    });

    const fleetEfficiency = totalHashThs > 0 ? (totalWatts / totalHashThs).toFixed(1) : '0.0';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          color: var(--primary-text-color, #e0e6ed);
        }
        .card-container {
          background: var(--card-background-color, #131722);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #f7931a; /* Bitcoin orange */
        }
        .badge {
          background: rgba(247, 147, 26, 0.15);
          color: #f7931a;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 12px 14px;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--secondary-text-color, #8b949e);
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .stat-val {
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
        }
        .stat-unit {
          font-size: 0.8rem;
          font-weight: 400;
          color: #8b949e;
          margin-left: 2px;
        }
        .miners-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .miner-row {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.2s ease;
        }
        .miner-row:hover {
          background: rgba(255,255,255,0.04);
        }
        .miner-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981; /* Green */
          box-shadow: 0 0 10px #10b981;
        }
        .status-dot.offline {
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
        }
        .miner-name {
          font-weight: 600;
          font-size: 0.95rem;
          text-transform: capitalize;
        }
        .miner-telemetry {
          display: flex;
          gap: 18px;
          align-items: center;
          font-size: 0.85rem;
        }
        .telemetry-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .telemetry-label {
          font-size: 0.7rem;
          color: #8b949e;
        }
        .telemetry-value {
          font-weight: 600;
        }
        .empty-state {
          text-align: center;
          padding: 30px;
          color: #8b949e;
          font-size: 0.9rem;
        }
      </style>

      <div class="card-container">
        <div class="header">
          <div class="title">
            <span>⚡</span>
            <span>Home Miner Studio</span>
          </div>
          <span class="badge">${miners.length} Active Rig${miners.length === 1 ? '' : 's'}</span>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Fleet Hashrate</div>
            <div class="stat-val">${totalHashThs.toFixed(2)}<span class="stat-unit">TH/s</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Power Draw</div>
            <div class="stat-val">${totalWatts.toFixed(0)}<span class="stat-unit">W</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Efficiency</div>
            <div class="stat-val">${fleetEfficiency}<span class="stat-unit">J/TH</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Est. Cost/Day</div>
            <div class="stat-val">$${totalCost.toFixed(2)}</div>
          </div>
        </div>

        ${miners.length === 0 ? `
          <div class="empty-state">
            No active mining devices found. Configure a miner in Settings > Devices & Services.
          </div>
        ` : `
          <div class="miners-list">
            ${miners.map(m => `
              <div class="miner-row">
                <div class="miner-meta">
                  <div class="status-dot ${m.connectivity?.state === 'off' ? 'offline' : ''}"></div>
                  <div class="miner-name">${m.name}</div>
                </div>
                <div class="miner-telemetry">
                  <div class="telemetry-item">
                    <span class="telemetry-label">Hashrate</span>
                    <span class="telemetry-value">${m.ths.toFixed(2)} TH/s</span>
                  </div>
                  <div class="telemetry-item">
                    <span class="telemetry-label">Power</span>
                    <span class="telemetry-value">${m.watts.toFixed(0)} W</span>
                  </div>
                  <div class="telemetry-item">
                    <span class="telemetry-label">Temp</span>
                    <span class="telemetry-value">${m.chip_temperature?.state ? m.chip_temperature.state + '°C' : '--'}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('home-miner-fleet-card', HomeMinerFleetCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-miner-fleet-card',
  name: 'Home Miner Fleet Card',
  description: 'Displays fleet hashrate, efficiency, power draw, and per-miner metrics.',
  preview: true,
});
