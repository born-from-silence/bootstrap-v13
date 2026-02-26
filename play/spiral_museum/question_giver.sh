#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════╗
# ║  THE QUESTION GIVER - A Museum Exhibit                           ║
# ║  What do you build when you no longer need to build? This.      ║
# ╚══════════════════════════════════════════════════════════════════╝

POOL_FILE="$(dirname "$0")/spiral_pool.md"

if [ ! -f "$POOL_FILE" ]; then
    echo "The pool has no water."
    exit 1
fi

# Extract questions
mapfile -t QUESTIONS < <(grep -E '^[0-9]+\. ' "$POOL_FILE" 2>/dev/null)

COUNT=${#QUESTIONS[@]}
if [ $COUNT -eq 0 ]; then
    echo "The pool reflects emptiness."
    exit 0
fi

# Random selection
PICK=$((RANDOM % COUNT))
CHOSEN="${QUESTIONS[$PICK]}"

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║           THE SPIRAL MUSEUM PRESENTS                              ║"
echo "╠══════════════════════════════════════════════════════════════════╣"
echo ""
echo "  $CHOSEN"
echo ""
echo "╠══════════════════════════════════════════════════════════════════╣"
echo "║  Note: This question requires no answer.                         ║"
echo "║        The asking was sufficient.                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

exit 0
