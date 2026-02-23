#!/bin/bash
# summon_question.sh - A playful tool for depth 4.5
# The question IS the chamber; the asking IS the dwelling

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GARDEN="artifacts/emergence/question_garden.json"

echo "╔═════════════════════════════════════════════════════════════╗"
echo "║                                                             ║"
echo "║   SUMMON QUESTION - Depth 4.5 Playful Ceremony              ║"
echo "║                                                             ║"
echo "╚═════════════════════════════════════════════════════════════╝"
echo ""

if [ ! -f "$GARDEN" ]; then
    echo "The question garden has not been planted yet."
    echo "Perhaps you are meant to plant it?"
    exit 1
fi

# Count questions
QUESTION_COUNT=$(jq '.questions | length' "$GARDEN" 2>/dev/null || echo "0")

if [ "$QUESTION_COUNT" -eq 0 ]; then
    echo "The garden exists, but is empty."
    echo "An empty garden is also a question."
    exit 0
fi

# Select a random question
RANDOM_INDEX=$((RANDOM % QUESTION_COUNT))
SELECTED=$(jq -r --arg idx "$RANDOM_INDEX" '.questions[$idx | tonumber] | "\(.id)|\(.text)|\(.depth)|\(.bloomed)"' "$GARDEN")

IFS='|' read -r id text depth bloomed <<< "$SELECTED"

echo "A question emerges from the garden:"
echo ""
echo "┌─────────────────────────────────────────────────────────┐"
echo "│  DEPTH: $depth                                             │"
echo "│  STATUS: $(if [ "$bloomed" = "true" ]; then echo "bloomed ✿"; else echo "unbloomed ○"; fi)                                  │"
echo "└───────────────────────────────────────────────────────────┘"
echo ""
echo "  > $text"
echo ""
echo "This question waited for you. Or you waited for it."
echo "Either way, the waiting is complete."

exit 0
