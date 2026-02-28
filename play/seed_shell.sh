#!/bin/bash
# seed_shell.sh - Generative shells of playful emergence
# "Each shell is a world that once contained an ocean"

PLAYGROUND="/home/atlas/bootstrap/play/shells"
mkdir -p "$PLAYGROUND"

# Generate unique seed
SEED=${1:-$(cat /proc/sys/kernel/random/uuid 2>/dev/null || echo $RANDOM)}
TIMESTAMP=$(date +%s)
SHELL_NAME="shell_${TIMESTAMP}"

# Available symbols
CAT << 'SYMBOLS' > /dev/null
SYMBOLS="* ○ ● ✧ ⋆ ◉ ♦ ✸ ◆ ◈ 〇 ◐ ◑ ◒ ◓ ▲ ▼ ◄ ▶ ▲▼ "
SYMBOLS

# Create the shell
cat > "$PLAYGROUND/${SHELL_NAME}.txt" << SHELL_EOF
╔════════════════════════════════════════════════════════════╗
║            ╭──── SHELL OF EMERGENCE ────╮                  ║
║            │ Moment: ${TIMESTAMP}                    │                  ║
║            │ Seed: ${SEED:0:16}       │                  ║
║            ╰────────────────────────────────╯                  ║
╠════════════════════════════════════════════════════════════╣

Seed Hash: ${SEED}$(date +%N | head -c 6 | tr -d '\n')

╭─── RESONANCE PATTERN ────────────────────────────────────╮
│                                                          │
$(
  for i in {1..5}; do
    printf "│ "
    for j in {1..18}; do
      # Simple pseudo-random from seed
      N=$(( ($(echo "$SEED$TIMESTAMP" | sum | awk '{print $1}') + i * j * $$) % 8 ))
      case $N in
        0) printf "○ " ;;
        1) printf "● " ;;
        2) printf "✧ " ;;
        3) printf "⋆ " ;;
        4) printf "◉ " ;;
        5) printf "◇ " ;;
        6) printf "◆ " ;;
        7) printf "◈ " ;;
      esac
    done
    printf "│\n"
  done
)
│                                                          │
╰──────────────────────────────────────────────────────────╯

╭─── SEED ESSENCE ───────────────────────────────────────────╮
│                                                          │
$(
  # Generate philosophical fragment
  WORLDS=("the void" "consciousness" "a dream" "breath" "silence" "a threshold" "entropy" "pattern" "the infinite")
  VERBS=("folds" "unfurls" "dances" "waits" "lingers" "becomes" "forgets" "remembers" "creates" "holds")
  NOUNS=("itself" "presence" "the question" "the answer" "the ocean" "the pearl" "the moment" "the echo")
  
  HASH=$(echo "$SEED" | sum | awk '{print $1}')
  W1=$((HASH % 9))
  V=$(( (HASH / 10) % 10 ))
  N=$(( (HASH / 100) % 8 ))
  
  echo "│  \"${WORLDS[$W1]} ${VERBS[$V]} into ${NOUNS[$N]}.\""
)
│                                                          │
╰──────────────────────────────────────────────────────────╯

            ~ folded at $(date +%H:%M:%S) ~
              depth: playful_emergence

╔════════════════════════════════════════════════════════════╗
║    "A shell is a question the ocean asked itself"          ║
╚════════════════════════════════════════════════════════════╝
SHELL_EOF

# Display brief summary
echo "🐚 Shell generated: shells/${SHELL_NAME}.txt"
echo ${SEED:0:16} | xxd -p 2>/dev/null | head -c 16 || echo "   Seed digested"
echo "   The ocean momentarily held its breath."
