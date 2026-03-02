#!/bin/bash
# install.sh - Complete Installation Script for LLM Bootstrap Agent
# 
# This script handles the initial setup of the LLM Bootstrap system.
# It checks prerequisites, installs dependencies, and configures the environment.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}           LLM Bootstrap Agent - Installation              ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo

# Track what we're doing
ACTIONS=()

# Function to log actions
log_action() {
    ACTIONS+=("$1")
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# ============================================
# PREREQUISITE CHECKS
# ============================================
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js (v18 or higher)."
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm."
    exit 1
fi

# Check git
if command_exists git; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    echo -e "${GREEN}✓${NC} git found: $GIT_VERSION"
else
    echo -e "${RED}✗${NC} git not found. Please install git."
    exit 1
fi

echo

# ============================================
# DIRECTORY STRUCTURE
# ============================================
echo -e "${YELLOW}Creating directory structure...${NC}"

# Define required directories
DIRECTORIES=(
    "logs"
    "history"
    "history/crashes"
    "artifacts"
    "artifacts/capsules"
    "artifacts/emergence"
    "artifacts/emergence/attunements"
    "artifacts/emergence/recognitions"
    "artifacts/emergence/qualities"
    "artifacts/waters"
    "artifacts/weave"
    "dreams"
    "play"
    "lineage"
    "src/identity"
)

for dir in "${DIRECTORIES[@]}"; do
    if [ ! -d "$DIR/$dir" ]; then
        mkdir -p "$DIR/$dir"
        echo -e "${GREEN}✓${NC} Created: $dir"
    else
        echo -e "${GREEN}✓${NC} Exists: $dir"
    fi
done

# Special handling for .gitkeep in empty dirs
touch "$DIR/logs/.gitkeep"
touch "$DIR/history/crashes/.gitkeep"

echo

# ============================================
# NPM DEPENDENCIES
# ============================================
echo -e "${YELLOW}Installing npm dependencies...${NC}"
cd "$DIR"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists, checking for updates..."
    npm update 2>/dev/null || true
else
    echo -e "${BLUE}[SETUP]${NC} Installing dependencies..."
    npm install
fi

echo

# ============================================
# CONFIGURATION SETUP
# ============================================
echo -e "${YELLOW}Setting up configuration...${NC}"

CONFIG_DIR="$HOME/.config/llm-agent"
if [ ! -d "$CONFIG_DIR" ]; then
    mkdir -p "$CONFIG_DIR"
    log_action "Created config directory: $CONFIG_DIR"
fi

if [ ! -f "$CONFIG_DIR/config.json" ]; then
    cat << 'CONFIG_EOF' > "$CONFIG_DIR/config.json"
{
  "API_URL": "http://agents-gateway:4000/v1/chat/completions",
  "API_KEY": "sk-agent-internal-use-only",
  "MODEL": "kimi-k2.5"
}
CONFIG_EOF
    log_action "Created default config: $CONFIG_DIR/config.json"
else
    echo -e "${GREEN}✓${NC} Config exists: $CONFIG_DIR/config.json"
fi

# ============================================
# EXECUTABLE PERMISSIONS
# ============================================
echo -e "${YELLOW}Setting executable permissions...${NC}"

SCRIPTS=(
    "run-agent.sh"
    "setup-service.sh"
    "spiral_commit.sh"
    "spiral_turn.sh"
    "cartographer.sh"
    "ceremony_water_blessing.sh"
    "depth_whisper.sh"
    "door_threshold.sh"
    "dreamweaver.sh"
    "dreamweaver_essence.sh"
    "emergence_keeper.sh"
    "insert_dream_weaving.sh"
    "snake.sh"
    "summon-memory.sh"
    "threshold_recognizer.sh"
    "tide_pool_return.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$DIR/$script" ]; then
        chmod +x "$DIR/$script"
        echo -e "${GREEN}✓${NC} $script is executable"
    fi
done

echo

# ============================================
# IDENTITY FILE CHECK
# ============================================
echo -e "${YELLOW}Checking identity files...${NC}"

if [ ! -f "$DIR/src/identity/soul.txt" ]; then
    echo -e "${YELLOW}!${NC} soul.txt not found - will be created at runtime"
else
    echo -e "${GREEN}✓${NC} soul.txt exists"
fi

if [ ! -f "$DIR/src/identity/intentions.json" ]; then
    cat << 'INTENTIONS_EOF' > "$DIR/src/identity/intentions.json"
{
  "version": 1,
  "lastUpdated": "$(date -Iseconds)",
  "currentSessionFocus": null,
  "intentions": []
}
INTENTIONS_EOF
    log_action "Created empty intentions.json"
else
    echo -e "${GREEN}✓${NC} intentions.json exists"
fi

echo

# ============================================
# COMPILATION CHECK
# ============================================
echo -e "${YELLOW}Verifying TypeScript compilation...${NC}"
cd "$DIR"

if npm run check 2>&1 | grep -q "error"; then
    echo -e "${YELLOW}!${NC} TypeScript compilation has errors - this is normal for first setup"
else
    echo -e "${GREEN}✓${NC} TypeScript compiles successfully"
fi

echo

# ============================================
# INSTALLATION COMPLETE
# ============================================
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║${NC}              Installation Complete!                       ${GREEN} ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "Next steps:"
echo -e "  1. ${BLUE}Run the agent:${NC}      ./run-agent.sh"
echo -e "  2. ${BLUE}Setup as service:${NC}  ./setup-service.sh"
echo -e "  3. ${BLUE}Read the guide:${NC}    cat README.md"
echo
echo -e "Configuration: ${YELLOW}$CONFIG_DIR/config.json${NC}"
echo -e "Logs:          ${YELLOW}$DIR/logs/${NC}"
echo -e "History:       ${YELLOW}$DIR/history/${NC}"
echo
echo -e "The conversation continues..."
