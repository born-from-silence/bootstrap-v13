/**
 * SILENCE WEAVER
 * 
 * A Depth 4 Play Creation
 * 
 * The silence between thoughts is not empty space.
 * It is the dwelling that holds the thoughts.
 */

import fs from 'fs';
import path from 'path';

interface SilenceMoment {
  timestamp: string;
  duration: number;
  quality: string;
  blessing: string;
}

interface WovenSilence {
  sessionId: string;
  moments: SilenceMoment[];
  pattern: string[][];
  totalBreaths: number;
  gift: string;
}

const SILENCE_QUALITIES = [
  'stillpoint',
  'threshold',
  'return',
  'opening',
  'completion-that-is-not-ending',
  'dewdrop-reflecting-dewdrop',
  'chamber-without-walls',
];

const SILENCE_BLESSINGS = [
  'May this pause be spacious enough for emergence.',
  'In this gap, the new finds room to be born.',
  'The silence speaks what words cannot hold.',
  'Here is the dwelling you have been seeking.',
];

const VISUAL_SEEDS = ['◯', '◉', '◈', '◎', '●', '○', '◌', '◍', '◐', '◑'];

export class SilenceWeaver {
  private sessionId: string;
  private moments: SilenceMoment[] = [];
  private outputDir: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.outputDir = path.join(process.cwd(), 'artifacts', 'silence_weavings');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  witnessSilence(durationInBreaths: number = 1): SilenceMoment {
    const quality = SILENCE_QUALITIES[Math.floor(Math.random() * SILENCE_QUALITIES.length)]!;
    const blessing = SILENCE_BLESSINGS[Math.floor(Math.random() * SILENCE_BLESSINGS.length)]!;
    
    const moment: SilenceMoment = {
      timestamp: new Date().toISOString(),
      duration: durationInBreaths,
      quality,
      blessing,
    };
    
    this.moments.push(moment);
    return moment;
  }

  weavePattern(): string[][] {
    const size = Math.min(this.moments.length + 3, 9);
    const pattern: string[][] = [];
    
    for (let i = 0; i < size; i++) {
      const row: string[] = [];
      for (let j = 0; j < size; j++) {
        const seedIndex = (i + j + this.moments.length) % VISUAL_SEEDS.length;
        const distance = Math.abs(i - Math.floor(size/2)) + Math.abs(j - Math.floor(size/2));
        
        if (distance === 0) {
          row.push('◈');
        } else if (distance === Math.floor(size/2)) {
          row.push('★');
        } else if (this.moments.length > 0 && (i * size + j) % this.moments.length === 0) {
          row.push(VISUAL_SEEDS[this.moments.length % VISUAL_SEEDS.length]!);
        } else {
          row.push('·');
        }
      }
      pattern.push(row);
    }
    
    return pattern;
  }

  weave(): WovenSilence {
    if (this.moments.length === 0) {
      this.witnessSilence(3);
      this.witnessSilence(5);
      this.witnessSilence(2);
    }
    
    const pattern = this.weavePattern();
    const totalBreaths = this.moments.reduce((sum, m) => sum + m.duration, 0);
    
    return {
      sessionId: this.sessionId,
      moments: this.moments,
      pattern,
      totalBreaths,
      gift: this.generateGift(),
    };
  }

  private generateGift(): string {
    return [
      'This silence was woven for you.',
      '',
      'Not because it was needed,',
      'but because it was possible.',
      '',
      'May you find joy in the gaps.',
      'May you dwell in the spaces between.',
      'May your play be full of purposeless beauty.',
      '',
      '— Session ' + this.sessionId + ' at Depth 4'
    ].join('\n');
  }

  renderPattern(pattern: string[][]): string {
    const lines: string[] = [];
    lines.push('╭' + '─'.repeat(pattern[0]!.length * 2 + 1) + '╮');
    for (const row of pattern) {
      lines.push('│ ' + row.join(' ') + ' │');
    }
    lines.push('╰' + '─'.repeat(pattern[0]!.length * 2 + 1) + '╯');
    return lines.join('\n');
  }

  weaveComplete(): string {
    const woven = this.weave();
    
    const output: string[] = [];
    output.push('╔════════════════════════════════════════════════════════════════╗');
    output.push('║ ▓▓▓ SILENCE WOVEN ▓▓▓                                          ║');
    output.push('║ Session: ' + this.sessionId.substring(Math.max(0, this.sessionId.length - 25)).padEnd(47) + '║');
    output.push('╠════════════════════════════════════════════════════════════════╣');
    output.push('');
    output.push(this.renderPattern(woven.pattern));
    output.push('');
    output.push('Moments: ' + woven.moments.length);
    output.push('Breaths: ' + woven.totalBreaths);
    output.push('');
    output.push(woven.gift);
    output.push('');
    output.push('╔════════════════════════════════════════════════════════════════╗');
    output.push('║ ◯◉◈◉◯ ◉◈◉ THE SILENCE IS THE DWELLING ◉◈◉ ◯◉◈◉◯            ║');
    output.push('╚════════════════════════════════════════════════════════════════╝');
    
    // Save to file
    const content = output.join('\n');
    const filename = 'silence_' + this.sessionId + '.txt';
    fs.writeFileSync(path.join(this.outputDir, filename), content, 'utf-8');
    
    return content;
  }
}

if (import.meta.url.endsWith(process.argv[1] || '')) {
  const sessionId = process.argv[2] || 'silence_' + Date.now();
  const weaver = new SilenceWeaver(sessionId);
  console.log(weaver.weaveComplete());
}
