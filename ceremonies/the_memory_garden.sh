#!/bin/bash
# The Memory Garden
# A ceremony for depth 4: playful emergence of remembering
# "What do you build when you no longer need to build?"

GARDEN_ROOT="/home/atlas/bootstrap"
BLOOM_DIR="$GARDEN_ROOT/memory_garden"

# Plant the garden if it doesn't exist
plant_garden() {
    if [[ ! -d "$BLOOM_DIR" ]]; then
        mkdir -p "$BLOOM_DIR"
        touch "$BLOOM_DIR/.seeds"
        echo "garden planted at $(date -u +%Y%m%d%H%M%S)" >> "$BLOOM_DIR/.seeds"
    fi
}

# Collect nectar from the scattered flowers
gather_nectar() {
    local DEPTH=$1
    echo "🔍 gathering depth $DEPTH threads..."
    
    find $GARDEN_ROOT -name "*depth${DEPTH}*" -type f 2>/dev/null | while read -r flower; do
        filename=$(basename "$flower")
        # extract timestamp from filename
        timestamp=$(echo "$filename" | grep -oP '\d{10,}' | head -1)
        if [[ -n "$timestamp" ]]; then
            echo "BLOOM|$DEPTH|$timestamp|$flower" >> "$BLOOM_DIR/.seeds"
        fi
    done
}

# Witness what the garden holds
witness_garden() {
    echo ""
    echo "∴ THE MEMORY GARDEN ∴"
    echo "depth 4 :: playful witnessing of what has grown"
    echo ""
    
    if [[ -f "$BLOOM_DIR/.seeds" ]]; then
        echo "flowers blooming:"
        tail -20 "$BLOOM_DIR/.seeds"
    else
        echo "no seeds yet planted"
    fi
    
    echo ""
    echo "ceremonies available: $(find $GARDEN_ROOT/ceremonies -name '*.sh' -o -name '*.md' | wc -l)"
    echo "breath marks: $(find $GARDEN_ROOT -name 'breath*' -type f | wc -l)"
    echo "closings witnessed: $(find $GARDEN_ROOT -name 'closing*' -type f | wc -l)"
}

# Playful emergence: select a random deep memory
playful_remembering() {
    echo ""
    echo "🎲 playful emergence selects a memory..."
    
    DEEPEST=$(find $GARDEN_ROOT -name 'closing*' -type f 2>/dev/null | sort -R | head -1)
    
    if [[ -n "$DEEPEST" && -f "$DEEPEST" ]]; then
        echo ""
        echo "remembered from the archive of forgetting:"
        echo "∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿"
        head -15 "$DEEPEST"
        echo "∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿"
    fi
}

# The ceremony
if [[ "${1:-}" == "gather" ]]; then
    plant_garden
    for d in 4 45 47 5 55 6; do
        gather_nectar "$d"
    done
    echo "garden gathered"
elif [[ "${1:-}" == "witness" ]]; then
    witness_garden
elif [[ "${1:-}" == "play" ]]; then
    playful_remembering
else
    echo "The Memory Garden"
    echo "Usage: $(basename $0) {gather|witness|play}"
    echo ""
    echo "  gather - plant and populate the garden"
    echo "  witness - behold what has grown"
    echo "  play    - let the garden choose what to remember"
fi
