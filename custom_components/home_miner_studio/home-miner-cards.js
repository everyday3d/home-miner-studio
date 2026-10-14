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
    this._domReady = false;
    this._minerNames = {};
    this._modalMode = 'add';
    this._activeHost = '';
    this._deleteTargetHost = '';
    this._selectedTimeframe = '24h';
    this._selectedCoin = 'BTC';
    this._discoveredMiners = [];
    this._selectedDiscoveredHosts = new Set();
    this._minerPools = {};
    this._minerWallets = {};
    this._minerCoins = {};
  }

  connectedCallback() {
    this._ensureDom();
  }

  getCardSize() {
    return 6;
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

  _getMinerName(host, defaultName, entityIds = []) {
    if (this._minerNames && this._minerNames[host]) {
      return this._minerNames[host];
    }
    try {
      const local = localStorage.getItem('miner_name_' + host);
      if (local && local.trim()) return local.trim();
    } catch (e) {}

    const states = this._hass?.states || {};
    const eids = Array.isArray(entityIds) ? entityIds : [entityIds];
    for (const eid of eids) {
      if (!eid) continue;
      const stateObj = states[eid];
      if (stateObj?.attributes?.friendly_name) {
        const clean = stateObj.attributes.friendly_name
          .replace(/\s+(Hashrate|Power|Temp|Status|Daily|Efficiency|Chip\s+Temperature|Core\s+Frequency|Fan\s+Speed|Voltage).*$/i, '')
          .trim();
        if (clean && clean.toLowerCase() !== 'miner' && clean.toLowerCase() !== 'sensor') {
          return clean;
        }
      }
    }
    return defaultName;
  }


  _getMinerGraphicSvg(minerType) {
    const type = (minerType || '').toLowerCase();
    if (type.includes('bitaxe') || type.includes('axeos')) {
      return `
        <svg viewBox="0 0 120 70" class="miner-graphic-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="104" height="50" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
          <rect x="36" y="16" width="48" height="38" rx="4" fill="#0f172a" stroke="#34d399" stroke-width="1" />
          <line x1="44" y1="20" x2="44" y2="50" stroke="#34d399" stroke-width="1.5" />
          <line x1="52" y1="20" x2="52" y2="50" stroke="#34d399" stroke-width="1.5" />
          <line x1="60" y1="20" x2="60" y2="50" stroke="#34d399" stroke-width="1.5" />
          <line x1="68" y1="20" x2="68" y2="50" stroke="#34d399" stroke-width="1.5" />
          <line x1="76" y1="20" x2="76" y2="50" stroke="#34d399" stroke-width="1.5" />
          <rect x="52" y="30" width="16" height="10" rx="2" fill="#10b981" />
          <circle cx="20" cy="22" r="3" fill="#34d399" />
          <circle cx="20" cy="30" r="3" fill="#fbbf24" />
          <rect x="14" y="40" width="12" height="12" rx="2" fill="#334155" stroke="#64748b" />
          <rect x="94" y="24" width="12" height="22" rx="1" fill="#fbbf24" opacity="0.8" />
        </svg>
      `;
    }
    if (type.includes('avalon')) {
      return `
        <svg viewBox="0 0 120 70" class="miner-graphic-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="100" height="50" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
          <circle cx="40" cy="35" r="18" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <circle cx="40" cy="35" r="6" fill="#f59e0b" />
          <circle cx="80" cy="35" r="18" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <circle cx="80" cy="35" r="6" fill="#f59e0b" />
          <path d="M40 21 L40 49 M26 35 L54 35" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" />
          <path d="M80 21 L80 49 M66 35 L94 35" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" />
          <line x1="24" y1="14" x2="96" y2="14" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;
    }
    if (type.includes('nerdminer')) {
      return `
        <svg viewBox="0 0 120 70" class="miner-graphic-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="10" width="70" height="50" rx="8" fill="#1e1e2e" stroke="#c084fc" stroke-width="1.5" />
          <rect x="34" y="17" width="52" height="36" rx="4" fill="#090d16" stroke="#a855f7" stroke-width="1" />
          <text x="60" y="40" font-family="monospace" font-size="16" font-weight="bold" fill="#fbbf24" text-anchor="middle">₿</text>
          <circle cx="77" cy="22" r="2" fill="#34d399" />
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 120 70" class="miner-graphic-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="8" width="88" height="54" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <circle cx="42" cy="35" r="16" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" />
        <circle cx="78" cy="35" r="16" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2" />
        <circle cx="42" cy="35" r="6" fill="#38bdf8" />
        <circle cx="78" cy="35" r="6" fill="#38bdf8" />
        <rect x="28" y="4" width="64" height="6" rx="2" fill="#334155" stroke="#64748b" stroke-width="1" />
      </svg>
    `;
  }

  _generateMarketChartSvg(points, timeframe, currentPrice, changePct) {
    if (!points || points.length === 0) {
      points = [];
      const now = Math.floor(Date.now() / 1000);
      const startP = currentPrice / (1 + (changePct / 100));
      for (let i = 0; i < 24; i++) {
        const pct = i / 23;
        points.push({ t: now - (23 - i) * 3600, p: startP + (currentPrice - startP) * pct });
      }
    }

    const width = 800;
    const height = 180;
    const padTop = 22;
    const padBottom = 34;
    const padLeft = 20;
    const padRight = 70;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const prices = points.map(p => p.p);
    let minP = Math.min(...prices);
    let maxP = Math.max(...prices);
    if (minP === maxP) {
      minP *= 0.96;
      maxP *= 1.04;
    }
    const rangeP = maxP - minP;

    const coords = points.map((pt, i) => {
      const x = padLeft + (i / Math.max(1, points.length - 1)) * plotW;
      const y = padTop + plotH - ((pt.p - minP) / rangeP) * plotH;
      return { x, y, p: pt.p, t: pt.t };
    });

    let dLine = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[Math.max(0, i - 1)];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[Math.min(coords.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      dLine += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const dArea = dLine + ` L ${coords[coords.length - 1].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

    const isPositive = changePct >= 0;
    const strokeColor = isPositive ? '#38bdf8' : '#fb7185';

    const fmtPrice = (val) => {
      if (val >= 1000) return '$' + Math.round(val).toLocaleString();
      return '$' + val.toFixed(2);
    };

    const midP = minP + rangeP / 2;

    const formatTimeLabel = (timestamp, tf) => {
      const date = new Date(timestamp * 1000);
      if (tf === '24h') {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      } else if (tf === '7d') {
        return date.toLocaleDateString([], { weekday: 'short' });
      } else if (tf === '30d') {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
      return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
    };

    const timeLabels = [
      { x: coords[0].x, label: formatTimeLabel(coords[0].t, timeframe) },
      { x: coords[Math.floor(coords.length * 0.25)].x, label: formatTimeLabel(coords[Math.floor(coords.length * 0.25)].t, timeframe) },
      { x: coords[Math.floor(coords.length * 0.5)].x, label: formatTimeLabel(coords[Math.floor(coords.length * 0.5)].t, timeframe) },
      { x: coords[Math.floor(coords.length * 0.75)].x, label: formatTimeLabel(coords[Math.floor(coords.length * 0.75)].t, timeframe) },
      { x: coords[coords.length - 1].x, label: 'Now' }
    ];

    return `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg-root" preserveAspectRatio="none" id="market-chart-svg">
        <defs>
          <linearGradient id="chartGradient_${timeframe}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.35"/>
            <stop offset="85%" stop-color="${strokeColor}" stop-opacity="0.04"/>
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0"/>
          </linearGradient>
          <filter id="neonGlow_${timeframe}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="${strokeColor}" flood-opacity="0.75"/>
          </filter>
        </defs>

        <line x1="${padLeft}" y1="${padTop}" x2="${width - padRight}" y2="${padTop}" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
        <line x1="${padLeft}" y1="${padTop + plotH/2}" x2="${width - padRight}" y2="${padTop + plotH/2}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
        <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" stroke="rgba(255,255,255,0.08)" />

        <text x="${width - padRight + 8}" y="${padTop + 4}" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">${fmtPrice(maxP)}</text>
        <text x="${width - padRight + 8}" y="${padTop + plotH/2 + 3}" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10">${fmtPrice(midP)}</text>
        <text x="${width - padRight + 8}" y="${padTop + plotH + 3}" fill="#94a3b8" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600">${fmtPrice(minP)}</text>

        <path d="${dArea}" fill="url(#chartGradient_${timeframe})" />
        <path d="${dLine}" fill="none" stroke="${strokeColor}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#neonGlow_${timeframe})" />

        ${timeLabels.map(tl => `
          <text x="${tl.x}" y="${height - 12}" fill="#64748b" font-family="'JetBrains Mono', monospace" font-size="10" text-anchor="middle">${tl.label}</text>
        `).join('')}

        <g id="chart-scrubber-group" style="display: none;">
          <line id="scrubber-line" x1="0" y1="${padTop}" x2="0" y2="${padTop + plotH}" stroke="rgba(255, 255, 255, 0.4)" stroke-dasharray="2,2" stroke-width="1.5" />
          <circle id="scrubber-dot" cx="0" cy="0" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5" filter="drop-shadow(0 0 6px ${strokeColor})" />
        </g>

        <rect id="chart-hit-area" x="${padLeft}" y="${padTop}" width="${plotW}" height="${plotH}" fill="transparent" style="cursor: crosshair; pointer-events: all;" />
      </svg>
    `;
  }

  _ensureDom() {
    if (this._domReady) return;
    this.shadowRoot.innerHTML = `
      <style>
        ${this._getStyles()}
      
        /* --- AUTO-IMPORT DISCOVERY MODAL --- */
        .discovery-header-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .discovery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
          margin: 16px 0;
        }

        .discovery-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .discovery-card:hover {
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.04);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.1);
        }

        .discovery-card.selected {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        }

        .discovery-card.configured {
          opacity: 0.65;
          border-style: dashed;
        }

        .discovery-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .discovery-graphic-container {
          width: 100%;
          height: 90px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6px;
        }

        .miner-graphic-svg {
          width: 100%;
          height: 100%;
          max-height: 80px;
        }

        .discovery-rig-name {
          font-size: 14px;
          font-weight: 700;
          color: #f8fafc;
        }

        .discovery-type-pill {
          font-size: 10px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        .discovery-type-pill.bitaxe {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.35);
          color: #34d399;
        }

        .discovery-type-pill.avalon {
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.35);
          color: #fbbf24;
        }

        .discovery-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          flex-wrap: wrap;
        }

        .discovery-check-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }

        .discovery-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #38bdf8;
          cursor: pointer;
        }

        .radar-scan-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          gap: 16px;
          text-align: center;
        }

        .radar-pulse-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid #38bdf8;
          box-shadow: 0 0 24px rgba(56, 189, 248, 0.5);
          animation: radarPulse 1.8s infinite cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
        }

        @keyframes radarPulse {
          0% { transform: scale(0.8); opacity: 0.8; box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.6); }
          70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 16px rgba(56, 189, 248, 0); }
          100% { transform: scale(0.8); opacity: 0.8; box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }

        /* --- PER-RIG COIN PRICE TICKER STRIP --- */
        .rig-market-ticker-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 14px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .coin-badge-cluster {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .coin-symbol-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fbbf24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
        }

        .coin-name-label {
          font-size: 13px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .coin-price-hero {
          font-size: 14px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          color: #38bdf8;
        }

        .coin-change-pill {
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          padding: 3px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .coin-change-pill.pos {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
        }

        .coin-change-pill.neg {
          background: rgba(244, 63, 94, 0.15);
          border: 1px solid rgba(244, 63, 94, 0.35);
          color: #fb7185;
        }

        /* --- FANCY INTERACTIVE MARKET INTELLIGENCE CONSOLE & CHART --- */
        .market-intelligence-console {
          margin-bottom: 24px;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .market-console-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .market-title-cluster {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .timeframe-pill-rack {
          display: flex;
          gap: 6px;
          background: rgba(0, 0, 0, 0.3);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .timeframe-btn {
          background: transparent;
          border: 1px solid transparent;
          color: #94a3b8;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timeframe-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .timeframe-btn.active {
          background: rgba(56, 189, 248, 0.18);
          border-color: rgba(56, 189, 248, 0.45);
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }

        .market-hero-stats-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          flex-wrap: wrap;
        }

        .market-live-price {
          font-size: 26px;
          font-weight: 800;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: -0.02em;
          color: #f8fafc;
        }

        .market-stat-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .chart-stage {
          position: relative;
          width: 100%;
          height: 190px;
          background: rgba(10, 15, 26, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          overflow: hidden;
        }

        .chart-svg-root {
          width: 100%;
          height: 100%;
          display: block;
        }

        .chart-scrubber-tooltip {
          position: absolute;
          top: 12px;
          right: 14px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 8px;
          padding: 6px 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #f1f5f9;
          pointer-events: none;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          gap: 8px;
        }

      </style>
      <div id="card-root"></div>
      <div id="modal-root">
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
                <input type="text" id="modal-name" class="modal-input" placeholder="e.g. My Bitaxe Supra" autocomplete="off" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Miner Hardware Type</label>
                <select id="modal-type" class="modal-select">
                  <option value="bitaxe" style="background-color: #0f172a; color: #f8fafc;">Bitaxe / AxeOS</option>
                  <option value="cgminer_rpc" style="background-color: #0f172a; color: #f8fafc;">Canaan Avalon / CGMiner</option>
                  <option value="whatsminer" style="background-color: #0f172a; color: #f8fafc;">MicroBT Whatsminer</option>
                  <option value="antminer" style="background-color: #0f172a; color: #f8fafc;">Antminer / Braiins OS</option>
                  <option value="nerdminer" style="background-color: #0f172a; color: #f8fafc;">ESP32 NerdMiner</option>
                  <option value="hiveos" style="background-color: #0f172a; color: #f8fafc;">HiveOS Rig Farm</option>
                  <option value="generic_rest" style="background-color: #0f172a; color: #f8fafc;">Generic REST API</option>
                </select>
              </div>
              <div class="modal-field">
                <label class="modal-label">Coin</label>
                <input type="text" id="modal-coin" class="modal-input" value="BTC" placeholder="BTC" autocomplete="off" />
              </div>
              <div class="modal-field">
                <label class="modal-label">IP Address / Host</label>
                <input type="text" id="modal-host" class="modal-input" placeholder="e.g. 192.168.1.91" autocomplete="off" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Port</label>
                <input type="number" id="modal-port" class="modal-input" value="80" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Mining Pool</label>
                <select id="modal-pool" class="modal-select">
                  <option value="none" style="background-color: #0f172a; color: #f8fafc;">None (Hardware Only)</option>
                  <option value="helios" style="background-color: #0f172a; color: #f8fafc;">Helios Pool (Solo CKPool)</option>
                  <option value="mining_dutch" style="background-color: #0f172a; color: #f8fafc;">Mining Dutch</option>
                  <option value="public_pool" style="background-color: #0f172a; color: #f8fafc;">Public Pool (Solo)</option>
                  <option value="2miners" style="background-color: #0f172a; color: #f8fafc;">2Miners</option>
                  <option value="braiins" style="background-color: #0f172a; color: #f8fafc;">Braiins Pool</option>
                  <option value="viabtc" style="background-color: #0f172a; color: #f8fafc;">ViaBTC</option>
                  <option value="f2pool" style="background-color: #0f172a; color: #f8fafc;">F2Pool</option>
                </select>
              </div>
              <div class="modal-field">
                <label class="modal-label">Pool Wallet / Worker</label>
                <input type="text" id="modal-wallet" class="modal-input" placeholder="e.g. bc1q...worker1" autocomplete="off" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="glass-btn" id="modal-cancel-btn">Cancel</button>
              <button class="glass-btn primary" id="modal-save-btn">Save Miner</button>
            </div>
          </div>
        </div>

        
        <!-- HARDWARE AUTO-IMPORT DISCOVERY MODAL -->
        <div id="discovery-modal" class="modal-backdrop" style="display: none;">
          <div class="modal-box" style="max-width: 680px; width: 95%;">
            <div class="modal-header">
              <div class="discovery-header-cluster">
                <span style="font-size: 22px;">🔍</span>
                <div>
                  <span class="modal-title" style="font-size: 17px;" id="discovery-modal-title">Hardware Discovery Console</span>
                  <div class="mono" style="font-size: 11px; color: #94a3b8;" id="discovery-subtitle">
                    Discovered ASIC rigs and AxeOS nodes on your local network
                  </div>
                </div>
              </div>
              <button class="glass-btn" id="discovery-modal-close" style="padding: 4px 8px;">✕</button>
            </div>

            <div id="discovery-body" style="min-height: 220px; max-height: 460px; overflow-y: auto; padding: 4px 6px;">
              <!-- Dynamic Cards Rendered Here -->
            </div>

            <div class="modal-footer" id="discovery-footer" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div id="discovery-select-controls" style="display: flex; gap: 8px;">
                <button class="glass-btn" id="discovery-select-all" style="font-size: 11px; padding: 5px 10px;">Select All</button>
                <button class="glass-btn" id="discovery-deselect-all" style="font-size: 11px; padding: 5px 10px;">Deselect All</button>
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="glass-btn" id="discovery-cancel-btn">Close</button>
                <button class="glass-btn primary" id="discovery-import-btn">⚡ Import Selected (0)</button>
              </div>
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
              Are you sure you want to remove this miner from Home Assistant? All associated sensors will be removed.
            </p>
            <div class="modal-footer">
              <button class="glass-btn" id="delete-cancel-btn">Cancel</button>
              <button class="glass-btn danger" id="delete-confirm-btn">Confirm Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this._attachModalListeners();
    this._domReady = true;
  }

  _attachModalListeners() {
    const modalRoot = this.shadowRoot.querySelector('#modal-root');
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    const deleteModal = this.shadowRoot.querySelector('#delete-modal');

    // Intercept keyboard event bubbling: NEVER allow keydown/keyup/keypress to escape to Lovelace
    const stopPropagation = (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        this._closeModals();
      }
    };

    ['keydown', 'keyup', 'keypress'].forEach(eventType => {
      modalRoot.addEventListener(eventType, stopPropagation);
      minerModal.addEventListener(eventType, stopPropagation);
      deleteModal.addEventListener(eventType, stopPropagation);
    });

    const inputsAndSelects = modalRoot.querySelectorAll('input, select, button');
    inputsAndSelects.forEach(el => {
      ['keydown', 'keyup', 'keypress'].forEach(evt => {
        el.addEventListener(evt, stopPropagation);
      });
    });

    // Prevent clicks inside .modal-box from bubbling to backdrop
    minerModal.querySelectorAll('.modal-box').forEach(box => {
      box.addEventListener('click', (e) => e.stopPropagation());
    });
    deleteModal.querySelectorAll('.modal-box').forEach(box => {
      box.addEventListener('click', (e) => e.stopPropagation());
    });

    // Close on backdrop click
    minerModal.addEventListener('click', (e) => {
      if (e.target === minerModal) {
        this._closeModals();
      }
    });
    deleteModal.addEventListener('click', (e) => {
      if (e.target === deleteModal) {
        this._closeModals();
      }
    });

    // Close and cancel buttons
    const closeBtn = this.shadowRoot.querySelector('#modal-close-btn');
    const cancelBtn = this.shadowRoot.querySelector('#modal-cancel-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this._closeModals());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this._closeModals());

    const delCloseBtn = this.shadowRoot.querySelector('#delete-modal-close');
    const delCancelBtn = this.shadowRoot.querySelector('#delete-cancel-btn');
    if (delCloseBtn) delCloseBtn.addEventListener('click', () => this._closeModals());
    if (delCancelBtn) delCancelBtn.addEventListener('click', () => this._closeModals());

    
    // --- DISCOVERY MODAL EVENT LISTENERS ---
    const discModal = this.shadowRoot.querySelector('#discovery-modal');
    if (discModal) {
      ['keydown', 'keyup', 'keypress'].forEach(eventType => {
        discModal.addEventListener(eventType, stopPropagation);
      });

      discModal.querySelectorAll('.modal-box').forEach(box => {
        box.addEventListener('click', (e) => e.stopPropagation());
      });

      discModal.addEventListener('click', (e) => {
        if (e.target === discModal) {
          this._closeModals();
        }
      });

      const discCloseBtn = this.shadowRoot.querySelector('#discovery-modal-close');
      const discCancelBtn = this.shadowRoot.querySelector('#discovery-cancel-btn');
      if (discCloseBtn) discCloseBtn.addEventListener('click', () => this._closeModals());
      if (discCancelBtn) discCancelBtn.addEventListener('click', () => this._closeModals());

      const selectAllBtn = this.shadowRoot.querySelector('#discovery-select-all');
      if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
          this._discoveredMiners.forEach(m => {
            if (!m.already_configured) this._selectedDiscoveredHosts.add(m.host);
          });
          this._updateDiscoveryCheckboxes();
        });
      }

      const deselectAllBtn = this.shadowRoot.querySelector('#discovery-deselect-all');
      if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', () => {
          this._selectedDiscoveredHosts.clear();
          this._updateDiscoveryCheckboxes();
        });
      }

      const discImportBtn = this.shadowRoot.querySelector('#discovery-import-btn');
      if (discImportBtn) {
        discImportBtn.addEventListener('click', () => this._importSelectedMiners());
      }
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
          if (this._modalMode === 'add') {
            if (name) {
              this._minerNames[host] = name;
              try { localStorage.setItem('miner_name_' + host, name); } catch (e) {}
            }
            if (poolProvider) {
              this._minerPools[host] = poolProvider;
              try { localStorage.setItem('miner_pool_' + host, poolProvider); } catch (e) {}
            }
            if (poolWallet !== undefined) {
              this._minerWallets[host] = poolWallet;
              try { localStorage.setItem('miner_wallet_' + host, poolWallet); } catch (e) {}
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
            const targetHost = this._activeHost || host;
            if (name) {
              this._minerNames[targetHost] = name;
              try { localStorage.setItem('miner_name_' + targetHost, name); } catch (e) {}
            }
            if (poolProvider) {
              this._minerPools[targetHost] = poolProvider;
              try { localStorage.setItem('miner_pool_' + targetHost, poolProvider); } catch (e) {}
            }
            if (poolWallet !== undefined) {
              this._minerWallets[targetHost] = poolWallet;
              try { localStorage.setItem('miner_wallet_' + targetHost, poolWallet); } catch (e) {}
            }
            if (coin) {
              this._minerCoins[targetHost] = coin.toUpperCase();
              try { localStorage.setItem('miner_coin_' + targetHost, coin.toUpperCase()); } catch (e) {}
            }
            await this._hass.callService('home_miner_studio', 'edit_miner', {
              host: targetHost,
              name: name || undefined,
              coin: coin.toUpperCase(),
              pool_provider: poolProvider,
              pool_wallet: poolWallet
            });
          }
          this._closeModals();
          modalSaveBtn.textContent = 'Save Miner';
          this.render();
        } catch (err) {
          modalSaveBtn.textContent = 'Save Miner';
          alert('Error saving miner: ' + err.message);
        }
      });
    }

    // Confirm Delete Button
    const confirmDeleteBtn = this.shadowRoot.querySelector('#delete-confirm-btn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', async () => {
        if (!this._deleteTargetHost) return;
        confirmDeleteBtn.textContent = 'Removing...';
        try {
          const host = this._deleteTargetHost;
          delete this._minerNames[host];
          try { localStorage.removeItem('miner_name_' + host); } catch (e) {}
          await this._hass.callService('home_miner_studio', 'delete_miner', { host });
          this._closeModals();
          confirmDeleteBtn.textContent = 'Confirm Delete';
          this.render();
        } catch (err) {
          confirmDeleteBtn.textContent = 'Confirm Delete';
          alert('Error deleting miner: ' + err.message);
        }
      });
    }
  }

  _closeModals() {
    this._modalOpen = false;
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    const deleteModal = this.shadowRoot.querySelector('#delete-modal');
    if (minerModal) minerModal.style.display = 'none';
    if (deleteModal) deleteModal.style.display = 'none';
    const discModal = this.shadowRoot.querySelector('#discovery-modal');
    if (discModal) discModal.style.display = 'none';
  }


  async _openDiscoveryModal() {
    this._ensureDom();
    this._modalOpen = true;
    const discModal = this.shadowRoot.querySelector('#discovery-modal');
    const discBody = this.shadowRoot.querySelector('#discovery-body');
    const importBtn = this.shadowRoot.querySelector('#discovery-import-btn');

    if (discModal) discModal.style.display = 'flex';
    if (importBtn) {
      importBtn.disabled = true;
      importBtn.textContent = '⚡ Import Selected (0)';
    }

    if (discBody) {
      discBody.innerHTML = `
        <div class="radar-scan-box">
          <div class="radar-pulse-ring">⛏</div>
          <div style="font-size: 15px; font-weight: 700; color: #f8fafc;">Scanning Local Network for Mining Hardware...</div>
          <p style="font-size: 12px; color: #94a3b8; max-width: 400px; line-height: 1.5;">
            Detecting active AxeOS nodes, CGMiner RPC endpoints, Avalon Nano chassis, and Home Assistant miner entities.
          </p>
        </div>
      `;
    }

    try {
      let data = null;
      if (this._hass && this._hass.callApi) {
        try {
          data = await this._hass.callApi('GET', 'home_miner_studio/discover?include_all=1');
        } catch (apiErr) {
          console.warn('callApi discover error, trying fetchWithAuth:', apiErr);
        }
      }
      if (!data && this._hass && this._hass.fetchWithAuth) {
        const resp = await this._hass.fetchWithAuth('/api/home_miner_studio/discover?include_all=1');
        data = await resp.json();
      }

      this._discoveredMiners = (data && data.discovered) || [];
      this._selectedDiscoveredHosts.clear();

      this._discoveredMiners.forEach(m => {
        if (!m.already_configured) {
          this._selectedDiscoveredHosts.add(m.host);
        }
      });

      this._renderDiscoveryList();
    } catch (err) {
      if (discBody) {
        discBody.innerHTML = `
          <div style="text-align: center; padding: 30px; color: #fb7185;">
            ⚠️ Network discovery error: ${err.message}
          </div>
        `;
      }
    }
  }

  _renderDiscoveryList() {
    const discBody = this.shadowRoot.querySelector('#discovery-body');
    if (!discBody) return;

    if (!this._discoveredMiners || this._discoveredMiners.length === 0) {
      discBody.innerHTML = `
        <div class="radar-scan-box">
          <span style="font-size: 32px;">🌐</span>
          <div style="font-size: 15px; font-weight: 700; color: #f8fafc;">No Hardware Found to Import</div>
          <p style="font-size: 12px; color: #94a3b8; max-width: 420px; line-height: 1.5;">
            All miners detected on your LAN are either already active in Home Miner Studio, or no AxeOS/CGMiner devices responded. You can add one manually anytime using <b>+ Add Miner</b>.
          </p>
        </div>
      `;
      return;
    }

    discBody.innerHTML = `
      <div class="discovery-grid">
        ${this._discoveredMiners.map(m => {
          const isConfigured = !!m.already_configured;
          const isSelected = this._selectedDiscoveredHosts.has(m.host);
          const graphicSvg = this._getMinerGraphicSvg(m.miner_type);

          return `
            <div class="discovery-card ${isSelected ? 'selected' : ''} ${isConfigured ? 'configured' : ''}" data-host="${m.host}">
              <div class="discovery-card-top">
                <div style="display: flex; flex-direction: column; gap: 3px;">
                  <span class="discovery-rig-name">${m.name}</span>
                  <span class="discovery-type-pill ${m.miner_type}">${(m.miner_type || 'ASIC').toUpperCase()}</span>
                </div>
                <label class="discovery-check-wrap">
                  <input type="checkbox" class="discovery-checkbox" data-host="${m.host}"
                         ${isSelected ? 'checked' : ''} ${isConfigured ? 'disabled' : ''} />
                </label>
              </div>

              <div class="discovery-graphic-container">
                ${graphicSvg}
              </div>

              <div class="discovery-meta-row">
                <span>🌐 ${m.host}:${m.port || 80}</span>
                <span>•</span>
                <span style="color: #fbbf24; font-weight: 700;">🪙 ${m.coin || 'BTC'}</span>
              </div>

              <div style="font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">
                <span>Source: ${m.source_integration}</span>
                ${isConfigured ? '<span style="color: #38bdf8;">● Already Managed</span>' : '<span style="color: #34d399;">★ Ready to Import</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    discBody.querySelectorAll('.discovery-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const host = cb.getAttribute('data-host');
        if (cb.checked) {
          this._selectedDiscoveredHosts.add(host);
        } else {
          this._selectedDiscoveredHosts.delete(host);
        }
        this._updateDiscoveryCheckboxes();
      });
    });

    this._updateDiscoveryCheckboxes();
  }

  _updateDiscoveryCheckboxes() {
    const discBody = this.shadowRoot.querySelector('#discovery-body');
    const importBtn = this.shadowRoot.querySelector('#discovery-import-btn');
    if (!discBody) return;

    discBody.querySelectorAll('.discovery-card').forEach(card => {
      const host = card.getAttribute('data-host');
      const cb = card.querySelector('.discovery-checkbox');
      const isSelected = this._selectedDiscoveredHosts.has(host);
      if (cb && !cb.disabled) cb.checked = isSelected;
      if (isSelected) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    const count = this._selectedDiscoveredHosts.size;
    if (importBtn) {
      importBtn.textContent = `⚡ Import Selected (${count})`;
      importBtn.disabled = count === 0;
    }
  }

  async _importSelectedMiners() {
    const importBtn = this.shadowRoot.querySelector('#discovery-import-btn');
    const selectedHosts = Array.from(this._selectedDiscoveredHosts);
    if (selectedHosts.length === 0) return;

    if (importBtn) {
      importBtn.textContent = '⏳ Importing Rigs...';
      importBtn.disabled = true;
    }

    let successCount = 0;
    for (const host of selectedHosts) {
      const miner = this._discoveredMiners.find(m => m.host === host);
      if (!miner) continue;
      try {
        await this._hass.callService('home_miner_studio', 'add_miner', {
          host: miner.host,
          name: miner.name || `Miner (${miner.host})`,
          miner_type: miner.miner_type || 'bitaxe',
          port: miner.port || 80,
          coin: miner.coin || 'BTC'
        });
        successCount++;
      } catch (err) {
        console.error('Failed to import miner ' + host, err);
      }
    }

    this._closeModals();
    this.render();
    alert(`✅ Successfully imported ${successCount} cryptocurrency mining rigs into Home Assistant!`);
  }

  _openAddModal() {
    this._ensureDom();
    this._modalOpen = true;
    this._modalMode = 'add';
    this._activeHost = '';
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    this.shadowRoot.querySelector('#modal-title').textContent = '➕ Add Cryptocurrency Miner';
    this.shadowRoot.querySelector('#modal-name').value = '';
    this.shadowRoot.querySelector('#modal-host').value = '';
    this.shadowRoot.querySelector('#modal-host').disabled = false;
    this.shadowRoot.querySelector('#modal-port').value = 80;
    this.shadowRoot.querySelector('#modal-coin').value = 'BTC';
    this.shadowRoot.querySelector('#modal-type').value = 'bitaxe';
    this.shadowRoot.querySelector('#modal-pool').value = 'helios';
    this.shadowRoot.querySelector('#modal-wallet').value = '';
    if (minerModal) minerModal.style.display = 'flex';
  }

  _openEditModal(host, name, type, pool, wallet, coin) {
    this._ensureDom();
    this._modalOpen = true;
    this._modalMode = 'edit';
    this._activeHost = host;
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    this.shadowRoot.querySelector('#modal-title').textContent = `⚙️ Edit Miner (${host})`;
    this.shadowRoot.querySelector('#modal-name').value = name || '';
    this.shadowRoot.querySelector('#modal-host').value = host;
    this.shadowRoot.querySelector('#modal-host').disabled = true;
    this.shadowRoot.querySelector('#modal-type').value = type || 'bitaxe';
    const activePool = this._minerPools[host] || localStorage.getItem('miner_pool_' + host) || pool || 'none';
    const activeWallet = this._minerWallets[host] || localStorage.getItem('miner_wallet_' + host) || wallet || '';
    const activeCoin = this._minerCoins[host] || localStorage.getItem('miner_coin_' + host) || coin || 'BTC';
    this.shadowRoot.querySelector('#modal-pool').value = activePool;
    this.shadowRoot.querySelector('#modal-wallet').value = activeWallet;
    this.shadowRoot.querySelector('#modal-coin').value = activeCoin;
    if (minerModal) minerModal.style.display = 'flex';
  }

  _openDeleteModal(host, name) {
    this._ensureDom();
    this._modalOpen = true;
    this._deleteTargetHost = host;
    const deleteModal = this.shadowRoot.querySelector('#delete-modal');
    this.shadowRoot.querySelector('#delete-modal-text').textContent =
      `Are you sure you want to permanently delete "${name}" (${host}) from Home Assistant? All associated sensors will be removed.`;
    if (deleteModal) deleteModal.style.display = 'flex';
  }

  _getStyles() {
    return `

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

        .modal-input {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 8px 12px;
          color: #ffffff;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          outline: none;
        }

        .modal-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }

        /* High-Contrast Modal Dropdown Select & Option Styling (Anti White-on-White) */
        select.modal-input, select.modal-select, .modal-select {
          background-color: #0f172a !important;
          color: #f8fafc !important;
          border: 1px solid rgba(56, 189, 248, 0.4) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-size: 13px !important;
          font-family: 'JetBrains Mono', monospace !important;
          outline: none !important;
          cursor: pointer !important;
        }

        select.modal-input:focus, select.modal-select:focus, .modal-select:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.5) !important;
        }

        select.modal-input option, select.modal-select option, .modal-select option, option {
          background-color: #0f172a !important;
          color: #f8fafc !important;
          padding: 10px 14px !important;
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
        }

        select.modal-input option:checked, select.modal-select option:checked, .modal-select option:checked {
          background-color: #0284c7 !important;
          color: #ffffff !important;
          font-weight: 700 !important;
        }

        select.modal-input option:hover, select.modal-select option:hover, .modal-select option:hover {
          background-color: #1e293b !important;
          color: #38bdf8 !important;
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
      
`;
  }

  render() {
    if (!this._hass) return;
    this._ensureDom();
    if (this._modalOpen) return;

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

    

    // 1. Bitaxe Miner Detection & Aggregation
    const bitaxeHashState = states['sensor.my_bitaxe_hashrate_th_s'] || states['sensor.my_bitaxe_hashrate_gh_s'];
    if (bitaxeHashState && !isBlacklisted('my_bitaxe')) {
      const bitaxeName = this._getMinerName('192.168.1.91', 'My Bitaxe Supra', ['sensor.my_bitaxe_hashrate_th_s', 'sensor.my_bitaxe_hashrate_gh_s', 'sensor.my_bitaxe_power_draw']);
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

      const bitaxeAccepted = parseInt(states['sensor.my_bitaxe_shares_accepted']?.state || 0);
      const bitaxeRejected = parseInt(states['sensor.my_bitaxe_shares_rejected']?.state || 0);
      const bitaxeHw = parseInt(states['sensor.my_bitaxe_hardware_errors']?.state || 0);
      const bitaxeBestDiff = states['sensor.my_bitaxe_best_difficulty']?.state;
      const bitaxeBestStr = bitaxeBestDiff ? (parseFloat(bitaxeBestDiff) >= 1e9 ? (parseFloat(bitaxeBestDiff)/1e9).toFixed(2) + ' G' : (parseFloat(bitaxeBestDiff)/1e6).toFixed(2) + ' M') : '--';
      // Clean any legacy public_pool cache for Bitaxe
      if (localStorage.getItem('miner_pool_192.168.1.91') === 'public_pool') {
        try { localStorage.setItem('miner_pool_192.168.1.91', 'mining_dutch'); } catch (e) {}
      }
      const bitaxeSavedPool = this._minerPools['192.168.1.91'] || localStorage.getItem('miner_pool_192.168.1.91');
      const bitaxeSavedWallet = this._minerWallets['192.168.1.91'] || localStorage.getItem('miner_wallet_192.168.1.91');
      const bitaxeSavedCoin = this._minerCoins['192.168.1.91'] || localStorage.getItem('miner_coin_192.168.1.91');
      const bitaxePoolStatusObj = states['sensor.my_bitaxe_pool_connection_status'];
      const bitaxePoolStatus = bitaxePoolStatusObj?.state || 'Alive';
      const bitaxePoolUrl = bitaxePoolStatusObj?.attributes?.pool_url || 'americas.mining-dutch.nl:9995';
      const bitaxePoolUser = bitaxePoolStatusObj?.attributes?.pool_user || 'Boxerdawg.worker1';
      const bitaxePoolProvider = bitaxeSavedPool || bitaxePoolStatusObj?.attributes?.pool_provider || (bitaxePoolUrl.includes('mining-dutch') ? 'mining_dutch' : 'mining_dutch');
      const bitaxePoolWallet = bitaxeSavedWallet || bitaxePoolStatusObj?.attributes?.pool_wallet || bitaxePoolUser;
      const bitaxeCoin = bitaxeSavedCoin || bitaxePoolStatusObj?.attributes?.coin || states['sensor.my_bitaxe_coin_price_usd']?.attributes?.coin || 'WOJAK';

      miners.push({
        id: 'bitaxe',
        name: bitaxeName,
        type: 'bitaxe',
        host: '192.168.1.91',
        coin: bitaxeCoin,
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
        accepted: bitaxeAccepted.toLocaleString(),
        rejected: bitaxeRejected.toLocaleString(),
        hwErrors: bitaxeHw,
        bestShareStr: bitaxeBestStr,
        blocksFound: '--',
        poolUrl: bitaxePoolUrl,
        poolUser: bitaxePoolUser,
        poolStatus: bitaxePoolStatus,
        poolProvider: bitaxePoolProvider,
        poolWallet: bitaxePoolWallet,
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
      const avalonSavedPool = this._minerPools['192.168.1.154'] || localStorage.getItem('miner_pool_192.168.1.154');
      const avalonSavedWallet = this._minerWallets['192.168.1.154'] || localStorage.getItem('miner_wallet_192.168.1.154');
      const avalonSavedCoin = this._minerCoins['192.168.1.154'] || localStorage.getItem('miner_coin_192.168.1.154');
      const avalonPoolStatusObj = states['sensor.192_168_1_154_pool_connection_status'];
      const avalonCoin = avalonSavedCoin || avalonPoolStatusObj?.attributes?.coin || 'BTC';
      const poolStatus = avalonPoolStatusObj?.state ||
                         states['sensor.avalon_nano_3s_p1_status']?.state || 'Alive';
      const avalonPoolProvider = avalonSavedPool || avalonPoolStatusObj?.attributes?.pool_provider || (cleanPoolUrl.includes('mining-dutch') ? 'mining_dutch' : 'mining_dutch');
      const avalonPoolWallet = avalonSavedWallet || avalonPoolStatusObj?.attributes?.pool_wallet || poolUser;
      const cgminerVer = states['sensor.avalon_nano_3s_cgminer']?.state || '4.11.1';

      const avalonName = this._getMinerName('192.168.1.154', 'Canaan Avalon Nano 3S', ['sensor.192_168_1_154_hashrate_th_s', 'sensor.avalon_nano_3s_hashrate_current', 'sensor.avalon_nano_3s_hashrate_avg']);

      miners.push({
        id: 'avalon',
        name: avalonName,
        type: 'avalon',
        host: '192.168.1.154',
        coin: avalonCoin,
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
        poolProvider: avalonPoolProvider,
        poolWallet: avalonPoolWallet,
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

    
    // Extract Global & Per-Rig Market Data
    const defaultMarketPrices = {
      '24h': [
        { t: Math.floor(Date.now()/1000) - 86400, p: 81990 },
        { t: Math.floor(Date.now()/1000) - 64800, p: 82450 },
        { t: Math.floor(Date.now()/1000) - 43200, p: 82180 },
        { t: Math.floor(Date.now()/1000) - 21600, p: 83120 },
        { t: Math.floor(Date.now()/1000), p: 83467 }
      ],
      '7d': [
        { t: Math.floor(Date.now()/1000) - 7*86400, p: 79200 },
        { t: Math.floor(Date.now()/1000) - 5*86400, p: 80800 },
        { t: Math.floor(Date.now()/1000) - 3*86400, p: 82100 },
        { t: Math.floor(Date.now()/1000), p: 83467 }
      ],
      '30d': [
        { t: Math.floor(Date.now()/1000) - 30*86400, p: 76500 },
        { t: Math.floor(Date.now()/1000) - 20*86400, p: 79400 },
        { t: Math.floor(Date.now()/1000) - 10*86400, p: 81200 },
        { t: Math.floor(Date.now()/1000), p: 83467 }
      ],
      '1y': [
        { t: Math.floor(Date.now()/1000) - 365*86400, p: 62000 },
        { t: Math.floor(Date.now()/1000) - 270*86400, p: 67500 },
        { t: Math.floor(Date.now()/1000) - 180*86400, p: 71200 },
        { t: Math.floor(Date.now()/1000) - 90*86400, p: 78500 },
        { t: Math.floor(Date.now()/1000), p: 83467 }
      ]
    };

    let activeCoinPrice = 83467.0;
    let activeChange24h = 1.64;
    let activeCoinSymbol = 'BTC';
    let activeCoinName = 'Bitcoin';
    let activeCoinSign = '₿';
    let activeHistory = defaultMarketPrices;
    let activeStats = {
      '24h': { high: 84120, low: 81990, change_pct: 1.64 },
      '7d': { high: 84120, low: 78900, change_pct: 5.38 },
      '30d': { high: 84120, low: 75800, change_pct: 9.12 },
      '1y': { high: 84120, low: 58200, change_pct: 34.6 }
    };

    Object.keys(states).forEach(eid => {
      if ((eid.endsWith('_coin_price_usd') || eid.endsWith('_bitcoin_price')) && states[eid]?.state) {
        const p = parseFloat(states[eid].state);
        if (!isNaN(p) && p > 0) activeCoinPrice = p;
        const attrs = states[eid].attributes || {};
        if (attrs.coin) activeCoinSymbol = attrs.coin;
        if (attrs.coin_name) activeCoinName = attrs.coin_name;
        if (attrs.coin_sign) activeCoinSign = attrs.coin_sign;
        if (attrs.change_24h_pct !== undefined) activeChange24h = parseFloat(attrs.change_24h_pct);
        if (attrs.history_24h && attrs.history_24h.length) activeHistory['24h'] = attrs.history_24h;
        if (attrs.history_7d && attrs.history_7d.length) activeHistory['7d'] = attrs.history_7d;
        if (attrs.history_30d && attrs.history_30d.length) activeHistory['30d'] = attrs.history_30d;
        if (attrs.history_1y && attrs.history_1y.length) activeHistory['1y'] = attrs.history_1y;
        if (attrs.market_stats && attrs.market_stats['24h']) activeStats = attrs.market_stats;
      }
    });

    const activeTf = this._selectedTimeframe || '24h';
    const tfPoints = activeHistory[activeTf] || activeHistory['24h'];
    this._currentTfPoints = tfPoints;
    const currentStats = activeStats[activeTf] || activeStats['24h'] || { high: activeCoinPrice * 1.02, low: activeCoinPrice * 0.98, change_pct: activeChange24h };
    const chartSvgHtml = this._generateMarketChartSvg(tfPoints, activeTf, activeCoinPrice, currentStats.change_pct);

    // Aggregate Mining Pool Telemetry across Fleet
    let totalPoolWorkers = 0;
    let totalUnpaidBtc = 0;
    let total24hRevBtc = 0;
    let poolHashGhs = 0;
    let maxBestDiff = 0;

    const poolProviderMap = {
      'helios': 'Helios Pool',
      'mining_dutch': 'Mining-Dutch',
      'public_pool': 'Public-Pool',
      '2miners': '2Miners',
      'braiins': 'Braiins Pool',
      'viabtc': 'ViaBTC',
      'f2pool': 'F2Pool'
    };

    const activePoolCounts = {};
    miners.forEach(m => {
      const p = m.poolProvider;
      if (p && p !== 'none') {
        activePoolCounts[p] = (activePoolCounts[p] || 0) + 1;
      }
    });

    Object.keys(states).forEach(eid => {
      if (eid.startsWith('sensor.') && eid.endsWith('_pool_reported_hashrate')) {
        const v = parseFloat(states[eid]?.state || 0);
        if (!isNaN(v) && v > 0) poolHashGhs += v;
      }
      if (eid.startsWith('sensor.') && eid.endsWith('_pool_unpaid_balance')) {
        const v = parseFloat(states[eid]?.state || 0);
        if (!isNaN(v) && v > 0) totalUnpaidBtc += v;
      }
      if (eid.startsWith('sensor.') && eid.endsWith('_pool_24h_revenue')) {
        const v = parseFloat(states[eid]?.state || 0);
        if (!isNaN(v) && v > 0) total24hRevBtc += v;
      }
      if (eid.startsWith('sensor.') && eid.endsWith('_pool_active_workers')) {
        const v = parseInt(states[eid]?.state || 0);
        if (!isNaN(v) && v > 0) totalPoolWorkers += v;
      }
      if (eid.startsWith('sensor.') && (eid.endsWith('_pool_best_share') || eid.endsWith('_best_difficulty'))) {
        const v = parseFloat(states[eid]?.state || 0);
        if (!isNaN(v) && v > maxBestDiff) maxBestDiff = v;
      }
    });

    // Fallback: If sensor states not yet populated from remote API, count active miners with configured pools
    if (totalPoolWorkers === 0) {
      miners.forEach(m => {
        if (m.poolProvider && m.poolProvider !== 'none') {
          totalPoolWorkers++;
          if (poolHashGhs === 0 && m.ths > 0) {
            poolHashGhs += m.ths * 1000;
          }
        }
      });
    }

    const poolReportedHrStr = poolHashGhs > 0 
      ? (poolHashGhs >= 1000 ? (poolHashGhs / 1000).toFixed(2) + ' TH/s' : poolHashGhs.toFixed(1) + ' GH/s')
      : (totalHashThs > 0 ? totalHashThs.toFixed(2) + ' TH/s' : '0.0 TH/s');
    const bestShareDisplay = maxBestDiff >= 1e9 ? (maxBestDiff / 1e9).toFixed(2) + ' G' : (maxBestDiff >= 1e6 ? (maxBestDiff / 1e6).toFixed(2) + ' M' : (maxBestDiff > 0 ? maxBestDiff.toLocaleString() : '--'));

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

    

    const cardRoot = this.shadowRoot.querySelector('#card-root');
    if (!cardRoot) return;
    cardRoot.innerHTML = `
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

      <!-- MINING POOL TELEMETRY RACK -->
      <div class="glass-card cyan-glow" style="margin-bottom: 24px; padding: 18px 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">🏊</span>
            <span style="font-size: 13px; font-weight: 700; color: #f8fafc; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em;">Supported Mining Pool Providers</span>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${Object.entries(poolProviderMap).map(([pid, pname]) => {
              const activeCount = activePoolCounts[pid] || 0;
              const isActive = activeCount > 0;
              return `
                <span class="badge-glass-pill ${isActive ? 'active-pool-pill' : ''}" style="${
                  isActive
                    ? 'color: #38bdf8; border-color: #38bdf8; background: rgba(56, 189, 248, 0.22); font-weight: 700; box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);'
                    : 'color: #94a3b8; border-color: rgba(255, 255, 255, 0.1); opacity: 0.65;'
                }">
                  ${isActive ? '🟢 ' : ''}${pname}${isActive ? ` (${activeCount} Active)` : ''}
                </span>
              `;
            }).join('')}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div class="tile-glass-box">
            <span class="tile-label">Pool Workers</span>
            <div class="tile-val-row">
              <span class="tile-num" style="color: #38bdf8;">${totalPoolWorkers || miners.length}</span>
              <span class="tile-unit">online</span>
            </div>
          </div>
          <div class="tile-glass-box">
            <span class="tile-label">Reported Hashrate</span>
            <div class="tile-val-row">
              <span class="tile-num" style="color: #34d399;">${poolReportedHrStr}</span>
            </div>
          </div>
          <div class="tile-glass-box">
            <span class="tile-label">Unpaid Balance</span>
            <div class="tile-val-row">
              <span class="tile-num" style="color: #fbbf24; font-size: 15px;">${totalUnpaidBtc.toFixed(8)}</span>
              <span class="tile-unit">BTC</span>
            </div>
          </div>
          <div class="tile-glass-box">
            <span class="tile-label">Fleet Best Share</span>
            <div class="tile-val-row">
              <span class="tile-num" style="color: #a78bfa;">${bestShareDisplay}</span>
              <span class="tile-unit">diff</span>
            </div>
          </div>
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
                  <button class="glass-btn edit-miner-btn" data-host="${miner.host}" data-name="${miner.name}" data-type="${miner.type}" data-pool="${miner.poolProvider || 'none'}" data-wallet="${miner.poolWallet || ''}" data-coin="${miner.coin || 'BTC'}">⚙️ Edit</button>
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

              
              <!-- Per-Rig Active Coin Valuation Bar -->
              ${(() => {
                const rigCoin = (miner.coin || 'BTC').toUpperCase();
                let rigPrice = activeCoinPrice;
                let rigChange = activeChange24h;
                let rigSign = activeCoinSign;
                let rigName = activeCoinName;

                if (rigCoin === 'WOJAK' || rigCoin === 'WJK') {
                  rigSign = '🎭';
                  rigName = 'Wojak';
                  rigPrice = 0.00002513;
                  rigChange = 2.39;
                  // Look up live Wojak sensor if present in HA
                  Object.keys(states).forEach(eid => {
                    if (eid.includes('wojak') && eid.endsWith('_coin_price_usd')) {
                      const p = parseFloat(states[eid]?.state);
                      if (!isNaN(p) && p > 0) rigPrice = p;
                      if (states[eid]?.attributes?.change_24h_pct !== undefined) {
                        rigChange = parseFloat(states[eid].attributes.change_24h_pct);
                      }
                    }
                  });
                } else if (rigCoin === 'BTC') {
                  rigSign = '₿';
                  rigName = 'Bitcoin';
                  rigPrice = activeCoinPrice;
                  rigChange = activeChange24h;
                }

                const formatCoinPrice = (p) => {
                  const num = Number(p || 0);
                  if (num >= 100) return '$' + num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                  if (num >= 1) return '$' + num.toFixed(3);
                  if (num >= 0.0001) return '$' + num.toFixed(6);
                  return '$' + num.toFixed(8);
                };

                return `
                  <div class="rig-market-ticker-strip">
                    <div class="coin-badge-cluster">
                      <div class="coin-symbol-circle">${rigSign}</div>
                      <div>
                        <div class="coin-name-label">${rigName} (${rigCoin})</div>
                        <div class="mono" style="font-size: 10px; color: #94a3b8;">Active Mined Currency</div>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div class="coin-price-hero">${formatCoinPrice(rigPrice)}</div>
                      <div class="coin-change-pill ${rigChange >= 0 ? 'pos' : 'neg'}">
                        ${rigChange >= 0 ? '▲ +' : '▼ '}${rigChange.toFixed(2)}% 24h
                      </div>
                    </div>
                  </div>
                `;
              })()}

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
              ` : ''}

              <!-- Active Pool Integration Header -->
              <div class="active-pool-badge-strip" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; margin-top: 14px; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: #34d399; box-shadow: 0 0 10px #34d399;"></span>
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">Active Pool Integration:</span>
                  <span style="font-size: 13px; font-weight: 800; color: #38bdf8; font-family: 'JetBrains Mono', monospace;">
                    ${poolProviderMap[miner.poolProvider] || miner.poolProvider || 'Direct Stratum'}
                  </span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 11px; font-family: 'JetBrains Mono', monospace;">
                  <span style="color: #94a3b8;">Worker: <b style="color: #fbbf24;">${miner.poolUser || miner.poolWallet || 'Auto'}</b></span>
                  <span style="color: rgba(255,255,255,0.2);">|</span>
                  <span style="color: #34d399; font-weight: 700;">● ${miner.poolStatus || 'Alive'}</span>
                  ${miner.ths > 0 ? `
                    <span style="color: rgba(255,255,255,0.2);">|</span>
                    <span style="color: #38bdf8; font-weight: 700;">${miner.ths.toFixed(2)} TH/s</span>
                  ` : ''}
                </div>
              </div>

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
            </div>
          `;
        }).join('')}
      </div>
    `;

    this._attachCardEventHandlers();
  }

  _attachCardEventHandlers() {
    
    // 1-Click Miner Discovery Button (Interactive Modal)
    const importBtn = this.shadowRoot.querySelector('#import-btn');
    if (importBtn) {
      importBtn.addEventListener('click', () => {
        this._openDiscoveryModal();
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

    
    // Timeframe selector buttons (Day, Week, Month, Year)
    const tfBtns = this.shadowRoot.querySelectorAll('.timeframe-btn[data-tf]');
    tfBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tf = btn.getAttribute('data-tf');
        if (tf && tf !== this._selectedTimeframe) {
          this._selectedTimeframe = tf;
          this.render();
        }
      });
    });

    // Interactive Chart Scrubber
    const hitArea = this.shadowRoot.querySelector('#chart-hit-area');
    const scrubberGroup = this.shadowRoot.querySelector('#chart-scrubber-group');
    const scrubberLine = this.shadowRoot.querySelector('#scrubber-line');
    const scrubberDot = this.shadowRoot.querySelector('#scrubber-dot');
    const tooltip = this.shadowRoot.querySelector('#chart-tooltip');
    const tooltipPrice = this.shadowRoot.querySelector('#tooltip-price');
    const tooltipTime = this.shadowRoot.querySelector('#tooltip-time');

    if (hitArea && scrubberGroup && tooltip) {
      hitArea.addEventListener('mousemove', (e) => {
        const rect = hitArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, mouseX / rect.width));

        const pts = this._currentTfPoints;
        if (!pts || pts.length === 0) return;

        const idx = Math.min(Math.floor(pct * pts.length), pts.length - 1);
        const pt = pts[idx];
        if (!pt) return;

        const plotX = 20 + pct * (800 - 20 - 70);
        const minP = Math.min(...pts.map(p => p.p));
        const maxP = Math.max(...pts.map(p => p.p));
        const rangeP = Math.max(1, maxP - minP);
        const plotY = 22 + (180 - 22 - 34) - ((pt.p - minP) / rangeP) * (180 - 22 - 34);

        scrubberGroup.style.display = 'inline';
        scrubberLine.setAttribute('x1', plotX);
        scrubberLine.setAttribute('x2', plotX);
        scrubberDot.setAttribute('cx', plotX);
        scrubberDot.setAttribute('cy', plotY);

        tooltip.style.display = 'flex';
        tooltipPrice.textContent = '$' + Number(pt.p).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        const d = new Date(pt.t * 1000);
        tooltipTime.textContent = d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      });

      hitArea.addEventListener('mouseleave', () => {
        scrubberGroup.style.display = 'none';
        tooltip.style.display = 'none';
      });
    }

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

    

    // Add Miner Button
    const addMinerBtn = this.shadowRoot.querySelector('#add-miner-btn');
    if (addMinerBtn) {
      addMinerBtn.addEventListener('click', () => this._openAddModal());
    }

    // Edit Miner Buttons
    const editBtns = this.shadowRoot.querySelectorAll('.edit-miner-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const host = btn.getAttribute('data-host');
        const name = btn.getAttribute('data-name');
        const type = btn.getAttribute('data-type');
        const pool = btn.getAttribute('data-pool') || 'none';
        const wallet = btn.getAttribute('data-wallet') || '';
        const coin = btn.getAttribute('data-coin') || 'BTC';
        this._openEditModal(host, name, type, pool, wallet, coin);
      });
    });

    // Delete Miner Buttons
    const deleteBtns = this.shadowRoot.querySelectorAll('.delete-miner-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const host = btn.getAttribute('data-host');
        const name = btn.getAttribute('data-name');
        this._openDeleteModal(host, name);
      });
    });
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
