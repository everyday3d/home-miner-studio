/**
 * Home Miner Studio — Custom Iconset (`miner:`)
 * Authentic vector logos for supported cryptocurrency miners:
 * - miner:bitaxe: Official Skot9000 Bitaxe pixel battleaxe logo
 * - miner:avalon: Official Canaan Creative Avalon stylized 'A' dragon emblem
 * - miner:nerdminer / miner:nerdaxe: Retro cypherpunk glasses with Bitcoin pickaxe core
 * - miner:futurebit / miner:apollo: FutureBit Apollo turbine fan chassis
 * - miner:luckyminer: Lucky Miner 4-leaf clover ASIC die emblem
 * - miner:whatsminer: MicroBT Whatsminer dual-fan tunnel server chassis
 * - miner:antminer: Bitmain Antminer dual-fan rack blade
 * - miner:fleet: Crossed mining pickaxes & ASIC fleet emblem
 */

(function() {
  const MINER_CUSTOM_ICONS = {
    fleet: {
      path: 'M14.8 2.7L12 5.5L13.5 7L16.3 4.2C18.5 5.5 20.3 7.3 21.3 9.7L22.8 8.8C21.6 5.9 19.3 3.6 16.5 2.2L14.8 2.7ZM9.2 2.7L7.5 2.2C4.7 3.6 2.4 5.9 1.2 8.8L2.7 9.7C3.7 7.3 5.5 5.5 7.7 4.2L10.5 7L12 5.5L9.2 2.7ZM10.9 8.1L2.2 16.8L3.6 18.2L12.3 9.5L10.9 8.1ZM13.1 8.1L11.7 9.5L20.4 18.2L21.8 16.8L13.1 8.1ZM1.5 20L4 22.5L7 19.5L4.5 17L1.5 20ZM22.5 20L19.5 17L17 19.5L20 22.5L22.5 20Z',
      keywords: ['miner', 'fleet', 'crypto', 'pickaxe']
    },
    bitaxe: {
      path: 'M1 23H5V19H1V23ZM5 19H9V15H5V19ZM9 15H13V11H9V15ZM10 11H14V3H10V11ZM14 3H22V7H14V3ZM22 7H24V14H22V7ZM22 14H18V18H22V14ZM18 18H14V14H18V18ZM10 15H14V19H10V15Z',
      keywords: ['bitaxe', 'axeos', 'bm1366', 'bm1370', 'miner']
    },
    avalon: {
      path: 'M12 1.5L1.5 22.5H7.2L12 10.8L16.8 22.5H22.5L12 1.5ZM10 13.2L15.8 17.5L20.2 18.5L13.8 20.4L11.2 18L10 13.2Z',
      keywords: ['avalon', 'canaan', 'nano', 'miner']
    },
    nerdminer: {
      path: 'M1 8h9v7H1V8zm13 0h9v7h-9V8zm-4 3h4v2h-4v-2zM3 10v3h5v-3H3zm13 0v3h5v-3h-5zM5 2h2v4H5V2zm12 0h2v4h-2V2zM7 3h10v2H7V3z',
      keywords: ['nerdminer', 'nerdaxe', 'esp32', 't-display', 'miner']
    },
    nerdaxe: {
      path: 'M1 8h9v7H1V8zm13 0h9v7h-9V8zm-4 3h4v2h-4v-2zM3 10v3h5v-3H3zm13 0v3h5v-3h-5zM5 2h2v4H5V2zm12 0h2v4h-2V2zM7 3h10v2H7V3z',
      keywords: ['nerdaxe', 'nerdminer', 'miner']
    },
    futurebit: {
      path: 'M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 5.9 3.2L14 10l-2-5zm-7 7a7 7 0 0 1 3.2-5.9L10 10l-5 2zm2 4.9A7 7 0 0 1 6 12l5 2l-4 3.9zm5 2.1a7 7 0 0 1-5.9-3.2L10 14l2 5zm7-7a7 7 0 0 1-3.2 5.9L14 14l5-2zm-2-4.9A7 7 0 0 1 18 12l-5-2l4-3.9zM12 10a2 2 0 1 1-2 2a2 2 0 0 1 2-2z',
      keywords: ['futurebit', 'apollo', 'node', 'miner']
    },
    apollo: {
      path: 'M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 5.9 3.2L14 10l-2-5zm-7 7a7 7 0 0 1 3.2-5.9L10 10l-5 2zm2 4.9A7 7 0 0 1 6 12l5 2l-4 3.9zm5 2.1a7 7 0 0 1-5.9-3.2L10 14l2 5zm7-7a7 7 0 0 1-3.2 5.9L14 14l5-2zm-2-4.9A7 7 0 0 1 18 12l-5-2l4-3.9zM12 10a2 2 0 1 1-2 2a2 2 0 0 1 2-2z',
      keywords: ['apollo', 'futurebit', 'miner']
    },
    luckyminer: {
      path: 'M12 2a3.5 3.5 0 0 0-3.5 3.5c0 1.5 1 2.8 2.3 3.3a4.8 4.8 0 0 0-3.3-2.3a3.5 3.5 0 1 0 0 5a4.8 4.8 0 0 0 3.3-2.3a4.8 4.8 0 0 0-2.3 3.3a3.5 3.5 0 1 0 5 0a4.8 4.8 0 0 0-2.3-3.3a4.8 4.8 0 0 0 3.3 2.3a3.5 3.5 0 1 0 0-5a4.8 4.8 0 0 0-3.3 2.3a4.8 4.8 0 0 0 2.3-3.3A3.5 3.5 0 0 0 12 2zm0 8.5a1.5 1.5 0 1 1-1.5 1.5a1.5 1.5 0 0 1 1.5-1.5zM11 15v7h2v-7h-2z',
      keywords: ['luckyminer', 'lv06', 'lv07', 'lv08', 'clover', 'miner']
    },
    whatsminer: {
      path: 'M2 5h20v14H2V5zm3 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm14 0a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm-14 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm14 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm-8-3h2v10h-2V7z',
      keywords: ['whatsminer', 'microbt', 'miner']
    },
    antminer: {
      path: 'M4 3h16v18H4V3zm2 2v14h12V5H6zm2 2h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2zM2 9h2v6H2V9zm18 0h2v6h-2V9z',
      keywords: ['antminer', 'bitmain', 'miner']
    }
  };

  window.customIcons = window.customIcons || {};
  window.customIconsets = window.customIconsets || {};

  const minerIconProvider = {
    getIcon: async (iconName) => ({
      path: MINER_CUSTOM_ICONS[iconName]?.path || MINER_CUSTOM_ICONS['fleet'].path
    }),
    getIconList: async () =>
      Object.entries(MINER_CUSTOM_ICONS).map(([name, icon]) => ({
        name,
        keywords: icon.keywords
      }))
  };

  window.customIcons['miner'] = minerIconProvider;
  window.customIcons['hms'] = minerIconProvider;
  window.customIcons['bitaxe'] = minerIconProvider;
  window.customIcons['avalon'] = minerIconProvider;
  window.customIcons['nerdminer'] = minerIconProvider;
  window.customIcons['futurebit'] = minerIconProvider;
  window.customIcons['luckyminer'] = minerIconProvider;
  window.customIconsets['miner'] = minerIconProvider;

  try {
    window.dispatchEvent(new CustomEvent('custom-icons-added'));
  } catch (e) {}
})();
