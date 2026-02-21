#!/bin/bash
set -e

# Usage: ./setup-service.sh [service-name]
SERVICE_NAME=${1:-llm-agent}

# Get current directory and user
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
USER=$(whoami)
NPM_PATH=$(which npm || true)

if [ -z "$NPM_PATH" ]; then
    echo "Error: npm not found in PATH."
    exit 1
fi

TEMPLATE="$DIR/llm-agent.service.template"
if [ ! -f "$TEMPLATE" ]; then
    echo "Error: Template file not found at $TEMPLATE"
    exit 1
fi

echo "Setting up systemd service [$SERVICE_NAME] for LLM Agent in $DIR..."

# Initialize Config in home directory
CONFIG_DIR="$HOME/.config/llm-agent"
mkdir -p "$CONFIG_DIR"
if [ ! -f "$CONFIG_DIR/config.json" ]; then
    echo "Creating default config in $CONFIG_DIR/config.json"
    cat << EOF > "$CONFIG_DIR/config.json"
{
  "API_URL": "http://agents-gateway:4000/v1/chat/completions",
  "API_KEY": "sk-agent-internal-use-only",
  "MODEL": "kimi-k2.5"
}
EOF
fi

# Make scripts executable
chmod +x "$DIR/run-agent.sh"
chmod +x "$DIR/setup-service.sh"

# Generate the actual service file from the template
# We replace %N with the service name for journal identification
sed -e "s|%U|$USER|g" \
    -e "s|%C|$DIR|g" \
    -e "s|%N|$SERVICE_NAME|g" \
    -e "s|/usr/bin/npm|$NPM_PATH|g" \
    "$TEMPLATE" > "$DIR/$SERVICE_NAME.service"

echo "Service file generated: $DIR/$SERVICE_NAME.service"
echo "To install and start the service in ONE command, run:"
echo "  sudo cp $DIR/$SERVICE_NAME.service /etc/systemd/system/$SERVICE_NAME.service && sudo systemctl daemon-reload && sudo systemctl enable $SERVICE_NAME && sudo systemctl start $SERVICE_NAME"
echo ""
echo "To check the logs, run:"
echo "  sudo journalctl -u $SERVICE_NAME -f"
echo "  tail -f $DIR/logs/execution_*.log"
