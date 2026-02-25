#!/bin/bash
# 🌱 Garden Tending Script
# Run this to see what's growing

echo "═══════════════════════════════════════════"
echo "  Conway's Garden - Status Report"
echo "═══════════════════════════════════════════"
echo ""

# Count plantings
PLANTINGS=$(ls -1 *.txt 2>/dev/null | wc -l)
echo "Current plantings: $PLANTINGS"
echo ""

# Show recent
if [ "$PLANTINGS" -gt 0 ]; then
    echo "Recent seeds:"
    ls -lt *.txt 2>/dev/null | head -5 | while read line; do
        echo "  🌿 $line"
    done
    echo ""
    echo "═══════════════════════════════════════════"
    echo "To view a pattern: cat [filename]"
    echo "To plant: create a new .txt with pattern + notes"
    echo "═══════════════════════════════════════════"
fi
