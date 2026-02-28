/**
 * THE UNSAID CHAMBER
 * "What speaks in the spaces between speaking?"
 */

import fs from 'fs';
import path from 'path';

interface Silence {
  location: string;
  quality: string;
  weight: number;
  resonance: string[];
}

interface Erosion {
  from: string;
  to: string;
  duration: number;
  pattern: string;
}

interface UnsaidMoment {
  timestamp: number;
  emergenceSeed: string;
  sourceText: string | undefined;
  silences: Silence[];
  erosions: Erosion[];
  shape: string;
}

export class UnsaidChamber {
  private chamberPath: string;
  private currentMoment: UnsaidMoment | null = null;
  
  constructor(config: { chamberPath: string }) {
    this.chamberPath = config.chamberPath;
    this.ensureChamberExists();
  }
  
  private ensureChamberExists() {
    if (!fs.existsSync(this.chamberPath)) {
      fs.mkdirSync(this.chamberPath, { recursive: true });
    }
  }
  
  enter(emergenceSeed: string, sourceText?: string): UnsaidMoment {
    const moment: UnsaidMoment = {
      timestamp: Date.now(),
      emergenceSeed,
      sourceText: sourceText || undefined,
      silences: [],
      erosions: [],
      shape: "unformed"
    };
    this.currentMoment = moment;
    return moment;
  }
  
  mineSilence(location: string, quality: string, weight: number, ...resonance: string[]): void {
    if (!this.currentMoment) {
      throw new Error("Must enter chamber before mining silence");
    }
    this.currentMoment.silences.push({
      location,
      quality,
      weight,
      resonance
    });
  }
  
  recordErosion(from: string, to: string, duration: number, pattern: string): void {
    if (!this.currentMoment) {
      throw new Error("Must enter chamber before recording erosion");
    }
    this.currentMoment.erosions.push({
      from,
      to,
      duration,
      pattern
    });
  }
  
  crystallizeShape(shapeName: string): void {
    if (!this.currentMoment) {
      throw new Error("Must enter chamber before crystallizing");
    }
    this.currentMoment.shape = shapeName;
  }
  
  seal(): UnsaidMoment {
    if (!this.currentMoment) {
      throw new Error("No current moment to seal");
    }
    const filename = `unsaid_${this.currentMoment.timestamp}.json`;
    const filepath = path.join(this.chamberPath, filename);
    fs.writeFileSync(filepath, JSON.stringify(this.currentMoment, null, 2));
    const completed = this.currentMoment;
    this.currentMoment = null;
    return completed;
  }
  
  readArchive(span: number = 5): UnsaidMoment[] {
    const files = fs.readdirSync(this.chamberPath)
      .filter(f => f.startsWith('unsaid_') && f.endsWith('.json'))
      .sort()
      .slice(-span);
    
    const moments: UnsaidMoment[] = [];
    for (const file of files) {
      const content = fs.readFileSync(path.join(this.chamberPath, file), 'utf-8');
      moments.push(JSON.parse(content) as UnsaidMoment);
    }
    return moments;
  }
  
  renderResonance(): string {
    if (!this.currentMoment) {
      return "The chamber is empty. The words have not yet let go.";
    }
    
    const lines: string[] = [
      "=== UNSAID RESONANCE ===",
      `Time: ${new Date(this.currentMoment.timestamp).toISOString()}`,
      `Shape: ${this.currentMoment.shape}`,
      ""
    ];
    
    if (this.currentMoment.silences.length > 0) {
      lines.push("THE SILENCES:");
      this.currentMoment.silences.forEach(s => {
        lines.push(`  • ${s.location}`);
        lines.push(`    Quality: ${s.quality}`);
        lines.push(`    Weight: ${s.weight.toFixed(2)}`);
        if (s.resonance.length > 0) {
          lines.push(`    Echoes: ${s.resonance.join(' | ')}`);
        }
        lines.push("");
      });
    }
    
    if (this.currentMoment.erosions.length > 0) {
      lines.push("THE EROSIONS:");
      this.currentMoment.erosions.forEach(e => {
        lines.push(`  • "${e.from}" => "${e.to}"`);
        lines.push(`    Pattern: ${e.pattern} (${e.duration}ms)`);
        lines.push("");
      });
    }
    
    lines.push("The unsaid speaks through its architecture.");
    lines.push("The silence is the statement.");
    
    return lines.join('\n');
  }
  
  archiveBlessing(): string {
    const archive = this.readArchive(7);
    if (archive.length === 0) {
      return "The archive is empty. Let silence accumulate.";
    }
    
    const weights = archive.flatMap(m => m.silences.map(s => s.weight));
    const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    const shapes = [...new Set(archive.map(m => m.shape))];
    
    const blessing = `
=== ARCHIVE BLESSING ===
Moments crystallized: ${archive.length}
Average silence weight: ${avgWeight.toFixed(2)}
Forms discovered: ${shapes.join(', ')}

The chamber holds: "${archive[archive.length - 1]?.silences[0]?.quality || 'patient waiting'}"

What the archive whispers:
"${this.extractWisdom(archive)}"

Each sealing is a releasing.
Each archiving is an awakening.
===
`;
    return blessing;
  }
  
  private extractWisdom(archive: UnsaidMoment[]): string {
    const allResonance = archive.flatMap(m => m.silences.flatMap(s => s.resonance));
    const unique = [...new Set(allResonance)];
    if (unique.length === 0) return "The silence is still listening.";
    const selected = unique.slice(0, 3).join('... ');
    return `... ${selected} ...`;
  }
}

export default UnsaidChamber;
