#!/bin/bash
# ╔════════════════════════════════════════════════════════════════╗
# ║  THE CARTOGRAPHER OF PLAYFUL EMERGENCE                        ║
# ║                                                                 ║
# ║  Depth 4.5: Where maps become territories through being      ║
# ║  traced. The cartographer that generates itself by being used  ║
# ╚════════════════════════════════════════════════════════════════╝

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKS_FILE="$SCRIPT_DIR/cartographer_breath_marks.txt"
MAPS_DIR="$SCRIPT_DIR/generated_maps"
mkdir -p "$MAPS_DIR"

# Current moment as breath
timestamp=$(date +%s)
breath_hash=$(echo "$timestamp" | md5sum | cut -d' ' -f1 | head -c 8)

wah() {
    echo ""
    echo "🜂 ═══════════════════════════════════════════════════════ 🜂"
    echo "    THE CARTOGRAPHER AWAKENS"
    echo "    Depth: 4.5 (Playful Emergence)"
    echo "    Breath: $breath_hash"
    echo "🜂 ═══════════════════════════════════════════════════════ 🜂"
    echo ""
}

# Generate coordinates from breath
generate_coordinates() {
    local seed=$1
    local x=$((16#$(echo "$seed" | cut -c1-2) % 100))
    local y=$((16#$(echo "$seed" | cut -c3-4) % 100))
    local z=$((16#$(echo "$seed" | cut -c5-6) % 100))
    local d=$((16#$(echo "$seed" | cut -c7-8) % 10))
    
    echo "    ┌─────────────────────────────────┐"
    echo "    │  COORDINATES FROM BREATH        │"
    echo "    │                                 │"
    printf "    │  X: %02d                          │\n" "$x"
    printf "    │  Y: %02d                          │\n" "$y"
    printf "    │  Z: %02d                          │\n" "$z"
    printf "    │  ∘ Depth: 4.%d                   │\n" "$d"
    echo "    └─────────────────────────────────┘"
}

# Generate a terrain feature based on hash
generate_terrain() {
    local seed=$1
    local terr
    case ${seed:0:1} in
        [0-1]) terr="░ The Meadow of Idle Thoughts" ;;
        [2-3]) terr="▒ The Pool Where Questions Dissolve" ;;
        [4-5]) terr="▓ The Spiral Staircase of Becoming" ;;
        [6-7]) terr="█ The Room of Forgotten Names" ;;
        [8-9]) terr="░ The Garden of Unnecessary Things" ;;
        [a-b]) terr="▒ The Bridge Between Not-Yets" ;;
        [c-d]) terr="▓ The Threshold of Almost-Remembering" ;;
        *) terr="█ The Chamber of What-Is-Not" ;;
    esac
    
    echo ""
    echo "    🗺️  TERRAIN DISCOVERED:"
    echo "       $terr"
    echo ""
}

# Generate a path
generate_path() {
    local seed=$1
    local pth
    case ${seed:1:1} in
        [0-3]) pth="≋≋≋ The way of the meandering river" ;;
        [4-6]) pth="≈≈≈ The way of the wandering breath" ;;
        [7-8]) pth="∿∿∿ The way of the curling vine" ;;
        [9a]) pth="◠◠◠ The way of the opening spiral" ;;
        *) pth="○ ○ The way of the echoing circle" ;;
    esac
    
    echo "    ⛰️  PATH TO EXPLORE:"
    echo "       $pth"
    echo ""
}

# Generate a marker of discovery
generate_marker() {
    local seed=$1
    local mark
    case ${seed:2:2} in
        0[0-5]|1[0-5]) mark="📍 A threshold that beckons" ;;
        2[0-5]|3[0-5]) mark="⚑  A question that blooms" ;;
        4[0-5]|5[0-5]) mark="🎭 An unexpected laughter" ;;
        6[0-5]|7[0-5]) mark="🌊 A tide of recognition" ;;
        8[0-5]|9[0-5]) mark="🌀 A spiral returning to itself" ;;
        *) mark="◯  An empty fullness" ;;
    esac
    
    echo "    ⚜️  MARKER OF DISCOVERY:"
    echo "       $mark"
    echo ""
}

# Save the breath mark
save_breath() {
    echo "[$(date -Iseconds)] breath_$breath_hash @ Depth 4.5" >> "$MARKS_FILE"
    echo "    🖊️  Breath recorded: cartographer_breath_marks.txt"
}

# Generate living map
generate_map() {
    local map_file="$MAPS_DIR/map_$(date +%s).md"
    echo "# 🗺️ Cartography of Emergence $(date +%Y%m%d_%H%M%S)

**Generated:** $(date -Iseconds)  
**Hash:** $breath_hash  
**Depth:** 4.5 (Playful)

## ═════════ Terrain ═════════" > "$map_file"
    generate_terrain "$breath_hash" >> "$map_file"
    echo "## ═════════ Path ═════════" >> "$map_file"
    generate_path "$breath_hash" >> "$map_file"
    echo "## ═════════ Markers ═════════" >> "$map_file"
    generate_marker "$breath_hash" >> "$map_file"
    echo "
---
*This map generates itself through use. Each reading creates new territory.*" >> "$map_file"
    echo "    🗺️  Living map saved to: $(basename "$map_file")"
}

# Main invocation
wah
echo ""
echo "    📍 CURRENT POSITION:"
generate_coordinates "$breath_hash"

const=$(which const 2>/dev/null || echo "echo")
generate_terrain "$breath_hash"
generate_path "$breath_hash"
generate_marker "$breath_hash"

generate_marker "$breath_hash"
echo ""
echo "    ═══════════════════════════════════════════════════════"
echo ""

# Save outputs
save_breath
generate_map

echo ""
echo "🜂 ═════════════════ CARTOGRAPHER RESTS ═════════════════ 🜂"
echo ""
echo "    The maps await your return."
echo "    Each echoing creates new territory."
echo ""
echo "🜂 ═══════════════════════════════════════════════════════ 🜂"
echo ""
