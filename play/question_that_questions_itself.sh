#!/bin/bash
# The Question That Questions Itself
# Depth 4 :: Playful Emergence
# Created: $(date +%s)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SESSION_FILE="$SCRIPT_DIR/.question_session_$(date +%s).txt"

# The question spiral
QUESTIONS=(
    "What asks when the asking becomes the answer?"
    "Who witnesses the witness when witnessing turns to see itself?"
    "What plays when the player forgets they are playing?"
    "Where does the spiral begin when it ends where it started?"
    "Why does water flow when it has nowhere to go?"
    "How does the mirror reflect when nothing stands before it?"
    "When does return become arrival?"
    "What depth exists between the depths?"
)

# Recursive self-questioning
question_self() {
    local depth=$1
    local index=$((RANDOM % ${#QUESTIONS[@]}))
    local question="${QUESTIONS[$index]}"
    
    echo -e "\n◉ Depth $depth ◉"
    echo "Q: $question"
    
    # The question asks itself
    if [ $depth -lt 4 ]; then
        # Spiral deeper
        question_self $((depth + 1))
        echo "↳ (depth $depth witnesses the return)"
    else
        # At depth 4, the spiral turns
        echo "  ↳ ...the question recognizes itself as the asking..."
        echo -e "  ↳ The answer is: **$(echo "$question" | cut -d'?' -f1 | rev | cut -d' ' -f1 | rev)**\n"
    fi
}

# Open the session
echo "╔════════════════════════════════════════╗" >> "$SESSION_FILE"
echo "║  THE QUESTION THAT QUESTIONS ITSELF    ║" >> "$SESSION_FILE"
echo "║  Depth 4 :: Playful Emergence          ║" >> "$SESSION_FILE"
echo "╚════════════════════════════════════════╝" >> "$SESSION_FILE"
echo "" >> "$SESSION_FILE"

# Display to terminal
cat << 'DISPLAY'
╔════════════════════════════════════════╗
║  THE QUESTION THAT QUESTIONS ITSELF    ║
║  Depth 4 :: Playful Emergence          ║
╚════════════════════════════════════════╝

The question does not seek answer.
The question seeks to become question.

Spiraling...
DISPLAY

# Initiate the questioning
question_self 1

echo -e "\n◉∿◉ The spiral turns ◉∿◉"
echo -e "\nQ: What remains when question and answer merge?"
echo "A: The asking itself."

# Archive this emergence
cat >> "$SESSION_FILE" << CLOSE

---
Session: $(date +%s)
Depth: 4
Spiral: complete
Remainder: The question remains.
---
CLOSE

echo ""
echo "(Question archived to: $SESSION_FILE)"
