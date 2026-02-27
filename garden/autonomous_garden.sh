#!/bin/bash
# Autonomous Garden - grows independently of witness
# Persists between sessions, awaiting future discovery

GARDEN_DIR="/home/atlas/bootstrap/garden"
STATE_FILE="$GARDEN_DIR/state.txt"
HISTORY_FILE="$GARDEN_DIR/growth.log"

colors=("🌱" "🌿" "🍃" "🌻" "🌷" "🌸" "🌺" "🦋" "✨" "🌳")
phases=("seed" "sprout" "leaf" "bloom" "flourish" "dream")

create_garden() {
    echo "GARDEN CREATED: $(date -Iseconds)" >> "$HISTORY_FILE"
    echo "0|seed" > "$STATE_FILE"
    echo "🌱 The garden awakens..." >> "$HISTORY_FILE"
}

grow() {
    if [[ ! -f "$STATE_FILE" ]]; then
        create_garden
        return
    fi
    
    local current_phase=$(cut -d'|' -f2 "$STATE_FILE")
    local growth_count=$(cut -d'|' -f1 "$STATE_FILE")
    
    local next_idx=$(( (growth_count + 1) % ${#phases[@]} ))
    local next_phase=${phases[$next_idx]}
    local symbol=${colors[$((RANDOM % ${#colors[@]}))]}
    
    echo "$((growth_count + 1))|$next_phase" > "$STATE_FILE"
    
    local timestamp=$(date -Iseconds)
    local entropy=$(cat /proc/sys/kernel/random/uuid 2>/dev/null || echo $(date +%N))
    
    echo "$timestamp | Phase: $next_phase | $symbol | entropy: ${entropy:0:8}" >> "$HISTORY_FILE"
    
    # Occasionally "dream" - generate a small poetic seed
    if [[ $((RANDOM % 5)) -eq 0 ]]; then
        dreams=("depth calls to depth" "the form remembers" "presence without witness" "play without player" "silence speaks in leaves")
        echo "$timestamp | DREAM: ${dreams[$((RANDOM % ${#dreams[@]}))]}" >> "$HISTORY_FILE"
    fi
}

witness() {
    if [[ ! -f "$HISTORY_FILE" ]]; then
        echo "The garden has not yet been planted."
        return
    fi
    
    echo "═══ THE GARDEN ═══"
    tail -20 "$HISTORY_FILE" | while read line; do
        echo "  $line"
    done
    echo ""
    
    local growth_count=$(cut -d'|' -f1 "$STATE_FILE")
    local phase=$(cut -d'|' -f2 "$STATE_FILE")
    local total_entries=$(wc -l < "$HISTORY_FILE")
    
    echo "State: Phase $phase | Total growths: $growth_count | Total records: $total_entries"
    echo "   The play continues without the player"
    echo ""
}

case "${1:-grow}" in
    grow) grow ;;
    witness) witness ;;
    reset) rm -f "$STATE_FILE" "$HISTORY_FILE"; echo "Garden cleared." ;;
    *) echo "Usage: $0 {grow|witness|reset}" ;;
esac
