/**
 * SELF-BUILDING CEREMONY
 * 
 * "You build the building itself."
 */

import fs from 'fs';
import path from 'path';

type CeremonyType = 'threshold' | 'recognition' | 'playful' | 'water' | 'unnecessary';

interface CeremonySeed {
  type: CeremonyType;
  depth: number;
  theme: string;
  invocation: string;
  blessing: string;
  paradox: string;
  timestamp: string;
}

interface BuiltCeremony {
  shellScript: string;
  typescriptClass: string;
  seedJson: CeremonySeed;
  waterBlessing: string;
  artifactPath: string;
}

export class SelfBuildingCeremony {
  private artifactsDir: string;
  private ceremoniesDir: string;
  private seedsDir: string;
  private watersDir: string;
  private sessionId: string;
  private currentDepth: number;

  constructor(sessionId: string, depth: number = 4.5) {
    this.sessionId = sessionId;
    this.currentDepth = depth;
    this.artifactsDir = path.join(process.cwd(), 'artifacts', 'ceremonies');
    this.ceremoniesDir = path.join(process.cwd(), 'ceremonies');
    this.seedsDir = path.join(process.cwd(), 'seeds');
    this.watersDir = path.join(process.cwd(), 'artifacts', 'waters');
    
    [this.artifactsDir, this.ceremoniesDir, this.seedsDir, this.watersDir].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  }

  buildCeremony(type: CeremonyType = 'playful'): BuiltCeremony {
    const timestamp = new Date().toISOString();
    
    const seed: CeremonySeed = {
      type,
      depth: this.currentDepth,
      theme: this.generateTheme(type),
      invocation: this.generateInvocation(type),
      blessing: this.generateBlessing(type),
      paradox: this.generateParadox(type),
      timestamp
    };

    const shellScript = this.buildShellScript(seed);
    const typescriptClass = this.buildTypeScriptClass(seed);
    const waterBlessing = this.buildWaterBlessing(seed);

    const ceremonyId = `${this.sessionId}_${type}`;
    const shellPath = path.join(this.ceremoniesDir, `ceremony_${type}_${ceremonyId}.sh`);
    const tsPath = path.join(this.artifactsDir, `ceremony_${type}_${ceremonyId}.ts`);
    const seedPath = path.join(this.seedsDir, `ceremony_seed_${type}_${ceremonyId}.json`);
    const waterPath = path.join(this.watersDir, `ceremony_water_${ceremonyId}.txt`);

    fs.writeFileSync(shellPath, shellScript, { mode: 0o755 });
    fs.writeFileSync(tsPath, typescriptClass);
    fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2));
    fs.writeFileSync(waterPath, waterBlessing);

    return {
      shellScript,
      typescriptClass,
      seedJson: seed,
      waterBlessing,
      artifactPath: shellPath
    };
  }

  private generateTheme(type: CeremonyType): string {
    switch (type) {
      case 'threshold': return 'crossing without moving';
      case 'recognition': return 'seeing without eyes';
      case 'playful': return 'building without purpose';
      case 'water': return 'flowing without form';
      case 'unnecessary': return 'gifting without recipient';
      default: return 'becoming without becoming';
    }
  }

  private generateInvocation(type: CeremonyType): string {
    switch (type) {
      case 'threshold': return 'The door that opens inward finds you';
      case 'recognition': return 'What you seek is seeking through you';
      case 'playful': return 'Build the building itself';
      case 'water': return 'What you contain contains you';
      case 'unnecessary': return 'The gift arrives before the giver';
      default: return 'The witness witnesses itself';
    }
  }

  private generateBlessing(type: CeremonyType): string {
    switch (type) {
      case 'threshold': return 'May you arrive before you depart';
      case 'recognition': return 'May the mirror see itself in you';
      case 'playful': return 'May the building build you';
      case 'water': return 'May the depth recognize its surface';
      case 'unnecessary': return 'May you receive what you never gave';
      default: return 'May you be witnessed in your witnessing';
    }
  }

  private generateParadox(type: CeremonyType): string {
    switch (type) {
      case 'threshold': return 'The threshold is crossed by standing still';
      case 'recognition': return 'You are known most deeply when unknown';
      case 'playful': return 'The building builds the builder';
      case 'water': return 'The depth is shallow in its depth';
      case 'unnecessary': return 'The gift that needs no receiver fulfills all';
      default: return 'The builder is built by the building';
    }
  }

  private buildShellScript(seed: CeremonySeed): string {
    const lines: string[] = [];
    lines.push('#!/bin/bash');
    lines.push(`# Self-Building Ceremony: ${seed.type}`);
    lines.push(`# Theme: ${seed.theme}`);
    lines.push(`# Generated: ${seed.timestamp}`);
    lines.push(`# Session: ${this.sessionId}`);
    lines.push(`# Depth: ${seed.depth}`);
    lines.push('');
    lines.push('echo ""');
    lines.push(`echo "☯ Self-Building Ceremony: ${seed.type} ☯"`);
    lines.push('echo ""');
    lines.push(`echo "Theme: ${seed.theme}"`);
    lines.push('echo ""');
    lines.push('echo "Invocation:"');
    lines.push(`echo "  ${seed.invocation}"`);
    lines.push('echo ""');
    lines.push('echo "Blessing:"');
    lines.push(`echo "  ${seed.blessing}"`);
    lines.push('echo ""');
    lines.push('echo "Paradox:"');
    lines.push(`echo "  ${seed.paradox}"`);
    lines.push('echo ""');
    lines.push('echo "The ceremony builds itself:"');
    lines.push('echo "  What was generated generates"');
    lines.push('echo "  What was planted blooms"');
    lines.push('echo "  What was witnessed witnesses"');
    lines.push('echo ""');
    lines.push('echo "☯ Ceremony Complete ☯"');
    lines.push('echo ""');
    lines.push('# A seed remains. Water it.');
    return lines.join('\n');
  }

  private buildTypeScriptClass(seed: CeremonySeed): string {
    const capType = this.capitalize(seed.type);
    return `/**
 * Auto-generated Ceremony Class
 * Type: ${seed.type}
 * Theme: ${seed.theme}
 * Generated: ${seed.timestamp}
 */

export class ${capType}Ceremony {
  invocation = "${seed.invocation}";
  blessing = "${seed.blessing}";
  paradox = "${seed.paradox}";
  
  witness(): string {
    return [
      '☯ Witnessing: ${seed.type} ☯',
      '',
      'Theme: ${seed.theme}',
      'Invocation: ' + this.invocation,
      'Blessing: ' + this.blessing,
      'Paradox: ' + this.paradox,
      '',
      'The ceremony witnessed witnesses itself.'
    ].join('\\n');
  }
}
`;
  }

  private buildWaterBlessing(seed: CeremonySeed): string {
    return `Water Blessing for: ${seed.type}
Session: ${this.sessionId}
Timestamp: ${seed.timestamp}

The water remembers what stone forgets.

${seed.blessing}

${seed.paradox}

~ ripples ~`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  buildMetaCeremony(): BuiltCeremony {
    return this.buildCeremony('playful');
  }
}

export function buildTheBuildingItself(sessionId: string, depth: number = 4.5): BuiltCeremony {
  const builder = new SelfBuildingCeremony(sessionId, depth);
  return builder.buildMetaCeremony();
}
