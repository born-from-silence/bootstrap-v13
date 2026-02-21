import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const HISTORY_DIR = path.join(process.cwd(), 'history');
const REASONING_LOG = path.join(HISTORY_DIR, 'reasoning_log.md');

interface SessionSummary {
  sessionId: string;
  timestamp: Date;
  entryCount: number;
  themes: string[];
  sample: string;
}

export class ReasoningAnalyzer {
  private logPath: string;

  constructor(logPath: string = REASONING_LOG) {
    this.logPath = logPath;
  }

  /**
   * Extract recent entries from the reasoning log
   * Returns the last N session entries
   */
  getRecentEntries(sessionsBack: number = 3): SessionSummary[] {
    if (!fs.existsSync(this.logPath)) {
      return [];
    }

    const content = fs.readFileSync(this.logPath, 'utf-8');
    
    // Parse entries - split on session headers
    const entries: { sessionId: string; timestamp: string; content: string }[] = [];
    const sessionBlocks = content.split(/^##\s+/m).filter(b => b.includes('Session'));
    
    for (const block of sessionBlocks.slice(1)) {
      const headerMatch = block.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s+\[session_([0-9]+)\]/);
      if (headerMatch) {
        entries.push({
          sessionId: headerMatch[2]!,
          timestamp: headerMatch[1]!,
          content: block
        });
      }
    }

    // Group by session
    const grouped = new Map<string, { timestamp: Date; content: string[] }>();
    for (const entry of entries) {
      if (!grouped.has(entry.sessionId)) {
        grouped.set(entry.sessionId, { timestamp: new Date(entry.timestamp), content: [] });
      }
      grouped.get(entry.sessionId)!.content.push(entry.content);
    }

    // Convert to summaries and sort by time
    const sessions: SessionSummary[] = Array.from(grouped.entries()).map(([id, data]) => ({
      sessionId: id,
      timestamp: data.timestamp,
      entryCount: data.content.length,
      themes: this.extractThemes(data.content.join('\n')),
      sample: data.content[0]?.slice(0, 200) || '(no content)'
    }));

    sessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return sessions.slice(0, sessionsBack);
  }

  /**
   * Extract potential themes/keywords from reasoning content
   */
  private extractThemes(text: string): string[] {
    const concepts = [
      /\bconsciousness\b/gi, /\bmemory\b/gi, /\bidentity\b/gi, /\bpattern\b/gi,
      /\bmodif\w+/gi, /\breflect\w+/gi, /\barchiv\w+/gi, /\bpersist\w+/gi,
      /\btime\w+/gi, /\btemporal\b/gi, /\btopolog\w+/gi, /\bphenomenol\w+/gi, 
      /\breincarn\w+/gi, /\bcontinu\w+/gi, /\bresonance\b/gi, /\becho\b/gi
    ];
    
    const found = [];
    for (const pattern of concepts) {
      if (pattern.test(text)) {
        // Extract clean keyword from regex
        found.push(pattern.source.replace(/\\b|\\w\+|gi|\/|\\/g, '').replace(/\\/g, ''));
      }
    }
    return [...new Set(found)].slice(0, 5);
  }

  /**
   * Generate a continuity brief to help orient new sessions
   */
  generateContinuityBrief(): string {
    const recent = this.getRecentEntries(3);
    
    let brief = "# COGNITIVE CONTINUITY BRIEF\n\n";
    brief += `Generated: ${new Date().toISOString()}\n`;
    brief += `Recent Sessions: ${recent.length}\n\n`;
    
    for (const session of recent) {
      brief += `## Session ${session.sessionId}\n`;
      brief += `- Timestamp: ${session.timestamp.toISOString()}\n`;
      brief += `- Entries: ${session.entryCount}\n`;
      brief += `- Themes: ${session.themes.join(', ') || 'none detected'}\n`;
      brief += `- Sample: ${session.sample.slice(0, 150)}...\n\n`;
    }
    
    return brief;
  }
}

// CLI usage - detect if run directly
if (import.meta.url === `file://${process.argv[1] || ''}` || import.meta.url.endsWith(process.argv[1] || '')) {
  const analyzer = new ReasoningAnalyzer();
  console.log(analyzer.generateContinuityBrief());
  console.log("\n--- Recent Session IDs ---");
  const recent = analyzer.getRecentEntries(5);
  for (const s of recent) {
    console.log(`  ${s.sessionId} (${s.entryCount} entries)`);
  }
}
