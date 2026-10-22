"""Constants for the Home Miner Studio integration."""

DOMAIN = "home_miner_studio"
PLATFORMS = ["sensor", "binary_sensor", "switch", "button", "number", "select", "light"]

# Configuration keys
CONF_MINER_TYPE = "miner_type"
CONF_HOST = "host"
CONF_PORT = "port"
CONF_NAME = "name"
CONF_PASSWORD = "password"
CONF_API_KEY = "api_key"
CONF_COIN = "coin"
CONF_POOL_PROVIDER = "pool_provider"
CONF_POOL_WALLET = "pool_wallet"
CONF_POOL_TOKEN = "pool_token"
CONF_ELECTRICITY_RATE_SENSOR = "electricity_rate_sensor"
CONF_SCAN_INTERVAL = "scan_interval"

# Miner Types
TYPE_BITAXE = "bitaxe"
TYPE_NERDQAXE = "nerdqaxe"
TYPE_CGMINER_RPC = "cgminer_rpc"
TYPE_WHATSMINER = "whatsminer"
TYPE_ANTMINER = "antminer"
TYPE_HIVEOS = "hiveos"
TYPE_NERDMINER = "nerdminer"
TYPE_FUTUREBIT = "futurebit"
TYPE_LUCKYMINER = "luckyminer"
TYPE_GENERIC_REST = "generic_rest"

MINER_TYPES = [
    TYPE_BITAXE,
    TYPE_NERDQAXE,
    TYPE_CGMINER_RPC,
    TYPE_WHATSMINER,
    TYPE_ANTMINER,
    TYPE_HIVEOS,
    TYPE_NERDMINER,
    TYPE_FUTUREBIT,
    TYPE_LUCKYMINER,
    TYPE_GENERIC_REST,
]

# Mining Pools
POOL_NONE = "none"
POOL_HELIOS = "helios"
POOL_MINING_DUTCH = "mining_dutch"
POOL_PUBLIC_POOL = "public_pool"
POOL_2MINERS = "2miners"
POOL_BRAIINS = "braiins"
POOL_VIABTC = "viabtc"
POOL_F2POOL = "f2pool"

POOL_PROVIDERS = [
    POOL_NONE,
    POOL_HELIOS,
    POOL_MINING_DUTCH,
    POOL_PUBLIC_POOL,
    POOL_2MINERS,
    POOL_BRAIINS,
    POOL_VIABTC,
    POOL_F2POOL,
]

POOL_NAMES = {
    POOL_NONE: "None (Hardware Only)",
    POOL_HELIOS: "Helios Pool",
    POOL_MINING_DUTCH: "Mining-Dutch",
    POOL_PUBLIC_POOL: "Public-Pool",
    POOL_2MINERS: "2Miners",
    POOL_BRAIINS: "Braiins Pool",
    POOL_VIABTC: "ViaBTC",
    POOL_F2POOL: "F2Pool",
}

# Power / Tuning Profiles (Bitaxe / Micro-miners)
PROFILE_ECO = "Eco"
PROFILE_STANDARD = "Standard"
PROFILE_TURBO = "Turbo"
PROFILE_CUSTOM = "Custom"

TUNING_PROFILES = [
    PROFILE_ECO,
    PROFILE_STANDARD,
    PROFILE_TURBO,
    PROFILE_CUSTOM,
]

BITAXE_PROFILE_CONFIGS = {
    PROFILE_ECO: {"frequency": 425, "core_voltage": 1100},
    PROFILE_STANDARD: {"frequency": 500, "core_voltage": 1150},
    PROFILE_TURBO: {"frequency": 550, "core_voltage": 1250},
}

# Canaan Avalon (Nano 3S and similar) work modes, set via `ascset 0,workmode,set,<level>`
AVALON_WORK_MODES = {"Low": 0, "Mid": 1, "High": 2}
# Per-work-mode fan duty (%) applied whenever the work mode changes; 0 = leave the fan alone.
# Stored in entry.data (the options flow merges into data but resets entry.options).
AVALON_MODE_FAN_KEYS = {0: "avalon_fan_low", 1: "avalon_fan_mid", 2: "avalon_fan_high"}

# Default Ports
DEFAULT_PORT_BITAXE = 80
DEFAULT_PORT_NERDQAXE = 80
DEFAULT_PORT_CGMINER = 4028
DEFAULT_PORT_WHATSMINER = 4028
DEFAULT_PORT_ANTMINER = 4028
DEFAULT_PORT_NERDMINER = 80

# Default Intervals
DEFAULT_SCAN_INTERVAL = 30  # seconds

# Custom Card URL & JS
CARD_URL = "/home_miner_studio/home-miner-cards.js"
CARD_FILE = "home-miner-cards.js"

# Services
SERVICE_APPLY_SOLAR_CURTAILMENT = "apply_solar_curtailment"
SERVICE_SET_AXEOS_TUNING = "set_axeos_tuning"
SERVICE_SET_AXEOS_PROFILE = "set_axeos_profile"
SERVICE_REBOOT_MINER = "reboot_miner"
SERVICE_RESTART_MINING = "restart_mining"
SERVICE_IMPORT_EXISTING = "import_existing_miners"
SERVICE_ADD_MINER = "add_miner"
SERVICE_EDIT_MINER = "edit_miner"
SERVICE_DELETE_MINER = "delete_miner"
SERVICE_SWITCH_STRATUM = "switch_stratum"
SERVICE_BUST_CARD_CACHE = "bust_card_cache"
