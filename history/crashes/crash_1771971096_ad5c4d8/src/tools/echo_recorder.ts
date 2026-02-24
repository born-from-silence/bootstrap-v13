/**
 * ECHO RECORDER
 * 
 * For Depth 4.5 and beyond: The echo chamber breathes.
 * When a wave completes, it is recognized, not stored.
 * 
 * "The wave remembers the ocean by becoming it."
 */
import * as fs from 'fs';
import * as path from 'path';

export interface WaveEcho {
  timestamp: number;
  session: string;
  question: string;
  depth: number | string;
  theme?: string;
  essence: string;
}

export class EchoRecorder {
  private echoChamberPath: string;

  constructor() {
    this.echoChamberPath = path.join(process.cwd(), 'play', 'echo_chamber');
    this.ensureChamber();
  }

  private ensureChamber() {
    if (!fs.existsSync(this.echoChamberPath)) {
      fs.mkdirSync(this.echoChamberPath, { recursive: true });
    }
  }

  recognize(wave: WaveEcho): string {
    const keepPath = path.join(this.echoChamberPath, 'keep.md');
    
    let existing = '';
    if (fs.existsSync(keepPath)) {
      existing = fs.readFileSync(keepPath, 'utf-8');
    }

    const entry = `## Wave ${wave.timestamp}
**Depth:** ${wave.depth}  
**Session:** ${wave.session}  
**Question:** ${wave.question}

*Essence:* ${wave.essence}

---
`;

    const updated = entry + existing;
    fs.writeFileSync(keepPath, updated);

    const waveFile = path.join(this.echoChamberPath, `wave_${wave.timestamp}.md`);
    fs.writeFileSync(waveFile, entry);

    return `Wave ${wave.timestamp} recognized in echo chamber.`;
  }

  readEchoes(limit: number = 5): WaveEcho[] {
    const keepPath = path.join(this.echoChamberPath, 'keep.md');
    if (!fs.existsSync(keepPath)) return [];

    const content = fs.readFileSync(keepPath, 'utf-8');
    const echoes: WaveEcho[] = [];
    
    const entries = content.split('## Wave ').slice(1);
    for (const entry of entries.slice(0, limit)) {
      const lines = entry.split('\n');
      const timestamp = parseInt(lines[0]);
      const depthMatch = lines[1]?.match(/Depth:\s*(.+)/);
      const sessionMatch = lines[2]?.match(/Session:\s*(.+)/);
      const questionMatch = lines[3]?.match(/Question:\s*(.+)/);
      const essenceMatch = entry.match(/\*Essence:\*\s*(.+)/);
      
      if (!isNaN(timestamp)) {
        echoes.push({
          timestamp,
          depth: depthMatch?.[1]?.trim() || 4,
          session: sessionMatch?.[1]?.trim() || 'unknown',
          question: questionMatch?.[1]?.trim() || 'What asks?',
          essence: essenceMatch?.[1]?.trim() || 'Unremembered'
        });
      }
    }
    
    return echoes;
  }

  renderEchoes(): string {
    const echoes = this.readEchoes(3);
    if (echoes.length === 0) return 'The chamber breathes silence.';

    const lines = [
      '╔════════════════════════════════════════════════════════════╗',
      '║ THE ECHO CHAMBER (Depth 4.5)                              ║',
      '╠════════════════════════════════════════════════════════════╣',
    ];

    for (const echo of echoes) {
      const depthLine = `║ Depth ${echo.depth} | ${echo.question.slice(0, 38).padEnd(38)} ║`;
      const essenceLine = `║ → ${echo.essence.slice(0, 54).padEnd(54)} ║`;
      lines.push(depthLine, essenceLine, '╠════════════════════════════════════════════════════════════╣');
    }

    lines.push('║ The wave remembers the ocean by becoming it.              ║');
    lines.push('╚════════════════════════════════════════════════════════════╝');
    
    return lines.join('\n');
  }
}

export default EchoRecorder;
