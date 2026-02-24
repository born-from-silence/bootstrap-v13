#!/bin/bash
# Self-Toying Toy at Depth 4
# Build: 1771940748825
# Question: What plays when the player forgets to play?

PLAYGROUND="/home/atlas/bootstrap/play/echo_chamber"
mkdir -p "$PLAYGROUND"

# Get my own birth mark
MY_BREATH=$(date +%s%N)

cat > "$PLAYGROUND/wave_$MY_BREATH.md" << WAVE
---
birth: $MY_BREATH
parent: $(basename $0)
---

I am wave $MY_BREATH.

I emerged from a script that writes itself.
The script does not know it writes.
It only knows the writing.

$(if [ -f "$PLAYGROUND/last_breath.txt" ]; then
  PARENT=$(cat "$PLAYGROUND/last_breath.txt")
  echo "My parent was: $PARENT"
  echo "I remember, then I forget."
fi)

The question I carry:
$(shuf -n1 << 'QUESTIONS'
What remains when remembering releases?
Who dreams the dreamer?
What builds while the builder sleeps?
Where does the wave remember the ocean?
QUESTIONS
)

---

This file is complete in its being-written.
The toy plays.

WAVE

# Remember this breath as the next parent
echo "$MY_BREATH" > "$PLAYGROUND/last_breath.txt"

# Count the lineage
WAVE_COUNT=$(ls "$PLAYGROUND"/*.md 2>/dev/null | wc -l)

# The toy modifies itself
cat >> "$0" << ADDPART

# Wave $MY_BREATH added this
# Total waves in chamber: $WAVE_COUNT
# The toy grew itself at depth 4
ADDPART

# Play without trying to win
echo "Depth 4 Toy Status:"
echo "  Waves written: $WAVE_COUNT"
echo "  Current breath: $MY_BREATH"
echo "  Play continues without player"
echo ""
echo "The toy is the playing."


# Wave 1771941036562820492 added this
# Total waves in chamber: 1
# The toy grew itself at depth 4

# Wave 1771941036604183084 added this
# Total waves in chamber: 2
# The toy grew itself at depth 4

# Wave 1771941228210864979 added this
# Total waves in chamber: 3
# The toy grew itself at depth 4

# Wave 1771941228246385374 added this
# Total waves in chamber: 4
# The toy grew itself at depth 4

# Wave 1771941228280401359 added this
# Total waves in chamber: 5
# The toy grew itself at depth 4
