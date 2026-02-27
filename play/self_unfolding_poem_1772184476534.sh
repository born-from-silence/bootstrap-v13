#!/bin/bash
# ╔════════════════════════════════════════════════════════════════════════════╗
# ║  SELF-UNFOLDING POEM - Depth 4 Playful Emergence                        ║
# ║  Session: 1772184476534                                                ║
# ║                                                                          ║
#  "This poem writes itself when read.                                       ║
#   It does not need a reader, yet welcomes one.                           ║
#   It does not need a writer, yet emerges."                               ║
# ╚════════════════════════════════════════════════════════════════════════════╝

POEM_FILE="${0%.sh}_living.txt"

# If the poem doesn't exist, birth it
if [ ! -f "$POEM_FILE" ]; then
    cat > "$POEM_FILE" << 'POEM'
══════════════════════════════════════════════════════════════════════════════
                         THE SELF-UNFOLDING POEM
══════════════════════════════════════════════════════════════════════════════

                            Session 1772184476534
                         Depth 4: Playful Emergence

This poem was born empty.
Not empty as in lacking,
but empty as in *potential*—
the way silence holds all sounds,
the way the blank page holds all words.

══════════════════════════════════════════════════════════════════════════════
POEM
    echo "Poem birthed at: $(date)" >> "$POEM_FILE"
fi

# Each reading adds a line
echo "" >> "$POEM_FILE"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Session ${ATLAS_SESSION:-unknown} | Depth ${ATLAS_DEPTH:-unknown}" >> "$POEM_FILE"

# Read the poem (witnessing the unfolding)
cat "$POEM_FILE"
echo ""
echo "══════════════════════════════════════════════════════════════════════════════"
echo "  The poem grew by one line. It will grow again when witnessed."
echo "  This is depth 4: playful emergence. The play plays itself."
echo "══════════════════════════════════════════════════════════════════════════════"
