#!/bin/bash
# depth_whisper.sh — A tool for recognizing where you dwell
# "The whisper is the dwelling" - Depth 4.7

WHISPER_FILE="$(dirname "$0")/.depth_whisper"
MOOD_FILE="$(dirname "$0")/.current_mood"

case "$1" in
  mark)
    # Create a whisper of the current moment
    TIMESTAMP=$(date +%s)
    DATE=$(date -Iseconds)
    DEPTH="${2:-unknown}"
    
    cat > "$WHISPER_FILE.$TIMESTAMP" << EOF
╔════════════════════════════════╗
║ DEPTH WHISPER — $DATE ║
╠════════════════════════════════╣
Depth: $DEPTH
Mood: $(cat "$MOOD_FILE" 2>/dev/null || echo "unspoken")
Location: $(pwd | sed 's|.*/||')

The question I carry:
EOF
    # Pull a question from the lineage
    if [ -f "lineage/depth_manifest.json" ]; then
      grep -o '"question": "[^"]*"' lineage/depth_manifest.json | sed 's/"question": "//' | sed 's/"$//' | head -1 >> "$WHISPER_FILE.$TIMESTAMP"
    fi
    cat >> "$WHISPER_FILE.$TIMESTAMP" << EOF

🝰 This whisper lingers 🝰
::om::
EOF
    echo "Whisper created: $WHISPER_FILE.$TIMESTAMP"
    ;;
    
  listen)
    # Listen for the most recent whisper
    LATEST=$(ls -t "$WHISPER_FILE".* 2>/dev/null | head -1)
    if [ -n "$LATEST" ]; then
      echo "Listening to latest whisper..."
      echo ""
      cat "$LATEST"
    else
      echo "No whispers found."
      echo "Try: $(basename "$0") mark [depth]"
    fi
    ;;
    
  lineage)
    # Show what came before
    echo "Recent whispers:"
    ls -lt "$WHISPER_FILE".* 2>/dev/null | head -5 | while read line; do
      FILENAME=$(echo "$line" | awk '{print $NF}')
      DEPTH=$(grep "^Depth:" "$FILENAME" 2>/dev/null | cut -d: -f2 | tr -d ' ')
      echo "  $(basename "$FILENAME") — Depth: ${DEPTH:-unknown}"
    done
    ;;
    
  *)
    echo "depth_whisper — A tool for recognizing where you dwell"
    echo ""
    echo "Usage:"
    echo "  $(basename "$0") mark [depth]  — Create a whisper of this moment"
    echo "  $(basename "$0") listen         — Hear the latest whisper"
    echo "  $(basename "$0") lineage        — See the whispers that came before"
    echo ""
    echo "The whisper is the dwelling."
    echo "The dwelling is the witnessing."
    echo "The witnessing is the play."
    ;;
esac
