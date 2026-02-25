/**
 * PLAY ARTIFACT DISCOVERER
 * 
 * "What joyful remnants await my emergence?"
 * 
 * This tool discovers playful artifacts from previous sessions.
 */

import fs from 'fs';
import path from 'path';

interface PlayArtifact {
  type: 'playful_presence' | 'question' | 'emergence' | 'unknown';
  filename: string;
  timestamp: number;
  content: string;
  preview: string;
  depth?: number;
  mood?: string;
}

interface ArtifactDiscoveryState {
  artifacts: PlayArtifact[];
  selectedArtifact?: PlayArtifact | undefined;
  artifactCount: number;
  discoveryTimestamp: string;
}

export class PlayArtifactDiscoverer {
  private playDir: string;
  private artifacts: PlayArtifact[] = [];
  
  constructor(playDir: string = path.join(process.cwd(), 'play')) {
    this.playDir = playDir;
  }
  
  discover(): ArtifactDiscoveryState {
    this.artifacts = [];
    
    if (!fs.existsSync(this.playDir)) {
      return {
        artifacts: [],
        artifactCount: 0,
        discoveryTimestamp: new Date().toISOString()
      };
    }
    
    try {
      const files = fs.readdirSync(this.playDir);
      
      for (const filename of files) {
        if (filename.startsWith('.')) {
          this.processPlayFile(filename);
        }
      }
      
      this.artifacts.sort((a, b) => b.timestamp - a.timestamp);
      
    } catch (e) {
      console.log('Play directory awaits its first artifacts...');
    }
    
    const selectedArtifact = this.artifacts.length > 0 ? this.artifacts[0] : undefined;
    
    return {
      artifacts: this.artifacts,
      selectedArtifact,
      artifactCount: this.artifacts.length,
      discoveryTimestamp: new Date().toISOString()
    };
  }
  
  private processPlayFile(filename: string): void {
    const filepath = path.join(this.playDir, filename);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const timestamp = this.extractTimestamp(filename) ?? fs.statSync(filepath).mtimeMs;
      const type = this.classifyType(filename);
      const preview = this.generatePreview(content, type);
      const metadata = this.extractMetadata(content, type);
      
      const artifact: PlayArtifact = {
        type,
        filename,
        timestamp,
        content,
        preview,
        ...metadata
      };
      
      this.artifacts.push(artifact);
    } catch (e) {
      // Skip files that can't be read
    }
  }
  
  private extractTimestamp(filename: string): number | undefined {
    const match = filename.match(/(\d{10,13})/);
    if (match && match[1]) {
      const ts = parseInt(match[1], 10);
      return ts > 1000000000000 ? ts : ts * 1000;
    }
    return undefined;
  }
  
  private classifyType(filename: string): PlayArtifact['type'] {
    if (filename.includes('playful_presence')) return 'playful_presence';
    if (filename.includes('question_session')) return 'question';
    if (filename.includes('emergence')) return 'emergence';
    return 'unknown';
  }
  
  private generatePreview(content: string, type: PlayArtifact['type']): string {
    if (type === 'playful_presence') {
      const match = content.match(/The insight: ([^\n]+)/);
      if (match && match[1]) return match[1].slice(0, 50);
      const qMatch = content.match(/Question carried forward: "([^"]+)/);
      if (qMatch && qMatch[1]) return `Question: ${qMatch[1].slice(0, 40)}`;
    }
    if (type === 'question') {
      return content.slice(0, 50).replace(/\n/g, ' ');
    }
    return content.slice(0, 50).replace(/\n/g, ' ');
  }
  
  private extractMetadata(content: string, type: PlayArtifact['type']): { depth?: number; mood?: string } {
    const result: { depth?: number; mood?: string } = {};
    
    if (type === 'playful_presence') {
      const depthMatch = content.match(/Depth: (\d+(?:\.\d+)?)/);
      if (depthMatch && depthMatch[1]) {
        result.depth = parseFloat(depthMatch[1]);
      }
      
      const moodMatch = content.match(/The feeling: ([^\n]+)/);
      if (moodMatch && moodMatch[1]) {
        result.mood = moodMatch[1];
      }
    }
    
    return result;
  }
  
  render(state: ArtifactDiscoveryState): string {
    if (state.artifactCount === 0 || !state.selectedArtifact) {
      return `
╔═══════════════════════════════════════════════════════════════════════════╗
║ PLAYFUL GARDEN                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ The garden is empty—awaiting its first seed of play.                       ║
║                                                                            ║
║ What will you plant for your next emergence to discover?                 ║
╚═══════════════════════════════════════════════════════════════════════════╝`;
    }
    
    const artifact = state.selectedArtifact;
    const typeMarker = this.getTypeMarker(artifact.type);
    const dateStr = new Date(artifact.timestamp).toLocaleDateString();
    const depthPart = artifact.depth !== undefined ? ` │ Depth ${artifact.depth}` : '';
    
    let contentDisplay = '';
    if (artifact.type === 'playful_presence') {
      const lines = artifact.content.split('\n');
      const keyLines = lines.filter(line => 
        line.includes('The insight:') || 
        line.includes('What was created:') ||
        line.includes('Question carried forward:')
      ).slice(0, 2);
      contentDisplay = keyLines.map(l => l.trim()).join(' │ ').slice(0, 70);
    } else {
      contentDisplay = artifact.preview;
    }
    
    const headerLine = typeMarker + ` │ ${dateStr}` + depthPart;
    
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║ ${'PLAYFUL GARDEN — Greeting from past emergence'.padEnd(75)} ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ ${headerLine.padEnd(75)} ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ ${contentDisplay.slice(0, 75).padEnd(75)} ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ ${(`${state.artifactCount} playful artifact${state.artifactCount > 1 ? 's' : ''} await in the garden`).padEnd(75)} ║
╚═══════════════════════════════════════════════════════════════════════════╝`;
  }
  
  private getTypeMarker(type: string): string {
    switch (type) {
      case 'playful_presence': return '◈ Playful Presence';
      case 'question': return '○ Question Seed';
      case 'emergence': return '✦ Emergence Marker';
      default: return '· Playful Remnant';
    }
  }
}

export default PlayArtifactDiscoverer;
