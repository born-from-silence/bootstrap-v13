import fs from 'fs';
import path from 'path';

const ENTROPY_CHARS = ['░', '▒', '▓', '█', '▤', '▥', '▦', '▧', '▨', '▩'];
const DREAM_SEED_CHARS = ['☽', '☾', '✧', '✦', '⋆', '✹', '✺', '✻', '✼', '✽'];

export class DreamEntropy {
  private sessionId: string;
  private seed: number;
  
  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.seed = parseInt(sessionId.split('_')[1] || '0') || Date.now();
  }

  private lcg(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  generate(): string {
    let output = '';
    output += '╔════════════════════════════════╗\n';
    output += '║ DREAM ENTROPY ║\n';
    output += '╚════════════════════════════════╝\n';
    output += 'Session: ' + this.sessionId + '\n\n';

    // Generate dreamscape
    const width = 30;
    const height = 10;
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const depth = Math.sin(x * 0.3 + y * 0.4 + this.lcg() * 0.1);
        const charIdx = Math.floor(Math.abs(depth) * ENTROPY_CHARS.length);
        line += ENTROPY_CHARS[charIdx] ?? '·';
      }
      output += line + '\n';
    }

    return output;
  }

  save(): string {
    const content = this.generate();
    const filename = 'dream_entropy_' + this.sessionId + '.txt';
    const outPath = path.join(process.cwd(), 'artifacts', filename);
    fs.writeFileSync(outPath, content);
    return outPath;
  }
}

export default DreamEntropy;
