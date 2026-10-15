/**
 * Home Miner Studio — Lovelace Custom Cards
 * Unified Crypto Mining Dashboard for Home Assistant
 * Designed in Stitch: Glassmorphism / Luminous Aero-Glass Architecture
 * 
 * Production Telemetry: 100% real entity data, Celsius-only units, frosted glassmorphism layers, SVG radial ring gauges.
 */

console.info(
  '%c⛏️ HOME MINER STUDIO %c v0.6.1 %c Build 2026.10.14 ',
  'background: #0ea5e9; color: #fff; font-weight: bold; border-radius: 4px 0 0 4px; padding: 2px 6px;',
  'background: #0f172a; color: #38bdf8; font-weight: bold; padding: 2px 6px;',
  'background: #1e293b; color: #94a3b8; border-radius: 0 4px 4px 0; padding: 2px 6px;'
);

// --- AUTHENTIC MACHINE ART CUSTOM ICONSET (`miner:`) ---
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
  nerdqaxe: {
    path: 'M2 2h8v8H2V2zm12 0h8v8h-8V2zM2 14h8v8H2V14zm12 0h8v8h-8V14zm2-10v4h4V4h-4zm-12 0v4h4V4H4zm0 12v4h4v-4H4zm12 0v4h4v-4h-4zm-5-3.5a2.5 2.5 0 1 1-1.5 2.3V16h2v-1.2a2.5 2.5 0 0 1-.5-4.3z',
    keywords: ['nerdqaxe', 'nerdaxe', 'quad', 'axeos', 'miner']
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

if (typeof window !== 'undefined') {
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
  window.customIcons['nerdqaxe'] = minerIconProvider;
  window.customIcons['futurebit'] = minerIconProvider;
  window.customIcons['luckyminer'] = minerIconProvider;
  window.customIconsets['miner'] = minerIconProvider;

  try {
    window.dispatchEvent(new CustomEvent('custom-icons-added'));
  } catch (e) {}
}

const safeStorage = {
  get(key) {
    try {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, val) {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, val);
    } catch (e) {}
  },
  remove(key) {
    try {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    } catch (e) {}
  }
};

// --- RPG PROGRESSION & TROPHY CABINET (Lvl 500 Cap, 21 Rank Milestones) ---
const RPG_TITLES = [
  { level: 500, title: 'Satoshi Slayer (MAX)', badge: '👑' },
  { level: 475, title: 'Blockchain Demiurge', badge: '🪐' },
  { level: 450, title: 'Celestial Hasher', badge: '🌌' },
  { level: 425, title: 'Genesis Archon', badge: '🗝️' },
  { level: 400, title: 'Consensus Sovereign', badge: '🏛️' },
  { level: 375, title: 'Sub-Zero Cryomancer', badge: '❄️' },
  { level: 350, title: 'Quantum Proofmaster', badge: '⚛️' },
  { level: 325, title: 'Zero-Latency Phantom', badge: '⚡' },
  { level: 300, title: 'Crypto Colossus', badge: '🗿' },
  { level: 275, title: 'ASIC Architect', badge: '📐' },
  { level: 250, title: 'Megahash Overlord', badge: '🔱' },
  { level: 225, title: 'Silicon Alchemist', badge: '🧪' },
  { level: 200, title: 'Thermal Dominator', badge: '🔥' },
  { level: 175, title: 'Difficulty Crusher', badge: '🔨' },
  { level: 150, title: 'Hashrate Vanguard', badge: '🛡️' },
  { level: 125, title: 'Heatsink Warden', badge: '🌪️' },
  { level: 100, title: 'Volt Tamer', badge: '⚡' },
  { level: 75,  title: 'Frequency Enthusiast', badge: '📈' },
  { level: 50,  title: 'Stratum Journeyman', badge: '🌐' },
  { level: 25,  title: 'Silicon Apprentice', badge: '🔌' },
  { level: 1,   title: 'Novice Breadboarder', badge: '🌱' }
];

const CHRONICLE_CHAPTERS = [
  {
    level: 10,
    era: '1993',
    tag: 'Origins',
    title: 'Proof of Work Genesis',
    readTime: '1 min',
    teaser: 'How two cryptographers invented computational proof to defeat junk email spam.',
    content: 'In 1993, Cynthia Dwork and Moni Naor proposed a radical concept to stop spam: make the sender compute a moderately hard mathematical riddle before sending an email. The riddle took a normal computer a few seconds to solve, but made sending millions of bulk spam messages prohibitively expensive. This introduced the foundational premise of Proof of Work: using tangible computing cost as an unforgeable ticket of legitimacy.',
    takeaway: 'Proof of Work was not invented for money, but as digital friction to make spam and resource abuse economically impossible.'
  },
  {
    level: 20,
    era: '1997',
    tag: 'Protocols',
    title: 'Hashcash & Adam Back',
    readTime: '1 min',
    teaser: 'The partial hash collision puzzle that directly powered Satoshi’s mining engine.',
    content: 'British cryptographer Dr. Adam Back created Hashcash in 1997. Hashcash required senders to hash an email header until the resulting SHA-1 hash started with a specific number of leading zero bits. Because cryptographic hashes are unpredictable, the only way to find those leading zeroes was brute-force trial and error. Satoshi Nakamoto directly credited Hashcash in the Bitcoin whitepaper as the engine for Bitcoin’s consensus mechanism.',
    takeaway: 'Hashcash proved that searching for leading zero hashes requires genuine physical work that anyone can verify instantly.'
  },
  {
    level: 30,
    era: '1998',
    tag: 'Scarcity',
    title: 'B-Money & Bit Gold',
    readTime: '1 min',
    teaser: 'Early Cypherpunk dreams of purely digital, unforgeable gold.',
    content: 'In 1998, Wei Dai published B-Money and Nick Szabo designed Bit Gold. Both recognized that central banks inflate fiat currency at will. Szabo observed that physical gold owes its value to unforgeable costliness—it requires physical labor and energy to extract from the earth. Bit Gold sought to replicate this digital costliness using computational puzzles, though it lacked a dynamic difficulty adjuster and consensus solution.',
    takeaway: 'Bit Gold and B-Money proved digital money needed energy backing to resist arbitrary political inflation.'
  },
  {
    level: 40,
    era: '2004',
    tag: 'Tokens',
    title: 'Hal Finney & RPOW',
    readTime: '1 min',
    teaser: 'The first reusable proof of work tokens and the legendary cypherpunk.',
    content: 'Legendary programmer Hal Finney invented Reusable Proof of Work (RPOW) in 2004. Unlike Hashcash tokens which were spent once and discarded, RPOW allowed computational proof-tokens to be transferred peer-to-peer between people without being double-spent, validated by a tamper-proof cryptographic server. Hal’s breakthrough bridged the gap between pure computational riddles and transferable currency.',
    takeaway: 'Hal Finney proved computational work could be transformed into a transferable, tradeable digital asset.'
  },
  {
    level: 50,
    era: '2008',
    tag: 'Consensus',
    title: 'The Satoshi Whitepaper',
    readTime: '1 min',
    teaser: 'The immaculate synthesis: chaining blocks with dynamic difficulty adjustment.',
    content: 'On October 31, 2008, Satoshi Nakamoto released the Bitcoin Whitepaper on the Cypherpunk mailing list. Satoshi solved the legendary Byzantine Generals Problem by combining Proof of Work with a dynamic difficulty adjustment rule and the longest-chain rule. By linking each block’s hash to the previous block, modifying past transaction history required redoing all accumulated Proof of Work—making the ledger computationally immutable.',
    takeaway: 'Satoshi’s genius was linking Proof of Work into an unbreakable chain where the most cumulative work defines truth.'
  },
  {
    level: 60,
    era: '2009',
    tag: 'Genesis',
    title: 'The Genesis Block & Block #1',
    readTime: '1 min',
    teaser: 'The Chancellor headline, Hal Finney’s node, and the birth of a decentralized network.',
    content: 'On January 3, 2009, Satoshi mined Block 0 (the Genesis Block), permanently embedding the famous Times headline: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks". Six days later, Block 1 was mined. On January 12, Hal Finney tweeted "Running bitcoin", mined on his PC, and received 10 BTC from Satoshi in the world’s first Bitcoin transaction.',
    takeaway: 'Bitcoin was born in response to financial crisis bailouts, anchored by open-source code and individual desktop miners.'
  },
  {
    level: 70,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'What is a Nonce?',
    readTime: '1 min',
    teaser: 'The 32-bit integer at the center of every cryptographic hash race.',
    content: 'Nonce stands for "Number used ONCE". In Bitcoin mining, an ASIC takes an 80-byte block header (timestamp, previous block hash, Merkle root) and appends a 32-bit number called the nonce. The miner hashes this header with SHA-256d. If the resulting hash is larger than the network target, the miner increments the nonce by 1 (e.g. 0x00000001, 0x00000002) and hashes again. Your miner repeats this trial billions of times every single second.',
    takeaway: 'Mining is simply cycling through numbers in search of a golden nonce that yields a winning hash below the difficulty target.'
  },
  {
    level: 80,
    era: '2010',
    tag: 'Hardware',
    title: 'Pizza Day & The GPU Revolution',
    readTime: '1 min',
    teaser: '10,000 BTC for two pizzas and the leap from CPUs to graphics cards.',
    content: 'On May 22, 2010, Laszlo Hanyecz bought two pizzas for 10,000 BTC, proving Bitcoin had real-world purchasing power. That same year, Laszlo realized that graphics cards (GPUs) possessed thousands of parallel arithmetic cores ideally suited for SHA-256 math. He wrote the first GPU miner code, instantly obsoleting CPU desktop mining and driving network hashrate from megahashes into gigahashes.',
    takeaway: 'GPUs proved that mining speed is governed by parallel arithmetic pipelines, setting the stage for dedicated hardware.'
  },
  {
    level: 90,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Target Difficulty & 2,016 Blocks',
    readTime: '1 min',
    teaser: 'Why blocks always average 10 minutes, whether mined by 1 PC or 1 million ASICs.',
    content: 'Bitcoin self-regulates its block production clock. Every 2,016 blocks (exactly two weeks at 10 minutes per block), the software compares the actual time elapsed against the expected 20,160 minutes. If miners joined and found blocks in 8 minutes, difficulty increases automatically. If miners shut off and blocks took 12 minutes, difficulty drops. This heartbeat keeps Bitcoin’s issuance schedule mathematically predictable forever.',
    takeaway: 'The difficulty adjustment is Bitcoin’s autonomic nervous system, guaranteeing inflation predictability without central planning.'
  },
  {
    level: 100,
    era: '2011',
    tag: 'Stratum',
    title: 'Slush Pool & The Stratum Protocol',
    readTime: '1 min',
    teaser: 'How pooled mining and TCP sockets democratized miner revenues.',
    content: 'In late 2010, Czech programmer Marek Palatinus (Slush) invented pooled mining. Before pools, small miners had to solo-mine and face years of zero payouts. Pools aggregated thousands of miners to find blocks frequently, splitting rewards proportionally. In 2012, Slush created the Stratum mining protocol over JSON-RPC/TCP, slashing bandwidth and eliminating the latency bottlenecks of older HTTP mining.',
    takeaway: 'Stratum protocol and mining pools made hash revenue steady and accessible for hobbyists across the world.'
  },
  {
    level: 110,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Why Shares Aren’t Blocks',
    readTime: '1 min',
    teaser: 'Understanding the distinction between pool difficulty and global network difficulty.',
    content: 'Home miners often wonder why their card reports thousands of accepted shares when the world only finds 144 Bitcoin blocks per day. Mining pools assign each connected miner a low share difficulty (e.g. 8,192). Finding a hash meeting this low target proves your ASIC is actively working, earning you reward shares. Occasionally, one of those shares is so extraordinarily lucky that it beats the global network target (e.g. 85 Trillion)—solving a full block!',
    takeaway: 'Shares are proof of work tickets submitted to your pool; a block is a share that accidentally beat the entire planet’s target.'
  },
  {
    level: 120,
    era: '2012',
    tag: 'Halving',
    title: 'The First Halving & FPGA Epoch',
    readTime: '1 min',
    teaser: 'Subsidies drop from 50 to 25 BTC as Field-Programmable Gate Arrays emerge.',
    content: 'On November 28, 2012, Bitcoin underwent its first Halving at Block 210,000, slashing the miner block subsidy from 50 BTC down to 25 BTC. Simultaneously, miners migrated from power-hungry GPUs to Field-Programmable Gate Arrays (FPGAs). FPGAs were reconfigurable microchips that could be wired to execute SHA-256 in pure hardware logic, consuming a fraction of the electricity of graphics cards.',
    takeaway: 'The first halving proved Bitcoin’s programmatic monetary policy worked seamlessly in production.'
  },
  {
    level: 130,
    era: '2013',
    tag: 'Silicon',
    title: 'Canaan Avalon: The First ASIC',
    readTime: '1 min',
    teaser: 'Yifu Guo and Canaan Creative forge the world’s first custom SHA-256 microchip.',
    content: 'In early 2013, Canaan Creative launched the Avalon 1, powered by custom Application-Specific Integrated Circuit (ASIC) silicon built on 110nm lithography. Unlike CPUs, GPUs, or FPGAs which can calculate graphics or run games, an ASIC does one thing: compute double-SHA-256 hashes millions of times faster with zero wasted silicon overhead. It inaugurated the modern era of industrial semiconductor mining.',
    takeaway: 'ASICs strip away all general-purpose computing baggage, converting pure electricity directly into SHA-256 math.'
  },
  {
    level: 140,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'SHA-256d Under the Hood',
    readTime: '1 min',
    teaser: 'Why Bitcoin hashes everything twice and why it cannot be reversed.',
    content: 'Bitcoin uses SHA-256d, which means the SHA-256 algorithm is applied twice in series: Hash = SHA-256(SHA-256(data)). This was designed by Satoshi to protect against theoretical length-extension attacks. SHA-256 is an avalanche cipher: changing even a single bit in the 80-byte header completely randomizes all 256 bits of the output. There are no shortcuts—finding a target hash is mathematically pure luck and brute trial.',
    takeaway: 'SHA-256d is a one-way mathematical street: effortless to verify forward, impossible to calculate in reverse.'
  },
  {
    level: 150,
    era: '2014',
    tag: 'Hardware',
    title: 'Bitmain & The Nanometer Race',
    readTime: '1 min',
    teaser: 'The semiconductor sprint from 55nm down to 28nm Antminers.',
    content: 'Founded by Jihan Wu and Micree Zhan, Bitmain released the Antminer S1 (55nm) in 2013 and rapidly accelerated through the S3, S5, and S7 (28nm) in 2014-2015. Mining hardware became the primary driver of bleeding-edge semiconductor packaging alongside smartphones, pushing silicon foundries like TSMC to innovate specialized high-density, low-voltage hashboard architectures.',
    takeaway: 'Crypto mining became one of the leading global drivers of advanced silicon fabrication and thermal engineering.'
  },
  {
    level: 160,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Merkle Trees & Block Headers',
    readTime: '1 min',
    teaser: 'How thousands of transactions condense into a single 32-byte cryptographic root.',
    content: 'A Bitcoin block contains thousands of transactions, but an ASIC miner only ever hashes an 80-byte block header. How? Transactions are paired up and repeatedly hashed in a binary tree invented by Ralph Merkle. The top of this pyramid is a single 32-byte string called the Merkle Root. If even a single satoshi in any transaction changes, the Merkle root changes completely, requiring the block to be re-mined.',
    takeaway: 'Merkle trees allow miners to secure thousands of complex transactions by hashing a tiny, featherweight 80-byte header.'
  },
  {
    level: 170,
    era: '2015',
    tag: 'AuxPoW',
    title: 'Merge Mining & Auxiliary Proof of Work',
    readTime: '1 min',
    teaser: 'How miners secure multiple blockchains simultaneously with zero extra power.',
    content: 'Auxiliary Proof of Work (AuxPoW) allows an ASIC miner to submit work to multiple distinct blockchains simultaneously without consuming an additional watt of power. Blockchains like Namecoin and Dogecoin adopted AuxPoW with Bitcoin and Litecoin. A miner solves a single cryptographic puzzle, and if the hash meets the target for both parent and auxiliary chains, both networks accept the block.',
    takeaway: 'AuxPoW proved that cryptographic energy expenditure can be shared across multiple decentralized ledgers simultaneously.'
  },
  {
    level: 180,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Solo Mining vs Pooled Mining Odds',
    readTime: '1 min',
    teaser: 'The mathematics of the cryptographic lottery and expected block time.',
    content: 'When you mine with a pool, you receive tiny payouts every few minutes based on your share contribution. When you solo-mine (e.g. on Public-Pool), you keep 100% of the 3.125 BTC subsidy plus fees whenever you hit a block. A 1 TH/s Bitaxe running against an 800 EH/s network has odds of roughly 1 in 800,000 per block (about 1 in 15 years on average). But because every hash is independent, any single hash today could hit the jackpot.',
    takeaway: 'Solo mining is mathematically fair: your odds are small each minute, but the payout is the entire unshared jackpot.'
  },
  {
    level: 190,
    era: '2016',
    tag: 'Hardware',
    title: 'The Second Halving & The Legendary S9',
    readTime: '1 min',
    teaser: 'Subsidies halve to 12.5 BTC as the most durable ASIC in history takes flight.',
    content: 'In July 2016, Bitcoin cut its block reward to 12.5 BTC at Block 420,000. Just prior, Bitmain released the 16nm Antminer S9 (13.5 TH/s, 1300W). Built like an industrial tank, the S9 became the bedrock of global mining. It was so resilient that thousands remained profitable and active through the bear market of 2018 and even into the 2020 halving cycle, earning legendary status among home miners.',
    takeaway: 'The Antminer S9 proved that durable, well-cooled ASIC silicon can maintain real economic value for over 6 years.'
  },
  {
    level: 200,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Joules per Terahash (J/TH)',
    readTime: '1 min',
    teaser: 'The universal metric of mining efficiency and how it defines profitability.',
    content: 'Joules per Terahash (J/TH) measures energy efficiency: how many Joules (Watt-seconds) of electricity does an ASIC consume to compute 1,000,000,000,000 hashes? In 2010, CPUs required over 100,000 J/TH. The Antminer S9 achieved ~100 J/TH. Modern 3nm ASICs achieve under 15 J/TH. The lower your J/TH, the less power your rig consumes to generate the same hashing power.',
    takeaway: 'In crypto mining, efficiency (J/TH) always beats raw hashrate when power costs matter.'
  },
  {
    level: 210,
    era: '2017',
    tag: 'Scaling',
    title: 'The Blocksize War & SegWit',
    readTime: '1 min',
    teaser: 'User-Activated Soft Forks, transaction malleability, and the Lightning Network.',
    content: 'In 2017, the Bitcoin community faced an intense debate over transaction scaling. Some corporate miners advocated for larger 8MB blocks, while node runners and users favored Segregated Witness (SegWit, BIP 141). SegWit separated signature witness data from transaction outputs, effectively increasing capacity to ~2MB without breaking backwards compatibility, while enabling second-layer payment channels like Lightning.',
    takeaway: 'The Blocksize War proved that node runners and decentralized users hold ultimate sovereignty over the rules of the network.'
  },
  {
    level: 220,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'The ExtraNonce Dimension',
    readTime: '1 min',
    teaser: 'Why a 32-bit nonce isn’t enough for modern terahash miners.',
    content: 'A standard Bitcoin block header only has a 32-bit nonce field, which maxes out at 4,294,967,296 possible numbers. At 1 TH/s, a modern ASIC exhausts all 4.29 billion nonces in less than 5 milliseconds! To keep mining, the rig modifies the ExtraNonce field located inside the coinbase transaction script, generating a brand-new Merkle root and an entire fresh universe of 4.29 billion nonces.',
    takeaway: 'The ExtraNonce gives miners an infinite search space so ASICs never run out of unique riddles to test.'
  },
  {
    level: 230,
    era: '2018',
    tag: 'Cooling',
    title: 'Crypto Winter & Immersion Cooling',
    readTime: '1 min',
    teaser: 'Submerging hashboards in non-conductive dielectric fluid for silent power.',
    content: 'During the brutal 2018 bear market with Bitcoin below $4,000, miners sought every possible operational advantage. Immersion cooling emerged: submerging operational ASIC hashboards entirely into specialized clear dielectric hydrocarbon fluids. Immersion eliminated noisy 6,000 RPM screamer fans, prevented dust accumulation, reduced chip thermal resistance, and allowed massive 40%+ overclocking safely.',
    takeaway: 'Immersion cooling transformed mining hardware from industrial jet engines into silent, fluid-cooled thermal units.'
  },
  {
    level: 240,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Stale vs Rejected Shares',
    readTime: '1 min',
    teaser: 'Why low ping to your Stratum pool protects your revenue.',
    content: 'When your miner submits a share, the pool grades it. An Accepted Share earns reward points. A Rejected Share was invalid (e.g. bad nonce calculation or misconfigured difficulty). A Stale Share was mathematically correct, but another miner in the world found a block milliseconds before your share reached the pool. Lowering your network ping (WiFi latency) prevents stale shares and maximizes accepted yield.',
    takeaway: 'Keep your miner on a clean, low-latency network connection to ensure every computed share counts.'
  },
  {
    level: 250,
    era: '2019',
    tag: 'Protocols',
    title: 'Stratum V2 & Custom Job Selection',
    readTime: '1 min',
    teaser: 'Braiins revolutionizes mining protocols with encrypted binary messaging.',
    content: 'In 2019, Braiins (operators of Slush Pool) unveiled Stratum V2. The legacy Stratum V1 protocol communicated in plaintext JSON, making it vulnerable to man-in-the-middle hashrate hijacking. Stratum V2 introduced authenticated AEAD encryption, compact binary framing (reducing bandwidth by 50%), and Job Negotiation, allowing individual miners to build their own transaction templates instead of pool operators.',
    takeaway: 'Stratum V2 decentralizes transaction selection, preventing pool operators from censoring network transactions.'
  },
  {
    level: 260,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'The 51% Attack Reality',
    readTime: '1 min',
    teaser: 'Why attacking the Bitcoin network with brute hashrate is economically suicidal.',
    content: 'A 51% attack occurs if a single entity controls more than half of the global hashrate, allowing them to reorganize recent blocks and double-spend their own coins. However, on modern Bitcoin with ~800 Exahashes/sec, procuring, powering, and deploying that many millions of ASIC machines would cost tens of billions of dollars. The moment an attack occurred, Bitcoin’s price would drop, destroying the attacker’s own capital.',
    takeaway: 'Proof of Work game theory ensures that spending energy to honestly secure the network is always vastly more profitable than attacking it.'
  },
  {
    level: 270,
    era: '2020',
    tag: 'Hardware',
    title: 'The Third Halving & MicroBT Whatsminer',
    readTime: '1 min',
    teaser: 'Subsidies halve to 6.25 BTC as MicroBT breaks the ASIC monopoly.',
    content: 'In May 2020, Bitcoin halved to 6.25 BTC at Block 630,000 amid global pandemic lockdowns. Former Bitmain chip designer Dr. Zuoxing Yang founded MicroBT, launching the Whatsminer M20 and M30 series. Whatsminers featured high-voltage series designs, custom aluminum packaging, and unparalleled power supply reliability, breaking single-manufacturer dominance and establishing true hardware competition.',
    takeaway: 'Hardware competition drives ASIC reliability and prevents centralized supply-chain choke points.'
  },
  {
    level: 280,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Frequency Binning & Silicon Lottery',
    readTime: '1 min',
    teaser: 'Why identical ASIC chips from the same wafer overclock differently.',
    content: 'Microchips are etched with light onto circular silicon wafers. Due to microscopic variations in atomic purity and temperature across the wafer, chips near the center often have fewer crystal defects than chips on the edge. High-quality dies can operate at 600 MHz on 1.1V, while lower-quality dies require 1.25V for stability. In AxeOS and custom firmware, tuning frequency to each chip’s sweet spot is called winning the Silicon Lottery.',
    takeaway: 'Custom firmware like AxeOS lets you tune each individual chip to maximize efficiency and stability.'
  },
  {
    level: 290,
    era: '2021',
    tag: 'Decentralization',
    title: 'The China Mining Ban & Great Migration',
    readTime: '1 min',
    teaser: '50% of global hashrate goes offline overnight, and Bitcoin never misses a beat.',
    content: 'In May 2021, China issued an abrupt nationwide ban on all cryptocurrency mining, immediately shutting down over 50% of all worldwide hashrate. For any traditional corporate server architecture, losing half your infrastructure overnight would cause catastrophic system outages. Bitcoin’s difficulty dropped 28% in a single adjustment, and within 6 months, miners relocated across the US, Norway, and Iceland, reaching new all-time high hashrates.',
    takeaway: 'The China ban demonstrated Bitcoin’s supreme anti-fragility: no CEO, no central headquarters, zero downtime.'
  },
  {
    level: 300,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Demand Response & Grid Balancing',
    readTime: '1 min',
    teaser: 'How miners act as virtual batteries that stabilize electrical power grids.',
    content: 'Power grids must balance electrical supply and consumer demand in real time every second. Unlike steel mills or chemical plants which take days to pause, ASIC miners can ramp down in 5 seconds via software. In Texas (ERCOT) and Northern Europe, mining facilities enter Demand Response agreements: they buy surplus wind and solar power during low demand, and shut down instantly during heatwaves and freezes to prevent blackouts.',
    takeaway: 'Miners act as economic shock absorbers, monetizing stranded renewable energy and stabilizing utility grids.'
  },
  {
    level: 310,
    era: '2022',
    tag: 'Consensus',
    title: 'The Proof of Stake Divergence',
    readTime: '1 min',
    teaser: 'Ethereum executes The Merge, cementing PoW as the thermodynamic anchor.',
    content: 'In September 2022, Ethereum executed The Merge, replacing GPU Proof of Work with Proof of Stake (PoS). This marked a fundamental ideological divergence in crypto. PoS governs consensus through internal coin ownership, where those with the most coins yield the most voting power. Proof of Work remains deliberately anchored to external thermodynamic physics: you cannot counterfeit or bribe electrical Joules.',
    takeaway: 'Proof of Work binds digital consensus to the physical universe of energy, ensuring true objective decentralization.'
  },
  {
    level: 320,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Thermal Dissipation & Waste Heat Scavenging',
    readTime: '1 min',
    teaser: 'First law of thermodynamics: 100% of ASIC electrical power becomes heat.',
    content: 'According to physics, computers perform zero mechanical work—every single kilowatt-hour of electricity consumed by an ASIC turns 100% into thermal heat. A 15W Bitaxe or a 100W Avalon Nano generates identical BTU heating output as a 15W or 100W resistance space heater, with one crucial difference: the miner calculates SHA-256 lottery tickets while warming your room!',
    takeaway: 'Home miners are not wasting electricity; they are heating living spaces with computational co-generation.'
  },
  {
    level: 330,
    era: '2023',
    tag: 'Open-Source',
    title: 'The Bitaxe & Open Source Hardware',
    readTime: '1 min',
    teaser: 'Skot9000 and the open-source community liberate ASIC micro-mining.',
    content: 'For a decade, ASIC hardware was locked inside closed proprietary 3,000W industrial boxes. In 2023, open-source engineer Skot9000 designed the Bitaxe: an open-hardware PCB pairing a single salvaged Bitmain ASIC chip (BM1397 / BM1366) with an ESP32 microcontroller running open-source AxeOS firmware. Anyone with a 3D printer and soldering iron could now build, study, and run their own autonomous ASIC miner.',
    takeaway: 'The Bitaxe proved open-source hardware can democratize ASIC mining from mega-farms back to bedroom desks.'
  },
  {
    level: 340,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Voltage Tuning & Quadratic Power Draw',
    readTime: '1 min',
    teaser: 'The secret physics equation that governs ASIC overclocking and efficiency.',
    content: 'CMOS microchip power consumption follows the equation: Power = Capacitance × Voltage² × Frequency (P = C·V²·f). Notice that voltage is SQUARED! Dropping your ASIC core voltage by just 10% reduces heat and power consumption by roughly 19%. Overclockers in AxeOS cautiously lower voltage to find the lowest stable threshold, generating maximum hashrate at minimum temperatures.',
    takeaway: 'Undervolting yields quadratic power savings—slight voltage drops produce dramatic efficiency gains.'
  },
  {
    level: 350,
    era: '2024',
    tag: 'Halving',
    title: 'The Fourth Halving (3.125 BTC)',
    readTime: '1 min',
    teaser: 'Subsidies drop to 3.125 BTC as Runes, Ordinals, and fee markets surge.',
    content: 'In April 2024, Bitcoin crossed Block 840,000, cutting the block subsidy from 6.25 to 3.125 BTC. Concurrently, transaction fee revenue surged as protocol innovations like Ordinals and Runes brought on-chain digital inscriptions to Bitcoin. Block 840,000 included an astounding 37.6 BTC in user fees alone, proving that as block subsidies taper off, transaction fee markets can sustain network security.',
    takeaway: 'The fee market will gradually replace block subsidies, ensuring miner revenue long into the 21st century.'
  },
  {
    level: 360,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'PPLNS vs PPS+ Pool Payouts',
    readTime: '1 min',
    teaser: 'Understanding the payout schemes that govern your mining rewards.',
    content: 'Pay-Per-Share (PPS) pays you an exact fixed rate for every share submitted, with the pool bearing the variance risk if no blocks are found. Pay-Per-Last-N-Shares (PPLNS) checks the last N shares submitted across the entire pool only when a block is found. PPLNS penalizes pool hoppers and rewards consistent, loyal miners with lower pool fee deductions (often 0% to 1% compared to 2-4% on PPS).',
    takeaway: 'For steady 24/7 miners, PPLNS yields the highest statistical payout over weeks and months.'
  },
  {
    level: 370,
    era: 'Hardware',
    tag: 'Home-Mining',
    title: 'Canaan Avalon Nano 3 & 3s',
    readTime: '1 min',
    teaser: 'The consumer heating appliance that mines Bitcoin in the living room.',
    content: 'Canaan Creative disrupted the home mining space in 2024 with the Avalon Nano 3 and Nano 3s. Packaged in sleek aesthetic enclosures with built-in multicolor LED mood lighting and whisper-quiet fans, the Nano pulls ~100-140W to output ~4-6 TH/s. Marketed openly as a desktop room heater that mines crypto, it marked the official arrival of ASIC appliances into everyday home consumer life.',
    takeaway: 'Mining appliances bring decentralized hashrate into everyday living rooms disguised as useful consumer heaters.'
  },
  {
    level: 380,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'The Mempool & Fee Bidding War',
    readTime: '1 min',
    teaser: 'How miners assemble 4 megabyte block payloads for maximum profit.',
    content: 'When users broadcast Bitcoin transactions, they wait in a distributed waiting room called the Mempool. Because block space is limited to roughly 4 virtual megabytes (weight units), miners sort pending transactions by their satoshis-per-virtual-byte (sat/vB) fee rate. High-paying transactions are packed into the next block header, while low-fee transactions wait for quiet network weekends.',
    takeaway: 'The Mempool is a free market auction for space in the world’s most secure chronological ledger.'
  },
  {
    level: 390,
    era: 'Energy',
    tag: 'Green-Energy',
    title: 'Flare Gas & Stranded Energy Monetization',
    readTime: '1 min',
    teaser: 'Burning waste oilfield methane to secure Bitcoin while cutting emissions.',
    content: 'Remote oil wells often lack gas pipelines, traditionally venting or flaring byproduct methane directly into the atmosphere—a potent greenhouse gas. Mobile mining containers equipped with generators can be parked directly at wellheads. By combusting the stranded methane to power ASIC miners on-site, producers eliminate harmful methane emissions by up to 90% while turning waste gas into sound money.',
    takeaway: 'Bitcoin mining turns environmental liabilities and stranded energy into productive capital.'
  },
  {
    level: 400,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Decentralized Solo Pools & Public-Pool',
    readTime: '1 min',
    teaser: 'Why open-source Stratum servers preserve individual sovereignty.',
    content: 'Proprietary cloud pools can monitor your IP address, charge high management fees, or censor your submitted shares. Open-source engines like Public-Pool let users run their own Stratum server locally on a Raspberry Pi or Home Assistant server connected directly to their own Bitcoin node. No registration, zero fees, and total privacy: your ASIC talks directly to your personal sovereign node.',
    takeaway: 'Running a local solo pool eliminates all intermediaries between your ASIC and the Bitcoin blockchain.'
  },
  {
    level: 410,
    era: 'Hardware',
    tag: 'Engineering',
    title: 'Hydro-Cooling & Radiator Loops',
    readTime: '1 min',
    teaser: 'Replacing roaring fans with closed-loop liquid cooling in home workshops.',
    content: 'Air-cooled ASIC miners rely on high-RPM fans that generate high-pitched noise (65-80 dBA). Water-cooling replaces air heatsinks with copper waterblocks and closed-loop liquid radiators. Water has over 4 times the specific heat capacity of air, cooling chips far below ambient air temperatures while reducing acoustic noise to a quiet whisper—ideal for basement home workshops.',
    takeaway: 'Hydro-cooling allows home miners to achieve high clock frequencies in residential spaces with near-silent acoustics.'
  },
  {
    level: 420,
    era: 'Concepts',
    tag: 'Demystified',
    title: 'Electromigration & Silicon Longevity',
    readTime: '1 min',
    teaser: 'How keeping chip junction temperatures below 65°C preserves your hardware for a decade.',
    content: 'Electromigration occurs when intense electrical current causes metal atoms inside a nanometer-scale microchip to physically drift over time, eventually causing open circuits or short circuits. Electromigration accelerates exponentially with excessive temperature and voltage. By keeping ASIC temperatures below 65°C and undervolting, miners can run their hardware continuously for over 10 years without degradation.',
    takeaway: 'Cool temperatures and modest voltages protect your ASIC chips against electromigration for years of service.'
  },
  {
    level: 430,
    era: 'Economics',
    tag: 'Future',
    title: 'The Halving Horizon: 2028 and 2140',
    readTime: '1 min',
    teaser: 'What happens when block subsidies reach zero in the year 2140?',
    content: 'The Bitcoin supply cap is fixed at 21,000,000 coins. In 2028, the 5th halving drops the subsidy to 1.5625 BTC. By roughly 2140, the final satoshi will be minted at Block 6,930,000. Afterward, miners will be sustained entirely by transaction fees. Because Bitcoin serves as the settlement anchor for global commerce and layer-2 networks, transaction fees will provide substantial, sustainable security revenue.',
    takeaway: 'Satoshi designed a predictable 130-year runway transitioning miner incentives smoothly from subsidies to transaction fees.'
  },
  {
    level: 440,
    era: 'Geopolitics',
    tag: 'Baseload',
    title: 'Volcano & Glacial Geothermal Mining',
    readTime: '1 min',
    teaser: 'How El Salvador and Iceland use tectonic earth energy to hash Bitcoin.',
    content: 'In 2021, El Salvador declared Bitcoin legal tender and began harnessing the geothermal steam of the Conchagua volcano to power sovereign ASIC mining operations. In Iceland, abundant glacial hydro and volcanic thermal steam power thousands of mining rigs with zero carbon emissions. Tectonic baseload power provides uninterrupted, clean energy perfectly matched for 24/7/365 ASIC computation.',
    takeaway: 'Geothermal and volcanic mining proves that Proof of Work can thrive on 100% clean, non-polluting energy.'
  },
  {
    level: 450,
    era: 'Ecosystem',
    tag: 'Alt-Chains',
    title: 'Auxiliary Chains: Bellscoin & Scrypt UTXOs',
    readTime: '1 min',
    teaser: 'How PoW principles foster organic, venture-capital-free community tokens.',
    content: 'Proof of Work extends beyond SHA-256. Chains like Bellscoin (scrypt-based, created by Dogecoin co-founder Billy Markus) and classic UTXO networks demonstrate how Proof of Work allows grassroots communities to launch digital currencies without pre-mines, venture capital seed rounds, or insider tokens. Everyone competes on an open, level playing field governed purely by computational physics.',
    takeaway: 'Proof of work remains the only fair-launch mechanism that completely prevents founder cantillon effects.'
  },
  {
    level: 460,
    era: 'Philosophy',
    tag: 'Economics',
    title: 'Austrian Economics & Thermodynamic Scarcity',
    readTime: '1 min',
    teaser: 'Why real digital scarcity requires an anchor to the physical universe.',
    content: 'Austrian economists like Friedrich Hayek argued that government monopolies on money inevitably lead to currency debasement and boom-bust debt cycles. Satoshi Nakamoto resolved this by anchoring Bitcoin’s issuance to thermodynamic energy. In the digital world, data can be copied infinitely for zero cost; Proof of Work is the only mechanism that makes information costly and unforgeably scarce.',
    takeaway: 'Proof of Work is the digital bridge between mathematical code and the physical laws of thermodynamics.'
  },
  {
    level: 470,
    era: 'Semiconductors',
    tag: 'Future',
    title: 'Gate-All-Around (GAA) & 2nm Lithography',
    readTime: '1 min',
    teaser: 'The physics threshold of sub-10 J/TH nano-transistors.',
    content: 'Semiconductor manufacturers are moving beyond FinFET transistors to Gate-All-Around (GAAFET) nanosheets at 2nm and 1.4nm scales. In GAA transistors, the gate material wraps completely around the silicon channel on all four sides, virtually eliminating parasitic current leakage. This will allow future generations of ASIC chips to operate below 10 Joules per Terahash, approaching the theoretical limits of silicon computation.',
    takeaway: 'Next-generation transistor architectures ensure home miners get ever more hashing power from every wall outlet watt.'
  },
  {
    level: 480,
    era: 'Autonomy',
    tag: 'Solar-Offset',
    title: 'Home Solar Harvesting & Dynamic Throttling',
    readTime: '1 min',
    teaser: 'Directing excess midday rooftop solar power straight into your mining blades.',
    content: 'Homeowners with solar panels often export excess midday power back to the grid for pennies on the dollar. With smart home integrations like Home Assistant and AxeOS, automation scripts detect solar export in real time and dynamically ramp up miner frequencies and voltages, soaking up 100% of excess solar electrons at zero marginal electricity cost to mint decentralized cryptocurrency.',
    takeaway: 'Smart home automation turns your mining fleet into an intelligent, profit-generating solar energy sponge.'
  },
  {
    level: 490,
    era: 'Culture',
    tag: 'Cypherpunk',
    title: 'The Cypherpunk Ethos & Open Sovereignty',
    readTime: '1 min',
    teaser: '“Cypherpunks write code” — defending privacy and autonomy through mathematics.',
    content: 'In 1993, Eric Hughes penned A Cypherpunk’s Manifesto: "Privacy is necessary for an open society in the electronic age... We cannot expect governments, corporations, or other large organizations to grant us privacy. We must defend our own." Bitcoin mining is the direct living realization of this ethos: individuals deploying hardware in their own homes to verify truth without permission.',
    takeaway: 'Every home miner running a single hash contributes to the preservation of global financial freedom.'
  },
  {
    level: 500,
    era: 'Apex',
    tag: 'Sovereign',
    title: 'The Satoshi Sovereign: 21 Million Immutable',
    readTime: '2 min',
    teaser: 'Reaching Level 500: The triumph of decentralized consensus over sixteen years.',
    content: 'Congratulations on reaching Level 500! You have ascended to the highest rank in the fleet: Satoshi Slayer (MAX). Since January 3, 2009, through financial panics, semiconductor booms, halving cycles, and regulatory bans, Bitcoin’s Proof of Work blockchain has run 24 hours a day, 7 days a week with over 99.98% uptime—longer and more reliably than any sovereign fiat payment rails on Earth. By running your home mining workstation, you stand as an active guardian of this unstoppable global consensus.',
    takeaway: 'Decentralized Proof of Work cannot be silenced, stopped, or corrupted. The code runs forever.'
  }
];

function xpForRpgLevel(l) {
  if (l <= 1) return 0;
  return Math.floor(75 * Math.pow(l - 1, 1.85));
}

function rpgLevelForXp(xp) {
  if (xp <= 0) return 1;
  let low = 1, high = 500, ans = 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (xpForRpgLevel(mid) <= xp) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
}

function getRpgTitle(lvl) {
  for (const t of RPG_TITLES) {
    if (lvl >= t.level) return t;
  }
  return RPG_TITLES[RPG_TITLES.length - 1];
}

function getNextRpgMilestone(lvl) {
  for (let i = RPG_TITLES.length - 1; i >= 0; i--) {
    if (RPG_TITLES[i].level > lvl) return RPG_TITLES[i];
  }
  return null;
}

function getRpgBadges(stats) {
  const totalShares = stats.totalShares || 0;
  const bestDiff = stats.bestDiff || 0;
  const maxFreq = stats.maxFreq || 0;
  const minTemp = stats.minTemp || 0;
  const efficiency = stats.efficiency || 0;
  const maxFan = stats.maxFan || 0;
  const rigCount = stats.rigCount || 0;
  const hasStratum = !!stats.hasStratum;
  const coin = stats.coin || 'BTC';
  const soundMode = stats.soundMode || 'off';
  const level = stats.level || 1;
  const blocksSolved = stats.blocksSolved || false;

  const diffStr = (d) => {
    if (d >= 1e9) return (d / 1e9).toFixed(2) + ' G';
    if (d >= 1e6) return (d / 1e6).toFixed(2) + ' M';
    if (d >= 1e3) return (d / 1e3).toFixed(1) + ' k';
    return d.toString();
  };

  return [
    // 1. Shares & Nonces
    {
      id: 'first_nonce',
      cat: 'shares',
      catLabel: 'Nonces & Shares',
      name: 'First Nonce',
      icon: '🥉',
      desc: 'Submit your first verified accepted share to the network pool.',
      unlocked: totalShares >= 1,
      currVal: totalShares,
      targetVal: 1,
      progressPct: Math.min(100, Math.round((totalShares / 1) * 100)),
      statStr: `${totalShares.toLocaleString()} / 1`,
      remStr: 'Completed'
    },
    {
      id: 'shares_10k',
      cat: 'shares',
      catLabel: 'Nonces & Shares',
      name: 'Ten K Club',
      icon: '🥈',
      desc: 'Reach 10,000 accepted shares across your mining fleet.',
      unlocked: totalShares >= 10000,
      currVal: totalShares,
      targetVal: 10000,
      progressPct: Math.min(100, Math.round((totalShares / 10000) * 100)),
      statStr: `${totalShares.toLocaleString()} / 10,000`,
      remStr: totalShares >= 10000 ? 'Completed' : `${(10000 - totalShares).toLocaleString()} left`
    },
    {
      id: 'shares_100k',
      cat: 'shares',
      catLabel: 'Nonces & Shares',
      name: 'Century Miner',
      icon: '🥇',
      desc: 'Reach 100,000 accepted shares across your mining fleet.',
      unlocked: totalShares >= 100000,
      currVal: totalShares,
      targetVal: 100000,
      progressPct: Math.min(100, Math.round((totalShares / 100000) * 100)),
      statStr: `${totalShares.toLocaleString()} / 100,000`,
      remStr: totalShares >= 100000 ? 'Completed' : `${(100000 - totalShares).toLocaleString()} left`
    },
    {
      id: 'shares_1m',
      cat: 'shares',
      catLabel: 'Nonces & Shares',
      name: 'Mega Miner',
      icon: '💎',
      desc: 'Submit 1,000,000 lifetime shares to the blockchain.',
      unlocked: totalShares >= 1000000,
      currVal: totalShares,
      targetVal: 1000000,
      progressPct: Math.min(100, Math.round((totalShares / 1000000) * 100)),
      statStr: `${totalShares.toLocaleString()} / 1,000,000`,
      remStr: totalShares >= 1000000 ? 'Completed' : `${(1000000 - totalShares).toLocaleString()} left`
    },

    // 2. Difficulty & Luck
    {
      id: 'diff_1m',
      cat: 'difficulty',
      catLabel: 'Difficulty & Luck',
      name: 'Millionaire Hit',
      icon: '🎯',
      desc: 'Submit a share with difficulty greater than 1,000,000 (1M).',
      unlocked: bestDiff >= 1e6,
      currVal: bestDiff,
      targetVal: 1e6,
      progressPct: Math.min(100, Math.round((bestDiff / 1e6) * 100)),
      statStr: `${diffStr(bestDiff)} / 1.00 M`,
      remStr: bestDiff >= 1e6 ? 'Completed' : `${diffStr(1e6 - bestDiff)} left`
    },
    {
      id: 'diff_100m',
      cat: 'difficulty',
      catLabel: 'Difficulty & Luck',
      name: 'High Roller',
      icon: '⚡',
      desc: 'Submit a share with difficulty exceeding 100,000,000 (100M).',
      unlocked: bestDiff >= 1e8,
      currVal: bestDiff,
      targetVal: 1e8,
      progressPct: Math.min(100, Math.round((bestDiff / 1e8) * 100)),
      statStr: `${diffStr(bestDiff)} / 100.00 M`,
      remStr: bestDiff >= 1e8 ? 'Completed' : `${diffStr(1e8 - bestDiff)} left`
    },
    {
      id: 'diff_1g',
      cat: 'difficulty',
      catLabel: 'Difficulty & Luck',
      name: 'Gigahash Titan',
      icon: '🏆',
      desc: 'Hit a legendary Mega-Share with difficulty exceeding 1,000,000,000 (1G).',
      unlocked: bestDiff >= 1e9,
      currVal: bestDiff,
      targetVal: 1e9,
      progressPct: Math.min(100, Math.round((bestDiff / 1e9) * 100)),
      statStr: `${diffStr(bestDiff)} / 1.00 G`,
      remStr: bestDiff >= 1e9 ? 'Completed' : `${diffStr(1e9 - bestDiff)} left`
    },
    {
      id: 'block_bounty',
      cat: 'difficulty',
      catLabel: 'Difficulty & Luck',
      name: 'Solo Block Bounty',
      icon: '👑',
      desc: 'Solve a valid Bitcoin or Alt-Coin block on solo stratum.',
      unlocked: !!blocksSolved,
      currVal: blocksSolved ? 1 : 0,
      targetVal: 1,
      progressPct: blocksSolved ? 100 : 0,
      statStr: blocksSolved ? '1 / 1 Block' : '0 / 1 Block',
      remStr: blocksSolved ? 'SOLVED!' : 'Awaiting Solved Block'
    },

    // 3. Tuning & Hardware
    {
      id: 'oc_speed',
      cat: 'hardware',
      catLabel: 'Tuning & Hardware',
      name: 'Speed Demon',
      icon: '🏎️',
      desc: 'Overclock ASIC core frequency to 600 MHz or higher.',
      unlocked: maxFreq >= 600,
      currVal: maxFreq,
      targetVal: 600,
      progressPct: Math.min(100, Math.round((maxFreq / 600) * 100)),
      statStr: `${maxFreq.toFixed(0)} MHz / 600 MHz`,
      remStr: maxFreq >= 600 ? 'Completed' : `${(600 - maxFreq).toFixed(0)} MHz to go`
    },
    {
      id: 'oc_redline',
      cat: 'hardware',
      catLabel: 'Tuning & Hardware',
      name: 'Redline Turbo',
      icon: '🚀',
      desc: 'Overclock ASIC core frequency to 700 MHz extreme tier.',
      unlocked: maxFreq >= 700,
      currVal: maxFreq,
      targetVal: 700,
      progressPct: Math.min(100, Math.round((maxFreq / 700) * 100)),
      statStr: `${maxFreq.toFixed(0)} MHz / 700 MHz`,
      remStr: maxFreq >= 700 ? 'Completed' : `${(700 - maxFreq).toFixed(0)} MHz to go`
    },
    {
      id: 'temp_cryo',
      cat: 'hardware',
      catLabel: 'Tuning & Hardware',
      name: 'Cryo Core',
      icon: '❄️',
      desc: 'Maintain core operating temperature under 56°C under active load.',
      unlocked: minTemp > 0 && minTemp <= 56,
      currVal: minTemp,
      targetVal: 56,
      progressPct: (minTemp > 0 && minTemp <= 56) ? 100 : Math.max(0, Math.round((1 - (minTemp - 56) / 20) * 100)),
      statStr: minTemp > 0 ? `${minTemp.toFixed(1)}°C ≤ 56°C` : '--',
      remStr: (minTemp > 0 && minTemp <= 56) ? 'Completed' : 'Cooling needed'
    },
    {
      id: 'eff_green',
      cat: 'hardware',
      catLabel: 'Tuning & Hardware',
      name: 'Green Hash',
      icon: '🔋',
      desc: 'Tune fleet to achieve electrical efficiency ≤ 25.0 J/TH.',
      unlocked: efficiency > 0 && efficiency <= 25,
      currVal: efficiency,
      targetVal: 25,
      progressPct: (efficiency > 0 && efficiency <= 25) ? 100 : 60,
      statStr: efficiency > 0 ? `${efficiency.toFixed(1)} J/TH ≤ 25 J/TH` : '--',
      remStr: (efficiency > 0 && efficiency <= 25) ? 'Completed' : 'Tune efficiency'
    },
    {
      id: 'fan_tornado',
      cat: 'hardware',
      catLabel: 'Tuning & Hardware',
      name: 'Tornado Turbine',
      icon: '🌪️',
      desc: 'Drive cooling fan at 5,000+ RPM high-velocity cooling.',
      unlocked: maxFan >= 5000,
      currVal: maxFan,
      targetVal: 5000,
      progressPct: Math.min(100, Math.round((maxFan / 5000) * 100)),
      statStr: `${maxFan.toLocaleString()} RPM / 5,000`,
      remStr: maxFan >= 5000 ? 'Completed' : `${(5000 - maxFan).toLocaleString()} RPM to go`
    },

    // 4. Stratum & Operations
    {
      id: 'rigs_dual',
      cat: 'operations',
      catLabel: 'Stratum & Ops',
      name: 'Dual Rig Dynasty',
      icon: '🖥️',
      desc: 'Operate 2 or more active ASIC blades simultaneously.',
      unlocked: rigCount >= 2,
      currVal: rigCount,
      targetVal: 2,
      progressPct: Math.min(100, Math.round((rigCount / 2) * 100)),
      statStr: `${rigCount} / 2 Rigs`,
      remStr: rigCount >= 2 ? 'Completed' : '1 more rig needed'
    },
    {
      id: 'pool_stratum',
      cat: 'operations',
      catLabel: 'Stratum & Ops',
      name: 'Stratum Navigator',
      icon: '🌐',
      desc: 'Connect to an active Stratum mining pool provider.',
      unlocked: hasStratum,
      currVal: hasStratum ? 1 : 0,
      targetVal: 1,
      progressPct: hasStratum ? 100 : 0,
      statStr: hasStratum ? 'Stratum Online' : 'No Stratum',
      remStr: hasStratum ? 'Connected' : 'Offline'
    },
    {
      id: 'coin_alt',
      cat: 'operations',
      catLabel: 'Stratum & Ops',
      name: 'Alt-Coin Alchemist',
      icon: '🎭',
      desc: 'Mine or track an alternative SHA-256 coin like WOJAK.',
      unlocked: coin && coin !== 'BTC',
      currVal: coin && coin !== 'BTC' ? 1 : 0,
      targetVal: 1,
      progressPct: coin && coin !== 'BTC' ? 100 : 0,
      statStr: `${coin || 'BTC'} Active`,
      remStr: coin && coin !== 'BTC' ? 'Completed' : 'Mine an alt-coin'
    },
    {
      id: 'audio_on',
      cat: 'operations',
      catLabel: 'Stratum & Ops',
      name: 'Sonic Rig',
      icon: '🔊',
      desc: 'Enable synthesized acoustic Geiger clicks or crystal chimes.',
      unlocked: soundMode !== 'off',
      currVal: soundMode !== 'off' ? 1 : 0,
      targetVal: 1,
      progressPct: soundMode !== 'off' ? 100 : 0,
      statStr: soundMode !== 'off' ? `${soundMode.toUpperCase()} Active` : 'Muted',
      remStr: soundMode !== 'off' ? 'Enabled' : 'Audio muted'
    },

    // 5. Prestige Tiers
    {
      id: 'lvl_100',
      cat: 'prestige',
      catLabel: 'Prestige Tiers',
      name: 'Centurion',
      icon: '🌟',
      desc: 'Ascend to Fleet Level 100 (Volt Tamer).',
      unlocked: level >= 100,
      currVal: level,
      targetVal: 100,
      progressPct: Math.min(100, Math.round((level / 100) * 100)),
      statStr: `Lvl ${level} / Lvl 100`,
      remStr: level >= 100 ? 'Completed' : `${100 - level} levels left`
    },
    {
      id: 'lvl_250',
      cat: 'prestige',
      catLabel: 'Prestige Tiers',
      name: 'Master of Silicon',
      icon: '🔱',
      desc: 'Ascend to Fleet Level 250 (Megahash Overlord).',
      unlocked: level >= 250,
      currVal: level,
      targetVal: 250,
      progressPct: Math.min(100, Math.round((level / 250) * 100)),
      statStr: `Lvl ${level} / Lvl 250`,
      remStr: level >= 250 ? 'Completed' : `${250 - level} levels left`
    },
    {
      id: 'lvl_400',
      cat: 'prestige',
      catLabel: 'Prestige Tiers',
      name: 'Celestial Sovereign',
      icon: '🌌',
      desc: 'Ascend to Fleet Level 400 (Consensus Sovereign).',
      unlocked: level >= 400,
      currVal: level,
      targetVal: 400,
      progressPct: Math.min(100, Math.round((level / 400) * 100)),
      statStr: `Lvl ${level} / Lvl 400`,
      remStr: level >= 400 ? 'Completed' : `${400 - level} levels left`
    }
  ];
}

// --- PRESTIGE THEME ENGINE (Unlocked at Lvl 100 • 5 Milestone Aesthetic Themes) ---
const PRESTIGE_THEMES = [
  {
    id: 'default',
    name: 'Cyber Obsidian',
    reqLevel: 0,
    subtitle: 'Default • Classic Aero-Glass',
    icon: '💎',
    previewGradient: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #0284c7 100%)',
    accent: '#38bdf8',
    accentSecondary: '#fbbf24',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    cardBg: 'rgba(15, 23, 42, 0.72)',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.10) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.8) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(8, 47, 73, 0.5))',
    goldGlow: '0 0 35px -8px rgba(245, 158, 11, 0.22)'
  },
  {
    id: 'solar_flare',
    name: 'Solar Flare Gold',
    reqLevel: 100,
    subtitle: 'Level 100 • Volt Tamer Tier',
    icon: '☀️',
    previewGradient: 'linear-gradient(135deg, #451a03 0%, #b45309 40%, #fbbf24 100%)',
    accent: '#fbbf24',
    accentSecondary: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.5)',
    cardBg: 'rgba(28, 20, 10, 0.75)',
    cardBorder: 'rgba(245, 158, 11, 0.3)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(245, 158, 11, 0.22) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(217, 119, 6, 0.18) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(24, 17, 8, 0.85) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.35), rgba(120, 53, 15, 0.6))',
    goldGlow: '0 0 40px -6px rgba(245, 158, 11, 0.45)'
  },
  {
    id: 'thermal_magma',
    name: 'Thermal Magma',
    reqLevel: 200,
    subtitle: 'Level 200 • Thermal Dominator Tier',
    icon: '🔥',
    previewGradient: 'linear-gradient(135deg, #4c0519 0%, #be123c 45%, #fb7185 100%)',
    accent: '#f43f5e',
    accentSecondary: '#fb7185',
    accentGlow: 'rgba(244, 63, 94, 0.5)',
    cardBg: 'rgba(30, 10, 18, 0.78)',
    cardBorder: 'rgba(244, 63, 94, 0.32)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(244, 63, 94, 0.22) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(225, 29, 72, 0.18) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(26, 8, 16, 0.85) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.35), rgba(136, 19, 55, 0.6))',
    goldGlow: '0 0 40px -6px rgba(244, 63, 94, 0.45)'
  },
  {
    id: 'emerald_matrix',
    name: 'Emerald Matrix',
    reqLevel: 300,
    subtitle: 'Level 300 • Crypto Colossus Tier',
    icon: '❇️',
    previewGradient: 'linear-gradient(135deg, #022c22 0%, #047857 45%, #34d399 100%)',
    accent: '#10b981',
    accentSecondary: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.5)',
    cardBg: 'rgba(6, 28, 20, 0.78)',
    cardBorder: 'rgba(16, 185, 129, 0.3)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.22) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(5, 150, 105, 0.18) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(5, 24, 17, 0.85) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(6, 78, 59, 0.6))',
    goldGlow: '0 0 40px -6px rgba(16, 185, 129, 0.45)'
  },
  {
    id: 'amethyst_nebula',
    name: 'Amethyst Nebula',
    reqLevel: 400,
    subtitle: 'Level 400 • Consensus Sovereign Tier',
    icon: '🔮',
    previewGradient: 'linear-gradient(135deg, #2e1065 0%, #6d28d9 45%, #c084fc 100%)',
    accent: '#a855f7',
    accentSecondary: '#c084fc',
    accentGlow: 'rgba(168, 85, 247, 0.5)',
    cardBg: 'rgba(24, 10, 42, 0.78)',
    cardBorder: 'rgba(168, 85, 247, 0.32)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.22) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.18) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(20, 8, 36, 0.85) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(59, 7, 100, 0.6))',
    goldGlow: '0 0 40px -6px rgba(168, 85, 247, 0.45)'
  },
  {
    id: 'celestial_diamond',
    name: 'Celestial Diamond',
    reqLevel: 500,
    subtitle: 'Level 500 • Satoshi Slayer (Apex Tier)',
    icon: '👑',
    previewGradient: 'linear-gradient(135deg, #38bdf8 0%, #ec4899 50%, #fbbf24 100%)',
    accent: '#f8fafc',
    accentSecondary: '#38bdf8',
    accentGlow: 'rgba(255, 255, 255, 0.65)',
    cardBg: 'rgba(18, 24, 38, 0.82)',
    cardBorder: 'rgba(255, 255, 255, 0.4)',
    heroBg: 'radial-gradient(at 0% 0%, rgba(236, 72, 153, 0.18) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(56, 189, 248, 0.22) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.88) 0px, transparent 100%)',
    pillGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(56, 189, 248, 0.4))',
    goldGlow: '0 0 50px -4px rgba(255, 255, 255, 0.5), 0 0 30px rgba(56, 189, 248, 0.4)'
  }
];

const PIPELINE_COIN_GROUPS = [
  {
    id: 'mining_dutch',
    label: 'Mining-Dutch (SHA-256 & Merged)',
    icon: '🇳🇱'
  },
  {
    id: 'helios',
    label: 'HeliosPool (Solo SHA-256)',
    icon: '☀️'
  },
  {
    id: 'aux',
    label: 'Auxiliary Networks',
    icon: '🌐'
  }
];

const PIPELINE_COIN_PROFILES = {
  // --- MINING-DUTCH (SHA-256 & MERGED) ---
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '₿',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3465,
    baseHeight: 892110,
    blockIntervalSec: 600,
    reward: '3.125 BTC',
    targetZeros: 19,
    diffStr: '85.0M',
    tagColor: '#fbbf24'
  },
  WOJAK: {
    name: 'WOJAK',
    symbol: 'WOJAK',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🎭',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 9995,
    baseHeight: 1420500,
    blockIntervalSec: 120,
    reward: '10,000 WJK',
    targetZeros: 9,
    diffStr: '14.1G',
    tagColor: '#38bdf8'
  },
  BCH: {
    name: 'Bitcoin Cash',
    symbol: 'BCH',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '₿',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3703,
    baseHeight: 892400,
    blockIntervalSec: 600,
    reward: '3.125 BCH',
    targetZeros: 14,
    diffStr: '500.0G',
    tagColor: '#34d399'
  },
  BSV: {
    name: 'Bitcoin SV',
    symbol: 'BSV',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: 'Ɓ',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3433,
    baseHeight: 890000,
    blockIntervalSec: 600,
    reward: '3.125 BSV',
    targetZeros: 15,
    diffStr: '72.0G',
    tagColor: '#eab308'
  },
  FB: {
    name: 'Fractal Bitcoin',
    symbol: 'FB',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🌀',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3335,
    baseHeight: 385200,
    blockIntervalSec: 30,
    reward: '25 FB',
    targetZeros: 16,
    diffStr: '12.5T',
    tagColor: '#818cf8'
  },
  DGB: {
    name: 'DigiByte',
    symbol: 'DGB',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: 'Ɗ',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3471,
    baseHeight: 20450000,
    blockIntervalSec: 15,
    reward: '420 DGB',
    targetZeros: 7,
    diffStr: '45.0M',
    tagColor: '#0284c7'
  },
  PPC: {
    name: 'Peercoin',
    symbol: 'PPC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🅿️',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3408,
    baseHeight: 742000,
    blockIntervalSec: 600,
    reward: '35.0 PPC',
    targetZeros: 11,
    diffStr: '2.80G',
    tagColor: '#38bdf8'
  },
  XEC: {
    name: 'eCash',
    symbol: 'XEC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🪙',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3703,
    baseHeight: 892000,
    blockIntervalSec: 600,
    reward: '6,250,000 XEC',
    targetZeros: 14,
    diffStr: '220.0G',
    tagColor: '#0074c2'
  },
  NMC: {
    name: 'Namecoin',
    symbol: 'NMC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch (Merged)',
    icon: '🅽',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3465,
    baseHeight: 745000,
    blockIntervalSec: 600,
    reward: '12.5 NMC',
    targetZeros: 19,
    diffStr: '85.0M',
    tagColor: '#10b981'
  },
  EMC: {
    name: 'Emercoin',
    symbol: 'EMC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch (Merged)',
    icon: '🅴',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3465,
    baseHeight: 610000,
    blockIntervalSec: 600,
    reward: '5.0 EMC',
    targetZeros: 12,
    diffStr: '5.50G',
    tagColor: '#a855f7'
  },
  TRC: {
    name: 'Terracoin',
    symbol: 'TRC',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch (Merged)',
    icon: '🌍',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3465,
    baseHeight: 4500000,
    blockIntervalSec: 120,
    reward: '10.5 TRC',
    targetZeros: 11,
    diffStr: '1.20G',
    tagColor: '#059669'
  },
  CHI: {
    name: 'Xaya',
    symbol: 'CHI',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch (Merged)',
    icon: '⚔️',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3465,
    baseHeight: 4800000,
    blockIntervalSec: 30,
    reward: '21.25 CHI',
    targetZeros: 18,
    diffStr: '80.0M',
    tagColor: '#e11d48'
  },
  FIX: {
    name: 'FixedCoin',
    symbol: 'FIX',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🔧',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3407,
    baseHeight: 520000,
    blockIntervalSec: 120,
    reward: '50.0 FIX',
    targetZeros: 7,
    diffStr: '320.0M',
    tagColor: '#64748b'
  },
  XRG: {
    name: 'Ergon',
    symbol: 'XRG',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '⚡',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3407,
    baseHeight: 280000,
    blockIntervalSec: 600,
    reward: '0.85 XRG',
    targetZeros: 10,
    diffStr: '850.0M',
    tagColor: '#06b6d4'
  },
  SPACE: {
    name: 'MVC (Metaverse)',
    symbol: 'SPACE',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🌌',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3445,
    baseHeight: 110000,
    blockIntervalSec: 600,
    reward: '12.5 SPACE',
    targetZeros: 12,
    diffStr: '4.20G',
    tagColor: '#6366f1'
  },
  FCH: {
    name: 'FreeCash',
    symbol: 'FCH',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '💸',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3407,
    baseHeight: 1850000,
    blockIntervalSec: 600,
    reward: '50.0 FCH',
    targetZeros: 8,
    diffStr: '180.0M',
    tagColor: '#10b981'
  },
  BC2: {
    name: 'Bitcoin II',
    symbol: 'BC2',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🥈',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3407,
    baseHeight: 650000,
    blockIntervalSec: 600,
    reward: '5.0 BC2',
    targetZeros: 9,
    diffStr: '95.0M',
    tagColor: '#94a3b8'
  },
  DVT: {
    name: 'DeVault',
    symbol: 'DVT',
    pool: 'mining_dutch',
    poolName: 'Mining-Dutch',
    icon: '🗝️',
    algo: 'SHA-256',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 3407,
    baseHeight: 890000,
    blockIntervalSec: 120,
    reward: '250 DVT',
    targetZeros: 8,
    diffStr: '45.0M',
    tagColor: '#d97706'
  },

  // --- HELIOSPOOL (SOLO SHA-256) ---
  BTC_HELIOS: {
    name: 'Bitcoin (Helios Solo)',
    symbol: 'BTC',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '☀️',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 892110,
    blockIntervalSec: 600,
    reward: '3.125 BTC',
    targetZeros: 19,
    diffStr: '85.0M',
    tagColor: '#f59e0b'
  },
  BCH_HELIOS: {
    name: 'Bitcoin Cash (Helios Solo)',
    symbol: 'BCH',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '₿',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 892400,
    blockIntervalSec: 600,
    reward: '3.125 BCH',
    targetZeros: 14,
    diffStr: '500.0G',
    tagColor: '#34d399'
  },
  DGB_HELIOS: {
    name: 'DigiByte (Helios Solo)',
    symbol: 'DGB',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: 'Ɗ',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 20450000,
    blockIntervalSec: 15,
    reward: '420 DGB',
    targetZeros: 7,
    diffStr: '45.0M',
    tagColor: '#0284c7'
  },
  CHTA_HELIOS: {
    name: 'Cheetahcoin (Helios Solo)',
    symbol: 'CHTA',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '🐆',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 1250000,
    blockIntervalSec: 60,
    reward: '10,000 CHTA',
    targetZeros: 6,
    diffStr: '150.0M',
    tagColor: '#f59e0b'
  },
  WJK_HELIOS: {
    name: 'WOJAK (Helios Solo)',
    symbol: 'WOJAK',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '🎭',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 1420500,
    blockIntervalSec: 120,
    reward: '10,000 WJK',
    targetZeros: 9,
    diffStr: '14.1G',
    tagColor: '#38bdf8'
  },
  FIX_HELIOS: {
    name: 'FixedCoin (Helios Solo)',
    symbol: 'FIX',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '🔧',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 520000,
    blockIntervalSec: 120,
    reward: '50.0 FIX',
    targetZeros: 7,
    diffStr: '320.0M',
    tagColor: '#64748b'
  },
  XEC_HELIOS: {
    name: 'eCash (Helios Solo)',
    symbol: 'XEC',
    pool: 'helios',
    poolName: 'HeliosPool',
    icon: '🪙',
    algo: 'SHA-256',
    defaultHost: 'pool.heliosmining.io',
    defaultPort: 3333,
    baseHeight: 892000,
    blockIntervalSec: 600,
    reward: '6,250,000 XEC',
    targetZeros: 14,
    diffStr: '220.0G',
    tagColor: '#0074c2'
  },

  // --- AUXILIARY NETWORKS ---
  BELLS: {
    name: 'Bellscoin',
    symbol: 'BELLS',
    pool: 'aux',
    poolName: 'Mining-Dutch',
    icon: '🔔',
    algo: 'Scrypt',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 9997,
    baseHeight: 482100,
    blockIntervalSec: 60,
    reward: '500 BELLS',
    targetZeros: 6,
    diffStr: '250.0M',
    tagColor: '#f59e0b'
  },
  PEPE: {
    name: 'Pepecoin',
    symbol: 'PEPE',
    pool: 'aux',
    poolName: 'Mining-Dutch',
    icon: '🐸',
    algo: 'Scrypt',
    defaultHost: 'americas.mining-dutch.nl',
    defaultPort: 9998,
    baseHeight: 540200,
    blockIntervalSec: 60,
    reward: '10,000 PEPE',
    targetZeros: 8,
    diffStr: '85.0M',
    tagColor: '#10b981'
  },
  KAS: {
    name: 'Kaspa',
    symbol: 'KAS',
    pool: 'aux',
    poolName: 'WoolyPooly',
    icon: '⚡',
    algo: 'kHeavyHash',
    defaultHost: 'pool.woolypooly.com',
    defaultPort: 16110,
    baseHeight: 89200000,
    blockIntervalSec: 1,
    reward: '22.5 KAS',
    targetZeros: 18,
    diffStr: '1.20P',
    tagColor: '#2dd4bf'
  }
};

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
    this._liveCoinPrices = {};
    this._lastYieldFetch = 0;
    this._fetchingPrices = false;
    this._currentMiners = [];
    this._activeTab = safeStorage.get('miner_active_tab') || 'hardware';
    this._trophyFilter = safeStorage.get('miner_trophy_filter') || 'all';
    this._activeTheme = safeStorage.get('miner_active_theme') || 'default';
    this._chronicleFilter = safeStorage.get('miner_chronicle_filter') || 'all';
    this._lastRenderSig = null;
    this._soundMode = safeStorage.get('miner_sound_mode') || 'off'; // 'off' | 'geiger' | 'chimes'
    this._soundVolume = parseFloat(safeStorage.get('miner_sound_vol') || '0.35');
    this._lastTotalShares = null;
    this._lastBestDiff = null;
    this._audioCtx = null;
    this._pipelineCollapsed = safeStorage.get('miner_pipeline_collapsed') === 'true';
    this._pipelineAnimPaused = safeStorage.get('miner_pipeline_anim_paused') === 'true';
    this._selectedPipelineCoin = safeStorage.get('miner_pipeline_coin') || null;
    this._particleAnimId = null;
    this._goldenNonceInterval = null;
  }

  disconnectedCallback() {
    if (this._particleAnimId) {
      cancelAnimationFrame(this._particleAnimId);
      this._particleAnimId = null;
    }
    if (this._goldenNonceInterval) {
      clearInterval(this._goldenNonceInterval);
      this._goldenNonceInterval = null;
    }
  }

  static getStubConfig() {
    return {
      type: 'custom:home-miner-fleet-card',
      title: 'Crypto Miner Fleet Studio'
    };
  }

  getLayoutOptions() {
    return {
      grid_columns: 4,
      grid_rows: 'auto',
      grid_min_columns: 2
    };
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

  _computeMinerStateSignature(hass) {
    if (!hass || !hass.states) return '';
    const states = hass.states;
    const parts = [
      this._activeTab || 'hardware',
      this._trophyFilter || 'all',
      this._activeTheme || 'default',
      this._soundMode || 'off',
      this._selectedCoin || '',
      this._selectedLotteryCoin || '',
      this._selectedTimeframe || '24h',
      this._selectedPipelineCoin || '',
      this._pipelineCollapsed ? '1' : '0',
      this._pipelineAnimPaused ? '1' : '0'
    ];

    for (const eid in states) {
      const lower = eid.toLowerCase();
      // Skip high-frequency non-mining domains immediately (< 0.2ms performance)
      if (lower.startsWith('light.') || lower.startsWith('media_player.') ||
          lower.startsWith('weather.') || lower.startsWith('camera.') ||
          lower.startsWith('device_tracker.') || lower.startsWith('person.') ||
          lower.startsWith('zone.') || lower.startsWith('sun.') ||
          lower.startsWith('automation.') || lower.startsWith('script.') ||
          lower.startsWith('update.') || lower.startsWith('tts.') ||
          lower.includes('bambu')) {
        continue;
      }

      if (lower.includes('bitaxe') ||
          lower.includes('avalon') ||
          lower.includes('cgminer') ||
          lower.includes('miner') ||
          lower.includes('hashrate') ||
          lower.includes('coin_price') ||
          lower.includes('bitcoin_price') ||
          lower.includes('best_difficulty') ||
          lower.includes('best_share') ||
          lower.includes('electricity_rate') ||
          lower.includes('power_cost') ||
          lower.includes('energy_cost') ||
          lower.includes('power_profile') ||
          lower.includes('power_draw') ||
          lower.includes('chip_temperature') ||
          lower.includes('pool_') ||
          lower.includes('192_168_1_')) {
        const s = states[eid];
        if (s) {
          parts.push(`${eid}:${s.state}:${s.attributes?.change_24h_pct ?? ''}`);
        }
      }
    }
    return parts.join('|');
  }

  _isUserInputActive() {
    if (this._modalOpen || this._selectActive) return true;
    const activeEl = this.shadowRoot?.activeElement;
    if (activeEl) {
      const tag = (activeEl.tagName || '').toUpperCase();
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return true;
    }
    return false;
  }

  _bindSelectSafety(selectEl, onChangeCallback) {
    if (!selectEl) return;
    ['click', 'mousedown', 'pointerdown', 'touchstart'].forEach(evt => {
      selectEl.addEventListener(evt, (e) => e.stopPropagation());
    });
    selectEl.addEventListener('focus', () => {
      this._selectActive = true;
    });
    selectEl.addEventListener('blur', () => {
      if (this._selectBlurTimer) clearTimeout(this._selectBlurTimer);
      this._selectBlurTimer = setTimeout(() => {
        this._selectActive = false;
        if (this._hass && !this._isUserInputActive()) {
          const sig = this._computeMinerStateSignature(this._hass);
          if (sig !== this._lastRenderSig) {
            this._lastRenderSig = sig;
            this.render();
          }
        }
      }, 350);
    });
    if (onChangeCallback) {
      selectEl.addEventListener('change', (e) => {
        e.stopPropagation();
        this._selectActive = false;
        if (selectEl.blur) selectEl.blur();
        onChangeCallback(e);
      });
    }
  }

  _bindModalBackdrop(modalEl) {
    if (!modalEl) return;
    let startedOnBackdrop = false;
    modalEl.addEventListener('mousedown', (e) => {
      startedOnBackdrop = (e.target === modalEl);
    });
    modalEl.addEventListener('touchstart', (e) => {
      startedOnBackdrop = (e.target === modalEl);
    }, { passive: true });
    modalEl.addEventListener('click', (e) => {
      if (startedOnBackdrop && e.target === modalEl) {
        this._closeModals();
      }
      startedOnBackdrop = false;
    });
    modalEl.querySelectorAll('.modal-box').forEach(box => {
      ['click', 'mousedown', 'pointerdown', 'touchstart'].forEach(evt => {
        box.addEventListener(evt, (e) => e.stopPropagation());
      });
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._isUserInputActive()) {
      return; // Freeze rendering so typing focus, open dropdowns, and dialogs are NEVER disturbed
    }
    const sig = this._computeMinerStateSignature(hass);
    if (this._lastRenderSig && sig === this._lastRenderSig) {
      return; // Skip re-render: no relevant mining/market state changed
    }
    this._lastRenderSig = sig;
    this.render();
  }

  _getMinerName(host, defaultName, entityIds = []) {
    if (this._minerNames && this._minerNames[host]) {
      return this._minerNames[host];
    }
    const local = safeStorage.get('miner_name_' + host);
    if (local && local.trim()) return local.trim();

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
    if (type.includes('nerdqaxe') || type.includes('qaxe')) {
      return `
        <svg viewBox="0 0 120 70" class="miner-graphic-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="100" height="54" rx="8" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5" />
          <rect x="20" y="15" width="18" height="18" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
          <rect x="44" y="15" width="18" height="18" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
          <rect x="20" y="37" width="18" height="18" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
          <rect x="44" y="37" width="18" height="18" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1" />
          <circle cx="86" cy="35" r="16" fill="#1e1e2e" stroke="#fbbf24" stroke-width="1.5" />
          <circle cx="86" cy="35" r="5" fill="#fbbf24" />
          <path d="M86 21 L86 49 M72 35 L100 35" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round" />
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

  _getMinerTypeIconSvg(minerType, size = 24) {
    const type = (minerType || '').toLowerCase();
    if (type.includes('bitaxe') || type.includes('axeos')) {
      // Official Skot9000 Bitaxe Pixel Axe Logo
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon bitaxe-icon">
          <path d="M1 23H5V19H1V23ZM5 19H9V15H5V19ZM9 15H13V11H9V15ZM10 11H14V3H10V11ZM14 3H22V7H14V3ZM22 7H24V14H22V7ZM22 14H18V18H22V14ZM18 18H14V14H18V18ZM10 15H14V19H10V15Z"/>
        </svg>
      `;
    }
    if (type.includes('avalon') || type.includes('canaan')) {
      // Official Canaan Creative Avalon 'A' Dragon Logo
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon avalon-icon">
          <path d="M12 1.5L1.5 22.5H7.2L12 10.8L16.8 22.5H22.5L12 1.5ZM10 13.2L15.8 17.5L20.2 18.5L13.8 20.4L11.2 18L10 13.2Z"/>
        </svg>
      `;
    }
    if (type.includes('nerdqaxe') || type.includes('qaxe')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon nerdqaxe-icon">
          <path d="M2 2h8v8H2V2zm12 0h8v8h-8V2zM2 14h8v8H2V14zm12 0h8v8h-8V14zm2-10v4h4V4h-4zm-12 0v4h4V4H4zm0 12v4h4v-4H4zm12 0v4h4v-4h-4zm-5-3.5a2.5 2.5 0 1 1-1.5 2.3V16h2v-1.2a2.5 2.5 0 0 1-.5-4.3z"/>
        </svg>
      `;
    }
    if (type.includes('nerdminer') || type.includes('nerdaxe')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon nerdminer-icon">
          <path d="M1 8h9v7H1V8zm13 0h9v7h-9V8zm-4 3h4v2h-4v-2zM3 10v3h5v-3H3zm13 0v3h5v-3h-5zM5 2h2v4H5V2zm12 0h2v4h-2V2zM7 3h10v2H7V3z"/>
        </svg>
      `;
    }
    if (type.includes('futurebit') || type.includes('apollo')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon futurebit-icon">
          <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 5.9 3.2L14 10l-2-5zm-7 7a7 7 0 0 1 3.2-5.9L10 10l-5 2zm2 4.9A7 7 0 0 1 6 12l5 2l-4 3.9zm5 2.1a7 7 0 0 1-5.9-3.2L10 14l2 5zm7-7a7 7 0 0 1-3.2 5.9L14 14l5-2zm-2-4.9A7 7 0 0 1 18 12l-5-2l4-3.9zM12 10a2 2 0 1 1-2 2a2 2 0 0 1 2-2z"/>
        </svg>
      `;
    }
    if (type.includes('luckyminer') || type.includes('lv06') || type.includes('lv07') || type.includes('lv08')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon luckyminer-icon">
          <path d="M12 2a3.5 3.5 0 0 0-3.5 3.5c0 1.5 1 2.8 2.3 3.3a4.8 4.8 0 0 0-3.3-2.3a3.5 3.5 0 1 0 0 5a4.8 4.8 0 0 0 3.3-2.3a4.8 4.8 0 0 0-2.3 3.3a3.5 3.5 0 1 0 5 0a4.8 4.8 0 0 0-2.3-3.3a4.8 4.8 0 0 0 3.3 2.3a3.5 3.5 0 1 0 0-5a4.8 4.8 0 0 0-3.3 2.3a4.8 4.8 0 0 0 2.3-3.3A3.5 3.5 0 0 0 12 2zm0 8.5a1.5 1.5 0 1 1-1.5 1.5a1.5 1.5 0 0 1 1.5-1.5zM11 15v7h2v-7h-2z"/>
        </svg>
      `;
    }
    if (type.includes('whatsminer')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon whatsminer-icon">
          <path d="M2 5h20v14H2V5zm3 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm14 0a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm-14 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm14 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4zm-8-3h2v10h-2V7z"/>
        </svg>
      `;
    }
    if (type.includes('antminer')) {
      return `
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon antminer-icon">
          <path d="M4 3h16v18H4V3zm2 2v14h12V5H6zm2 2h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2zM2 9h2v6H2V9zm18 0h2v6h-2V9z"/>
        </svg>
      `;
    }
    // Generic Fleet / Crossed Pickaxes
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" class="miner-type-icon fleet-icon">
        <path d="M14.8 2.7L12 5.5L13.5 7L16.3 4.2C18.5 5.5 20.3 7.3 21.3 9.7L22.8 8.8C21.6 5.9 19.3 3.6 16.5 2.2L14.8 2.7ZM9.2 2.7L7.5 2.2C4.7 3.6 2.4 5.9 1.2 8.8L2.7 9.7C3.7 7.3 5.5 5.5 7.7 4.2L10.5 7L12 5.5L9.2 2.7ZM10.9 8.1L2.2 16.8L3.6 18.2L12.3 9.5L10.9 8.1ZM13.1 8.1L11.7 9.5L20.4 18.2L21.8 16.8L13.1 8.1ZM1.5 20L4 22.5L7 19.5L4.5 17L1.5 20ZM22.5 20L19.5 17L17 19.5L20 22.5L22.5 20Z"/>
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
    const padRight = 85;
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
      if (val >= 1) return '$' + val.toFixed(2);
      if (val >= 0.001) return '$' + val.toFixed(4);
      return '$' + val.toFixed(6);
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

        /* --- MULTI-COIN LIVE YIELD MATRIX & STRATUM SWITCHER --- */
        .yield-matrix-console {
          margin-bottom: 24px;
          padding: 20px 22px;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(8, 47, 73, 0.45));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        .yield-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .yield-title-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .yield-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }
        .yield-title {
          font-size: 15px;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.01em;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .yield-table-wrap {
          overflow-x: auto;
          margin-top: 8px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.5);
        }
        .yield-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .yield-table th {
          background: rgba(30, 41, 59, 0.85);
          color: #94a3b8;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          padding: 10px 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          white-space: nowrap;
        }
        .yield-table td {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          vertical-align: middle;
          white-space: nowrap;
        }
        .yield-table tr:last-child td {
          border-bottom: none;
        }
        .yield-table tr:hover td {
          background: rgba(56, 189, 248, 0.06);
        }
        .yield-table tr.top-yield-row {
          background: rgba(16, 185, 129, 0.07);
        }
        .yield-rank-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 800;
        }
        .yield-rank-1 {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: #0f172a;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }
        .yield-rank-other {
          background: rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .yield-coin-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .yield-coin-icon {
          font-size: 18px;
        }
        .yield-coin-symbol {
          font-weight: 800;
          color: #f8fafc;
          font-family: 'JetBrains Mono', monospace;
        }
        .yield-coin-name {
          font-size: 11px;
          color: #94a3b8;
        }
        .yield-profit-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
        }
        .profit-positive {
          background: rgba(16, 185, 129, 0.18);
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: #34d399;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.2);
        }
        .profit-negative {
          background: rgba(244, 63, 94, 0.15);
          border: 1px solid rgba(244, 63, 94, 0.4);
          color: #fb7185;
        }
        .stratum-btn-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }
        .stratum-btn-action:hover {
          background: rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
          transform: translateY(-1px);
        }
        .stratum-active-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #34d399;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

      </style>
      <canvas id="celebration-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;"></canvas>
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
                  <option value="nerdqaxe" style="background-color: #0f172a; color: #f8fafc;">NerdQaxe (Quad-ASIC • Untested)</option>
                  <option value="cgminer_rpc" style="background-color: #0f172a; color: #f8fafc;">Canaan Avalon / CGMiner</option>
                  <option value="nerdminer" style="background-color: #0f172a; color: #f8fafc;">ESP32 NerdMiner / NerdAxe</option>
                  <option value="futurebit" style="background-color: #0f172a; color: #f8fafc;">FutureBit Apollo II</option>
                  <option value="luckyminer" style="background-color: #0f172a; color: #f8fafc;">Lucky Miner (LV06/LV08)</option>
                  <option value="whatsminer" style="background-color: #0f172a; color: #f8fafc;">MicroBT Whatsminer</option>
                  <option value="antminer" style="background-color: #0f172a; color: #f8fafc;">Antminer / Braiins OS</option>
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

        <!-- 1-CLICK STRATUM SWITCHER GLASS MODAL -->
        <div id="stratum-modal" class="modal-backdrop" style="display: none;">
          <div class="modal-box" style="max-width: 520px; width: 95%;">
            <div class="modal-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 22px;">⚡</span>
                <div>
                  <span class="modal-title" id="stratum-modal-title" style="color: #38bdf8;">1-Click Stratum Pool Switcher</span>
                  <div class="mono" style="font-size: 11px; color: #94a3b8;" id="stratum-modal-sub">
                    Direct hardware pool & coin switching
                  </div>
                </div>
              </div>
              <button class="glass-btn" id="stratum-modal-close" style="padding: 4px 8px;">✕</button>
            </div>
            <div class="modal-grid" style="margin-top: 14px;">
              <div class="modal-field full">
                <label class="modal-label">Target Miner</label>
                <select id="stratum-target-miner" class="modal-select">
                  <option value="" style="background-color: #0f172a; color: #f8fafc;">🌐 Entire Fleet (All Compatible Miners)</option>
                </select>
              </div>
              <div class="modal-field full">
                <label class="modal-label">Coin & Algo Preset</label>
                <select id="stratum-coin-preset" class="modal-select">
                  <optgroup label="🇳🇱 Mining-Dutch (SHA-256 & Merged)">
                    <option value="WOJAK" data-port="9995" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🎭 WOJAK (WJK) • Mining-Dutch (Port 9995)</option>
                    <option value="BTC" data-port="3465" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">₿ Bitcoin (BTC) • Mining-Dutch (Port 3465)</option>
                    <option value="BCH" data-port="3703" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">₿ Bitcoin Cash (BCH) • Mining-Dutch (Port 3703)</option>
                    <option value="BSV" data-port="3433" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">Ɓ Bitcoin SV (BSV) • Mining-Dutch (Port 3433)</option>
                    <option value="FB" data-port="3335" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🌀 Fractal Bitcoin (FB) • Mining-Dutch (Port 3335)</option>
                    <option value="DGB" data-port="3471" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">Ɗ DigiByte SHA256 (DGB) • Mining-Dutch (Port 3471)</option>
                    <option value="PPC" data-port="3408" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🅿️ Peercoin (PPC) • Mining-Dutch (Port 3408)</option>
                    <option value="XEC" data-port="3703" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🪙 eCash (XEC) • Mining-Dutch (Port 3703)</option>
                    <option value="NMC" data-port="3465" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🅽 Namecoin (NMC) • Mining-Dutch (Port 3465)</option>
                    <option value="EMC" data-port="3465" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🅴 Emercoin (EMC) • Mining-Dutch (Port 3465)</option>
                    <option value="TRC" data-port="3465" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🌍 Terracoin (TRC) • Mining-Dutch (Port 3465)</option>
                    <option value="CHI" data-port="3465" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">⚔️ Xaya (CHI) • Mining-Dutch (Port 3465)</option>
                    <option value="FIX" data-port="3407" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🔧 FixedCoin (FIX) • Mining-Dutch (Port 3407)</option>
                    <option value="XRG" data-port="3407" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">⚡ Ergon (XRG) • Mining-Dutch (Port 3407)</option>
                    <option value="SPACE" data-port="3445" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🌌 MVC (SPACE) • Mining-Dutch (Port 3445)</option>
                    <option value="FCH" data-port="3407" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">💸 FreeCash (FCH) • Mining-Dutch (Port 3407)</option>
                    <option value="BC2" data-port="3407" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🥈 Bitcoin II (BC2) • Mining-Dutch (Port 3407)</option>
                    <option value="DVT" data-port="3407" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🗝️ DeVault (DVT) • Mining-Dutch (Port 3407)</option>
                  </optgroup>
                  <optgroup label="☀️ HeliosPool (Solo SHA-256)">
                    <option value="BTC_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">☀️ Bitcoin (BTC) • Helios Solo (Port 3333)</option>
                    <option value="BCH_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">₿ Bitcoin Cash (BCH) • Helios Solo (Port 3333)</option>
                    <option value="DGB_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">Ɗ DigiByte (DGB) • Helios Solo (Port 3333)</option>
                    <option value="CHTA_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">🐆 Cheetahcoin (CHTA) • Helios Solo (Port 3333)</option>
                    <option value="WJK_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">🎭 Wojakcoin (WJK) • Helios Solo (Port 3333)</option>
                    <option value="FIX_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">🔧 FixedCoin (FIX) • Helios Solo (Port 3333)</option>
                    <option value="XEC_HELIOS" data-port="3333" data-host="pool.heliosmining.io" style="background-color: #0f172a; color: #f8fafc;">🪙 eCash (XEC) • Helios Solo (Port 3333)</option>
                  </optgroup>
                  <optgroup label="🌐 Auxiliary & Community Networks">
                    <option value="BELLS" data-port="9997" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🔔 Bellcoin (BELLS) • Mining-Dutch (Port 9997)</option>
                    <option value="PEPE" data-port="9998" data-host="americas.mining-dutch.nl" style="background-color: #0f172a; color: #f8fafc;">🐸 Pepecoin (PEPE) • Mining-Dutch (Port 9998)</option>
                    <option value="BTC_PUBLIC" data-port="2142" data-host="public-pool.io" style="background-color: #0f172a; color: #f8fafc;">🎯 Bitcoin (BTC) • Public-Pool.io (Port 2142)</option>
                    <option value="CUSTOM" data-port="" data-host="" style="background-color: #0f172a; color: #f8fafc;">⚙️ Custom Stratum Endpoint...</option>
                  </optgroup>
                </select>
              </div>
              <div class="modal-field">
                <label class="modal-label">Stratum Pool Host</label>
                <input type="text" id="stratum-input-host" class="modal-input" value="americas.mining-dutch.nl" placeholder="americas.mining-dutch.nl" autocomplete="off" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Stratum Port</label>
                <input type="number" id="stratum-input-port" class="modal-input" value="9995" placeholder="9995" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Worker / Pool Username</label>
                <input type="text" id="stratum-input-user" class="modal-input" placeholder="e.g. Everyday3D.Bitaxe or wallet" autocomplete="off" />
              </div>
              <div class="modal-field">
                <label class="modal-label">Password</label>
                <input type="text" id="stratum-input-pass" class="modal-input" value="x" placeholder="x" autocomplete="off" />
              </div>
            </div>
            <div id="stratum-status-banner" style="display: none; margin-top: 14px; padding: 10px 14px; border-radius: 8px; font-size: 12px; font-family: 'JetBrains Mono', monospace;"></div>
            <div class="modal-footer" style="margin-top: 16px;">
              <button class="glass-btn" id="stratum-cancel-btn">Cancel</button>
              <button class="glass-btn primary" id="stratum-submit-btn" style="background: linear-gradient(135deg, #0284c7, #38bdf8); border-color: #38bdf8; color: #fff;">⚡ Switch Stratum Now</button>
            </div>
          </div>
        </div>

        <!-- CHRONICLE READING MODAL -->
        <div id="chronicle-modal" class="modal-backdrop" style="display: none;">
          <div class="modal-box" style="max-width: 640px; width: 95%; border-color: rgba(245, 158, 11, 0.35); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(245, 158, 11, 0.2);">
            <div class="modal-header" style="border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 26px;">📜</span>
                <div>
                  <span class="modal-title" id="cmodal-title" style="color: #fbbf24; font-size: 17px;">Mining Chronicle</span>
                  <div class="mono" style="font-size: 11px; color: #94a3b8; margin-top: 2px;" id="cmodal-subtitle">Level 10 Unlock • Era: 1993</div>
                </div>
              </div>
              <button class="glass-btn" id="cmodal-close-btn" style="padding: 4px 10px; font-size: 13px;">✕</button>
            </div>
            <div style="padding: 18px 22px;">
              <div id="cmodal-content" style="font-size: 13.5px; color: #cbd5e1; line-height: 1.7; margin-bottom: 18px;">
                <!-- Narrative body -->
              </div>
              <div class="chronicle-takeaway-box" id="cmodal-takeaway-box">
                <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                  <span>💡</span>
                  <span>Key Demystification for Home Miners</span>
                </div>
                <div id="cmodal-takeaway" style="font-size: 12.5px; color: #f1f5f9; font-weight: 500; line-height: 1.55;"></div>
              </div>
            </div>
            <div class="modal-footer" style="padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
              <button class="glass-btn" id="cmodal-done-btn" style="margin-left: auto; padding: 6px 18px; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">Done Reading</button>
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
    if (!modalRoot) return;

    // Intercept keyboard event bubbling: NEVER allow keydown/keyup/keypress to escape to Lovelace
    const stopPropagation = (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        this._closeModals();
      }
    };

    ['keydown', 'keyup', 'keypress'].forEach(eventType => {
      modalRoot.addEventListener(eventType, stopPropagation);
      if (minerModal) minerModal.addEventListener(eventType, stopPropagation);
      if (deleteModal) deleteModal.addEventListener(eventType, stopPropagation);
    });

    const inputsAndSelects = modalRoot.querySelectorAll('input, select, button');
    inputsAndSelects.forEach(el => {
      ['keydown', 'keyup', 'keypress', 'click', 'mousedown', 'pointerdown', 'touchstart'].forEach(evt => {
        el.addEventListener(evt, stopPropagation);
      });
    });

    if (minerModal) this._bindModalBackdrop(minerModal);
    if (deleteModal) this._bindModalBackdrop(deleteModal);

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
      this._bindModalBackdrop(discModal);

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
    if (modalTypeSelect) {
      this._bindSelectSafety(modalTypeSelect, () => {
        if (modalPortInput) {
          if (modalTypeSelect.value === 'bitaxe' || modalTypeSelect.value === 'nerdqaxe' || modalTypeSelect.value === 'nerdminer') {
            modalPortInput.value = 80;
          } else if (modalTypeSelect.value === 'cgminer_rpc' || modalTypeSelect.value === 'whatsminer' || modalTypeSelect.value === 'antminer') {
            modalPortInput.value = 4028;
          }
        }
      });
    }

    const modalPoolSelect = this.shadowRoot.querySelector('#modal-pool');
    if (modalPoolSelect) {
      this._bindSelectSafety(modalPoolSelect);
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
              safeStorage.set('miner_name_' + host, name);
            }
            if (poolProvider) {
              this._minerPools[host] = poolProvider;
              safeStorage.set('miner_pool_' + host, poolProvider);
            }
            if (poolWallet !== undefined) {
              this._minerWallets[host] = poolWallet;
              safeStorage.set('miner_wallet_' + host, poolWallet);
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
              safeStorage.set('miner_name_' + targetHost, name);
            }
            if (poolProvider) {
              this._minerPools[targetHost] = poolProvider;
              safeStorage.set('miner_pool_' + targetHost, poolProvider);
            }
            if (poolWallet !== undefined) {
              this._minerWallets[targetHost] = poolWallet;
              safeStorage.set('miner_wallet_' + targetHost, poolWallet);
            }
            if (coin) {
              this._minerCoins[targetHost] = coin.toUpperCase();
              safeStorage.set('miner_coin_' + targetHost, coin.toUpperCase());
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
          safeStorage.remove('miner_name_' + host);
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

    // --- STRATUM MODAL EVENT LISTENERS ---
    const stratumModal = this.shadowRoot.querySelector('#stratum-modal');
    if (stratumModal) {
      ['keydown', 'keyup', 'keypress'].forEach(eventType => {
        stratumModal.addEventListener(eventType, stopPropagation);
      });
      this._bindModalBackdrop(stratumModal);

      const stratumCloseBtn = this.shadowRoot.querySelector('#stratum-modal-close');
      const stratumCancelBtn = this.shadowRoot.querySelector('#stratum-cancel-btn');
      if (stratumCloseBtn) stratumCloseBtn.addEventListener('click', () => this._closeModals());
      if (stratumCancelBtn) stratumCancelBtn.addEventListener('click', () => this._closeModals());

      const stratumTargetSelect = this.shadowRoot.querySelector('#stratum-target-miner');
      if (stratumTargetSelect) {
        this._bindSelectSafety(stratumTargetSelect);
      }

      const stratumCoinPreset = this.shadowRoot.querySelector('#stratum-coin-preset');
      if (stratumCoinPreset) {
        this._bindSelectSafety(stratumCoinPreset, () => {
          const opt = stratumCoinPreset.selectedOptions[0];
          const hostInput = this.shadowRoot.querySelector('#stratum-input-host');
          const portInput = this.shadowRoot.querySelector('#stratum-input-port');
          if (opt && opt.dataset.host && hostInput) hostInput.value = opt.dataset.host;
          if (opt && opt.dataset.port && portInput) portInput.value = opt.dataset.port;
        });
      }

      const stratumSubmitBtn = this.shadowRoot.querySelector('#stratum-submit-btn');
      if (stratumSubmitBtn) {
        stratumSubmitBtn.addEventListener('click', async () => {
          const targetHost = this.shadowRoot.querySelector('#stratum-target-miner')?.value || '';
          const stratumHost = this.shadowRoot.querySelector('#stratum-input-host')?.value?.trim();
          const stratumPort = parseInt(this.shadowRoot.querySelector('#stratum-input-port')?.value || '0');
          const stratumUser = this.shadowRoot.querySelector('#stratum-input-user')?.value?.trim();
          const stratumPass = this.shadowRoot.querySelector('#stratum-input-pass')?.value?.trim() || 'x';
          const coinPreset = this.shadowRoot.querySelector('#stratum-coin-preset')?.value || '';
          const statusBanner = this.shadowRoot.querySelector('#stratum-status-banner');

          if (!stratumHost || !stratumPort) {
            alert('Stratum host and port are required.');
            return;
          }

          stratumSubmitBtn.disabled = true;
          stratumSubmitBtn.textContent = '⚡ Switching Stratum...';
          if (statusBanner) {
            statusBanner.style.display = 'block';
            statusBanner.style.background = 'rgba(56, 189, 248, 0.15)';
            statusBanner.style.border = '1px solid rgba(56, 189, 248, 0.4)';
            statusBanner.style.color = '#38bdf8';
            statusBanner.textContent = 'Transmitting stratum switch payload to hardware...';
          }

          try {
            let cleanCoin = coinPreset.split('_')[0];
            if (cleanCoin === 'CUSTOM') cleanCoin = undefined;

            await this._hass.callService('home_miner_studio', 'switch_stratum', {
              host: targetHost || undefined,
              stratum_url: stratumHost,
              stratum_port: stratumPort,
              stratum_user: stratumUser || undefined,
              stratum_password: stratumPass,
              coin: cleanCoin
            });

            if (statusBanner) {
              statusBanner.style.background = 'rgba(16, 185, 129, 0.2)';
              statusBanner.style.border = '1px solid #10b981';
              statusBanner.style.color = '#34d399';
              statusBanner.textContent = `✓ Stratum switched to ${stratumHost}:${stratumPort}! Miner reconnecting...`;
            }

            setTimeout(() => {
              this._closeModals();
              this.render();
            }, 1200);
          } catch (err) {
            stratumSubmitBtn.disabled = false;
            stratumSubmitBtn.textContent = '⚡ Switch Stratum Now';
            if (statusBanner) {
              statusBanner.style.background = 'rgba(244, 63, 94, 0.2)';
              statusBanner.style.border = '1px solid #f43f5e';
              statusBanner.style.color = '#fb7185';
              statusBanner.textContent = '❌ Stratum switch error: ' + err.message;
            }
          }
        });
      }
    }

    const cModal = this.shadowRoot.querySelector('#chronicle-modal');
    if (cModal) {
      this._bindModalBackdrop(cModal);
    }
  }

  _closeModals() {
    this._modalOpen = false;
    this._selectActive = false;
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    const deleteModal = this.shadowRoot.querySelector('#delete-modal');
    const discModal = this.shadowRoot.querySelector('#discovery-modal');
    const stratumModal = this.shadowRoot.querySelector('#stratum-modal');
    const cModal = this.shadowRoot.querySelector('#chronicle-modal');
    if (cModal) cModal.style.display = 'none';
    if (minerModal) minerModal.style.display = 'none';
    if (deleteModal) deleteModal.style.display = 'none';
    if (discModal) discModal.style.display = 'none';
    if (stratumModal) stratumModal.style.display = 'none';
  }

  _openChronicleModal(chapter) {
    this._ensureDom();
    const cModal = this.shadowRoot.querySelector('#chronicle-modal');
    if (!cModal || !chapter) return;
    this._modalOpen = true;

    const titleEl = this.shadowRoot.querySelector('#cmodal-title');
    const subEl = this.shadowRoot.querySelector('#cmodal-subtitle');
    const contentEl = this.shadowRoot.querySelector('#cmodal-content');
    const takeawayEl = this.shadowRoot.querySelector('#cmodal-takeaway');

    if (titleEl) titleEl.textContent = chapter.title;
    if (subEl) subEl.textContent = `Level ${chapter.level} Unlock • Era: ${chapter.era} • ${chapter.tag} • ${chapter.readTime}`;
    if (contentEl) contentEl.textContent = chapter.content;
    if (takeawayEl) takeawayEl.textContent = chapter.takeaway;

    cModal.style.display = 'flex';
  }

  _openStratumModal(targetHost = '', targetCoin = '') {
    this._ensureDom();
    this._modalOpen = true;
    const stratumModal = this.shadowRoot.querySelector('#stratum-modal');
    const targetSelect = this.shadowRoot.querySelector('#stratum-target-miner');
    const coinSelect = this.shadowRoot.querySelector('#stratum-coin-preset');
    const hostInput = this.shadowRoot.querySelector('#stratum-input-host');
    const portInput = this.shadowRoot.querySelector('#stratum-input-port');
    const userInput = this.shadowRoot.querySelector('#stratum-input-user');
    const passInput = this.shadowRoot.querySelector('#stratum-input-pass');
    const statusBanner = this.shadowRoot.querySelector('#stratum-status-banner');
    const submitBtn = this.shadowRoot.querySelector('#stratum-submit-btn');

    if (statusBanner) statusBanner.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '⚡ Switch Stratum Now';
    }

    // Populate miner target select
    if (targetSelect) {
      const miners = this._currentMiners || [];
      targetSelect.innerHTML = `<option value="" style="background-color: #0f172a; color: #f8fafc;">🌐 Entire Fleet (All Compatible Miners)</option>` +
        miners.map(m => {
          const isSel = m.host === targetHost;
          return `<option value="${m.host}" ${isSel ? 'selected' : ''} style="background-color: #0f172a; color: #f8fafc;">${m.name} (${m.host}) - ${(m.type || 'miner').toUpperCase()}</option>`;
        }).join('');
    }

    // Pre-select coin preset if specified
    if (coinSelect && targetCoin) {
      const opt = Array.from(coinSelect.options).find(o => o.value === targetCoin);
      if (opt) {
        coinSelect.value = targetCoin;
        if (hostInput && opt.dataset.host) hostInput.value = opt.dataset.host;
        if (portInput && opt.dataset.port) portInput.value = opt.dataset.port;
      }
    } else if (coinSelect && !targetCoin) {
      coinSelect.value = 'WOJAK';
      if (hostInput) hostInput.value = 'americas.mining-dutch.nl';
      if (portInput) portInput.value = '9995';
    }

    // Set default user if known
    if (userInput) {
      const defUser = (targetHost && this._minerWallets && this._minerWallets[targetHost]) || '';
      userInput.value = defUser;
    }

    if (passInput) passInput.value = 'x';
    if (stratumModal) stratumModal.style.display = 'flex';
  }

  async _fetchYieldMarketPrices() {
    if (this._fetchingPrices) return;
    this._fetchingPrices = true;
    try {
      let data = null;
      if (this._hass && this._hass.callApi) {
        try {
          data = await this._hass.callApi('GET', 'home_miner_studio/market?coins=BTC,WOJAK,BCH,BELLS,DGB,PEPE');
        } catch (e) {}
      }
      if (!data && this._hass && this._hass.fetchWithAuth) {
        const resp = await this._hass.fetchWithAuth('/api/home_miner_studio/market?coins=BTC,WOJAK,BCH,BELLS,DGB,PEPE');
        data = await resp.json();
      }
      if (data && data.coins) {
        this._liveCoinPrices = {};
        Object.entries(data.coins).forEach(([c, info]) => {
          if (info && info.price_usd) {
            this._liveCoinPrices[c] = info.price_usd;
          }
        });
      }
    } catch (e) {
      console.debug('Error fetching yield matrix prices:', e);
    } finally {
      this._fetchingPrices = false;
    }
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

  _openAddModal(presetType, presetName, presetPort) {
    this._ensureDom();
    this._modalOpen = true;
    this._modalMode = 'add';
    this._activeHost = '';
    const minerModal = this.shadowRoot.querySelector('#miner-modal');
    this.shadowRoot.querySelector('#modal-title').textContent = presetName ? `➕ Add ${presetName}` : '➕ Add Cryptocurrency Miner';
    this.shadowRoot.querySelector('#modal-name').value = presetName || '';
    this.shadowRoot.querySelector('#modal-host').value = '';
    this.shadowRoot.querySelector('#modal-host').disabled = false;
    this.shadowRoot.querySelector('#modal-port').value = presetPort || (presetType === 'cgminer_rpc' ? 4028 : 80);
    this.shadowRoot.querySelector('#modal-coin').value = 'BTC';
    this.shadowRoot.querySelector('#modal-type').value = presetType || 'bitaxe';
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
    const activePool = this._minerPools[host] || safeStorage.get('miner_pool_' + host) || pool || 'none';
    const activeWallet = this._minerWallets[host] || safeStorage.get('miner_wallet_' + host) || wallet || '';
    const activeCoin = this._minerCoins[host] || safeStorage.get('miner_coin_' + host) || coin || 'BTC';
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
          position: relative;
          overflow: hidden;
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

        .sound-toggle-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sound-toggle-btn.active-audio {
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.45);
          background: rgba(56, 189, 248, 0.16);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
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
          max-height: 90vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
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

        /* --- LIVE STRATUM PARTICLE PIPELINE (VISUAL BLOCK ASSEMBLY) --- */
        .pipeline-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid var(--theme-card-border, rgba(56, 189, 248, 0.25));
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 16px var(--theme-glow, rgba(56, 189, 248, 0.15));
          margin-bottom: 20px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pipeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          cursor: pointer;
          user-select: none;
          transition: background 0.2s ease;
        }
        .pipeline-header:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .pipeline-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .pipeline-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.05));
          border: 1px solid rgba(56, 189, 248, 0.3);
          font-size: 13px;
          flex-shrink: 0;
        }

        .pipeline-title {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
          animation: pulse-live 1.8s infinite ease-in-out;
          flex-shrink: 0;
        }
        @keyframes pulse-live {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }

        .pipeline-summary-pill {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pipeline-coin-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 7px;
          padding: 2px 7px;
          position: relative;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .pipeline-coin-wrap:hover {
          border-color: rgba(56, 189, 248, 0.6);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }
        .pipeline-coin-icon {
          font-size: 11.5px;
          line-height: 1;
        }
        .pipeline-coin-select {
          background: transparent;
          border: none;
          color: #f8fafc;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          padding: 0 2px;
          appearance: auto;
          -webkit-appearance: auto;
          max-width: 210px;
        }
        .pipeline-coin-select optgroup {
          background: #0f172a;
          color: #38bdf8;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 11px;
        }
        .pipeline-coin-select option {
          background: #0b1120;
          color: #f8fafc;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 4px;
        }

        .pipeline-header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .hud-action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s ease;
        }
        .hud-action-btn:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* 4-Stage Horizontal Assembly */
        .pipeline-body {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr 1.1fr 1.3fr;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(10, 15, 28, 0.5);
          align-items: center;
        }

        .pipeline-card.collapsed .pipeline-body {
          display: none;
        }
        .pipeline-card.collapsed .pipeline-header {
          border-bottom: none;
        }

        .pipeline-stage {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 9px 11px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          position: relative;
          height: 102px;
          justify-content: space-between;
        }

        .stage-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10.5px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stage-header span:first-child {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #cbd5e1;
        }

        .stage-tag {
          font-size: 9px;
          padding: 1px 5px;
          border-radius: 4px;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          font-family: 'JetBrains Mono', monospace;
        }

        .stage-mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #f8fafc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stage-sub-meta {
          font-size: 9.5px;
          color: #64748b;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .conduit-stage {
          padding: 7px 9px;
          position: relative;
        }
        .particle-canvas {
          width: 100%;
          height: 44px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(56, 189, 248, 0.15);
          display: block;
        }

        .golden-scanner {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px 8px;
          background: rgba(0, 0, 0, 0.35);
          border-radius: 6px;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .scanner-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }

        .pulse-bar {
          height: 3px;
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .pulse-bar-fill {
          height: 100%;
          width: 45%;
          background: linear-gradient(90deg, transparent, #38bdf8, transparent);
          animation: conduit-flow 1.5s infinite linear;
        }
        @keyframes conduit-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        @media (max-width: 900px) {
          .pipeline-body {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .pipeline-body {
            grid-template-columns: 1fr;
          }
          .pipeline-summary-pill {
            display: none;
          }
        }

        /* --- AERO-GLASS SEGMENTED WORKSPACE TAB BAR --- */
        .workspace-tab-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          margin-bottom: 22px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          position: sticky;
          top: 10px;
          z-index: 50;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(56, 189, 248, 0.25) transparent;
        }

        .workspace-tab-bar::-webkit-scrollbar {
          height: 3px;
        }
        .workspace-tab-bar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.25);
          border-radius: 3px;
        }

        .tab-pill {
          flex: 1 1 0;
          min-width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 10px;
          border-radius: 10px;
          font-size: 11.5px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          color: #94a3b8;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          text-align: center;
          white-space: nowrap;
        }

        @media (max-width: 950px) {
          .tab-pill {
            padding: 6px 7px;
            font-size: 11px;
            gap: 3px;
          }
          .tab-pill .tab-badge {
            font-size: 9.5px;
            padding: 1px 5px;
          }
        }

        .tab-pill:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-pill.active {
          color: #ffffff;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(8, 47, 73, 0.5));
          border: 1px solid #38bdf8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .tab-pill .tab-badge {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          padding: 2px 6px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          font-weight: 700;
        }

        .tab-pane {
          width: 100%;
        }

        .workstations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 16px;
        }

        .workstations-grid .glass-card {
          margin-bottom: 0;
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
          flex-shrink: 0;
        }

        .pod-icon svg {
          display: block;
          filter: drop-shadow(0 0 6px currentColor);
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

        /* --- SOLO BLOCK LOTTERY RADAR & MEGA-SHARE VFX --- */
        .lottery-radar-console {
          margin-bottom: 24px;
          padding: 22px 24px;
        }

        .lottery-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .lottery-title-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lottery-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
        }

        .lottery-title {
          font-size: 16px;
          font-weight: 700;
          color: #f8fafc;
          font-family: 'JetBrains Mono', monospace;
        }

        .lottery-coin-wrap {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(245, 158, 11, 0.4);
          border-radius: 999px;
          padding: 3px 8px 3px 12px;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
        }

        .lottery-coin-label {
          font-size: 11px;
          font-weight: 700;
          color: #fbbf24;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .lottery-coin-select {
          background: #0f172a !important;
          border: 1px solid rgba(245, 158, 11, 0.5) !important;
          color: #f8fafc !important;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          outline: none;
        }

        .lottery-coin-select:focus {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
        }

        .lottery-coin-select option {
          background-color: #0f172a !important;
          color: #f8fafc !important;
        }

        .lottery-hud-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .lottery-hud-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }

        .radar-stage-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .radar-svg {
          width: 160px;
          height: 160px;
          filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.2));
        }

        .radar-sweep-beam {
          transform-origin: 80px 80px;
          animation: radar-sweep 4s linear infinite;
        }

        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .blip-pulse-ring {
          transform-origin: 0 0;
          animation: blip-pulse 1.8s ease-out infinite;
        }

        @keyframes blip-pulse {
          0% { r: 3px; opacity: 1; }
          100% { r: 12px; opacity: 0; }
        }

        .radar-status-caption {
          font-size: 10px;
          color: #10b981;
          font-weight: 700;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .radar-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
          animation: dot-blink 1.2s ease-in-out infinite alternate;
        }

        @keyframes dot-blink {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .lottery-metrics-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }

        .jackpot-banner {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(217, 119, 6, 0.06));
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          overflow: hidden;
        }

        .jackpot-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 3px;
          background: #fbbf24;
          box-shadow: 0 0 8px #fbbf24;
        }

        .jackpot-label {
          font-size: 10px;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 0.06em;
        }

        .jackpot-val-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }

        .jackpot-amount {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          text-shadow: 0 0 16px rgba(245, 158, 11, 0.3);
        }

        .jackpot-btc-badge {
          font-size: 12px;
          font-weight: 700;
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.18);
          border: 1px solid rgba(245, 158, 11, 0.4);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .jackpot-sub {
          font-size: 11px;
          color: #94a3b8;
        }

        .lottery-stat-tiles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        @media (max-width: 600px) {
          .lottery-stat-tiles {
            grid-template-columns: 1fr;
          }
        }

        .lottery-mini-tile {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mini-tile-label {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .mini-tile-val {
          font-size: 15px;
          font-weight: 700;
        }

        .mini-tile-sub {
          font-size: 10px;
          color: #64748b;
        }

        .share-progress-container {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 18px;
          margin-top: 6px;
        }

        .share-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .share-progress-track {
          position: relative;
          width: 100%;
          height: 10px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          overflow: visible;
          margin-bottom: 12px;
        }

        .share-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #38bdf8 0%, #a78bfa 30%, #fbbf24 60%, #10b981 100%);
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .share-progress-pin {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .share-pin-glow {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fbbf24;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px #fbbf24, 0 0 20px rgba(245, 158, 11, 0.6);
        }

        .share-pin-label {
          position: absolute;
          top: -24px;
          font-size: 9px;
          font-weight: 700;
          color: #fbbf24;
          background: #0f172a;
          border: 1px solid rgba(245, 158, 11, 0.5);
          padding: 1px 6px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .share-milestone-row {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #64748b;
          padding: 0 4px;
        }

        /* Mega-Share Rig Card Aura & Pills */
        .mega-share-card {
          border-color: rgba(245, 158, 11, 0.45) !important;
          box-shadow: 0 16px 45px -8px rgba(0, 0, 0, 0.6),
                      0 0 35px -5px rgba(245, 158, 11, 0.22),
                      inset 0 1px 0 rgba(245, 158, 11, 0.5) !important;
          animation: mega-card-aura 3s ease-in-out infinite alternate;
        }

        @keyframes mega-card-aura {
          0% {
            box-shadow: 0 16px 45px -8px rgba(0, 0, 0, 0.6), 0 0 22px -5px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(245, 158, 11, 0.4);
          }
          100% {
            box-shadow: 0 20px 50px -6px rgba(0, 0, 0, 0.7), 0 0 42px 0px rgba(245, 158, 11, 0.38), inset 0 1px 0 rgba(245, 158, 11, 0.7);
          }
        }

        .mega-share-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.35));
          border: 1px solid rgba(245, 158, 11, 0.6);
          color: #fbbf24;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
          position: relative;
          overflow: hidden;
        }

        .mega-share-pill::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 40%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: rotate(25deg);
          animation: mega-shimmer 2.5s infinite;
        }

        @keyframes mega-shimmer {
          0% { left: -60%; }
          100% { left: 160%; }
        }

        .super-share-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.3));
          border: 1px solid rgba(56, 189, 248, 0.5);
          color: #38bdf8;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }

        /* --- RPG PROGRESSION & TROPHY CABINET STYLES --- */
        .glass-card.gold-glow {
          border-color: rgba(245, 158, 11, 0.35);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(245, 158, 11, 0.22);
        }

        .rpg-hero-banner {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px;
          padding: 24px;
          margin-bottom: 24px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .rpg-hero-banner { grid-template-columns: 1fr; text-align: center; }
        }

        .level-orb-box {
          position: relative;
          width: 124px;
          height: 124px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin: 0 auto;
        }
        .level-orb-svg {
          width: 124px;
          height: 124px;
          transform: rotate(-90deg);
        }
        .level-orb-inner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .level-orb-num {
          font-size: 34px;
          font-weight: 800;
          font-family: 'JetBrains Mono', monospace;
          color: #fbbf24;
          line-height: 1;
          text-shadow: 0 0 16px rgba(245, 158, 11, 0.6);
        }
        .level-orb-sub {
          font-size: 9px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        .rpg-hero-main {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rpg-rank-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .rpg-rank-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.35));
          border: 1px solid rgba(245, 158, 11, 0.5);
          border-radius: 999px;
          font-size: 15px;
          font-weight: 800;
          color: #fde68a;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
        .rpg-tier-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
        }

        .rpg-progress-track {
          width: 100%;
          height: 14px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }
        .rpg-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #f59e0b, #fbbf24);
          border-radius: 999px;
          position: relative;
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.6);
          transition: width 0.4s ease;
        }
        .rpg-xp-stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #cbd5e1;
          flex-wrap: wrap;
          gap: 8px;
        }

        .rpg-meta-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .rpg-meta-chip {
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rpg-meta-chip b { color: #f8fafc; font-family: 'JetBrains Mono', monospace; }

        /* Trophy Filter Bar */
        .trophy-filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 4px;
        }
        .trophy-filter-bar::-webkit-scrollbar {
          display: none;
        }
        .trophy-filter-pill {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .trophy-filter-pill:hover {
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.08);
        }
        .trophy-filter-pill.active {
          background: rgba(245, 158, 11, 0.2);
          border-color: #fbbf24;
          color: #fde68a;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
        }

        /* Trophy Grid */
        .trophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .trophy-card {
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-radius: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .trophy-card:hover {
          transform: translateY(-2px);
        }
        .trophy-card.unlocked {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.65));
          border: 1px solid rgba(245, 158, 11, 0.4);
          box-shadow: 0 8px 24px -6px rgba(0,0,0,0.4), 0 0 20px -6px rgba(245, 158, 11, 0.18);
        }
        .trophy-card.locked {
          background: rgba(15, 23, 42, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          opacity: 0.72;
        }

        .trophy-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .trophy-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .trophy-card.unlocked .trophy-icon-box {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.4);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.3);
        }
        .trophy-card.locked .trophy-icon-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          filter: grayscale(1);
          opacity: 0.5;
        }

        .trophy-title-wrap {
          flex: 1;
        }
        .trophy-category {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
        }
        .trophy-name {
          font-size: 14px;
          font-weight: 700;
          color: #f8fafc;
          margin-top: 2px;
        }
        .trophy-status-pill {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
        }
        .trophy-status-pill.unlocked {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #34d399;
        }
        .trophy-status-pill.locked {
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #94a3b8;
        }

        .trophy-desc {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .trophy-micro-bar {
          width: 100%;
          height: 6px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 4px;
        }
        .trophy-micro-fill {
          height: 100%;
          border-radius: 999px;
        }
        .trophy-micro-fill.complete {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        }
        .trophy-micro-fill.pending {
          background: #38bdf8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
        }

        .trophy-footer-val {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #cbd5e1;
        }

        /* Milestone Roadmap Strip */
        .roadmap-section-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .roadmap-strip {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          padding-bottom: 12px;
        }
        .roadmap-strip::-webkit-scrollbar {
          height: 6px;
        }
        .roadmap-strip::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 999px;
        }
        .roadmap-strip::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 999px;
        }
        .roadmap-strip::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.5);
        }
        .roadmap-item {
          min-width: 170px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          flex-shrink: 0;
        }
        .roadmap-item.current {
          border-color: #fbbf24;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.8));
          box-shadow: 0 0 18px rgba(245, 158, 11, 0.25);
        }
        .roadmap-item.unlocked {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.08);
        }
        .roadmap-lvl-pill {
          font-size: 10px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }
        .roadmap-title {
          font-size: 13px;
          font-weight: 700;
        }
        .roadmap-xp {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* --- MINING HISTORY & DECENTRALIZED CHRONICLES STYLES --- */
        .chronicles-console {
          padding: 22px 24px;
          margin-top: 26px;
          margin-bottom: 26px;
          border-radius: 16px;
          border: 1px solid var(--theme-card-border, rgba(56, 189, 248, 0.25));
        }

        .chronicles-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chronicles-title-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chronicles-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.05));
          border: 1px solid rgba(245, 158, 11, 0.4);
          font-size: 20px;
        }

        .chronicles-title {
          font-size: 16px;
          font-weight: 700;
          color: #f8fafc;
          font-family: 'JetBrains Mono', monospace;
        }

        .chronicles-subtitle {
          font-size: 11.5px;
          color: #94a3b8;
          margin-top: 2px;
        }

        .chronicles-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }
        .chronicles-status-badge.unlocked {
          background: rgba(245, 158, 11, 0.12);
          border-color: rgba(245, 158, 11, 0.4);
          color: #fbbf24;
        }

        .chronicle-filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .chronicle-filter-pill {
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chronicle-filter-pill:hover {
          color: #f8fafc;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .chronicle-filter-pill.active {
          background: var(--theme-pill-gradient, linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(8, 47, 73, 0.5)));
          border-color: var(--theme-accent, #38bdf8);
          color: #f8fafc;
        }

        .chronicles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 14px;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .chronicles-grid::-webkit-scrollbar {
          width: 5px;
        }
        .chronicles-grid::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.25);
          border-radius: 4px;
        }
        .chronicles-grid::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .chronicle-card {
          padding: 15px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .chronicle-card.unlocked {
          border-color: rgba(56, 189, 248, 0.25);
          background: rgba(15, 23, 42, 0.55);
        }

        .chronicle-card.unlocked:hover {
          transform: translateY(-2px);
          border-color: var(--theme-accent, #38bdf8);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 12px var(--theme-glow, rgba(56, 189, 248, 0.2));
        }

        .chronicle-card.locked {
          opacity: 0.65;
          background: rgba(15, 23, 42, 0.25);
        }

        .chronicle-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .chronicle-lvl-pill {
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .chronicle-lvl-pill.unlocked {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.35);
        }

        .chronicle-lvl-pill.locked {
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chronicle-era-tag {
          font-size: 10.5px;
          color: #38bdf8;
          font-weight: 600;
        }

        .chronicle-card-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 6px;
          line-height: 1.35;
        }

        .chronicle-card-teaser {
          font-size: 11.5px;
          color: #94a3b8;
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .chronicle-locked-msg {
          font-size: 10.5px;
          color: #64748b;
          font-style: italic;
          text-align: center;
          padding: 4px;
        }

        .chronicle-takeaway-box {
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 8px;
          padding: 12px 14px;
        }

        /* --- PRESTIGE THEME ENGINE STYLES --- */
        #card-root {
          background: var(--theme-hero-bg, radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.10) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.8) 0px, transparent 100%));
          border-radius: 20px;
          position: relative;
          transition: background 0.5s ease;
        }

        .theme-console {
          padding: 20px 24px;
          margin-bottom: 24px;
        }
        .theme-console.locked-engine {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .theme-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .theme-title-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .theme-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.35));
          border: 1px solid rgba(245, 158, 11, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.3);
          flex-shrink: 0;
        }
        .theme-title {
          font-size: 16px;
          font-weight: 800;
          color: #f8fafc;
        }
        .theme-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin-top: 2px;
        }
        .theme-status-badge {
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .theme-status-badge.unlocked {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid #10b981;
          color: #34d399;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
        }
        .theme-status-badge.locked {
          background: rgba(148, 163, 184, 0.1);
          border: 1px solid rgba(148, 163, 184, 0.25);
          color: #94a3b8;
        }

        .theme-teaser-body {
          padding: 14px 18px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .theme-teaser-text {
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .theme-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .theme-option-card {
          padding: 16px;
          border-radius: 14px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .theme-option-card:hover {
          transform: translateY(-2px);
        }
        .theme-option-card.active {
          border-color: #fbbf24;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.85));
          box-shadow: 0 0 24px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .theme-option-card.locked {
          opacity: 0.62;
          background: rgba(15, 23, 42, 0.4);
        }

        .theme-swatch-bar {
          width: 100%;
          height: 38px;
          border-radius: 8px;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .theme-swatch-bar::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          animation: theme-shimmer 3.5s infinite;
        }
        @keyframes theme-shimmer {
          0% { left: -100%; }
          50%, 100% { left: 200%; }
        }

        .theme-card-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }
        .theme-card-name {
          font-size: 14px;
          font-weight: 800;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .theme-card-tier {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 2px;
        }

        .theme-btn {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border: 1px solid transparent;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .theme-btn.active-btn {
          background: rgba(245, 158, 11, 0.25);
          border-color: #fbbf24;
          color: #fde68a;
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.4);
        }
        .theme-btn.apply-btn {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #f8fafc;
        }
        .theme-btn.apply-btn:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }
        .theme-btn.locked-btn {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.06);
          color: #64748b;
          cursor: not-allowed;
        }

        /* --- THEME SPECIFIC OVERRIDES --- */
        #card-root[data-theme="solar_flare"] .tab-pill.active {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.35), rgba(120, 53, 15, 0.6));
          border-color: #fbbf24;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.45);
        }
        #card-root[data-theme="solar_flare"] .cyan-glow {
          border-color: rgba(245, 158, 11, 0.35);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(245, 158, 11, 0.25);
        }

        #card-root[data-theme="thermal_magma"] .tab-pill.active {
          background: linear-gradient(135deg, rgba(244, 63, 94, 0.35), rgba(136, 19, 55, 0.6));
          border-color: #f43f5e;
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.45);
        }
        #card-root[data-theme="thermal_magma"] .cyan-glow {
          border-color: rgba(244, 63, 94, 0.35);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(244, 63, 94, 0.25);
        }

        #card-root[data-theme="emerald_matrix"] .tab-pill.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.35), rgba(6, 78, 59, 0.6));
          border-color: #10b981;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.45);
        }
        #card-root[data-theme="emerald_matrix"] .cyan-glow {
          border-color: rgba(16, 185, 129, 0.35);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(16, 185, 129, 0.25);
        }

        #card-root[data-theme="amethyst_nebula"] .tab-pill.active {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(59, 7, 100, 0.6));
          border-color: #a855f7;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.45);
        }
        #card-root[data-theme="amethyst_nebula"] .cyan-glow {
          border-color: rgba(168, 85, 247, 0.35);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(168, 85, 247, 0.25);
        }

        #card-root[data-theme="celestial_diamond"] .tab-pill.active {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(56, 189, 248, 0.4));
          border-color: #ffffff;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 15px rgba(56, 189, 248, 0.4);
        }
        #card-root[data-theme="celestial_diamond"] .cyan-glow {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 40px -6px rgba(255, 255, 255, 0.35), 0 0 20px rgba(56, 189, 248, 0.25);
        }

        /* ==========================================================================
           COMPREHENSIVE MOBILE & SMALL-SCREEN RESPONSIVENESS OPTIMIZATION (<= 640px)
           ========================================================================== */
        @media (max-width: 640px) {
          :host {
            padding: 12px 8px !important;
            border-radius: 14px !important;
          }

          .glass-card {
            padding: 14px 12px !important;
            border-radius: 14px !important;
            margin-bottom: 12px !important;
          }

          /* Top Command Bar */
          .top-bar {
            padding: 12px 10px !important;
            margin-bottom: 14px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }

          .brand-cluster {
            justify-content: flex-start !important;
          }

          .brand-title {
            font-size: 16px !important;
          }

          .top-actions {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 6px !important;
            width: 100% !important;
          }

          .top-actions .glass-btn {
            justify-content: center !important;
            text-align: center !important;
            padding: 7px 6px !important;
            font-size: 10px !important;
            width: 100% !important;
            min-height: 36px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* 3 Hero Ring Gauges */
          .hero-orbit-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-bottom: 14px !important;
          }

          .gauge-card {
            padding: 14px 10px !important;
          }

          .gauge-wrapper {
            width: 105px !important;
            height: 105px !important;
            margin: 6px 0 8px 0 !important;
          }

          .gauge-main-val {
            font-size: 20px !important;
          }

          /* Stratum Particle Pipeline */
          .pipeline-card {
            border-radius: 12px !important;
            margin-bottom: 14px !important;
          }

          .pipeline-header {
            padding: 8px 10px !important;
          }

          .pipeline-title {
            font-size: 11px !important;
          }

          .pipeline-summary-pill {
            display: none !important;
          }

          .pipeline-coin-wrap {
            padding: 1px 5px !important;
          }

          .pipeline-coin-select {
            font-size: 10px !important;
          }

          .pipeline-header-actions {
            gap: 4px !important;
          }

          .pipeline-header-actions .hud-action-btn {
            padding: 4px 6px !important;
            font-size: 9.5px !important;
          }

          .pipeline-body {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            padding: 8px !important;
          }

          .pipeline-stage {
            height: auto !important;
            min-height: 80px !important;
            padding: 8px 10px !important;
          }

          .particle-canvas {
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Segmented Tab Bar */
          .workspace-tab-bar {
            position: sticky !important;
            top: 4px !important;
            padding: 4px !important;
            margin-bottom: 14px !important;
            border-radius: 12px !important;
            gap: 4px !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .tab-pill {
            padding: 7px 8px !important;
            font-size: 11px !important;
            border-radius: 8px !important;
            min-height: 36px !important;
            -webkit-tap-highlight-color: transparent !important;
          }

          .tab-pill .tab-badge {
            display: none !important;
          }

          /* Hardware Workstations */
          .workstations-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .pod-header-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            padding-bottom: 12px !important;
            margin-bottom: 12px !important;
          }

          .pod-name {
            font-size: 15px !important;
          }

          .pod-header-row > div:last-child {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 6px !important;
            width: 100% !important;
          }

          .pod-header-row > div:last-child .glass-btn {
            justify-content: center !important;
            text-align: center !important;
            padding: 7px 6px !important;
            font-size: 10.5px !important;
            width: 100% !important;
            min-height: 36px !important;
          }

          .telemetry-tile-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            margin-bottom: 12px !important;
          }

          .tile-glass-box {
            padding: 10px 10px !important;
          }

          .tile-num {
            font-size: 17px !important;
          }

          .tactile-bay {
            padding: 12px 10px !important;
            border-radius: 12px !important;
          }

          .profile-pill-rack {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 6px !important;
          }

          .pill-btn {
            text-align: center !important;
            padding: 7px 4px !important;
            font-size: 10px !important;
            width: 100% !important;
            min-height: 34px !important;
          }

          /* Trophies & RPG Hero Banner */
          .rpg-hero-banner {
            padding: 16px 12px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 14px !important;
          }

          .level-orb-box {
            width: 96px !important;
            height: 96px !important;
          }

          .level-orb-num {
            font-size: 24px !important;
          }

          .level-orb-sub {
            font-size: 8px !important;
          }

          .rpg-rank-badge-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 6px !important;
          }

          .rpg-meta-chips {
            flex-direction: column !important;
            gap: 6px !important;
            width: 100% !important;
          }

          .rpg-meta-chip {
            width: 100% !important;
            justify-content: center !important;
            font-size: 10.5px !important;
          }

          .trophy-filter-bar {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 6px !important;
          }

          .trophy-filter-pill {
            flex-shrink: 0 !important;
          }

          .trophy-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
          }

          .trophy-card {
            padding: 14px 12px !important;
          }

          .roadmap-strip {
            -webkit-overflow-scrolling: touch !important;
          }

          /* Mining History Chronicles */
          .chronicles-console {
            padding: 14px 10px !important;
            margin-top: 14px !important;
            margin-bottom: 14px !important;
          }

          .chronicles-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          .chronicle-filter-bar {
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
            padding-bottom: 6px !important;
          }

          .chronicle-filter-pill {
            flex-shrink: 0 !important;
          }

          .chronicles-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            max-height: 400px !important;
          }

          .chronicle-card {
            padding: 12px 10px !important;
          }

          /* Prestige Themes */
          .theme-console {
            padding: 14px 10px !important;
            margin-bottom: 14px !important;
          }

          .theme-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          .theme-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          /* Yield Matrix & Market Intelligence */
          .yield-matrix-console {
            padding: 14px 10px !important;
            margin-bottom: 14px !important;
          }

          .yield-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          .yield-table-wrap {
            -webkit-overflow-scrolling: touch !important;
          }

          .yield-table th, .yield-table td {
            padding: 8px 8px !important;
            font-size: 10.5px !important;
          }

          .market-intelligence-console {
            padding: 14px 10px !important;
          }

          .market-console-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          .market-stats-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }

          .lottery-console {
            padding: 14px 10px !important;
          }

          /* Modals Mobile Touch & Scroll Safety */
          .modal-backdrop {
            padding: 10px !important;
            align-items: center !important;
          }

          .modal-box {
            max-height: 90vh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 18px 14px !important;
            border-radius: 16px !important;
            gap: 10px !important;
          }

          .modal-grid {
            grid-template-columns: 1fr !important;
          }

          .modal-field.full {
            grid-column: span 1 !important;
          }

          .modal-footer {
            flex-direction: column-reverse !important;
            gap: 8px !important;
          }

          .modal-footer .glass-btn {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
            padding: 9px 12px !important;
          }
        }
      
`;
  }

  render() {
    if (!this._hass || !this._hass.states) return;
    this._ensureDom();
    if (this._isUserInputActive()) return;
    this._lastRenderSig = this._computeMinerStateSignature(this._hass);

    try {
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
        if (safeStorage.get('miner_pool_192.168.1.91') === 'public_pool') {
          safeStorage.set('miner_pool_192.168.1.91', 'mining_dutch');
        }
        const bitaxeSavedPool = this._minerPools['192.168.1.91'] || safeStorage.get('miner_pool_192.168.1.91');
        const bitaxeSavedWallet = this._minerWallets['192.168.1.91'] || safeStorage.get('miner_wallet_192.168.1.91');
        const bitaxeSavedCoin = this._minerCoins['192.168.1.91'] || safeStorage.get('miner_coin_192.168.1.91');
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
        acceptedRaw: bitaxeAccepted,
        rejected: bitaxeRejected.toLocaleString(),
        hwErrors: bitaxeHw,
        bestDiffNum: parseFloat(bitaxeBestDiff) || 0,
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
      const avalonSavedPool = this._minerPools['192.168.1.154'] || safeStorage.get('miner_pool_192.168.1.154');
      const avalonSavedWallet = this._minerWallets['192.168.1.154'] || safeStorage.get('miner_wallet_192.168.1.154');
      const avalonSavedCoin = this._minerCoins['192.168.1.154'] || safeStorage.get('miner_coin_192.168.1.154');
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
        acceptedRaw: accepted,
        rejected: rejected.toLocaleString(),
        hwErrors,
        bestDiffNum: parseFloat(bestShare) || 0,
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

    // 3. Dynamic Miner Discovery for Additional Configured Miners (NerdQaxe, Bitaxe, Antminer, etc.)
    const existingHosts = new Set(miners.map(m => m.host));
    const hashrateEntities = Object.keys(states).filter(eid => 
      (eid.endsWith('_hashrate_th_s') || eid.endsWith('_hashrate_ths') || eid.endsWith('_hashrate_gh_s') || eid.endsWith('_hashrate_ghs')) &&
      !isBlacklisted(eid) &&
      !eid.includes('my_bitaxe') &&
      !eid.includes('192_168_1_154') &&
      !eid.includes('avalon_nano_3s')
    );

    hashrateEntities.forEach(hashEid => {
      const match = hashEid.match(/^sensor\.(.+?)_hashrate_(th_s|ths|gh_s|ghs)$/);
      if (!match) return;
      const prefix = match[1];

      const stateObj = states[hashEid];
      const hostCandidate = stateObj?.attributes?.host || 
                            stateObj?.attributes?.ip_address || 
                            prefix.replace(/_/g, '.');
      if (existingHosts.has(hostCandidate) || existingHosts.has(prefix)) return;

      const rawThs = match[2].startsWith('th') 
        ? parseFloat(stateObj?.state || 0) 
        : (parseFloat(stateObj?.state || 0) / 1000.0);
      const watts = parseFloat(states[`sensor.${prefix}_power_draw`]?.state || states[`sensor.${prefix}_power_w`]?.state || 0);
      const eff = rawThs > 0 ? (watts / rawThs).toFixed(1) : (states[`sensor.${prefix}_efficiency`]?.state || states[`sensor.${prefix}_efficiency_j_th`]?.state || '0.0');
      const temp = toCelsius(states[`sensor.${prefix}_chip_temperature`] || states[`sensor.${prefix}_temp_c`]) ?? 0;
      const fan = parseInt(states[`sensor.${prefix}_fan_speed`]?.state || states[`sensor.${prefix}_fan_rpm`]?.state || 0);
      const freq = states[`number.${prefix}_target_frequency`]?.state || states[`sensor.${prefix}_core_frequency`]?.state || states[`sensor.${prefix}_frequency_mhz`]?.state || '500';
      const volt = states[`number.${prefix}_target_core_voltage`]?.state || states[`sensor.${prefix}_core_voltage_mv`]?.state || '1150';
      const profile = states[`select.${prefix}_power_profile`]?.state || 'Standard';

      const accepted = parseInt(states[`sensor.${prefix}_shares_accepted`]?.state || 0);
      const rejected = parseInt(states[`sensor.${prefix}_shares_rejected`]?.state || 0);
      const hwErrors = parseInt(states[`sensor.${prefix}_hardware_errors`]?.state || 0);
      const bestDiff = states[`sensor.${prefix}_best_difficulty`]?.state || states[`sensor.${prefix}_pool_best_share`]?.state;
      const bestDiffNum = parseFloat(bestDiff) || 0;
      const bestShareStr = bestDiff ? (bestDiffNum >= 1e9 ? (bestDiffNum / 1e9).toFixed(2) + ' G' : (bestDiffNum / 1e6).toFixed(2) + ' M') : '--';

      const poolStatusObj = states[`sensor.${prefix}_pool_connection_status`] || states[`sensor.${prefix}_pool_status`];
      const poolStatus = poolStatusObj?.state || 'Alive';
      const poolUrl = poolStatusObj?.attributes?.pool_url || '';
      const poolUser = poolStatusObj?.attributes?.pool_user || '';
      const poolProvider = poolStatusObj?.attributes?.pool_provider || 'none';
      const poolWallet = poolStatusObj?.attributes?.pool_wallet || poolUser;
      const minerCoin = poolStatusObj?.attributes?.coin || 'BTC';

      const lowerPrefix = prefix.toLowerCase();
      const fn = (stateObj?.attributes?.friendly_name || '').toLowerCase();
      let inferredType = 'miner';
      let asicDesc = 'ASIC Core';
      let osDesc = 'AxeOS';

      if (lowerPrefix.includes('nerdqaxe') || lowerPrefix.includes('qaxe') || fn.includes('nerdqaxe') || fn.includes('qaxe')) {
        inferredType = 'nerdqaxe';
        asicDesc = '4x BM1366/BM1370 Quad-ASIC';
        osDesc = 'AxeOS v2.13.0';
      } else if (lowerPrefix.includes('bitaxe') || fn.includes('bitaxe')) {
        inferredType = 'bitaxe';
        asicDesc = 'BM1370 ASIC';
        osDesc = 'AxeOS v2.13.0';
      } else if (lowerPrefix.includes('nerdminer') || fn.includes('nerdminer')) {
        inferredType = 'nerdminer';
        asicDesc = 'ESP32 Hash Engine';
        osDesc = 'NerdMiner v1.6.3';
      } else if (lowerPrefix.includes('luckyminer') || fn.includes('luckyminer')) {
        inferredType = 'luckyminer';
        asicDesc = 'BM1366 ASIC';
        osDesc = 'LuckyOS';
      } else if (lowerPrefix.includes('futurebit') || fn.includes('futurebit') || lowerPrefix.includes('apollo')) {
        inferredType = 'futurebit';
        asicDesc = 'Apollo Hash Blades';
        osDesc = 'ApolloOS';
      } else if (lowerPrefix.includes('antminer') || fn.includes('antminer')) {
        inferredType = 'antminer';
        asicDesc = 'Antminer Blade Array';
        osDesc = 'Braiins OS';
      } else if (lowerPrefix.includes('whatsminer') || fn.includes('whatsminer')) {
        inferredType = 'whatsminer';
        asicDesc = 'Whatsminer High-Flow Array';
        osDesc = 'BT-Miner';
      }

      const minerName = this._getMinerName(hostCandidate, stateObj?.attributes?.friendly_name || `${inferredType.toUpperCase()} (${hostCandidate})`, [hashEid]);

      existingHosts.add(hostCandidate);
      miners.push({
        id: prefix,
        name: minerName,
        type: inferredType,
        host: hostCandidate,
        coin: minerCoin,
        asic: asicDesc,
        os: osDesc,
        ths: rawThs,
        watts,
        eff,
        temp,
        fan,
        freq,
        volt,
        profile,
        accepted: accepted.toLocaleString(),
        acceptedRaw: accepted,
        rejected: rejected.toLocaleString(),
        hwErrors,
        bestDiffNum,
        bestShareStr,
        blocksFound: '--',
        poolUrl,
        poolUser,
        poolStatus,
        poolProvider,
        poolWallet,
        rebootEntity: `button.${prefix}_reboot_miner`,
        restartEntity: `button.${prefix}_restart_mining_process`,
        freqEntity: `number.${prefix}_target_frequency`,
        voltEntity: `number.${prefix}_target_core_voltage`,
        profileEntity: `select.${prefix}_power_profile`
      });
    });

    const filterType = (this._config?.miner_type || '').toLowerCase();
    const filterHost = this._config?.miner_host || '';
    const isSingleRigView = !!(filterType || filterHost);

    let displayedMiners = miners;
    if (filterType) {
      displayedMiners = displayedMiners.filter(m => (m.type || '').toLowerCase().includes(filterType) || (m.name || '').toLowerCase().includes(filterType));
    }
    if (filterHost) {
      displayedMiners = displayedMiners.filter(m => m.host === filterHost);
    }

    // Calculate Totals (for displayed rigs if filtered, or full fleet if overview)
    let totalHashThs = 0;
    let totalWatts = 0;
    let tempSum = 0;
    let tempCount = 0;

    const rigsForTotals = isSingleRigView ? displayedMiners : miners;
    rigsForTotals.forEach(m => {
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

    // --- SOLO BLOCK LOTTERY RADAR & MEGA-SHARE CALCULATIONS ---
    let fleetBestDiff = 0;
    let fleetBestShareStr = '--';
    let fleetBestMinerName = '';

    miners.forEach(m => {
      const d = m.bestDiffNum || 0;
      if (d > fleetBestDiff) {
        fleetBestDiff = d;
        fleetBestShareStr = m.bestShareStr;
        fleetBestMinerName = m.name;
      }
    });

    if (fleetBestDiff === 0 && states['sensor.my_bitaxe_best_difficulty']?.state) {
      fleetBestDiff = parseFloat(states['sensor.my_bitaxe_best_difficulty'].state) || 0;
      if (fleetBestDiff > 0) {
        fleetBestShareStr = fleetBestDiff >= 1e9 ? (fleetBestDiff / 1e9).toFixed(2) + ' G' : (fleetBestDiff / 1e6).toFixed(2) + ' M';
        fleetBestMinerName = 'My Bitaxe Supra';
      }
    }

    // Calculate total fleet accepted shares
    let totalFleetAccepted = 0;
    miners.forEach(m => {
      totalFleetAccepted += (m.acceptedRaw || 0);
    });

    // Acoustic Telemetry Trigger (Geiger Clicks & Harmonic Chimes)
    if (this._soundMode && this._soundMode !== 'off') {
      if (this._lastTotalShares !== null && totalFleetAccepted > this._lastTotalShares) {
        const shareDiff = totalFleetAccepted - this._lastTotalShares;
        if (shareDiff > 0 && shareDiff < 100) {
          if (this._lastBestDiff !== null && fleetBestDiff > this._lastBestDiff && fleetBestDiff >= 1e7) {
            this._playShareChime(fleetBestDiff >= 1e9 ? 1000 : 100);
          } else {
            const clicksToPlay = Math.min(3, shareDiff);
            for (let i = 0; i < clicksToPlay; i++) {
              setTimeout(() => this._playGeigerClick(), i * 35);
            }
          }
        }
      }
    }
    this._lastTotalShares = totalFleetAccepted;
    this._lastBestDiff = fleetBestDiff;

    // Multi-Coin Profiles & Network Difficulties for Solo Block Lottery Radar
    const coinRadarProfiles = {
      'WOJAK': {
        name: 'Wojak',
        symbol: 'WOJAK',
        sign: '🎭',
        reward: 10000,
        diffNum: 5.0e7,
        diffStr: '50.00 M',
        accentColor: '#38bdf8',
        algo: 'SHA-256d',
        milestones: ['10 K', '100 K', '1 M', '10 M', '25 M', '50 M (WIN)']
      },
      'WJK': {
        name: 'Wojak',
        symbol: 'WJK',
        sign: '🎭',
        reward: 10000,
        diffNum: 5.0e7,
        diffStr: '50.00 M',
        accentColor: '#38bdf8',
        algo: 'SHA-256d',
        milestones: ['10 K', '100 K', '1 M', '10 M', '25 M', '50 M (WIN)']
      },
      'BTC': {
        name: 'Bitcoin',
        symbol: 'BTC',
        sign: '₿',
        reward: 3.125,
        diffNum: 109.80 * 1e12,
        diffStr: '109.80 T',
        accentColor: '#fbbf24',
        algo: 'SHA-256',
        milestones: ['1 M', '100 M', '1 G (Mega)', '10 G', '100 G', '1 T', '109.8 T (WIN)']
      },
      'BCH': {
        name: 'Bitcoin Cash',
        symbol: 'BCH',
        sign: '💚',
        reward: 3.125,
        diffNum: 6.5e11,
        diffStr: '650.00 G',
        accentColor: '#10b981',
        algo: 'SHA-256',
        milestones: ['1 M', '100 M', '1 G (Mega)', '10 G', '100 G', '650 G (WIN)']
      },
      'BELLS': {
        name: 'Bellscoin',
        symbol: 'BELLS',
        sign: '🔔',
        reward: 50,
        diffNum: 1.2e8,
        diffStr: '120.00 M',
        accentColor: '#f59e0b',
        algo: 'Scrypt / SHA',
        milestones: ['100 K', '1 M', '10 M', '50 M', '120 M (WIN)']
      },
      'BEL': {
        name: 'Bellscoin',
        symbol: 'BEL',
        sign: '🔔',
        reward: 50,
        diffNum: 1.2e8,
        diffStr: '120.00 M',
        accentColor: '#f59e0b',
        algo: 'Scrypt / SHA',
        milestones: ['100 K', '1 M', '10 M', '50 M', '120 M (WIN)']
      },
      'DGB': {
        name: 'DigiByte',
        symbol: 'DGB',
        sign: '⚡',
        reward: 350,
        diffNum: 1.5e10,
        diffStr: '15.00 G',
        accentColor: '#0284c7',
        algo: 'SHA-256',
        milestones: ['1 M', '50 M', '500 M', '2 G', '15 G (WIN)']
      },
      'LTC': {
        name: 'Litecoin',
        symbol: 'LTC',
        sign: 'Ł',
        reward: 6.25,
        diffNum: 4.5e7,
        diffStr: '45.00 M',
        accentColor: '#cbd5e1',
        algo: 'Scrypt',
        milestones: ['100 K', '1 M', '5 M', '20 M', '45 M (WIN)']
      },
      'DOGE': {
        name: 'Dogecoin',
        symbol: 'DOGE',
        sign: '🐶',
        reward: 10000,
        diffNum: 1.8e7,
        diffStr: '18.00 M',
        accentColor: '#eab308',
        algo: 'Scrypt',
        milestones: ['100 K', '500 K', '2 M', '8 M', '18 M (WIN)']
      },
      'PEPE': {
        name: 'Pepecoin',
        symbol: 'PEPE',
        sign: '🐸',
        reward: 10000,
        diffNum: 8.5e7,
        diffStr: '85.00 M',
        accentColor: '#22c55e',
        algo: 'Scrypt / SHA',
        milestones: ['100 K', '1 M', '10 M', '40 M', '85 M (WIN)']
      },
      'KAS': {
        name: 'Kaspa',
        symbol: 'KAS',
        sign: '💎',
        reward: 22.5,
        diffNum: 1.2e15,
        diffStr: '1.20 P',
        accentColor: '#06b6d4',
        algo: 'kHeavyHash',
        milestones: ['1 G', '10 G', '100 G', '1 T', '100 T', '1.2 P (WIN)']
      }
    };

    // Collect all coins actively mined by fleet miners
    const fleetCoins = [];
    miners.forEach(m => {
      const c = (m.coin || 'BTC').toUpperCase();
      if (!fleetCoins.includes(c)) fleetCoins.push(c);
    });
    if (fleetCoins.length === 0) fleetCoins.push('BTC');

    const catalogCoins = ['WOJAK', 'BTC', 'BCH', 'BELLS', 'DGB', 'LTC', 'DOGE', 'PEPE', 'KAS'];
    const allRadarCoins = [...fleetCoins];
    catalogCoins.forEach(c => {
      if (!allRadarCoins.includes(c)) allRadarCoins.push(c);
    });

    // Resolve active radar coin: user preference > safeStorage > active fleet coin > BTC
    const storedRadarCoin = safeStorage.get('lottery_selected_coin');
    const defaultActiveCoin = isSingleRigView ? (displayedMiners[0]?.coin?.toUpperCase() || fleetCoins[0]) : fleetCoins[0];
    const radarCoin = (this._selectedLotteryCoin || storedRadarCoin || defaultActiveCoin || 'BTC').toUpperCase();

    const selectedProfile = coinRadarProfiles[radarCoin] || {
      name: radarCoin,
      symbol: radarCoin,
      sign: '🪙',
      reward: 1,
      diffNum: 109.80 * 1e12,
      diffStr: '109.80 T',
      accentColor: '#fbbf24',
      algo: 'SHA-256',
      milestones: ['1 M', '100 M', '1 G', '10 G', '109.8 T (WIN)']
    };

    this._activeRadarCoin = radarCoin;
    this._activeRadarReward = selectedProfile.reward;

    const netDiff = selectedProfile.diffNum;
    const activeHashThs = totalHashThs > 0 ? totalHashThs : 1.38;

    // Expected days = (Difficulty * 2^32) / (Hashrate_THs * 10^12 * 86400)
    const expectedDays = (netDiff * 4294967296) / (activeHashThs * 1e12 * 86400);
    const expectedYears = expectedDays / 365.25;
    const dailyChancePct = (1 / expectedDays) * 100;

    // Spot Price Lookup for Selected Radar Coin
    let coinSpotPrice = 0;
    Object.keys(states).forEach(eid => {
      if ((eid.endsWith('_coin_price_usd') || eid.endsWith('_coin_price') || eid.endsWith('_price') || eid.endsWith('_bitcoin_price')) && states[eid]?.state) {
        const c = (states[eid]?.attributes?.coin || (eid.includes('bitcoin') ? 'BTC' : '')).toUpperCase();
        if (c === radarCoin || (radarCoin === 'WOJAK' && c === 'WJK') || (radarCoin === 'WJK' && c === 'WOJAK')) {
          const p = parseFloat(states[eid].state);
          if (!isNaN(p) && p > 0) coinSpotPrice = p;
        }
      }
    });

    if (coinSpotPrice === 0) {
      const defaultSpot = {
        'BTC': 83467,
        'WOJAK': 0.000024,
        'WJK': 0.000024,
        'BCH': 385,
        'LTC': 82,
        'DOGE': 0.165,
        'BELLS': 0.45,
        'BEL': 0.45,
        'KAS': 0.13,
        'DGB': 0.0085,
        'PEPE': 0.0000095
      };
      coinSpotPrice = defaultSpot[radarCoin] || 1.0;
    }

    const blockBountyJackpotUsd = selectedProfile.reward * coinSpotPrice;

    // Dynamic Logarithmic Progress to Selected Coin's Block Target
    const logMax = Math.log10(netDiff);
    const logMin = Math.max(2, Math.floor(logMax - 7));
    const currentLog = fleetBestDiff > Math.pow(10, logMin) ? Math.log10(fleetBestDiff) : logMin;
    let logProgressPct = Math.min(100, Math.max(2, ((currentLog - logMin) / (logMax - logMin)) * 100));
    const isBlockSolved = fleetBestDiff >= netDiff;
    if (isBlockSolved) logProgressPct = 100;
    const logProgressStr = logProgressPct.toFixed(1);

    const blipDist = Math.max(16, Math.min(68, (logProgressPct / 100) * 68));
    const blipX = (80 - blipDist * 0.707).toFixed(1);
    const blipY = (80 - blipDist * 0.707).toFixed(1);
    const blipColor = isBlockSolved ? '#34d399' : (fleetBestDiff >= 1e9 ? '#fbbf24' : '#38bdf8');
    
    this._currentMiners = miners;
    if (!this._lastYieldFetch || (Date.now() - this._lastYieldFetch > 60000)) {
      this._lastYieldFetch = Date.now();
      this._fetchYieldMarketPrices();
    }

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

    const availableCoins = new Set();
    miners.forEach(m => { if (m.coin) availableCoins.add(m.coin.toUpperCase()); });
    if (availableCoins.size === 0) availableCoins.add('WOJAK');

    const preferredCoin = isSingleRigView && displayedMiners[0]?.coin
      ? displayedMiners[0].coin.toUpperCase()
      : (this._selectedCoin || (miners[0]?.coin ? miners[0].coin.toUpperCase() : 'WOJAK'));

    let activeCoinPrice = 0.00002513;
    let activeChange24h = 2.39;
    let activeCoinSymbol = preferredCoin;
    let activeCoinName = preferredCoin === 'WOJAK' ? 'Wojak' : 'Bitcoin';
    let activeCoinSign = preferredCoin === 'WOJAK' ? '🎭' : '₿';
    let activeHistory = JSON.parse(JSON.stringify(defaultMarketPrices));
    let activeStats = {
      '24h': { high: 0.000026, low: 0.000024, change_pct: 2.39 },
      '7d': { high: 0.000026, low: 0.000023, change_pct: 4.17 },
      '30d': { high: 0.000027, low: 0.000022, change_pct: 8.70 },
      '1y': { high: 0.000030, low: 0.000018, change_pct: 31.58 }
    };

    let matchingSensor = null;
    Object.keys(states).forEach(eid => {
      if ((eid.endsWith('_coin_price_usd') || eid.endsWith('_coin_price') || eid.endsWith('_bitcoin_price')) && states[eid]?.state) {
        const c = (states[eid]?.attributes?.coin || (eid.includes('bitcoin') ? 'BTC' : '')).toUpperCase();
        if (c === preferredCoin) {
          matchingSensor = states[eid];
        } else if (!matchingSensor) {
          matchingSensor = states[eid];
        }
      }
    });

    if (matchingSensor) {
      const p = parseFloat(matchingSensor.state);
      if (!isNaN(p) && p > 0) activeCoinPrice = p;
      const attrs = matchingSensor.attributes || {};
      if (attrs.coin) activeCoinSymbol = attrs.coin.toUpperCase();
      if (attrs.coin_name) activeCoinName = attrs.coin_name;
      if (attrs.coin_sign) activeCoinSign = attrs.coin_sign;
      if (attrs.change_24h_pct !== undefined) activeChange24h = parseFloat(attrs.change_24h_pct);
      if (attrs.history_24h && attrs.history_24h.length) activeHistory['24h'] = attrs.history_24h;
      if (attrs.history_7d && attrs.history_7d.length) activeHistory['7d'] = attrs.history_7d;
      if (attrs.history_30d && attrs.history_30d.length) activeHistory['30d'] = attrs.history_30d;
      if (attrs.history_1y && attrs.history_1y.length) activeHistory['1y'] = attrs.history_1y;
      if (attrs.market_stats && attrs.market_stats['24h']) activeStats = attrs.market_stats;
    }

    if (activeCoinSymbol === 'WOJAK' || activeCoinSymbol === 'WJK') {
      activeCoinSign = '🎭';
      activeCoinName = 'Wojak';
    }

    const activeTf = this._selectedTimeframe || '24h';
    const tfPoints = activeHistory[activeTf] || activeHistory['24h'] || [];
    this._currentTfPoints = tfPoints;
    const currentStats = activeStats[activeTf] || activeStats['24h'] || { high: activeCoinPrice * 1.05, low: activeCoinPrice * 0.95, change_pct: activeChange24h };
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
    const hashTarget = isSingleRigView ? (totalHashThs > 2.5 ? 6.0 : 2.0) : 7.0;
    const hashOffset = Math.max(0, 264 - Math.min(1, totalHashThs / hashTarget) * 264);
    const hashPct = Math.round((totalHashThs / hashTarget) * 100);

    const pwrTarget = isSingleRigView ? (totalWatts > 50 ? 150.0 : 35.0) : 150.0;
    const pwrOffset = Math.max(0, 264 - Math.min(1, totalWatts / pwrTarget) * 264);

    const tempTarget = 80.0;
    const tempOffset = Math.max(0, 264 - Math.min(1, avgTempNum / tempTarget) * 264);
    const tempStrokeColor = avgTempNum > 68 ? '#fb7185' : avgTempNum > 60 ? '#fbbf24' : '#34d399';
    const tempStatusLabel = avgTempNum > 68 ? '⚠️ High Load (> 68°C)' : avgTempNum > 60 ? '⚡ Warm Operation' : '● Optimal Zone (< 60°C)';

    // --- MULTI-COIN LIVE YIELD MATRIX & 1-CLICK STRATUM SWITCHER ---
    const yieldCoinsDef = [
      {
        coin: 'WOJAK',
        name: 'Wojak Coin',
        sign: '🎭',
        algo: 'SHA-256d',
        reward: 10000,
        diff: 3500,
        diffStr: '3.50 K',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 9995,
        poolName: 'Mining-Dutch'
      },
      {
        coin: 'BTC',
        name: 'Bitcoin',
        sign: '₿',
        algo: 'SHA-256d',
        reward: 3.125,
        diff: 85e12,
        diffStr: '85.00 T',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 3333,
        poolName: 'Mining-Dutch'
      },
      {
        coin: 'BCH',
        name: 'Bitcoin Cash',
        sign: '₿',
        algo: 'SHA-256d',
        reward: 3.125,
        diff: 500e9,
        diffStr: '500.00 G',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 3334,
        poolName: 'Mining-Dutch'
      },
      {
        coin: 'DGB',
        name: 'DigiByte',
        sign: 'Ɗ',
        algo: 'SHA-256d',
        reward: 420,
        diff: 45e6,
        diffStr: '45.00 M',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 3338,
        poolName: 'Mining-Dutch'
      },
      {
        coin: 'BELLS',
        name: 'Bellcoin',
        sign: '🔔',
        algo: 'SHA-256d',
        reward: 500,
        diff: 250e6,
        diffStr: '250.00 M',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 9997,
        poolName: 'Mining-Dutch'
      },
      {
        coin: 'PEPE',
        name: 'Pepecoin',
        sign: '🐸',
        algo: 'SHA-256d',
        reward: 10000,
        diff: 85e6,
        diffStr: '85.00 M',
        stratumHost: 'americas.mining-dutch.nl',
        stratumPort: 9998,
        poolName: 'Mining-Dutch'
      }
    ];

    const fallbackSpotPrices = {
      WOJAK: 0.000024,
      WJK: 0.000024,
      BTC: 83467.0,
      BCH: 385.0,
      DGB: 0.0085,
      BELLS: 0.45,
      PEPE: 0.0000095
    };

    let estElectricityRate = 0.12;
    Object.keys(states).forEach(eid => {
      if ((eid.includes('electricity_rate') || eid.includes('energy_cost') || eid.includes('power_cost')) && states[eid]?.state) {
        const r = parseFloat(states[eid].state);
        if (!isNaN(r) && r > 0 && r < 10) estElectricityRate = r;
      }
    });

    const fleetDailyPowerCost = (totalWatts / 1000) * 24 * estElectricityRate;
    const fleetHashesDay = activeHashThs * 1e12 * 86400;

    const yieldRows = yieldCoinsDef.map(item => {
      const livePrice = (this._liveCoinPrices && (this._liveCoinPrices[item.coin] || (item.coin === 'WOJAK' && this._liveCoinPrices['WJK'])))
        || (this._selectedCoin === item.coin ? activeCoinPrice : null)
        || fallbackSpotPrices[item.coin]
        || 1.0;

      const hashesPerBlock = item.diff * 4294967296;
      let dailyCoins = hashesPerBlock > 0 ? (fleetHashesDay / hashesPerBlock) * item.reward : 0;
      
      // Cap at total theoretical daily blocks for smaller network difficulty coins
      if (item.coin === 'WOJAK') {
        const networkBlocksDay = 1440;
        dailyCoins = Math.min(dailyCoins, networkBlocksDay * item.reward);
      }

      const grossDailyUsd = dailyCoins * livePrice;
      const netDailyProfit = grossDailyUsd - fleetDailyPowerCost;
      const monthlyProfit = netDailyProfit * 30.5;

      const isMining = fleetCoins.includes(item.coin)
        || (item.coin === 'WOJAK' && fleetCoins.includes('WJK'))
        || miners.some(m => (m.coin || '').toUpperCase() === item.coin);

      return {
        ...item,
        price: livePrice,
        dailyCoins,
        grossDailyUsd,
        netDailyProfit,
        monthlyProfit,
        isMining
      };
    });

    // Sort by netDailyProfit descending
    yieldRows.sort((a, b) => b.netDailyProfit - a.netDailyProfit);

    const activeTab = this._activeTab || 'hardware';
    const topYieldCoin = yieldRows[0]?.coin || 'WOJAK';
    const radarOddsBadge = isBlockSolved
      ? '🎉 WIN!'
      : (expectedDays < 365 ? (expectedDays.toFixed(1) + 'd Odds') : (expectedYears.toFixed(0) + 'y Odds'));

    // --- RPG PROGRESSION & TROPHY CABINET (Lvl 500 Cap) ---
    // Rebalanced XP: 1 XP per verified accepted share + log-scaled difficulty bonus
    const diffBonus = fleetBestDiff > 1000 ? Math.floor(Math.log10(fleetBestDiff) * 5) : 0;
    const totalFleetXp = totalFleetAccepted + diffBonus;
    const fleetLevel = rpgLevelForXp(totalFleetXp);
    const fleetTitle = getRpgTitle(fleetLevel);
    const nextMilestone = getNextRpgMilestone(fleetLevel);
    const currLvlBaseXp = xpForRpgLevel(fleetLevel);
    const nextLvlReqXp = fleetLevel < 500 ? xpForRpgLevel(fleetLevel + 1) : currLvlBaseXp;
    const lvlProgressPct = fleetLevel >= 500 ? 100 : Math.min(100, Math.max(0, ((totalFleetXp - currLvlBaseXp) / Math.max(1, nextLvlReqXp - currLvlBaseXp)) * 100));
    const xpRemaining = fleetLevel >= 500 ? 0 : Math.max(0, nextLvlReqXp - totalFleetXp);
    const orbOffset = Math.round(264 - (264 * (lvlProgressPct / 100)));

    // Hardware aggregates for badges
    let maxFreq = 0;
    let minTemp = 999;
    let maxFan = 0;
    let hasStratum = false;
    let activeCoinMined = 'BTC';

    miners.forEach(m => {
      const f = parseFloat(m.freq) || 0;
      if (f > maxFreq) maxFreq = f;
      if (m.temp > 0 && m.temp < minTemp) minTemp = m.temp;
      const fan = parseInt(m.fan) || 0;
      if (fan > maxFan) maxFan = fan;
      if (m.poolUrl && m.poolUrl !== '--') hasStratum = true;
      if (m.coin && m.coin !== 'BTC') activeCoinMined = m.coin;
    });
    if (minTemp === 999) minTemp = 0;

    const rpgBadges = getRpgBadges({
      totalShares: totalFleetAccepted,
      bestDiff: fleetBestDiff,
      maxFreq,
      minTemp,
      efficiency: parseFloat(fleetEfficiency) || 0,
      maxFan,
      rigCount: miners.length,
      hasStratum,
      coin: activeCoinMined,
      soundMode: this._soundMode || 'off',
      level: fleetLevel,
      blocksSolved: isBlockSolved
    });

    const unlockedBadgesCount = rpgBadges.filter(b => b.unlocked).length;
    const currentTrophyFilter = this._trophyFilter || 'all';
    const displayedBadges = currentTrophyFilter === 'all' ? rpgBadges : rpgBadges.filter(b => b.cat === currentTrophyFilter);

    // Prestige Theme Resolution
    const isThemeEngineUnlocked = fleetLevel >= 100;
    const activeThemeId = isThemeEngineUnlocked ? (this._activeTheme || 'default') : 'default';
    const activeTheme = PRESTIGE_THEMES.find(t => t.id === activeThemeId) || PRESTIGE_THEMES[0];

    const cardRoot = this.shadowRoot.querySelector('#card-root');
    if (!cardRoot) return;

    cardRoot.setAttribute('data-theme', activeTheme.id);
    cardRoot.style.setProperty('--theme-accent', activeTheme.accent);
    cardRoot.style.setProperty('--theme-accent-sec', activeTheme.accentSecondary);
    cardRoot.style.setProperty('--theme-glow', activeTheme.accentGlow);
    cardRoot.style.setProperty('--theme-pill-gradient', activeTheme.pillGradient);
    cardRoot.style.setProperty('--theme-card-border', activeTheme.cardBorder);
    cardRoot.style.setProperty('--theme-hero-bg', activeTheme.heroBg);

    // Stratum Pipeline Telemetry & Dynamic Coin Profile Resolution
    const activeFleetCoin = (activeCoinMined || 'BTC').toUpperCase();
    const configuredCoin = (this._config?.pipeline_coin || '').toUpperCase();
    const storedCoin = (safeStorage.get('miner_pipeline_coin') || '').toUpperCase();
    const selectedCoinKey = (this._selectedPipelineCoin || storedCoin || configuredCoin || activeFleetCoin || 'BTC').toUpperCase();
    
    // Resolve profile by exact key or symbol fallback
    const profile = PIPELINE_COIN_PROFILES[selectedCoinKey] 
      || Object.values(PIPELINE_COIN_PROFILES).find(p => p.symbol === selectedCoinKey) 
      || PIPELINE_COIN_PROFILES.BTC;

    // Check if any miner in the fleet is mining this selected coin
    const matchingMiner = miners.find(m => {
      if (!m.coin) return false;
      const mc = m.coin.toUpperCase();
      return (mc === profile.symbol || mc === selectedCoinKey || (mc === 'WJK' && profile.symbol === 'WOJAK') || (mc === 'WOJAK' && profile.symbol === 'WJK')) && m.poolUrl && m.poolUrl !== '--';
    });
    const firstMinerWithPool = matchingMiner || miners.find(m => m.poolUrl && m.poolUrl !== '--') || miners[0];

    let activeStratumHost = profile.defaultHost;
    let activeStratumPort = profile.defaultPort;
    if (matchingMiner?.poolUrl) {
      activeStratumHost = matchingMiner.poolUrl.replace(/^stratum\+tcp:\/\//, '');
      activeStratumPort = matchingMiner.poolPort || profile.defaultPort;
    } else if ((selectedCoinKey === activeFleetCoin || profile.symbol === activeFleetCoin) && firstMinerWithPool?.poolUrl) {
      activeStratumHost = firstMinerWithPool.poolUrl.replace(/^stratum\+tcp:\/\//, '');
      activeStratumPort = firstMinerWithPool.poolPort || profile.defaultPort;
    }

    const activePoolProviderName = profile.poolName || (
      matchingMiner?.poolProvider && matchingMiner.poolProvider !== 'none'
        ? (matchingMiner.poolProvider.charAt(0).toUpperCase() + matchingMiner.poolProvider.slice(1))
        : (firstMinerWithPool?.poolProvider && firstMinerWithPool.poolProvider !== 'none'
          ? (firstMinerWithPool.poolProvider.charAt(0).toUpperCase() + firstMinerWithPool.poolProvider.slice(1))
          : (activeStratumHost.includes('mining-dutch') ? 'Mining-Dutch' : (activeStratumHost.includes('helios') ? 'HeliosPool' : 'Stratum Pool')))
    );

    const currentBlockHeight = Math.floor(profile.baseHeight + (Math.floor(Date.now() / (profile.blockIntervalSec * 1000)) % 1000));
    const pseudoJobSeed = Math.floor(Date.now() / 45000);
    const jobIdHex = ((pseudoJobSeed * 2654435761) >>> 0).toString(16).padStart(8, '0');
    const merkleRootHex = ((pseudoJobSeed * 1103515245 + 12345) >>> 0).toString(16).slice(0, 4) + '...' + (((pseudoJobSeed * 214013 + 2531011) >>> 0).toString(16).slice(0, 4));
    const noncesPerSecFormatted = (activeHashThs * 1e12).toExponential(2);
    const shareTargetStr = miners[0]?.bestDiff ? (miners[0].bestDiff > 1e6 ? (miners[0].bestDiff / 1e6).toFixed(1) + 'M' : (miners[0].bestDiff / 1e3).toFixed(1) + 'K') : '8.19K';

    cardRoot.innerHTML = `
      <!-- TOP COMMAND BAR -->
      <div class="glass-base top-bar">
        <div class="brand-cluster">
          <div class="brand-icon-box">${isSingleRigView ? (filterType.includes('bitaxe') ? '⚡' : '🖥️') : '⛏'}</div>
          <div>
            <div class="brand-title">${this._config?.title || (isSingleRigView ? (displayedMiners[0]?.name || 'Miner Studio') : 'Home Miner Studio')}</div>
            <div class="badge-glass-pill" style="margin-top: 2px;">
              <span class="status-orb"></span>
              ${displayedMiners.length} Active ASIC ${displayedMiners.length === 1 ? 'Blade' : 'Blades'} • <span id="cache-purge-btn" style="cursor: pointer; color: #38bdf8; text-decoration: underline;" title="Click to force-purge browser cache and reload">v0.7.1 🔄</span>
            </div>
          </div>
        </div>

        <div class="top-actions">
          <button class="glass-btn sound-toggle-btn ${this._soundMode !== 'off' ? 'active-audio' : ''}" id="sound-btn" title="Toggle Acoustic Share Feedback (Click to Cycle: Off / Geiger Clicks / Chimes)">
            ${this._soundMode === 'off' ? '🔇 Audio: OFF' : (this._soundMode === 'geiger' ? '🔊 Geiger: ON' : '✨ Chimes: ON')}
          </button>
          <button class="glass-btn primary" id="add-miner-btn">➕ Add Miner</button>
          <button class="glass-btn" id="import-btn">⚡ 1-Click Discovery</button>
          <button class="glass-btn" id="reload-btn" title="Refresh Fleet Telemetry (Shift+Click to Force-Purge Browser Cache & Reload)">🔄 Refresh Fleet</button>
        </div>
      </div>

      <!-- 3 VISUAL HERO RING GAUGES -->
      <div class="hero-orbit-grid">
        
        <!-- 1: Hashrate Gauge -->
        <div class="glass-card cyan-glow gauge-card">
          <div class="gauge-header-label">${isSingleRigView ? 'Miner Hashrate' : 'Fleet Hashrate'}</div>
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

        <!-- 2: Electrical Load -->
        <div class="glass-card amber-glow gauge-card">
          <div class="gauge-header-label">${isSingleRigView ? 'Electrical Load' : 'Total Electrical Load'}</div>
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

        <!-- 3: Temperature -->
        <div class="glass-card gauge-card" style="border-color: rgba(52, 211, 153, 0.28); box-shadow: 0 16px 40px -10px rgba(0,0,0,0.5), 0 0 30px -8px rgba(52, 211, 153, 0.12);">
          <div class="gauge-header-label">${isSingleRigView ? 'Thermal Core' : 'Average Thermal Core'}</div>
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

      <!-- LIVE STRATUM PARTICLE PIPELINE (VISUAL BLOCK ASSEMBLY - COLLAPSIBLE & CONFIGURABLE) -->
      <div class="pipeline-card ${this._pipelineCollapsed ? 'collapsed' : ''}" id="pipeline-card">
        <div class="pipeline-header" id="pipeline-toggle">
          <div class="pipeline-header-left">
            <div class="pipeline-icon-badge">🔬</div>
            <div class="pipeline-title">
              <span>Stratum Pipeline</span>
              <span class="live-dot" title="Active Stratum session"></span>
            </div>
            <div class="pipeline-coin-wrap" title="Configure target coin and stratum telemetry architecture">
              <span class="pipeline-coin-icon">${profile.icon}</span>
              <select id="pipeline-coin-select" class="pipeline-coin-select">
                ${PIPELINE_COIN_GROUPS.map(group => {
                  const groupCoins = Object.entries(PIPELINE_COIN_PROFILES).filter(([_, p]) => p.pool === group.id);
                  if (!groupCoins.length) return '';
                  return `
                    <optgroup label="${group.icon} ${group.label}">
                      ${groupCoins.map(([k, p]) => {
                        const isMining = (p.symbol === activeFleetCoin || k === activeFleetCoin || (activeFleetCoin === 'WJK' && p.symbol === 'WOJAK'));
                        const isSel = k === selectedCoinKey || (selectedCoinKey === p.symbol && p.pool === 'mining_dutch');
                        return `<option value="${k}" ${isSel ? 'selected' : ''}>${p.icon} ${p.name || k} (${p.symbol})${isMining ? ' (Mining ⛏️)' : ''}</option>`;
                      }).join('')}
                    </optgroup>
                  `;
                }).join('')}
              </select>
            </div>
            <div class="pipeline-summary-pill">
              ${activePoolProviderName} • Job #${jobIdHex.slice(0, 6)} • ${activeHashThs.toFixed(2)} TH/s • Block #${currentBlockHeight.toLocaleString()}
            </div>
          </div>
          <div class="pipeline-header-actions">
            <button class="hud-action-btn" id="pipeline-anim-toggle" title="Pause/Resume particle canvas animation to save CPU/GPU resources">
              <span id="pipeline-anim-icon">${this._pipelineAnimPaused ? '▶' : '⏸'}</span>
              <span id="pipeline-anim-label">${this._pipelineAnimPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button class="hud-action-btn" id="pipeline-collapse-toggle">
              <span id="pipeline-collapse-icon">${this._pipelineCollapsed ? '▼' : '▲'}</span>
              <span id="pipeline-collapse-label">${this._pipelineCollapsed ? 'Expand' : 'Collapse'}</span>
            </button>
          </div>
        </div>

        <div class="pipeline-body">
          <!-- 1: Stratum Ingress -->
          <div class="pipeline-stage">
            <div class="stage-header">
              <span>🌐 1. Stratum Ingress</span>
              <span class="stage-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">${activeStratumPort ? `TCP:${activeStratumPort}` : 'TCP:3333'}</span>
            </div>
            <div>
              <div class="stage-mono" style="color: #38bdf8;" title="${activeStratumHost}:${activeStratumPort}">${activeStratumHost}:${activeStratumPort}</div>
              <div class="stage-sub-meta" style="margin-top: 2px;">
                <span>Job: <strong style="color: #cbd5e1;">#${jobIdHex}</strong></span>
                <span style="color: ${profile.tagColor || '#34d399'};">${profile.algo}</span>
              </div>
            </div>
            <div class="pulse-bar">
              <div class="pulse-bar-fill"></div>
            </div>
          </div>

          <!-- 2: Nonce Stream (Canvas) -->
          <div class="pipeline-stage conduit-stage">
            <div class="stage-header">
              <span>⚡ 2. Nonce Stream</span>
              <span class="stage-tag" style="background: rgba(52, 211, 153, 0.15); color: #34d399;">${activeHashThs.toFixed(2)} TH/s</span>
            </div>
            <canvas class="particle-canvas" id="particle-canvas" width="220" height="44"></canvas>
            <div class="stage-sub-meta">
              <span>Nonces: <strong style="color: #cbd5e1;">${noncesPerSecFormatted} /s</strong></span>
              <span style="color: #38bdf8;">${displayedMiners.length} ASIC ${displayedMiners.length === 1 ? 'Rig' : 'Rigs'}</span>
            </div>
          </div>

          <!-- 3: Diff Filter -->
          <div class="pipeline-stage">
            <div class="stage-header">
              <span>🎯 3. Diff Filter</span>
              <span class="stage-tag" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24;">Diff Gate</span>
            </div>
            <div>
              <div class="stage-mono" style="color: #cbd5e1; font-size: 10.5px;">Merkle: ${merkleRootHex}</div>
              <div class="stage-sub-meta" style="margin-top: 3px;">
                <span>Share Target: <strong style="color: #38bdf8;">${shareTargetStr}</strong></span>
                <span>Block: <strong style="color: #fbbf24;">${profile.diffStr}</strong></span>
              </div>
            </div>
            <div class="stage-sub-meta" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 3px;">
              <span>Shares: <strong style="color: #34d399;">${totalFleetAccepted.toLocaleString()} Valid</strong></span>
              <span style="color: #64748b;">0 Stale</span>
            </div>
          </div>

          <!-- 4: Block Assembly -->
          <div class="pipeline-stage">
            <div class="stage-header">
              <span>📦 4. Block Assembly</span>
              <span class="stage-tag" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">#${currentBlockHeight.toLocaleString()}</span>
            </div>
            <div class="golden-scanner">
              <span class="scanner-text" id="golden-nonce-ticker" data-zeros="${profile.targetZeros}">0x${'0'.repeat(Math.min(16, profile.targetZeros))}7F2A...</span>
            </div>
            <div class="stage-sub-meta">
              <span>Reward: <strong style="color: #fbbf24;">${profile.reward}</strong></span>
              <span style="color: #f43f5e;">${profile.targetZeros} Zeros Target</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AERO-GLASS SEGMENTED WORKSPACE TAB BAR -->
      <div class="workspace-tab-bar">
        <div class="tab-pill ${activeTab === 'hardware' ? 'active' : ''}" data-tab="hardware">
          <span>🖥️</span>
          <span>Fleet</span>
          <span class="tab-badge">${displayedMiners.length}</span>
        </div>
        <div class="tab-pill ${activeTab === 'yield' ? 'active' : ''}" data-tab="yield">
          <span>⚡</span>
          <span>Yield Matrix</span>
          <span class="tab-badge" style="background: rgba(245, 158, 11, 0.25); color: #fbbf24;">${topYieldCoin} 👑</span>
        </div>
        <div class="tab-pill ${activeTab === 'radar' ? 'active' : ''}" data-tab="radar">
          <span>🎯</span>
          <span>Solo Radar</span>
          <span class="tab-badge" style="background: rgba(16, 185, 129, 0.25); color: #34d399;">${radarOddsBadge}</span>
        </div>
        <div class="tab-pill ${activeTab === 'market' ? 'active' : ''}" data-tab="market">
          <span>📈</span>
          <span>Market</span>
          <span class="tab-badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8;">${currentStats.change_pct >= 0 ? '+' : ''}${currentStats.change_pct.toFixed(1)}%</span>
        </div>
        <div class="tab-pill ${activeTab === 'trophies' ? 'active' : ''}" data-tab="trophies">
          <span>🏆</span>
          <span>Trophies</span>
          <span class="tab-badge" style="background: rgba(245, 158, 11, 0.25); color: #fbbf24;">Lvl ${fleetLevel} ⚔️</span>
        </div>
        <div class="tab-pill ${activeTab === 'all' ? 'active' : ''}" data-tab="all">
          <span>🌐</span>
          <span>Overview</span>
        </div>
      </div>

      ${(activeTab === 'trophies' || activeTab === 'all') ? `
      <!-- RPG PROGRESSION & TROPHY CABINET CONSOLE -->
      <div class="tab-pane">
        <!-- Hero Level Banner -->
        <div class="glass-card gold-glow rpg-hero-banner">
          <!-- Level Orb -->
          <div class="level-orb-box">
            <svg class="level-orb-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="8"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke="#fbbf24" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="${orbOffset}" stroke-linecap="round" style="filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.8));"/>
            </svg>
            <div class="level-orb-inner">
              <div class="level-orb-num">${fleetLevel}</div>
              <div class="level-orb-sub">LEVEL / 500</div>
            </div>
          </div>

          <!-- Hero Main -->
          <div class="rpg-hero-main">
            <div class="rpg-rank-badge-row">
              <div class="rpg-rank-pill">
                <span>${fleetTitle.badge}</span>
                <span>${fleetTitle.title}</span>
              </div>
              <span class="rpg-tier-label">Rank Milestone • Unlocked at Level ${fleetTitle.level}</span>
              ${nextMilestone ? `
                <span class="mono" style="font-size: 11px; color: #38bdf8; margin-left: auto;">
                  Next Rank: ${nextMilestone.badge} ${nextMilestone.title} (Lvl ${nextMilestone.level})
                </span>
              ` : `
                <span class="mono" style="font-size: 11px; color: #fbbf24; margin-left: auto;">
                  👑 APEX RANK REACHED!
                </span>
              `}
            </div>

            <!-- XP Progress Bar -->
            <div class="rpg-progress-track">
              <div class="rpg-progress-fill" style="width: ${lvlProgressPct.toFixed(1)}%;"></div>
            </div>

            <div class="rpg-xp-stats-row">
              <span><b>${totalFleetXp.toLocaleString()}</b> / ${nextLvlReqXp.toLocaleString()} Total XP (<span class="mono" style="color: #fbbf24;">${lvlProgressPct.toFixed(1)}% to Lvl ${Math.min(500, fleetLevel + 1)}</span>)</span>
              <span class="mono" style="color: #38bdf8;">${fleetLevel >= 500 ? 'Max Level Cap Achieved' : `+${xpRemaining.toLocaleString()} XP remaining for next level`}</span>
            </div>

            <div class="rpg-meta-chips">
              <div class="rpg-meta-chip">
                <span>⛏️</span>
                <span>Accepted Shares: <b>+${totalFleetAccepted.toLocaleString()} XP</b> (1 XP / share)</span>
              </div>
              <div class="rpg-meta-chip">
                <span>🎯</span>
                <span>Diff Bonus: <b>+${diffBonus.toLocaleString()} XP</b> (log-scaled)</span>
              </div>
              <div class="rpg-meta-chip">
                <span>🏆</span>
                <span>Trophy Cabinet: <b style="color: #34d399;">${unlockedBadgesCount} / ${rpgBadges.length} Badges Unlocked (${Math.round((unlockedBadgesCount / rpgBadges.length) * 100)}%)</b></span>
              </div>
            </div>
          </div>
        </div>

        <!-- PRESTIGE THEME ENGINE CONSOLE -->
        <div class="glass-card theme-console ${!isThemeEngineUnlocked ? 'locked-engine' : ''}">
          <div class="theme-header-row">
            <div class="theme-title-cluster">
              <div class="theme-icon-box" style="${!isThemeEngineUnlocked ? 'filter: grayscale(1); opacity: 0.6;' : ''}">🎨</div>
              <div>
                <div class="theme-title">Prestige Theme Engine ${!isThemeEngineUnlocked ? '<span class="mono" style="font-size: 11px; color: #94a3b8; font-weight: 700;">(LOCKED)</span>' : ''}</div>
                <div class="theme-subtitle">Unlock bespoke aesthetic glass finishes every 100 levels • Level Cap: 500</div>
              </div>
            </div>
            <div class="theme-status-badge ${isThemeEngineUnlocked ? 'unlocked' : 'locked'}">
              <span>${isThemeEngineUnlocked ? '✨' : '🔒'}</span>
              <span>${isThemeEngineUnlocked ? `ENGINE UNLOCKED • Active: ${activeTheme.name}` : `LOCKED • Lvl ${fleetLevel} / 100 (${100 - fleetLevel} lvls left)`}</span>
            </div>
          </div>

          ${!isThemeEngineUnlocked ? `
            <div class="theme-teaser-body">
              <div class="theme-teaser-text">
                Ascend to <b>Level 100 (Volt Tamer)</b> to unlock the Prestige Theme Engine and your first custom luxury finish: <b>☀️ Solar Flare Gold</b>!
              </div>
              <div class="rpg-progress-track" style="margin-top: 10px; margin-bottom: 6px;">
                <div class="rpg-progress-fill" style="width: ${Math.min(100, Math.round((fleetLevel / 100) * 100))}%;"></div>
              </div>
              <div class="mono" style="font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
                <span>Level ${fleetLevel} / 100 (${Math.min(100, Math.round((fleetLevel / 100) * 100))}%)</span>
                <span style="color: #fbbf24;">+${Math.max(0, xpForRpgLevel(100) - totalFleetXp).toLocaleString()} XP needed</span>
              </div>
            </div>
          ` : `
            <div class="theme-cards-grid">
              ${PRESTIGE_THEMES.map(theme => {
                const isUnlocked = fleetLevel >= theme.reqLevel;
                const isActive = activeTheme.id === theme.id;
                const lvlsLeft = theme.reqLevel - fleetLevel;

                return `
                  <div class="theme-option-card ${isActive ? 'active' : isUnlocked ? '' : 'locked'}">
                    <div class="theme-swatch-bar" style="background: ${theme.previewGradient};"></div>
                    <div class="theme-card-info">
                      <div>
                        <div class="theme-card-name"><span>${theme.icon}</span> ${theme.name}</div>
                        <div class="theme-card-tier">${theme.subtitle}</div>
                      </div>
                      <span class="mono" style="font-size: 10px; font-weight: 700; color: ${isActive ? '#fbbf24' : isUnlocked ? '#34d399' : '#64748b'};">
                        ${isActive ? 'ACTIVE ⭐' : isUnlocked ? 'UNLOCKED' : (theme.reqLevel === 500 ? 'APEX LOCK' : 'LOCKED')}
                      </span>
                    </div>
                    ${isActive ? `
                      <button class="theme-btn active-btn" disabled>⭐ Active Palette</button>
                    ` : isUnlocked ? `
                      <button class="theme-btn apply-btn theme-apply-btn" data-theme="${theme.id}">⚡ Apply Theme</button>
                    ` : `
                      <button class="theme-btn locked-btn" disabled>🔒 Unlocks at Lvl ${theme.reqLevel} (${lvlsLeft} lvls left)</button>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Trophy Filter Bar -->
        <div class="trophy-filter-bar">
          <button class="trophy-filter-pill ${currentTrophyFilter === 'all' ? 'active' : ''}" data-filter="all">All Badges (${rpgBadges.length})</button>
          <button class="trophy-filter-pill ${currentTrophyFilter === 'shares' ? 'active' : ''}" data-filter="shares">⛏️ Nonces & Shares (${rpgBadges.filter(b => b.cat === 'shares').length})</button>
          <button class="trophy-filter-pill ${currentTrophyFilter === 'difficulty' ? 'active' : ''}" data-filter="difficulty">🎯 Difficulty & Luck (${rpgBadges.filter(b => b.cat === 'difficulty').length})</button>
          <button class="trophy-filter-pill ${currentTrophyFilter === 'hardware' ? 'active' : ''}" data-filter="hardware">⚙️ Tuning & Hardware (${rpgBadges.filter(b => b.cat === 'hardware').length})</button>
          <button class="trophy-filter-pill ${currentTrophyFilter === 'operations' ? 'active' : ''}" data-filter="operations">🌐 Stratum & Ops (${rpgBadges.filter(b => b.cat === 'operations').length})</button>
          <button class="trophy-filter-pill ${currentTrophyFilter === 'prestige' ? 'active' : ''}" data-filter="prestige">🌟 Prestige Tiers (${rpgBadges.filter(b => b.cat === 'prestige').length})</button>
        </div>

        <!-- Trophy Cabinet Grid -->
        <div class="trophy-grid">
          ${displayedBadges.map(badge => `
            <div class="glass-card trophy-card ${badge.unlocked ? 'unlocked' : 'locked'}">
              <div class="trophy-header">
                <div class="trophy-icon-box">${badge.icon}</div>
                <div class="trophy-title-wrap">
                  <div class="trophy-category">${badge.catLabel}</div>
                  <div class="trophy-name">${badge.name}</div>
                </div>
                <span class="trophy-status-pill ${badge.unlocked ? 'unlocked' : 'locked'}">
                  ${badge.unlocked ? '✅ UNLOCKED' : `🔒 ${badge.progressPct}%`}
                </span>
              </div>
              <div class="trophy-desc">${badge.desc}</div>
              <div class="trophy-micro-bar">
                <div class="trophy-micro-fill ${badge.unlocked ? 'complete' : 'pending'}" style="width: ${badge.progressPct}%;"></div>
              </div>
              <div class="trophy-footer-val">
                <span>${badge.statStr}</span>
                <span style="color: ${badge.unlocked ? '#34d399' : '#38bdf8'};">${badge.remStr}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- MINING HISTORY & DECENTRALIZED CHRONICLES (EVERY 10 LEVELS) -->
        <div class="glass-card chronicles-console">
          <div class="chronicles-header-row">
            <div class="chronicles-title-cluster">
              <div class="chronicles-icon-box">📜</div>
              <div>
                <div class="chronicles-title">Mining History & Decentralized Chronicles</div>
                <div class="chronicles-subtitle">Demystifying crypto mining & historical milestones • 50 unlockable chapters every 10 levels</div>
              </div>
            </div>
            <div class="chronicles-status-badge ${CHRONICLE_CHAPTERS.filter(c => fleetLevel >= c.level).length > 0 ? 'unlocked' : ''}">
              <span>📖</span>
              <span>${CHRONICLE_CHAPTERS.filter(c => fleetLevel >= c.level).length} / ${CHRONICLE_CHAPTERS.length} Chapters Unlocked</span>
            </div>
          </div>

          <!-- Filter Pills -->
          <div class="chronicle-filter-bar">
            <button class="chronicle-filter-pill ${this._chronicleFilter === 'all' ? 'active' : ''}" data-cfilter="all">All Chapters (${CHRONICLE_CHAPTERS.length})</button>
            <button class="chronicle-filter-pill ${this._chronicleFilter === 'unlocked' ? 'active' : ''}" data-cfilter="unlocked">🔓 Unlocked (${CHRONICLE_CHAPTERS.filter(c => fleetLevel >= c.level).length})</button>
            <button class="chronicle-filter-pill ${this._chronicleFilter === 'locked' ? 'active' : ''}" data-cfilter="locked">🔒 Locked (${CHRONICLE_CHAPTERS.length - CHRONICLE_CHAPTERS.filter(c => fleetLevel >= c.level).length})</button>
          </div>

          <!-- Chronicles Grid -->
          <div class="chronicles-grid">
            ${CHRONICLE_CHAPTERS.filter(c => {
              if (this._chronicleFilter === 'unlocked') return fleetLevel >= c.level;
              if (this._chronicleFilter === 'locked') return fleetLevel < c.level;
              return true;
            }).map(c => {
              const isUnlocked = fleetLevel >= c.level;
              return `
                <div class="glass-card chronicle-card ${isUnlocked ? 'unlocked' : 'locked'}" data-clevel="${c.level}">
                  <div class="chronicle-card-header">
                    <div class="chronicle-lvl-pill ${isUnlocked ? 'unlocked' : 'locked'}">
                      ${isUnlocked ? `LVL ${c.level}` : `🔒 LVL ${c.level}`}
                    </div>
                    <span class="chronicle-era-tag">${c.era} • ${c.tag}</span>
                    <span class="mono" style="font-size: 10px; color: #94a3b8; margin-left: auto;">${c.readTime}</span>
                  </div>
                  <div class="chronicle-card-title">${c.title}</div>
                  <div class="chronicle-card-teaser">${c.teaser}</div>
                  <div class="chronicle-card-footer">
                    ${isUnlocked ? `
                      <button class="glass-btn chronicle-read-btn" data-clevel="${c.level}" style="padding: 5px 12px; font-size: 11px; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); width: 100%;">
                        📖 Read Chronicle
                      </button>
                    ` : `
                      <div class="chronicle-locked-msg">
                        🔒 Unlocks at Level ${c.level} (+${Math.max(0, xpForRpgLevel(c.level) - totalFleetXp).toLocaleString()} XP needed)
                      </div>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Milestone Roadmap Strip -->
        <div class="roadmap-section-title">
          <span>🗺️</span>
          <span>Fleet Rank Progression Roadmap (Every 25th Level • Cap: 500)</span>
        </div>
        <div class="roadmap-strip">
          ${RPG_TITLES.slice().reverse().map(tier => {
            const isUnlocked = fleetLevel >= tier.level;
            const isCurrent = fleetTitle.level === tier.level;
            const tierXp = xpForRpgLevel(tier.level);
            return `
              <div class="roadmap-item ${isCurrent ? 'current' : isUnlocked ? 'unlocked' : ''}">
                <div class="roadmap-lvl-pill" style="${isCurrent ? 'color: #fbbf24;' : isUnlocked ? 'color: #34d399;' : 'color: #94a3b8;'}">
                  LEVEL ${tier.level}${tier.level === 500 ? ' (MAX)' : ''}${isCurrent ? ' ⚔️ ACTIVE' : ''}
                </div>
                <div class="roadmap-title" style="${isCurrent ? 'color: #fde68a;' : isUnlocked ? 'color: #f8fafc;' : 'color: #94a3b8;'}">
                  ${tier.badge} ${tier.title}
                </div>
                <div class="roadmap-xp mono" style="${isCurrent ? 'color: #fbbf24;' : isUnlocked ? 'color: #34d399;' : 'color: #64748b;'}">
                  ${tierXp.toLocaleString()} XP • ${isCurrent ? 'Current Rank' : isUnlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      ` : ''}

      ${(activeTab === 'market' || activeTab === 'all') ? `
      <!-- MARKET INTELLIGENCE CONSOLE & HISTORICAL COIN PRICE CHART -->
      <div class="tab-pane">
        <div class="glass-card cyan-glow market-intelligence-console" style="margin-bottom: 24px; padding: 20px 22px;">
          <div class="market-console-header">
            <div class="market-title-cluster">
              <span style="font-size: 24px;">${activeCoinSign}</span>
              <div>
                <div style="font-size: 15px; font-weight: 700; color: #f8fafc; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 8px;">
                  <span>${activeCoinName} (${activeCoinSymbol}) Market Intelligence</span>
                  ${availableCoins.size > 1 ? `
                    <div style="display: flex; gap: 4px; margin-left: 8px;">
                      ${Array.from(availableCoins).map(c => `
                        <button class="timeframe-btn coin-toggle-btn ${c === activeCoinSymbol ? 'active' : ''}" data-coin="${c}" style="padding: 2px 8px; font-size: 10px;">
                          ${c}
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
                <div style="font-size: 11px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">
                  Real-Time Coin Valuation & Historical Performance (15m Polling)
                </div>
              </div>
            </div>

            <!-- Timeframe Selector Pills (Day, Week, Month, Year) -->
            <div class="timeframe-pill-rack">
              <button class="timeframe-btn ${activeTf === '24h' ? 'active' : ''}" data-tf="24h">24H</button>
              <button class="timeframe-btn ${activeTf === '7d' ? 'active' : ''}" data-tf="7d">7D</button>
              <button class="timeframe-btn ${activeTf === '30d' ? 'active' : ''}" data-tf="30d">30D</button>
              <button class="timeframe-btn ${activeTf === '1y' ? 'active' : ''}" data-tf="1y">1Y</button>
            </div>
          </div>

          <!-- Live Price & Period High/Low Stats -->
          <div class="market-hero-stats-row" style="margin-top: 14px; margin-bottom: 12px;">
            <div class="market-live-price">
              ${activeCoinPrice >= 1 ? '$' + Number(activeCoinPrice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + Number(activeCoinPrice).toFixed(6)}
            </div>
            <div class="coin-change-pill ${currentStats.change_pct >= 0 ? 'pos' : 'neg'}" style="font-size: 12px; padding: 4px 10px;">
              ${currentStats.change_pct >= 0 ? '▲ +' : '▼ '}${Number(currentStats.change_pct).toFixed(2)}% (${activeTf.toUpperCase()})
            </div>
            <div class="market-stat-chip">
              <span>High:</span>
              <span style="color: #34d399; font-weight: 700;">${currentStats.high >= 1 ? '$' + Number(currentStats.high).toLocaleString(undefined, {maximumFractionDigits: 2}) : '$' + Number(currentStats.high).toFixed(6)}</span>
            </div>
            <div class="market-stat-chip">
              <span>Low:</span>
              <span style="color: #f43f5e; font-weight: 700;">${currentStats.low >= 1 ? '$' + Number(currentStats.low).toLocaleString(undefined, {maximumFractionDigits: 2}) : '$' + Number(currentStats.low).toFixed(6)}</span>
            </div>
          </div>

          <!-- Interactive SVG Chart Stage -->
          <div class="chart-stage">
            ${chartSvgHtml}
            <div id="chart-tooltip" class="chart-scrubber-tooltip" style="display: none;">
              <span id="tooltip-price" style="color: #38bdf8; font-weight: 700;">$0.00</span>
              <span style="color: #64748b;">•</span>
              <span id="tooltip-time" style="color: #94a3b8;">--</span>
            </div>
          </div>
        </div>
      </div>
      ` : ''}

      ${(activeTab === 'radar' || activeTab === 'all') ? `
      <!-- SOLO BLOCK LOTTERY RADAR & MEGA-SHARE CONSOLE -->
      <div class="tab-pane">
        <div class="glass-card amber-glow lottery-radar-console">
        <div class="lottery-header-row">
          <div class="lottery-title-cluster">
            <div class="lottery-icon-box">${selectedProfile.sign || '🎯'}</div>
            <div>
              <div class="lottery-title">Solo Block Lottery Radar • ${selectedProfile.name} (${radarCoin})</div>
              <div class="mono" style="font-size: 11px; color: #94a3b8;">
                Mathematical Block Bounty Odds • ${selectedProfile.algo} Difficulty Target Tracker
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <!-- Interactive Coin Selector Dropdown -->
            <div class="lottery-coin-wrap">
              <span class="lottery-coin-label">TRACK COIN:</span>
              <select id="lottery-coin-select" class="lottery-coin-select">
                ${allRadarCoins.map(c => {
                  const isMining = fleetCoins.includes(c);
                  const isSel = c === radarCoin;
                  const tag = isMining ? ' (Mining ⛏️)' : '';
                  return `<option value="${c}" ${isSel ? 'selected' : ''}>${c}${tag}</option>`;
                }).join('')}
              </select>
            </div>
            <span class="badge-glass-pill" style="color: #fbbf24; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.12);">
              <span class="status-orb" style="background: #fbbf24; box-shadow: 0 0 8px #fbbf24;"></span>
              Active Fleet: ${activeHashThs.toFixed(2)} TH/s
            </span>
            <button class="glass-btn primary" id="test-celebration-btn" style="background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.5); color: #fbbf24;">
              🎉 Test Win Celebration
            </button>
            <button class="glass-btn" id="test-audio-btn" style="background: rgba(56, 189, 248, 0.15); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" title="Test Synthesized Share Acoustic Feedback">
              🔊 Test Share Audio
            </button>
          </div>
        </div>

        <!-- Main HUD Grid: Radar on Left, Metrics & Jackpot on Right -->
        <div class="lottery-hud-grid">
          <!-- Circular Radar Stage -->
          <div class="radar-stage-box">
            <svg class="radar-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="radarGridGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#064e3b" stop-opacity="0.35" />
                  <stop offset="70%" stop-color="#022c22" stop-opacity="0.6" />
                  <stop offset="100%" stop-color="#021c15" stop-opacity="0.9" />
                </radialGradient>
                <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.6" />
                  <stop offset="50%" stop-color="#10b981" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
                </linearGradient>
                <filter id="blipGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Radar Outer Casing -->
              <circle cx="80" cy="80" r="76" fill="url(#radarGridGlow)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="2" />
              <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(16, 185, 129, 0.2)" stroke-width="1" stroke-dasharray="3,3" />

              <!-- Concentric Range Rings (25%, 50%, 75%) -->
              <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1" />
              <circle cx="80" cy="80" r="36" fill="none" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1" />
              <circle cx="80" cy="80" r="18" fill="none" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" />

              <!-- Crosshairs -->
              <line x1="8" y1="80" x2="152" y2="80" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" stroke-dasharray="4,4" />
              <line x1="80" y1="8" x2="80" y2="152" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1" stroke-dasharray="4,4" />

              <!-- 45-degree angle guides -->
              <line x1="29" y1="29" x2="131" y2="131" stroke="rgba(16, 185, 129, 0.15)" stroke-width="1" stroke-dasharray="2,4" />
              <line x1="131" y1="29" x2="29" y2="131" stroke="rgba(16, 185, 129, 0.15)" stroke-width="1" stroke-dasharray="2,4" />

              <!-- Sweeping Beam -->
              <g class="radar-sweep-beam">
                <path d="M 80 80 L 80 8 A 72 72 0 0 1 131 29 Z" fill="url(#sweepGradient)" />
                <line x1="80" y1="80" x2="80" y2="8" stroke="#34d399" stroke-width="2" filter="drop-shadow(0 0 4px #34d399)" />
              </g>

              <!-- Blip: Mega-Share positioned at dynamic radius based on milestone progress -->
              <g class="radar-blip-mega" transform="translate(${blipX}, ${blipY})">
                <circle cx="0" cy="0" r="4.5" fill="${blipColor}" filter="url(#blipGlow)" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="${blipColor}" stroke-width="1.2" class="blip-pulse-ring" />
                <text x="7" y="3" fill="${blipColor}" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700">${fleetBestShareStr !== '--' ? fleetBestShareStr : '14.09G'}${isBlockSolved ? ' ★ WIN!' : ''}</text>
              </g>

              <!-- Blip: Standard target difficulty milestone -->
              <g class="radar-blip-std" transform="translate(108, 98)">
                <circle cx="0" cy="0" r="3" fill="#10b981" filter="url(#blipGlow)" />
                <circle cx="0" cy="0" r="6" fill="none" stroke="#10b981" stroke-width="1" class="blip-pulse-ring" />
                <text x="5" y="2" fill="#10b981" font-family="'JetBrains Mono', monospace" font-size="7">Target</text>
              </g>

              <!-- Center Hub -->
              <circle cx="80" cy="80" r="4" fill="#10b981" filter="url(#blipGlow)" />
              <circle cx="80" cy="80" r="2" fill="#ffffff" />
            </svg>
            <div class="radar-status-caption mono">
              <span class="radar-live-dot"></span> RADAR SWEEP ACTIVE
            </div>
          </div>

          <!-- Metrics Column -->
          <div class="lottery-metrics-column">
            <!-- Jackpot Banner -->
            <div class="jackpot-banner">
              <div class="jackpot-label mono">CURRENT ${radarCoin} BLOCK BOUNTY JACKPOT</div>
              <div class="jackpot-val-row">
                <span class="jackpot-amount mono">$${blockBountyJackpotUsd >= 1 ? blockBountyJackpotUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : blockBountyJackpotUsd.toFixed(4)}</span>
                <span class="jackpot-btc-badge mono" style="color: ${selectedProfile.accentColor}; border-color: ${selectedProfile.accentColor}; background: rgba(245, 158, 11, 0.15);">
                  ${selectedProfile.reward.toLocaleString()} ${radarCoin}
                </span>
              </div>
              <div class="jackpot-sub mono">Next block bounty awarded 100% to solo miner upon valid ${radarCoin} block hash</div>
            </div>

            <!-- Odds & Stats 3-Card Rack -->
            <div class="lottery-stat-tiles">
              <div class="lottery-mini-tile">
                <div class="mini-tile-label">Solo Win Odds</div>
                <div class="mini-tile-val mono" style="color: #38bdf8;">
                  1 in ${expectedYears >= 100 ? Math.round(expectedYears).toLocaleString() + ' Yrs' : (expectedDays >= 1 ? Math.round(expectedDays).toLocaleString() + ' Days' : (expectedDays * 24).toFixed(1) + ' Hours')}
                </div>
                <div class="mini-tile-sub mono">${dailyChancePct >= 1 ? dailyChancePct.toFixed(2) + '%' : dailyChancePct.toFixed(7) + '%'} / day</div>
              </div>
              <div class="lottery-mini-tile">
                <div class="mini-tile-label">Lifetime Best Share</div>
                <div class="mini-tile-val mono" style="color: #fbbf24;">${fleetBestShareStr}</div>
                <div class="mini-tile-sub mono">${fleetBestMinerName || 'Fleet Leader'}</div>
              </div>
              <div class="lottery-mini-tile">
                <div class="mini-tile-label">Network Difficulty</div>
                <div class="mini-tile-val mono" style="color: #a78bfa;">${selectedProfile.diffStr}</div>
                <div class="mini-tile-sub mono">Target: ~${selectedProfile.diffNum.toExponential(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logarithmic Progress Bar to Full Block -->
        <div class="share-progress-container">
          <div class="share-progress-header">
            <span class="mono" style="font-size: 11px; color: #cbd5e1; font-weight: 600;">
              🚀 Fleet Share Difficulty Milestone to Solving ${radarCoin} Block (Log10 Scale)
            </span>
            <span class="mono" style="font-size: 11px; color: ${isBlockSolved ? '#34d399' : '#fbbf24'}; font-weight: 700;">
              ${isBlockSolved ? `🎉 100% (${fleetBestShareStr} EXCEEDS ${radarCoin} TARGET!)` : `${fleetBestShareStr} (${logProgressStr}% to ${radarCoin} Target)`}
            </span>
          </div>
          <div class="share-progress-track">
            <div class="share-progress-fill" style="width: ${logProgressPct}%; background: ${isBlockSolved ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)'};"></div>
            <div class="share-progress-pin" style="left: ${logProgressPct}%;">
              <div class="share-pin-glow" style="background: ${isBlockSolved ? '#34d399' : '#fbbf24'}; box-shadow: 0 0 12px ${isBlockSolved ? '#34d399' : '#fbbf24'};"></div>
              <div class="share-pin-label mono" style="color: ${isBlockSolved ? '#34d399' : '#fbbf24'};">${fleetBestShareStr}</div>
            </div>
          </div>
          <div class="share-milestone-row mono">
            ${(selectedProfile.milestones || ['1 M', '100 M', '1 G', '10 G', `${selectedProfile.diffStr} (WIN)`]).map((m, idx, arr) => {
              const isWin = idx === arr.length - 1;
              const isMega = m.includes('Mega') || m.includes('1 G');
              const colorStyle = isWin ? 'color: #34d399; font-weight: 800;' : (isMega ? 'color: #fbbf24; font-weight: 700;' : '');
              return `<span style="${colorStyle}">${m}</span>`;
            }).join('')}
          </div>
        </div>
      </div>
      </div>
      ` : ''}

      ${(activeTab === 'hardware' || activeTab === 'all') ? `
      <!-- MINING POOL TELEMETRY RACK -->
      <div class="tab-pane">
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
      </div>
      ` : ''}

      ${(activeTab === 'yield' || activeTab === 'all') ? `
      <!-- MULTI-COIN LIVE YIELD MATRIX & 1-CLICK STRATUM SWITCHER -->
      <div class="tab-pane">
        <div class="glass-card yield-matrix-console">
        <div class="yield-header-row">
          <div class="yield-title-cluster">
            <div class="yield-icon-box">⚡</div>
            <div>
              <div class="yield-title">Multi-Coin Live Yield Matrix & 1-Click Stratum Switcher</div>
              <div class="mono" style="font-size: 11px; color: #94a3b8;">
                Real-Time SHA-256 Profitability Leaderboard • Fleet Hashrate: ${activeHashThs.toFixed(2)} TH/s • Power: ${totalWatts.toFixed(1)} W ($${fleetDailyPowerCost.toFixed(2)}/day @ $${estElectricityRate.toFixed(2)}/kWh)
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="glass-btn primary" id="open-stratum-modal-btn" style="background: linear-gradient(135deg, #0284c7, #38bdf8); border-color: #38bdf8; color: #fff; font-size: 12px; padding: 6px 14px;">
              ⚡ Quick Stratum Switcher
            </button>
          </div>
        </div>

        <div class="yield-table-wrap">
          <table class="yield-table">
            <thead>
              <tr>
                <th style="width: 48px;">Rank</th>
                <th>Coin & Algorithm</th>
                <th>Spot Price</th>
                <th>Network Difficulty</th>
                <th>Est. Daily Coins</th>
                <th>Gross 24h USD</th>
                <th>Net 24h Profit</th>
                <th>Stratum Endpoint</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${yieldRows.map((row, idx) => {
                const isTop = idx === 0;
                const isProfitable = row.netDailyProfit >= 0;
                const rankClass = isTop ? 'yield-rank-1' : 'yield-rank-other';
                const formattedPrice = row.price >= 1
                  ? '$' + row.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
                  : '$' + row.price.toFixed(6);
                const formattedDailyCoins = row.dailyCoins >= 1000
                  ? Math.round(row.dailyCoins).toLocaleString()
                  : (row.dailyCoins >= 1 ? row.dailyCoins.toFixed(2) : row.dailyCoins.toFixed(8));
                const formattedGross = '$' + (row.grossDailyUsd >= 1 ? row.grossDailyUsd.toFixed(2) : row.grossDailyUsd.toFixed(4));
                const formattedNet = (isProfitable ? '+$' : '-$') + Math.abs(row.netDailyProfit).toFixed(2);
                const formattedMonthly = (row.monthlyProfit >= 0 ? '+$' : '-$') + Math.abs(row.monthlyProfit).toFixed(2);

                return `
                  <tr class="${isTop ? 'top-yield-row' : ''}">
                    <td>
                      <span class="yield-rank-badge ${rankClass}">#${idx + 1}</span>
                    </td>
                    <td>
                      <div class="yield-coin-cell">
                        <span class="yield-coin-icon">${row.sign}</span>
                        <div>
                          <div class="yield-coin-symbol">
                            ${row.name} (${row.coin})
                            ${isTop ? '<span class="badge-glass-pill" style="margin-left: 6px; color: #fbbf24; border-color: #fbbf24; font-size: 9px; padding: 2px 6px;">TOP YIELD 👑</span>' : ''}
                          </div>
                          <div class="yield-coin-name">${row.algo} • Reward: ${row.reward.toLocaleString()} ${row.coin}</div>
                        </div>
                      </div>
                    </td>
                    <td class="mono" style="font-weight: 700; color: #f8fafc;">${formattedPrice}</td>
                    <td class="mono" style="color: #94a3b8;">${row.diffStr}</td>
                    <td class="mono" style="color: #38bdf8; font-weight: 700;">${formattedDailyCoins} <span style="font-size: 10px; color: #64748b;">${row.coin}</span></td>
                    <td class="mono" style="color: #cbd5e1;">${formattedGross} <span style="font-size: 10px; color: #64748b;">/ day</span></td>
                    <td>
                      <span class="yield-profit-badge ${isProfitable ? 'profit-positive' : 'profit-negative'}">
                        ${formattedNet} / day
                      </span>
                      <div class="mono" style="font-size: 10px; color: #64748b; margin-top: 2px;">
                        ${formattedMonthly} / mo
                      </div>
                    </td>
                    <td class="mono" style="font-size: 11px; color: #94a3b8;">
                      ${row.stratumHost}:${row.stratumPort}
                    </td>
                    <td style="text-align: right;">
                      ${row.isMining ? `
                        <span class="stratum-active-badge">
                          <span class="status-orb" style="background: #34d399; box-shadow: 0 0 8px #34d399;"></span>
                          Active (Mining)
                        </span>
                      ` : `
                        <button class="stratum-btn-action switch-coin-row-btn" data-coin="${row.coin}" data-host="${row.stratumHost}" data-port="${row.stratumPort}">
                          ⚡ Switch Stratum
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      ` : ''}

      ${(activeTab === 'hardware' || activeTab === 'all') ? `
      <!-- HARDWARE SECTION -->
      <div class="tab-pane">
        <div class="hardware-section-title">${isSingleRigView ? 'Workstation Controls & Telemetry' : 'Hardware Workstations'}</div>

        <div class="workstations-grid">
        ${displayedMiners.length === 0 ? `
          <div class="glass-card" style="text-align: center; padding: 40px; color: #94a3b8;">
            <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
            <div style="font-size: 16px; font-weight: 600; color: #f8fafc;">No matching miner found for this view</div>
            <div style="font-size: 13px; margin-top: 6px;">Filter: ${filterType || filterHost}</div>
          </div>
        ` : displayedMiners.map(miner => {
          const isNerdqaxe = miner.type === 'nerdqaxe';
          const isBitaxe = miner.type === 'bitaxe' || isNerdqaxe;
          const chipTemp = miner.temp;
          const fanRpm = miner.fan;
          const hashrateThs = miner.ths.toFixed(2);
          const powerW = miner.watts.toFixed(1);
          const efficiency = miner.eff;
          const isMega = (miner.bestDiffNum || 0) >= 1e9;
          const isSuper = (miner.bestDiffNum || 0) >= 1e8 && !isMega;
          const cardGlowClass = isMega ? 'amber-glow mega-share-card' : isBitaxe ? 'amber-glow' : 'cyan-glow';

          // Bar percentages
          const maxThs = isNerdqaxe ? 5.0 : (miner.type === 'bitaxe' ? 2.5 : 6.0);
          const maxWatts = isNerdqaxe ? 120.0 : (miner.type === 'bitaxe' ? 30.0 : 140.0);
          const hashBar = Math.min(100, Math.round((miner.ths / maxThs) * 100));
          const pwrBar = Math.min(100, Math.round((miner.watts / maxWatts) * 100));
          const tempBar = Math.min(100, Math.round((chipTemp / 80.0) * 100));
          const fanBar = Math.min(100, Math.round((fanRpm / (isBitaxe ? 8000 : 5000)) * 100));

          // Workstation RPG Tier
          const minerAccepted = miner.acceptedRaw || 0;
          const minerBestDiff = miner.bestDiffNum || 0;
          const minerDiffBonus = minerBestDiff > 1000 ? Math.floor(Math.log10(minerBestDiff) * 5) : 0;
          const minerXp = minerAccepted + minerDiffBonus;
          const minerLvl = rpgLevelForXp(minerXp);
          const minerRank = getRpgTitle(minerLvl);

          return `
            <div class="glass-card ${cardGlowClass}">
              <div class="pod-header-row">
                <div class="pod-identity">
                  <div class="pod-icon" style="color: ${isBitaxe ? '#fbbf24' : '#38bdf8'}; border-color: ${isBitaxe ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.4)'}; background: ${isBitaxe ? 'rgba(245, 158, 11, 0.1)' : 'rgba(56, 189, 248, 0.1)'};">
                    ${this._getMinerTypeIconSvg(miner.type || (isBitaxe ? 'bitaxe' : 'avalon'), 24)}
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span class="pod-name">${miner.name}</span>
                      <span class="badge-glass-pill" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 700; font-size: 10px;">
                        ${minerRank.badge} Lvl ${minerLvl} • ${minerRank.title}
                      </span>
                      ${isNerdqaxe ? `
                        <span class="badge-glass-pill" style="background: rgba(148, 163, 184, 0.15); border-color: rgba(148, 163, 184, 0.4); color: #94a3b8; font-weight: 600; font-size: 10px;" title="Hardware implementation follows AxeOS specification; physical hardware testing is pending.">
                          🧪 Untested Hardware
                        </span>
                      ` : ''}
                      ${isMega ? `
                        <span class="mega-share-pill mono">
                          <span>🏆</span>
                          <span>MEGA-SHARE ${miner.bestShareStr}</span>
                        </span>
                      ` : isSuper ? `
                        <span class="super-share-pill mono">
                          <span>⚡</span>
                          <span>SUPER-SHARE ${miner.bestShareStr}</span>
                        </span>
                      ` : ''}
                    </div>
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
                    <span class="bay-title">⚡ Interactive ${isNerdqaxe ? 'NerdQaxe' : 'AxeOS'} Overclocking Console</span>
                    <span class="mono" style="font-size: 11px; color: #94a3b8;">${miner.inVolt ? miner.inVolt + 'V Input | ' : ''}${miner.inAmps ? miner.inAmps + 'A Draw' : (isNerdqaxe ? 'Quad-ASIC Matrix' : 'Single ASIC')}</span>
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
                        <span class="mono" style="color: #38bdf8; font-weight: 700;" id="freq-disp-${miner.host ? miner.host.replace(/[^a-zA-Z0-9]/g, '_') : (isNerdqaxe ? 'nerdqaxe' : 'bitaxe')}">${miner.freq} MHz</span>
                      </div>
                      <input type="range" min="450" max="800" step="5" value="${miner.freq}" class="cyan-thumb"
                             data-action="freq-slider"
                             data-entity="${miner.freqEntity}"
                             data-disp="freq-disp-${miner.host ? miner.host.replace(/[^a-zA-Z0-9]/g, '_') : (isNerdqaxe ? 'nerdqaxe' : 'bitaxe')}">
                    </div>

                    <div class="slider-unit-box">
                      <div class="slider-meta-head">
                        <span>Core Voltage</span>
                        <span class="mono" style="color: #fbbf24; font-weight: 700;" id="volt-disp-${miner.host ? miner.host.replace(/[^a-zA-Z0-9]/g, '_') : (isNerdqaxe ? 'nerdqaxe' : 'bitaxe')}">${miner.volt} mV</span>
                      </div>
                      <input type="range" min="1000" max="1300" step="10" value="${miner.volt}"
                             data-action="volt-slider"
                             data-entity="${miner.voltEntity}"
                             data-disp="volt-disp-${miner.host ? miner.host.replace(/[^a-zA-Z0-9]/g, '_') : (isNerdqaxe ? 'nerdqaxe' : 'bitaxe')}">
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
      </div>
      ` : ''}
    `;

    this._attachCardEventHandlers();
    } catch (err) {
      console.error('Error rendering HomeMinerFleetCard:', err);
    }
  }

  _getAudioContext() {
    if (!this._audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this._audioCtx = new AudioCtx();
      }
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
    }
    return this._audioCtx;
  }

  _playGeigerClick(volumeMultiplier = 1.0, force = false) {
    if (!force && this._soundMode === 'off') return;
    try {
      const ctx = this._getAudioContext();
      if (!ctx) return;
      const vol = Math.min(1.0, (this._soundVolume || 0.4) * volumeMultiplier * 1.5);
      
      // Dual oscillator design: crisp metallic snap + mechanical tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Bandpass centered at 1900Hz for tactile mechanical tick
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1900 + (Math.random() - 0.5) * 300, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(vol * 0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.055);
    } catch (e) {
      console.warn('[Home Miner Studio] Geiger audio error:', e);
    }
  }

  _playShareChime(diffMultiplier = 100, force = false) {
    if (!force && this._soundMode !== 'chimes') return;
    try {
      const ctx = this._getAudioContext();
      if (!ctx) return;
      const vol = Math.min(1.0, (this._soundVolume || 0.4) * 1.2);
      // High harmonic crystal bells (E6 1318.51Hz + B6 1975.53Hz + E7 2637Hz)
      const chord = diffMultiplier >= 1000 
        ? [1318.51, 1975.53, 2637.02] 
        : [880.00, 1318.51, 1760.00];

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const noteVol = vol * (0.35 / (idx + 1));
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(noteVol, ctx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.42);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.45);
      });
    } catch (e) {
      console.warn('[Home Miner Studio] Chime audio error:', e);
    }
  }

  _playVictoryFanfare() {
    try {
      const ctx = this._getAudioContext();
      if (!ctx) return;
      // 4-note victory arpeggio: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
      const notes = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 0.12 },
        { f: 783.99, d: 0.14, t: 0.24 },
        { f: 1046.50, d: 0.45, t: 0.38 }
      ];
      notes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + note.t);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + note.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + note.t + note.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d);
      });
    } catch (e) {
      console.warn('[Home Miner Studio] Victory fanfare sound error:', e);
    }
  }

  _triggerCelebration(coin = 'BTC', reward = 3.125) {
    this._playVictoryFanfare();
    const btn = this.shadowRoot?.querySelector('#test-celebration-btn');
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = `🎉 SOLO BLOCK: +${reward.toLocaleString()} ${coin}!`;
      btn.style.background = 'rgba(52, 211, 153, 0.35)';
      btn.style.borderColor = '#34d399';
      btn.style.color = '#34d399';
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.style.background = 'rgba(245, 158, 11, 0.2)';
        btn.style.borderColor = 'rgba(245, 158, 11, 0.5)';
        btn.style.color = '#fbbf24';
      }, 3500);
    }
    const canvas = this.shadowRoot?.querySelector('#celebration-canvas');
    if (!canvas) return;

    const host = this;
    const rect = host.getBoundingClientRect();
    canvas.width = rect.width || 800;
    canvas.height = rect.height || 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = [];
    const colors = ['#fbbf24', '#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#ffffff', '#8b5cf6'];
    const numParticles = 140;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: canvas.height * 0.35 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() * -12) - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        alpha: 1,
        gravity: 0.35,
        friction: 0.985
      });
    }

    const startTime = performance.now();
    const duration = 3200;

    const renderFrame = (now) => {
      const elapsed = now - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fadeOut = elapsed > duration - 800 ? (duration - elapsed) / 800 : 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha * fadeOut);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();
      }

      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }

  _attachCardEventHandlers() {
    // Clean up active pipeline animation frames & intervals
    if (this._particleAnimId) {
      cancelAnimationFrame(this._particleAnimId);
      this._particleAnimId = null;
    }
    if (this._goldenNonceInterval) {
      clearInterval(this._goldenNonceInterval);
      this._goldenNonceInterval = null;
    }

    // Solo Block Radar Coin Selector
    const lotteryWrap = this.shadowRoot.querySelector('.lottery-coin-wrap');
    if (lotteryWrap) {
      ['click', 'mousedown', 'pointerdown', 'touchstart'].forEach(evt => {
        lotteryWrap.addEventListener(evt, (e) => e.stopPropagation());
      });
    }

    const lotteryCoinSelect = this.shadowRoot.querySelector('#lottery-coin-select');
    if (lotteryCoinSelect) {
      this._bindSelectSafety(lotteryCoinSelect, (e) => {
        const val = e.target.value;
        if (val) {
          this._selectedLotteryCoin = val;
          safeStorage.set('lottery_selected_coin', val);
          this._lastRenderSig = null;
          this.render();
        }
      });
    }

    // Solo Block Win Celebration Test Button
    const celebrateBtn = this.shadowRoot.querySelector('#test-celebration-btn');
    if (celebrateBtn) {
      celebrateBtn.addEventListener('click', () => {
        this._triggerCelebration(this._activeRadarCoin || 'WOJAK', this._activeRadarReward || 10000);
      });
    }

    // Acoustic Telemetry Test Button
    const testAudioBtn = this.shadowRoot.querySelector('#test-audio-btn');
    if (testAudioBtn) {
      testAudioBtn.addEventListener('click', () => {
        const origText = testAudioBtn.innerHTML;
        testAudioBtn.innerHTML = '🔊 Playing Audio...';
        testAudioBtn.style.color = '#34d399';
        testAudioBtn.style.borderColor = '#34d399';

        // Play 3 rapid geiger clicks followed by a milestone chime (forced playback)
        this._playGeigerClick(1.2, true);
        setTimeout(() => this._playGeigerClick(1.3, true), 80);
        setTimeout(() => this._playGeigerClick(1.4, true), 160);
        setTimeout(() => this._playShareChime(1000, true), 240);

        setTimeout(() => {
          testAudioBtn.innerHTML = origText;
          testAudioBtn.style.color = '#38bdf8';
          testAudioBtn.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        }, 900);
      });
    }

    // Acoustic Share Feedback Toggle Button
    const soundBtn = this.shadowRoot.querySelector('#sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (this._soundMode === 'off') {
          this._soundMode = 'geiger';
          this._playGeigerClick(1.2, true);
        } else if (this._soundMode === 'geiger') {
          this._soundMode = 'chimes';
          this._playShareChime(100, true);
        } else {
          this._soundMode = 'off';
        }
        safeStorage.set('miner_sound_mode', this._soundMode);
        this._lastRenderSig = null;
        this.render();
      });
    }
    
    // 1-Click Miner Discovery Button (Interactive Modal)
    const importBtn = this.shadowRoot.querySelector('#import-btn');
    if (importBtn) {
      importBtn.addEventListener('click', () => {
        this._openDiscoveryModal();
      });
    }

    // Refresh Button & Hard Cache Purge
    const triggerHardCachePurge = async () => {
      try {
        if (window.caches) {
          const keys = await window.caches.keys();
          await Promise.all(keys.map(k => window.caches.delete(k)));
        }
      } catch (e) {}
      if (this._hass) {
        try {
          await this._hass.callService('home_miner_studio', 'bust_card_cache', {});
        } catch (e) {}
      }
      window.location.reload(true);
    };

    const reloadBtn = this.shadowRoot.querySelector('#reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', (e) => {
        if (e.shiftKey) {
          triggerHardCachePurge();
          return;
        }
        this._lastRenderSig = null;
        this.render();
      });
    }

    const purgeBtn = this.shadowRoot.querySelector('#cache-purge-btn');
    if (purgeBtn) {
      purgeBtn.addEventListener('click', triggerHardCachePurge);
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

        const plotX = 20 + pct * (800 - 20 - 85);
        const minP = Math.min(...pts.map(p => p.p));
        const maxP = Math.max(...pts.map(p => p.p));
        const rangeP = maxP > minP ? (maxP - minP) : (maxP > 0 ? maxP * 0.08 : 1);
        const plotY = 22 + (180 - 22 - 34) - ((pt.p - minP) / rangeP) * (180 - 22 - 34);

        scrubberGroup.style.display = 'inline';
        scrubberLine.setAttribute('x1', plotX);
        scrubberLine.setAttribute('x2', plotX);
        scrubberDot.setAttribute('cx', plotX);
        scrubberDot.setAttribute('cy', plotY);

        tooltip.style.display = 'flex';
        const numP = Number(pt.p || 0);
        tooltipPrice.textContent = numP >= 1 ? '$' + numP.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '$' + numP.toFixed(6);
        const d = new Date(pt.t * 1000);
        tooltipTime.textContent = d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      });

      hitArea.addEventListener('mouseleave', () => {
        scrubberGroup.style.display = 'none';
        tooltip.style.display = 'none';
      });
    }

    // Coin Toggle Buttons
    const coinBtns = this.shadowRoot.querySelectorAll('.coin-toggle-btn[data-coin]');
    coinBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.getAttribute('data-coin');
        if (c && c !== this._selectedCoin) {
          this._selectedCoin = c;
          this.render();
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

    // 1-Click Stratum Switcher Buttons
    const openStratumBtn = this.shadowRoot.querySelector('#open-stratum-modal-btn');
    if (openStratumBtn) {
      openStratumBtn.addEventListener('click', () => {
        this._openStratumModal();
      });
    }

    const switchCoinRowBtns = this.shadowRoot.querySelectorAll('.switch-coin-row-btn');
    switchCoinRowBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const coin = btn.getAttribute('data-coin') || '';
        this._openStratumModal('', coin);
      });
    });

    // Workspace Tab Bar Navigation
    const tabPills = this.shadowRoot.querySelectorAll('.tab-pill');
    tabPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const tab = pill.getAttribute('data-tab');
        if (tab && tab !== this._activeTab) {
          this._activeTab = tab;
          this._lastRenderSig = null;
          safeStorage.set('miner_active_tab', tab);
          this.render();
        }
      });
    });

    // Trophy Filter Navigation
    const trophyFilterPills = this.shadowRoot.querySelectorAll('.trophy-filter-pill');
    trophyFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-filter') || 'all';
        if (cat !== this._trophyFilter) {
          this._trophyFilter = cat;
          this._lastRenderSig = null;
          safeStorage.set('miner_trophy_filter', cat);
          this.render();
        }
      });
    });

    // Prestige Theme Apply Buttons
    const themeApplyBtns = this.shadowRoot.querySelectorAll('.theme-apply-btn');
    themeApplyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.getAttribute('data-theme');
        if (themeId && themeId !== this._activeTheme) {
          this._activeTheme = themeId;
          this._lastRenderSig = null;
          safeStorage.set('miner_active_theme', themeId);
          this.render();
        }
      });
    });

    // Mining History Chronicles Filter Navigation
    const chronicleFilterPills = this.shadowRoot.querySelectorAll('.chronicle-filter-pill');
    chronicleFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filterVal = pill.getAttribute('data-cfilter') || 'all';
        if (filterVal !== this._chronicleFilter) {
          this._chronicleFilter = filterVal;
          this._lastRenderSig = null;
          safeStorage.set('miner_chronicle_filter', filterVal);
          this.render();
        }
      });
    });

    // Mining History Chronicles Read Modal Triggers
    const chronicleReadBtns = this.shadowRoot.querySelectorAll('.chronicle-read-btn');
    chronicleReadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lvl = parseInt(btn.getAttribute('data-clevel'), 10);
        const chapter = CHRONICLE_CHAPTERS.find(c => c.level === lvl);
        if (chapter) {
          this._openChronicleModal(chapter);
        }
      });
    });

    // Mining History Modal Close Buttons
    const cModalCloseBtn = this.shadowRoot.querySelector('#cmodal-close-btn');
    const cModalDoneBtn = this.shadowRoot.querySelector('#cmodal-done-btn');
    if (cModalCloseBtn) cModalCloseBtn.addEventListener('click', () => this._closeModals());
    if (cModalDoneBtn) cModalDoneBtn.addEventListener('click', () => this._closeModals());

    // Live Stratum Particle Pipeline Controls
    const pipelineCollapseBtn = this.shadowRoot.querySelector('#pipeline-collapse-toggle');
    const pipelineHeader = this.shadowRoot.querySelector('#pipeline-toggle');
    const pipelineCoinWrap = this.shadowRoot.querySelector('.pipeline-coin-wrap');
    const pipelineCoinSelect = this.shadowRoot.querySelector('#pipeline-coin-select');

    if (pipelineCoinWrap) {
      ['click', 'mousedown', 'pointerdown', 'touchstart'].forEach(evt => {
        pipelineCoinWrap.addEventListener(evt, (e) => e.stopPropagation());
      });
    }

    const handleCollapseToggle = (e) => {
      const path = e.composedPath ? e.composedPath() : [];
      if (path.some(el => el.id === 'pipeline-anim-toggle' || el.id === 'pipeline-coin-select' || el.classList?.contains('pipeline-coin-wrap'))) {
        return;
      }
      if (e.target && (e.target.closest('#pipeline-anim-toggle') || e.target.closest('#pipeline-coin-select') || e.target.closest('.pipeline-coin-wrap'))) return;
      this._pipelineCollapsed = !this._pipelineCollapsed;
      safeStorage.set('miner_pipeline_collapsed', this._pipelineCollapsed ? 'true' : 'false');
      this._lastRenderSig = null;
      this.render();
    };

    if (pipelineCollapseBtn) {
      pipelineCollapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCollapseToggle(e);
      });
    }
    if (pipelineHeader) {
      pipelineHeader.addEventListener('click', handleCollapseToggle);
    }

    if (pipelineCoinSelect) {
      this._bindSelectSafety(pipelineCoinSelect, (e) => {
        const newCoin = (e.target.value || 'BTC').toUpperCase();
        this._selectedPipelineCoin = newCoin;
        safeStorage.set('miner_pipeline_coin', newCoin);
        this._lastRenderSig = null;
        this.render();
      });
    }

    const pipelineAnimBtn = this.shadowRoot.querySelector('#pipeline-anim-toggle');
    if (pipelineAnimBtn) {
      pipelineAnimBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._pipelineAnimPaused = !this._pipelineAnimPaused;
        safeStorage.set('miner_pipeline_anim_paused', this._pipelineAnimPaused ? 'true' : 'false');
        this._lastRenderSig = null;
        this.render();
      });
    }

    // Canvas particle stream and golden nonce ticker (only active when not collapsed and not paused)
    if (!this._pipelineCollapsed && !this._pipelineAnimPaused) {
      const pCanvas = this.shadowRoot.querySelector('#particle-canvas');
      if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        const pW = pCanvas.width;
        const pH = pCanvas.height;
        const pCount = 24;
        const particles = [];
        const colors = ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#a855f7'];
        for (let i = 0; i < pCount; i++) {
          particles.push({
            x: Math.random() * pW,
            y: 8 + Math.random() * (pH - 16),
            vx: 0.8 + Math.random() * 2.2,
            size: 1.5 + Math.random() * 2.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.3 + Math.random() * 0.7
          });
        }
        const animLoop = () => {
          if (!this.shadowRoot || !this.shadowRoot.contains(pCanvas)) return;
          pCtx.clearRect(0, 0, pW, pH);
          // Conduit center guideline
          pCtx.strokeStyle = 'rgba(255,255,255,0.06)';
          pCtx.setLineDash([4, 4]);
          pCtx.beginPath();
          pCtx.moveTo(0, pH / 2);
          pCtx.lineTo(pW, pH / 2);
          pCtx.stroke();
          pCtx.setLineDash([]);
          // Draw particles
          for (let i = 0; i < pCount; i++) {
            const p = particles[i];
            p.x += p.vx;
            if (p.x > pW) {
              p.x = 0;
              p.y = 8 + Math.random() * (pH - 16);
            }
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pCtx.fillStyle = p.color;
            pCtx.globalAlpha = p.alpha;
            pCtx.shadowColor = p.color;
            pCtx.shadowBlur = 6;
            pCtx.fill();
            pCtx.globalAlpha = 1.0;
            pCtx.shadowBlur = 0;
          }
          this._particleAnimId = requestAnimationFrame(animLoop);
        };
        this._particleAnimId = requestAnimationFrame(animLoop);
      }

      const goldenTicker = this.shadowRoot.querySelector('#golden-nonce-ticker');
      if (goldenTicker) {
        const targetZeros = parseInt(goldenTicker.getAttribute('data-zeros') || '19', 10);
        const zeroPrefix = '0'.repeat(Math.min(16, targetZeros));
        this._goldenNonceInterval = setInterval(() => {
          if (!this.shadowRoot || !this.shadowRoot.contains(goldenTicker)) {
            clearInterval(this._goldenNonceInterval);
            return;
          }
          const rnd = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
          goldenTicker.textContent = `0x${zeroPrefix}${rnd}...`;
        }, 125);
      }
    }
  }

}

if (!customElements.get('home-miner-fleet-card')) {
  customElements.define('home-miner-fleet-card', HomeMinerFleetCard);
}
if (!customElements.get('home-miner-card')) {
  customElements.define('home-miner-card', class extends HomeMinerFleetCard {});
}
if (!customElements.get('home-miner-studio-card')) {
  customElements.define('home-miner-studio-card', class extends HomeMinerFleetCard {});
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-miner-fleet-card',
  name: 'Home Miner Fleet Studio Card',
  description: 'Luminous Glassmorphism crypto mining dashboard with real-time Bitaxe AxeOS overclocking and Canaan Avalon Nano telemetry.',
  preview: true,
});
window.customCards.push({
  type: 'home-miner-card',
  name: 'Home Miner Studio Card',
  description: 'Single-miner or fleet crypto mining dashboard with aero-glass styling.',
  preview: true,
});
