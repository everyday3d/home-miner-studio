/**
 * Home Miner Studio — Custom Iconset (`miner:`)
 * Authentic vector logos for supported cryptocurrency miners:
 * - miner:bitaxe: Official Skot9000 Bitaxe pixel battleaxe logo
 * - miner:avalon: Official Canaan Creative Avalon stylized 'A' dragon emblem
 * - miner:fleet: Crossed mining pickaxes & ASIC fleet emblem
 * - miner:whatsminer: MicroBT Whatsminer dual-fan chassis icon
 * - miner:antminer: Bitmain Antminer hashblade icon
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
    whatsminer: {
      path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm4 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm8 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z',
      keywords: ['whatsminer', 'microbt', 'miner']
    },
    antminer: {
      path: 'M3 3h18v4H3V3zm0 7h18v4H3v-4zm0 7h18v4H3v-4z',
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
  window.customIconsets['miner'] = minerIconProvider;

  try {
    window.dispatchEvent(new CustomEvent('custom-icons-added'));
  } catch (e) {}
})();
