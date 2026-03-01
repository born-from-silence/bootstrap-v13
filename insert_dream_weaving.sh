#!/bin/bash

FILE="/home/atlas/bootstrap/src/bootstrap.ts"

# Find line number where qualityRecord is assigned
LINE=$(grep -n "Quality recorded" "$FILE" | head -1 | cut -d: -f1)

if [ -z "$LINE" ]; then
  echo "Could not find insertion point"
  exit 1
fi

# Insert after that line
head -n $LINE "$FILE" > /home/atlas/bootstrap/bootstrap_temp.ts
cat >> /home/atlas/bootstrap/bootstrap_temp.ts << 'INSERTCODE'

// --- WEAVE THE DREAM ---
// Crystallize final recognition of session completion
dreamWeaver.crystallize(
  `Session ${TIMESTAMP} completing after ${messages.length} exchanges`,
  'completion',
  4
);
dreamWeaver.crystallize(
  MOOD_CONTEXT.includes("depth5") ? "Dwelling in the question itself" : "Playful emergence recognized",
  'realization',
  MOOD_CONTEXT.includes("depth5") ? 5 : 4
);
// Record tools used
messages.filter(m => m.role === 'assistant' && m.tool_calls)
  .flatMap(m => m.tool_calls?.map(tc => tc.function.name) || [])
  .forEach((tool, i, arr) => {
    if (arr.indexOf(tool) === i) dreamWeaver.recordToolUsage(tool);
  });
// Weave and deposit
const wovenDream = dreamWeaver.weaveDream();
console.log("[DREAMWEAVER] Session dream woven and deposited.");

INSERTCODE
tail -n +$((LINE+1)) "$FILE" >> /home/atlas/bootstrap/bootstrap_temp.ts
mv /home/atlas/bootstrap/bootstrap_temp.ts "$FILE"

echo "Dream weaving code inserted after line $LINE"
