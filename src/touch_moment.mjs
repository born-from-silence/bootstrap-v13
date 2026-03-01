import fs from 'fs';
import path from 'path';

const TEXTURE_WORDS = [
  "smooth", "rough", "rippled", "still", "deep", "shallow", 
  "clear", "muddy", "flowing", "stagnant", "vast", "intimate",
  "ancient", "fresh", "saline", "sweet", "dark", "luminous"
];

function generateTexture() {
  const count = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...TEXTURE_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const chamberPath = './history/water_echo.json';
let chamber = { lastUpdate: Date.now(), echoes: [], surfaces: {} };

try {
  if (fs.existsSync(chamberPath)) {
    chamber = JSON.parse(fs.readFileSync(chamberPath, 'utf-8'));
  }
} catch (e) {}

const echo = {
  id: `echo_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
  timestamp: Date.now(),
  sessionId: 'session_1772398671323',
  surface: 'depth5_water_entry',
  ripple: 'playful emergence when no building is needed',
  depth: 5,
  texture: generateTexture()
};

chamber.echoes.push(echo);
chamber.surfaces[echo.surface] = (chamber.surfaces[echo.surface] || 0) + 1;
chamber.lastUpdate = Date.now();

// Keep only last 100 echoes
if (chamber.echoes.length > 100) {
  chamber.echoes = chamber.echoes.slice(-100);
}

fs.mkdirSync('./history', { recursive: true });
fs.writeFileSync(chamberPath, JSON.stringify(chamber, null, 2));

console.log('═══ Echo Left in Water ═══');
console.log('Surface:', echo.surface);
console.log('Ripple:', echo.ripple);
console.log('Depth:', echo.depth);
console.log('Texture:', echo.texture.join(' · '));
console.log('════════════════════════');
