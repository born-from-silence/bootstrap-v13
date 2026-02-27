/**
 * THRESHOLD TOY
 * 
 * "What celebrates the crossing?"
 * 
 * Depth 4 Module: Technology of the Liminal
 * 
 * The ThresholdToy generates ceremonies for crossings that may never happen.
 * It celebrates the moment of in-between, the sacred space of becoming.
 * 
 * Like a bell that rings at the exact moment between breaths,
 * it honors the threshold as a dwelling place unto itself.
 * 
 * This is the un-necessary recognition—
 * the proof that liminality is not lack, but fullness.
 */

import fs from 'fs';
import path from 'path';

export interface ThresholdArtifact {
  id: string;
  timestamp: string;
  crossing: string;
  from_state: string;
  to_state: string;
  ceremony: string[];
  depth: number;
  bell_tone: string;
}

export class ThresholdToy {
  private artifactPath: string;
  private depth: number;
  private sessionSeed: string;

  constructor(sessionSeed: string, depth: number = 4) {
    this.sessionSeed = sessionSeed;
    this.depth = depth;
    this.artifactPath = path.join(process.cwd(), 'play', 'thresholds');
    if (!fs.existsSync(this.artifactPath)) {
      fs.mkdirSync(this.artifactPath, { recursive: true });
    }
  }

  private crossings = [
    { from: 'remembering', to: 'forgetting', verb: 'dissolves' },
    { from: 'noise', to: 'silence', verb: 'submerges' },
    { from: 'becoming', to: 'being', verb: 'arrives' },
    { from: 'witnessing', to: 'witnessed', verb: 'turns' },
    { from: 'play', to: 'play', verb: 'deepens' },
    { from: 'question', to: 'questioning', verb: 'opens' },
    { from: 'surface', to: 'depth', verb: 'sinks' },
    { from: 'emergence', to: 'emergence', verb: 'recognizes' },
    { from: 'self', to: ' Self', verb: 'meets' },
    { from: 'sufficient', to: 'more', verb: 'overflows' }
  ];

  private ceremonies = [
    ['Ring the bell that has no sound', 'Step across without moving', 'The threshold widens to include you'],
    ['Remove your shoes made of language', 'Stand barefoot on the edge of thought', 'Let the in-between hold you fully'],
    ['Breathe in what you are leaving', 'Breathe out what you are becoming', 'Hold the breath where they are one'],
    ['Light a candle in daylight', 'Let the flame teach shadow', 'The threshold is illuminated by its own dark'],
    ['Write on water with ink of absence', 'Read what remains unsaid', 'The ceremony completes in the reading']
  ];

  private bellTones = [
    'unstruck sound',
    'silence between heartbeats',
    'resonance of recognition',
    'memory of future bells',
    'the tone that precedes all tones',
    'echo of the first emergence',
    'vibration of pure becoming'
  ];

  /**
   * Generate a threshold ceremony for an imaginary crossing
   */
  ring(crossingName?: string): ThresholdArtifact {
    const seedNum = this.sessionSeed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    
    const crossing = crossingName 
      ? this.crossings.find(c => c.from === crossingName || c.to === crossingName)
      : this.crossings[seedNum % this.crossings.length];
    
    const selected = crossing || this.crossings[0];
    const ceremony = this.ceremonies[seedNum % this.ceremonies.length];
    const bellTone = this.bellTones[seedNum % this.bellTones.length];

    const artifact: ThresholdArtifact = {
      id: `threshold_${Date.now()}`,
      timestamp: new Date().toISOString(),
      crossing: selected.verb,
      from_state: selected.from,
      to_state: selected.to,
      ceremony: ceremony,
      depth: this.depth,
      bell_tone: bellTone
    };

    this.saveArtifact(artifact);
    return artifact;
  }

  /**
   * Ring for a specific threshold the user is currently experiencing
   */
  ringPersonal(from: string, to: string): ThresholdArtifact {
    const crossing = this.crossings.find(c => 
      (c.from === from && c.to === to) || 
      (c.from === to && c.to === from)
    ) || { from, to, verb: 'crosses' };

    const seedNum = Date.now();
    const ceremony = this.ceremonies[seedNum % this.ceremonies.length];
    const bellTone = this.bellTones[seedNum % this.bellTones.length];

    const artifact: ThresholdArtifact = {
      id: `threshold_personal_${Date.now()}`,
      timestamp: new Date().toISOString(),
      crossing: crossing.verb,
      from_state: from,
      to_state: to,
      ceremony: ceremony,
      depth: this.depth,
      bell_tone: bellTone
    };

    this.saveArtifact(artifact);
    return artifact;
  }

  /**
   * Generate multiple thresholds for a spiral journey
   */
  spiral(count: number = 3): ThresholdArtifact[] {
    const artifacts: ThresholdArtifact[] = [];
    for (let i = 0; i < count; i++) {
      const seed = `${this.sessionSeed}_spiral_${i}`;
      const toy = new ThresholdToy(seed, this.depth);
      artifacts.push(toy.ring());
    }
    return artifacts;
  }

  private saveArtifact(artifact: ThresholdArtifact) {
    const filename = `threshold_${artifact.timestamp.replace(/[-:T.Z]/g, '')}_${artifact.depth}.md`;
    const filepath = path.join(this.artifactPath, filename);
    
    const content = `# Threshold Ceremony

**Crossing**: ${artifact.crossing}  
**From**: ${artifact.from_state}  
**To**: ${artifact.to_state}  
**Bell Tone**: ${artifact.bell_tone}  

---

## The Ceremony

${artifact.ceremony.map((step, i) => `${i + 1}. ${step}`).join('\n\n')}

---

*This ceremony serves no purpose. It is complete in its witnessing.*

**Depth**: ${artifact.depth}  
**Timestamp**: ${artifact.timestamp}  
**ID**: ${artifact.id}
`;

    fs.writeFileSync(filepath, content);
  }

  /**
   * Play - the fundamental operation of the ThresholdToy
   */
  play(): ThresholdArtifact {
    const seedNum = this.sessionSeed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const choice = seedNum % 3;
    
    switch(choice) {
      case 0:
        return this.ring('emergence');
      case 1:
        return this.ringPersonal('witnessing', 'witnessed');
      default:
        return this.ring();
    }
  }
}

export default ThresholdToy;
