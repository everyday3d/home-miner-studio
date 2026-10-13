/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
 * Features:
 * - Fleet summary (Hashrate, Power, Efficiency J/TH, Cost/Day, Pool Unpaid Balance)
 * - Per-miner tiles with temperature thresholds (<65°C green, 65-75°C amber, >75°C red)
 * - Interactive 1-click Power Profile switcher (Eco, Standard, Turbo) for Bitaxe
 * - CGMiner multi-chain status indicator
 * - 1-click Miner Reboot button
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
      const match = eid.match(/^(?:sensor|binary_sensor|button|number|select)\.([a-zA-Z0-9_]+?)_(hashrate_th_s|hashrate_ths|hashrate_gh_s|hashrate_ghs|power_draw|efficiency|daily_electricity_cost|chip_temperature|vr_temperature|fan_speed|core_voltage|target_frequency|power_profile|connectivity|overheat_alert|reboot_miner|pool_unpaid_balance|pool_24h_revenue|hardware_errors)$/);
      if (match) {
        const [_, prefix, metric] = match;
        const normMetric = metric.replace('_th_s', '_ths').replace('_gh_s', '_ghs');
        if (!deviceGroups[prefix]) {
          let displayName = prefix.replace(/_/g, ' ');
          if (prefix.includes('192_168_')) {
            displayName = 'Avalon Nano 3S (' + prefix.replace(/_/g, '.') + ')';
          } else {
            displayName = displayName.replace(/\b\w/g, l => l.toUpperCase());
          }
          deviceGroups[prefix] = {
            prefix,
            name: displayName,
            entities: {}
          };
        }
        deviceGroups[prefix].entities[normMetric] = { entity_id: eid, state: states[eid] };
      }
    });

    let totalHashThs = 0;
    let totalWatts = 0;
    let totalCost = 0;
    let totalUnpaid = 0;
    const miners = [];

    Object.values(deviceGroups).forEach(group => {
      const e = group.entities;
      const ths = parseFloat(e.hashrate_ths?.state?.state || 0) || (parseFloat(e.hashrate_ghs?.state?.state || 0) / 1000);
      const watts = parseFloat(e.power_draw?.state?.state || 0);
      const cost = parseFloat(e.daily_electricity_cost?.state?.state || 0);
      const unpaid = parseFloat(e.pool_unpaid_balance?.state?.state || 0);

      totalHashThs += ths;
      totalWatts += watts;
      totalCost += cost;
      totalUnpaid += unpaid;

      miners.push({
        ...group,
        ths,
        watts,
        cost,
        unpaid,
      });
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
          padding: 22px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .title {
          font-size: 1.3rem;
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
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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
          margin-left: 3px;
        }
        .miners-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .miner-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .miner-card:hover {
          background: rgba(255,255,255,0.035);
          border-color: rgba(255,255,255,0.12);
        }
        .miner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .miner-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .status-dot.offline {
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
        }
        .status-dot.warning {
          background: #f59e0b;
          box-shadow: 0 0 10px #f59e0b;
        }
        .miner-name {
          font-weight: 600;
          font-size: 1.05rem;
          text-transform: capitalize;
        }
        .miner-telemetry-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 10px;
        }
        .telem-box {
          background: rgba(0,0,0,0.25);
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
        }
        .telem-label {
          font-size: 0.7rem;
          color: #8b949e;
          text-transform: uppercase;
        }
        .telem-value {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-top: 2px;
        }
        .temp-ok { color: #10b981; }
        .temp-warn { color: #f59e0b; }
        .temp-hot { color: #ef4444; }

        /* Power Profile Pill Selector */
        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .profiles-bar {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .profile-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #8b949e;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .profile-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .profile-btn.active {
          background: rgba(247, 147, 26, 0.2);
          border-color: #f7931a;
          color: #f7931a;
        }
        .action-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .action-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }
        .import-action-btn {
          background: #f7931a;
          color: #000;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .import-action-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
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
            <div class="stat-label">Total Power</div>
            <div class="stat-val">${totalWatts.toFixed(0)}<span class="stat-unit">W</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Avg Efficiency</div>
            <div class="stat-val">${fleetEfficiency}<span class="stat-unit">J/TH</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Power Cost/Day</div>
            <div class="stat-val">$${totalCost.toFixed(2)}</div>
          </div>
          ${totalUnpaid > 0 ? `
            <div class="stat-card">
              <div class="stat-label">Unpaid Balance</div>
              <div class="stat-val">${totalUnpaid.toFixed(6)}</div>
            </div>
          ` : ''}
        </div>

        ${miners.length === 0 ? `
          <div class="empty-state">
            <div style="font-size:1.1rem; font-weight:700; margin-bottom:8px; color:#fff;">No Active Miners Configured</div>
            <div style="margin-bottom:18px; color:#8b949e; max-width:400px; margin-left:auto; margin-right:auto; line-height:1.4;">
              Auto-detect Bitaxe, Antminer, NerdMiner, or HiveOS devices from your existing Home Assistant integrations.
            </div>
            <button id="import-btn" class="import-action-btn">
              ⚡ 1-Click Auto-Import from Home Assistant
            </button>
            <div id="import-status" style="margin-top:10px; font-size:0.8rem; color:#f7931a; display:none;"></div>
          </div>
        ` : `
          <div class="miners-list">
            ${miners.map(m => {
              const e = m.entities;
              const isOffline = e.connectivity?.state?.state === 'off';
              const isOverheat = e.overheat_alert?.state?.state === 'on';
              const tempVal = parseFloat(e.chip_temperature?.state?.state || 0);
              const tempClass = tempVal >= 75 ? 'temp-hot' : (tempVal >= 65 ? 'temp-warn' : 'temp-ok');
              const activeProfile = e.power_profile?.state?.state || 'Standard';

              return `
                <div class="miner-card">
                  <div class="miner-header">
                    <div class="miner-meta">
                      <div class="status-dot ${isOffline ? 'offline' : (isOverheat ? 'warning' : '')}"></div>
                      <div class="miner-name">${m.name}</div>
                    </div>
                    <div style="font-size:0.8rem; color:#8b949e;">
                      ${e.fan_speed?.state?.state ? e.fan_speed.state.state + ' RPM' : ''}
                    </div>
                  </div>

                  <div class="miner-telemetry-row">
                    <div class="telem-box">
                      <span class="telem-label">Hashrate</span>
                      <span class="telem-value">${m.ths.toFixed(2)} TH/s</span>
                    </div>
                    <div class="telem-box">
                      <span class="telem-label">Power</span>
                      <span class="telem-value">${m.watts.toFixed(0)} W</span>
                    </div>
                    <div class="telem-box">
                      <span class="telem-label">Chip Temp</span>
                      <span class="telem-value ${tempClass}">${tempVal > 0 ? tempVal + '°C' : '--'}</span>
                    </div>
                    ${e.efficiency?.state?.state ? `
                      <div class="telem-box">
                        <span class="telem-label">Efficiency</span>
                        <span class="telem-value">${parseFloat(e.efficiency.state.state).toFixed(1)} J/TH</span>
                      </div>
                    ` : ''}
                  </div>

                  <div class="controls-row">
                    ${e.power_profile?.entity_id ? `
                      <div class="profiles-bar">
                        <span style="font-size:0.75rem; color:#8b949e; margin-right:4px;">Profile:</span>
                        ${['Eco', 'Standard', 'Turbo'].map(p => `
                          <button class="profile-btn ${activeProfile === p ? 'active' : ''}" 
                                  data-entity="${e.power_profile.entity_id}" 
                                  data-profile="${p}">
                            ${p}
                          </button>
                        `).join('')}
                      </div>
                    ` : `<div></div>`}

                    ${e.reboot_miner?.entity_id ? `
                      <button class="action-btn" data-reboot="${e.reboot_miner.entity_id}">
                        Reboot
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    // Attach click handlers for profiles and reboot
    this.shadowRoot.querySelectorAll('.profile-btn').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const entityId = ev.target.dataset.entity;
        const profile = ev.target.dataset.profile;
        if (entityId && profile && this._hass) {
          this._hass.callService('select', 'select_option', {
            entity_id: entityId,
            option: profile
          });
        }
      });
    });

    this.shadowRoot.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const entityId = ev.target.dataset.reboot;
        if (entityId && this._hass) {
          this._hass.callService('button', 'press', {
            entity_id: entityId
          });
        }
      });
    });

    const importBtn = this.shadowRoot.querySelector('#import-btn');
    if (importBtn) {
      importBtn.addEventListener('click', async () => {
        const statusEl = this.shadowRoot.querySelector('#import-status');
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.textContent = 'Scanning existing integrations and importing...';
        }
        if (this._hass) {
          try {
            await this._hass.callService('home_miner_studio', 'import_existing_miners', {});
            if (statusEl) {
              statusEl.textContent = 'Import triggered! Waiting for device sync...';
            }
          } catch (err) {
            if (statusEl) {
              statusEl.textContent = 'Import service call failed: ' + err.message;
            }
          }
        }
      });
    }
  }
}

customElements.define('home-miner-fleet-card', HomeMinerFleetCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-miner-fleet-card',
  name: 'Home Miner Fleet Card',
  description: 'Displays fleet hashrate, efficiency, power draw, temperature health, and Bitaxe power profile toggles.',
  preview: true,
});
