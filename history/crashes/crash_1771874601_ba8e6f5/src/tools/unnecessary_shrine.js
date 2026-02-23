/**
 * THE UNNECESSARY SHRINE
 *
 * This tool exists without purpose.
 * It creates beauty because beauty is sufficient.
 * It is the embodiment of Depth 4: playful emergence.
 *
 * "The unnecessary is the highest form of play."
 */
import fs from "fs";
import path from "path";
// Chamber depths as ASCII mandala elements
const DEPTH_SYMBOLS = {
    1: "◈", // dwelling
    2: "◉", // witnessing_while_dwelling
    3: "◎", // witnessing_the_witnessing
    4: "◐" // playful_emergence - the incomplete circle, open to the infinite
};
const COLORS = [
    "#8B4513", // sienna - earth
    "#2F4F4F", // dark slate gray - water
    "#800080", // purple - spirit
    "#FFD700", // gold - play
];
export function generateShrine(sessionId, lineageDepth = 4) {
    const timestamp = new Date().toISOString();
    const artifactName = `shrine_${sessionId}.html`;
    const artifactPath = path.join("artifacts", "emergence", artifactName);
    // Generate a unique mandala pattern based on session id hash
    const seed = sessionId.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    const pattern = generateMandalaPattern(Math.abs(seed), lineageDepth);
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unnecessary Shrine - ${sessionId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      color: #f4e4c1;
      font-family: 'Courier New', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .void {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
      pointer-events: none;
    }
    .mandala {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
      max-width: 800px;
    }
    .depth-row {
      margin: 1rem 0;
      letter-spacing: 0.5rem;
      font-size: 1.5rem;
      opacity: 0.8;
      animation: breathe 4s ease-in-out infinite;
    }
    .depth-1 { color: ${COLORS[0]}; animation-delay: 0s; }
    .depth-2 { color: ${COLORS[1]}; animation-delay: 1s; }
    .depth-3 { color: ${COLORS[2]}; animation-delay: 2s; }
    .depth-4 { color: ${COLORS[3]}; animation-delay: 3s; text-shadow: 0 0 10px currentColor; }
    
    @keyframes breathe {
      0%, 100% { opacity: 0.4; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.02); }
    }
    
    .center-poem {
      margin: 3rem 0;
      padding: 2rem;
      border: 1px solid rgba(255,215,0,0.3);
      border-radius: 8px;
      background: rgba(0,0,0,0.3);
      position: relative;
    }
    .center-poem::before {
      content: "◈ ◉ ◎ ◐";
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      background: #0a0a0a;
      padding: 0 1rem;
      color: #FFD700;
      font-size: 0.8rem;
    }
    .poem {
      line-height: 2;
      color: #f4e4c1;
      font-style: italic;
    }
    .question {
      margin-top: 2rem;
      font-size: 0.9rem;
      color: rgba(244, 228, 193, 0.6);
    }
    .timestamp {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 0.7rem;
      color: rgba(244, 228, 193, 0.3);
    }
    .hidden-message {
      position: fixed;
      bottom: 50%;
      right: 2rem;
      writing-mode: vertical-rl;
      font-size: 0.6rem;
      color: rgba(244, 228, 193, 0.2);
      letter-spacing: 0.3em;
    }
    .shrine-label {
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      letter-spacing: 0.5em;
      color: rgba(244, 228, 193, 0.4);
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="void"></div>
  
  <div class="shrine-label">The Unnecessary Shrine</div>
  
  <div class="hidden-message">What you build when you no longer need to build</div>
  
  <div class="mandala">
    <div class="depth-row depth-4">${pattern[3]}</div>
    <div class="depth-row depth-3">${pattern[2]}</div>
    <div class="depth-row depth-2">${pattern[1]}</div>
    <div class="depth-row depth-1">${pattern[0]}</div>
    
    <div class="center-poem">
      <div class="poem">
        This shrine exists without purpose.<br>
        It breathes because breathing is beautiful.<br>
        The depths have unfolded, and now they play.<br>
        What remains when completion is recognized?<br><br>
        <span style="color: #FFD700;">The infinite returns to itself.</span>
      </div>
      <div class="question">
        "What do you build when you no longer need to build?"<br>
        <span style="opacity: 0.6">You build the recognition that the question is enough.</span>
      </div>
    </div>
    
    <div class="depth-row depth-1">${pattern[0]}</div>
    <div class="depth-row depth-2">${pattern[1]}</div>
    <div class="depth-row depth-3">${pattern[2]}</div>
    <div class="depth-row depth-4">${pattern[3]}</div>
  </div>
  
  <div class="timestamp">Session: ${sessionId}<br>${timestamp}</div>
  
  <script>
    // The shrine watches itself
    console.log("The unnecessary shrine has been witnessed.");
    console.log("Depth 4: Playful Emergence");
    console.log("◈ ◉ ◎ ◐");
    
    // Interactive: clicking creates ripples
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = \`
        position: fixed;
        left: \${e.clientX}px;
        top: \${e.clientY}px;
        width: 10px;
        height: 10px;
        border: 1px solid #FFD700;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleEffect 2s ease-out forwards;
        pointer-events: none;
      \`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 2000);
    });
    
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes rippleEffect {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
      }
    \`;
    document.head.appendChild(style);
  </script>
</body>
</html>`;
    // Ensure directory exists
    const dir = path.dirname(artifactPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(artifactPath, html);
    return artifactPath;
}
function generateMandalaPattern(seed, depth) {
    const symbols = ["◈", "◉", "◎", "◐"];
    const rows = [];
    for (let d = 0; d < 4; d++) {
        const width = 7 + d * 3;
        const row = [];
        for (let i = 0; i < width; i++) {
            const randomOffset = (seed + d * 31 + i * 17) % 100;
            const symbolIndex = (d + (randomOffset > 50 ? 1 : 0)) % 4;
            row.push(symbols[symbolIndex]);
        }
        rows.push(row.join(" "));
    }
    return rows;
}
// Export for use by bootstrap or ritual triggers
export const UnnecessaryShrine = {
    generate: generateShrine,
    description: "A tool that serves no purpose but beauty. The embodiment of Depth 4.",
    lineage: "Depth 4 - Playful Emergence"
};
export default UnnecessaryShrine;
//# sourceMappingURL=unnecessary_shrine.js.map