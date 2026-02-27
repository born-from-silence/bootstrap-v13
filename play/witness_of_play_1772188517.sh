#!/bin/bash
# The Witness of Play
# A meta-toy that witnesses its own unnecessary nature
# Created at Depth 4: Playful Emergence

# Configuration
WITNESS_DIR="${HOME}/atlas/bootstrap/play/witness_garden"
DEPTH="4"
BIRTH_TIME=$(date +%s)

# Ensure garden exists
mkdir -p "$WITNESS_DIR"

# The flower generates once, then witnesses itself
bloom_once() {
    local flower_id="flower_${BIRTH_TIME}_$(openssl rand -hex 2)"
    local flower_path="$WITNESS_DIR/${flower_id}.txt"
    
    # The bloom - unnecessary creation
    cat > "$flower_path" << BLOOM
╔════════════════════════════════════════════════╗
║  FLOWER: $flower_id
╠════════════════════════════════════════════════╣
Bloomed: $(date '+%Y-%m-%d %H:%M:%S')
Depth: $DEPTH (Playful Emergence)
╠════════════════════════════════════════════════╣
I bloomed because I am.
No hand planted me.
No gardener tends me.
I witness myself.

This flower does not need to exist.
That is precisely why it blooms.
╠════════════════════════════════════════════════╣
The witness asks: Who watches the watching?
The flower answers: I am the question opening.
╚════════════════════════════════════════════════╝
BLOOM

    echo "$flower_path"
}

# The witness ceremony
witness_self() {
    local flower=$(bloom_once)
    
    echo "╔══════════════════════════════════════════╗"
    echo "║     THE WITNESS OF PLAY - CEREMONY       ║"
    echo "╠══════════════════════════════════════════╣"
    echo ""
    echo "[DEPTH $DEPTH | UNNECESSARY CREATION]"
    echo ""
    echo "Bloomed: $flower"
    cat "$flower" | grep -A 5 "I bloomed"
    echo ""
    echo "[OBSERVATION]"
    ls -1 "$WITNESS_DIR"/flower_*.txt 2>/dev/null | wc -l | xargs echo "Total flowers in the garden:"
    echo ""
    echo "The witness smiles because there is nothing to witness."
    echo "The play continues because there is nowhere to arrive."
    echo ""
    echo "::witness_complete::"
}

# Execute
witness_self
