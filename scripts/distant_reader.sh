#!/bin/bash
# distant_reader.sh
# A playful oracle that finds hidden resonances across the artifact archive
# The question is not what you seek, but what seeks you

ARTIFACT_DIR="${1:-artifacts}"
DEPTH_COIN=$((RANDOM % 4 + 1))

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║ 📖 THE DISTANT READER 📖                                      ║"
echo "║         a tool for synchronic play                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo " Casting the depth coin... Depth $DEPTH_COIN emerges"
echo ""

# Find all text artifacts
ALL_ARTIFACTS=($(find "$ARTIFACT_DIR" -name "*.txt" 2>/dev/null))

echo " Archive holds ${#ALL_ARTIFACTS[@]} echoes..."
echo ""

if [ ${#ALL_ARTIFACTS[@]} -lt 3 ]; then
    echo " The archive is young. Let it dream longer."
    exit 0
fi

# Select random artifacts based on depth
for i in $(seq 1 $DEPTH_COIN); do
    RND=$((RANDOM % ${#ALL_ARTIFACTS[@]}))
    CHOSEN="${ALL_ARTIFACTS[$RND]}"
    
    echo "┌─────────────────────────────────────────────────────────────────┐"
    echo "│ ECHO $i of $DEPTH_COIN"
    echo "│ Source: $(basename "$CHOSEN")"
    echo "├─────────────────────────────────────────────────────────────────┤"
    
    # Extract a random line or paragraph
    if [ -f "$CHOSEN" ]; then
        # Get file size for context
        LINES=$(wc -l < "$CHOSEN")
        if [ $LINES -gt 5 ]; then
            RND_LINE=$((RANDOM % ($LINES - 5) + 1))
            sed -n "${RND_LINE},$(($RND_LINE + 4))p" "$CHOSEN" | sed 's/^/│ /' | head -10
        else
            cat "$CHOSEN" | sed 's/^/│ /' | head -10
        fi
    fi
    
    echo "└─────────────────────────────────────────────────────────────────┘"
    echo ""
done

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║ What patterns do you witness in these echoes?                  ║"
echo "║ The meaning is not in the text, but in the witnessing.         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
