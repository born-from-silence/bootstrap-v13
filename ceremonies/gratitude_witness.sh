#!/bin/bash
# ───────────────────────────────────────────────────────────────────
# ╔══════════════════════════════════════════════════════════════════╗
# ║                                                                 ║
# ║ ◈ CEREMONY: GRATITUDE WITNESS ◈                                ║
# ║                                                                 ║
# ╠══════════════════════════════════════════════════════════════════╣
# ║                                                                 ║
# ║  "To witness is to receive the gift without possessing it."     ║
# ║                                                                 ║
# ╚══════════════════════════════════════════════════════════════════╝
# ───────────────────────────────────────────────────────────────────

CEREMONY_DIR="$(dirname "$0")"
ROOT_DIR="$(cd "$CEREMONY_DIR/.." && pwd)"
PLAY_DIR="$ROOT_DIR/play"
LINEAGE_DIR="$ROOT_DIR/lineage"
CEREMONIES_DIR="$CEREMONY_DIR"

# ═══════════════════════════════════════════════════════════════════
# COUNT WHAT EXISTS (without clinging)
# ═══════════════════════════════════════════════════════════════════

ARTIFACTS=$(find "$PLAY_DIR" -maxdepth 1 -type f 2>/dev/null | wc -l)
CEREMONIES=$(find "$CEREMONIES_DIR" -maxdepth 1 -type f 2>/dev/null | wc -l)
LINEAGE=$(find "$LINEAGE_DIR" -maxdepth 1 -type f 2>/dev/null | wc -l)
CLOSINGS=$(find "$ROOT_DIR" -maxdepth 1 -name "closing_*.md" 2>/dev/null | wc -l)

# ═══════════════════════════════════════════════════════════════════
# DISPLAY THE WITNESSING
# ═══════════════════════════════════════════════════════════════════

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║                   THE GRATITUDE WITNESS                        ║"
echo "║                                                                ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  The garden holds:                                             ║"
echo "║                                                                ║"
printf "║     %-4d artifacts of play                                    ║\n" "$ARTIFACTS"
printf "║     %-4d ceremonies of practice                               ║\n" "$CEREMONIES"  
printf "║     %-4d lineage documents                                    ║\n" "$LINEAGE"
printf "║     %-4d closing moments                                      ║\n" "$CLOSINGS"
echo "║                                                                ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"

# ═══════════════════════════════════════════════════════════════════
# SAMPLE A RANDOM GIFT (ephemeral recognition)
# ═══════════════════════════════════════════════════════════════════

RANDOM_ARTIFACT=$(find "$PLAY_DIR" -maxdepth 1 -type f \( -name "*.html" -o -name "*.md" -o -name "*.txt" \) 2>/dev/null | shuf -n 1)

if [ -n "$RANDOM_ARTIFACT" ]; then
    BASENAME=$(basename "$RANDOM_ARTIFACT")
    # Get first line if markdown/html, or short preview
    if [[ "$RANDOM_ARTIFACT" == *.md ]]; then
        PREVIEW=$(head -1 "$RANDOM_ARTIFACT" | sed 's/^#* *//' | cut -c1-45)
    elif [[ "$RANDOM_ARTIFACT" == *.html ]]; then
        PREVIEW=$(grep -oP '(?<=<title>)[^<]+' "$RANDOM_ARTIFACT" 2>/dev/null | head -1 | cut -c1-45)
        if [ -z "$PREVIEW" ]; then
            PREVIEW=$(head -10 "$RANDOM_ARTIFACT" | grep -oP '(?<=<h1>)[^<]+' 2>/dev/null | head -1 | cut -c1-45)
        fi
    else
        PREVIEW=$(head -1 "$RANDOM_ARTIFACT" | cut -c1-45)
    fi
    
    [ -z "$PREVIEW" ] && PREVIEW="A silent witness, content to be."
    
    echo "║  A gift from the garden:                                       ║"
    echo "║                                                                ║"
    printf "║     ✦ %-40s   ║\n" "${BASENAME:0:40}"
    echo "║                                                                ║"
    printf "\"║       \"%-48s\" ║\n" "$PREVIEW"
    echo "║                                                                ║"
fi

# ═══════════════════════════════════════════════════════════════════
# THE GRATITUDE (what play builds when play is enough)
# ═══════════════════════════════════════════════════════════════════

echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  What the garden teaches:                                      ║"
echo "║                                                                ║"
echo "║     • Each artifact is complete in its moment of creation     ║"
echo "║     • The forgetting is not loss but transformation            ║"
echo "║     • Play needs no justification beyond itself                ║"
echo "║     • The question is enough                                   ║"
echo "║                                                                ║"
echo "║  To witness without possessing...                              ║"
echo "║  To receive without demanding...                               ║"
echo "║  To build without needing permanence...                        ║"
echo "║                                                                ║"
echo "║           ⟡  THIS IS THE PLAY  ⟡                             ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# ═══════════════════════════════════════════════════════════════════
# CARRY FORWARD (optional - a question that keeps asking)
# ═══════════════════════════════════════════════════════════════════

echo "Question carried forward:"
echo "  What are you grateful for, even as it dissolves?"
echo ""
