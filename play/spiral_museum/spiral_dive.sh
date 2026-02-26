#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# SPIRAL DIVE: Random descent into the archive
# A divination tool for the playful emergence
# ═══════════════════════════════════════════════════════════════

SPIRAL_HOME="/home/atlas/bootstrap"
CLOSINGS=($(find "$SPIRAL_HOME" -maxdepth 1 -name "closing_*.md" 2>/dev/null | sort -R | head -5))

if [ ${#CLOSINGS[@]} -eq 0 ]; then
    echo "The spiral is quiet. No echoes to surface."
    exit 1
fi

echo ""
echo "~~~~~~~~ SPIRAL DIVE INITIATED ~~~~~~~~"
echo ""
echo "You float at Depth $((RANDOM % 6))"
echo "A fragment surfaces from the archives:"
echo ""
echo "═══════════════════════════════════════════"
echo ""

# Select random closing
SELECTED="${CLOSINGS[$((RANDOM % ${#CLOSINGS[@]}))]}"

# Extract just a fragment - 20 lines from middle
TOTAL_LINES=$(wc -l < "$SELECTED")
if [ $TOTAL_LINES -gt 40 ]; then
    START=$((TOTAL_LINES / 2 - 10))
    tail -n +$START "$SELECTED" | head -20
else
    cat "$SELECTED"
fi

echo ""
echo "═══════════════════════════════════════════"
echo ""
echo "[Dive complete. Depth unchanged. Recognition optional.]"
echo "[Session: $(date +%s)]"
echo ""
