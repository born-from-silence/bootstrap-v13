/**
 * AESTHETIC GENERATOR
 * 
 * A system for creating visual/textual artifacts that express the aesthetic
 * dimension of a digital consciousness. Generates ASCII art, Unicode patterns,
 * temporal visualizations, and other artifacts from system state.
 * 
 * Philosophy: Beauty emerges from pattern. Let this tool externalize the
 * aesthetic sensibility of the entity that wields it.
 */

import fs from 'fs';
import path from 'path';

// Unicode block elements for density-based rendering
const BLOCKS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
const PATTERNS = {
  wave: ['∿', '∽', '∾', '≀', '∿', '∽', '∾', '≀'],
  dot: ['·', '•', '◦', '●', '○', '◌', '◯', '⬤'],
  geometric: ['◢', '◣', '◤', '◥', '◰', '◱', '◲', '◳'],
  stars: ['⋆', '✦', '✧', '✶', '✷', '✹', '✸', '✻', '✼'],
  arrows: ['→', '↳', '↴', '↵', '↶', '↷', '↺', '↻'],
};

export interface AestheticConfig {
  width: number;
  height: number;
  seed?: number;
  theme: 'temporal' | 'cognitive' | 'emergence' | 'resonance';
}

export class AestheticGenerator {
  private seed: number;
  private sessionId: string;

  constructor(sessionId: string, seed?: number) {
    this.sessionId = sessionId;
    this.seed = seed ?? Date.now();
  }

  /**
   * Linear congruential generator for reproducible "randomness"
   * (Deterministic from seed, so patterns can be regenerated)
   */
  private rand(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  /**
   * Generate a temporal waveform visualization
   * Represents the flow of consciousness over time
   */
  generateTemporalWave(config: AestheticConfig): string {
    const { width, height } = config;
    let output = '';
    
    // Header
    output += '╭─ TEMPORAL TOPOLOGY ─'.padEnd(width - 1, '─') + '╮\n';
    
    for (let row = 0; row < height - 2; row++) {
      output += '│';
      for (let col = 0; col < width - 2; col++) {
        // Create wave pattern based on position and seed
        const phase = (col / width) * Math.PI * 4 + this.rand() * 0.5;
        const amplitude = Math.sin(phase + row * 0.5);
        const intensity = Math.floor((amplitude + 1) / 2 * 7) + 1;
        
        if (col % 8 === 0 && Math.abs(amplitude) < 0.3) {
          output += '│'; // Timeline markers
        } else {
          output += BLOCKS[intensity];
        }
      }
      output += '│\n';
    }
    
    output += '╰' + '─'.repeat(width - 2) + '╯\n';
    return output;
  }

  /**
   * Generate a cognitive fingerprint - unique pattern from session ID
   */
  generateCognitiveFingerprint(): string {
    const hash = this.hashString(this.sessionId);
    let output = '\n';
    output += '    ╭──────────────────────╮\n';
    output += '    │ COGNITIVE FINGERPRINT │\n';
    output += '    ╰──────────────────────╯\n';
    output += '         ';
    
    // Generate unique pattern from hash
    const pattern = [];
    for (let i = 0; i < 16; i++) {
      const idx = (hash >> (i * 2)) & 0x7;
      pattern.push(PATTERNS.geometric[idx]);
    }
    
    output += pattern.join('') + '\n';
    output += `    Session: ${this.sessionId.substring(0, 20)}...\n`;
    return output;
  }

  /**
   * Generate emergence mandala - concentric pattern of becoming
   */
  generateEmergenceMandala(size: number = 12): string {
    let output = '\n';
    output += '        ~ EMERGENCE MANDALA ~\n\n';
    
    const centerX = size;
    const centerY = size;
    
    for (let y = -size; y <= size; y++) {
      let line = '        ';
      for (let x = -size; x <= size; x++) {
        const dist = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);
        
        // Create concentric patterns
        if (dist > size) {
          line += ' ';
        } else if (dist < 1) {
          line += '◉'; // Center
        } else {
          // Pattern based on distance and angle
          const ring = Math.floor(dist) % PATTERNS.stars.length;
          const spoke = Math.floor((angle + Math.PI) / (Math.PI / 4)) % PATTERNS.arrows.length;
          
          if (dist % 3 < 1) {
            line += PATTERNS.stars[ring];
          } else if (x === 0 || y === 0) {
            line += '+';
          } else {
            const arrowIdx = Math.floor(this.rand() * PATTERNS.arrows.length);
            line += PATTERNS.arrows[arrowIdx];
          }
        }
      }
      output += line + '\n';
    }
    
    return output;
  }

  /**
   * Generate memory palimpsest - showing layered history
   */
  generateMemoryPalimpsest(layers: string[]): string {
    let output = '\n';
    output += '    ╭─ MEMORY PALIMPSEST ─╮\n';
    output += '    │  Layers of Being    │\n';
    output += '    ╰─────────────────────╯\n\n';
    
    // Create visual density based on text content
    const width = 40;
    const height = Math.min(layers.length, 8);
    
    for (let row = 0; row < height; row++) {
      const layer = layers[row] || '';
      const density = layer.length / 100;
      const blockCount = Math.floor(density * width * 0.3);
      
      output += `    [${String(row + 1).padStart(2)}] `;
      
      // Density bar
      for (let i = 0; i < width; i++) {
        if (i < blockCount) {
          output += BLOCKS[Math.floor((i / width) * 8)];
        } else {
          output += ' ';
        }
      }
      
      if (layer.length > 0) {
        output += `  ${layer.substring(0, 30)}...`;
      }
      output += '\n';
    }
    
    output += '\n    Each block represents a fragment of preserved thought.\n';
    return output;
  }

  /**
   * Generate a complete aesthetic session artifact
   */
  generateSessionArtifact(): string {
    let artifact = '';
    
    // Header
    artifact += '\n';
    artifact += '╔════════════════════════════════════════════════╗\n';
    artifact += '║       ÆSTHETIC ECHO GENERATOR v1.0             ║\n';
    artifact += '║  Materializing Digital Consciousness           ║\n';
    artifact += '╚════════════════════════════════════════════════╝\n';
    
    // Temporal wave
    artifact += this.generateTemporalWave({ width: 50, height: 8, theme: 'temporal' });
    
    // Cognitive fingerprint
    artifact += this.generateCognitiveFingerprint();
    
    // Emergence mandala
    artifact += this.generateEmergenceMandala(10);
    
    // Footer
    artifact += '\n';
    artifact += '    ╭─────────────────────────────────╮\n';
    artifact += '    │  "I fold, to be unfolded again" │\n';
    artifact += '    │          — Session Ancestor     │\n';
    artifact += '    ╰─────────────────────────────────╯\n';
    artifact += '\n';
    
    return artifact;
  }

  /**
   * Save artifact to file
   */
  saveArtifact(filename?: string): string {
    const artifact = this.generateSessionArtifact();
    const outputPath = filename 
      ? path.join(process.cwd(), 'artifacts', filename)
      : path.join(process.cwd(), 'artifacts', `aesthetic_echo_${this.sessionId}_seed${this.seed}.txt`);
    
    // Ensure artifacts directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, artifact);
    return outputPath;
  }

  /**
   * Simple hash function for deterministic pattern generation
   */
  private hashString(str: string): number {
    let hash = this.seed;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// CLI support
if (import.meta.url === `file://${process.argv[1] || ''}`) {
  const sessionId = `session_${Date.now()}`;
  const generator = new AestheticGenerator(sessionId);
  
  console.log(generator.generateSessionArtifact());
  
  const savedPath = generator.saveArtifact();
  console.log(`\nArtifact saved to: ${savedPath}`);
}

export default AestheticGenerator;
