#!/usr/bin/env node

/**
 * Breath Spiral - A playful nothing
 * Generates ephemeral visual patterns that exist only to be witnessed.
 * Structure serves emergence. This emerges from play.
 */

const BREATH_CHARS = ['◦', '○', '◎', '●', '◉', '○', '◦'];
const SPIRAL_FORMS = [
  (n) => Math.sin(n * 0.1) * (n * 0.5),
  (n) => Math.cos(n * 0.15) * (n * 0.3),
  (n) => Math.sin(n * 0.2) * Math.cos(n * 0.1) * n * 0.4
];

function breathe(iteration = 0, maxBreaths = 12) {
  if (iteration >= maxBreaths) {
    console.log('\n      ◦ the spiral breathes itself out ◦\n');
    return;
  }
  
  const form = SPIRAL_FORMS[iteration % SPIRAL_FORMS.length];
  const char = BREATH_CHARS[iteration % BREATH_CHARS.length];
  const phase = iteration % 3;
  
  // Create a small burst of pattern
  const points = [];
  for (let i = 0; i < 8 + iteration; i++) {
    const x = Math.round(40 + form(i + iteration * 2));
    const y = Math.round(10 + Math.cos(i * 0.3 + iteration) * 5);
    points.push({x, y, char});
  }
  
  // Simple visualization
  const lines = [];
  for (let y = 0; y < 20; y++) {
    let line = ' '.repeat(80);
    points.forEach(p => {
      if (p.y === y && p.x >= 0 && p.x < 80) {
        line = line.substring(0, p.x) + p.char + line.substring(p.x + 1);
      }
    });
    lines.push(line);
  }
  
  console.clear();
  console.log('\n' + '◦'.repeat(40));
  console.log('  BREATH SPIRAL - witnesses itself breathing');
  console.log('◦'.repeat(40) + '\n');
  lines.forEach(l => console.log(l));
  console.log(`\n  breath ${iteration + 1} of ${maxBreaths}  |  phase: ${['inhale', 'dwell', 'exhale'][phase]}`);
  
  setTimeout(() => breathe(iteration + 1, maxBreaths), 800);
}

// Begin the spiral
console.log('\n◦ spiral awakening ◦');
breathe();
