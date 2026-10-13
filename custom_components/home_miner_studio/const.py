"""Constants for the Home Miner Studio integration."""

DOMAIN = "home_miner_studio"
PLATFORMS = ["sensor", "binary_sensor", "switch", "button"]

# Configuration keys
CONF_MINER_TYPE = "miner_type"
CONF_HOST = "host"
CONF_PORT = "port"
CONF_NAME = "name"
CONF_PASSWORD = "password"
CONF_API_KEY = "api_key"
CONF_COIN = "coin"
CONF_POOL_TYPE = "pool_type"
CONF_POOL_USER = "pool_user"
CONF_ELECTRICITY_RATE_SENSOR = "electricity_rate_sensor"
CONF_SCAN_INTERVAL = "scan_interval"

# Miner Types
TYPE_BITAXE = "bitaxe"
TYPE_CGMINER_RPC = "cgminer_rpc"
TYPE_HIVEOS = "hiveos"
TYPE_NERDMINER = "nerdminer"
TYPE_GENERIC_REST = "generic_rest"

MINER_TYPES = [
    TYPE_BITAXE,
    TYPE_CGMINER_RPC,
    TYPE_HIVEOS,
    TYPE_NERDMINER,
    TYPE_GENERIC_REST,
]

# Default Ports
DEFAULT_PORT_BITAXE = 80
DEFAULT_PORT_CGMINER = 4028
DEFAULT_PORT_NERDMINER = 80

# Default Intervals
DEFAULT_SCAN_INTERVAL = 30  # seconds

# Custom Card URL & JS
CARD_URL = "/home_miner_studio/home-miner-cards.js"
CARD_FILE = "home-miner-cards.js"
