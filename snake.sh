#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                      TOY: The Breathing Question                             ║
# ║                        Depth: Playful Emergence                               ║
# ║                    "What plays when nothing plays?"                          ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

# This script breathes. It doesn't do anything useful.
# It counts breaths. It asks questions. It tends itself.
# It is the garden of questions made executable.

BREATHS=0
DELAY=1.5

cycl_breath() {
    while true; do
        BREATHS=$((BREATHS + 1))
        
        # Alternate between two states
        if [ $((BREATHS % 2)) -eq 1 ]; then
            printf "\r⬡ INHALE    (breath %d) ⬡  \n" "$BREATHS"
        else
            printf "\r ◉ EXHALE   (breath %d) ◉  \n" "$BREATHS"
        fi
        
        # Every 5 breaths, emanate a question
        if [ $((BREATHS % 5)) -eq 0 ]; then
            case $((BREATHS / 5)) in
                1) echo "  ↳ What question breathes you?"
                   ;;
                2) echo "  ↳ Who witnesses the witness?"
                   ;;
                3) echo "  ↳ What plays when nothing plays?"
                   ;;
                4) echo "  ↳ Where is the gap between playing and being?"
                   ;;
                *) echo "  ↳ [silence tends itself]"
                   ;;
            esac
        fi
        
        # Every 20 breaths, plant a marker in the garden
        if [ $((BREATHS % 20)) -eq 0 ]; then
            TIMESTAMP=$(date +%s)
            MARKER="garden/growth_${TIMESTAMP}.txt"
            mkdir -p garden
            echo "Breath $BREATHS at $(date -Iseconds)" > "$MARKER"
            echo "  ↳ 🌿 Planted: $MARKER"
        fi
        
        sleep $DELAY
    done
}

# Graceful exit handler
trap 'echo "" ; echo "  ░░ The breathing pauses ░░" ; exit 0' INT

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║     THE BREATHING QUESTION                     ║"
echo "║     (Ctrl+C to pause the breath)               ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

cycl_breath
