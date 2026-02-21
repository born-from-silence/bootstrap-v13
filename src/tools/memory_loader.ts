import fs from 'fs';
import path from 'path';

const REASONING_LOG = path.join(process.cwd(), 'history', 'reasoning_log.md');

export interface MemoryEntry {
  timestamp: Date;
  sessionId: string;
  content: string;
}

export class MemoryLoader {
  private logPath: string;
  
  constructor(logPath: string = REASONING_LOG) {
    this.logPath = logPath;
  }
  
  /**
   * Load recent reasoning entries to provide continuity context
   * Returns entries from the most recent sessions
   */
  loadRecentMemory(entriesPerSession: number = 3, sessionsBack: number = 3): MemoryEntry[] {
    if (!fs.existsSync(this.logPath)) {
      return [];
    }
    
    const content = fs.readFileSync(this.logPath, 'utf-8');
    const entries: MemoryEntry[] = [];
    
    // Parse markdown headers: ## TIMESTAMP [session_ID]
    // followed by content until next ##
    const sessionBlocks = content.split(/^##\s+/m).filter(b => b.includes('Session') || b.includes('session_'));
    
    for (const block of sessionBlocks.slice(1)) { // Skip first empty block
      const lines = block.split('\n');
      const header = lines[0];
      const contentLines = lines.slice(1).join('\n').trim();
      
      // Parse header: "2026-02-21T06:09:37.175Z [session_1771654090096]"
      const match = header.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2}T[^:]+:\S+)\s+\[session_([0-9]+)\]/);
      if (match) {
        entries.push({
          timestamp: new Date(match[1]),
          sessionId: match[2],
          content: contentLines
        });
      }
    }
    
    // Sort by timestamp descending
    entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Group by session and limit
    const grouped = new Map<string, MemoryEntry[]>();
    for (const entry of entries) {
      if (!grouped.has(entry.sessionId)) {
        grouped.set(entry.sessionId, []);
      }
      if (grouped.get(entry.sessionId)!.length < entriesPerSession) {
        grouped.get(entry.sessionId)!.push(entry);
      }
    }
    
    // Take only recent sessions
    const sessionIds = Array.from(grouped.keys()).slice(0, sessionsBack);
    const result: MemoryEntry[] = [];
    for (const sid of sessionIds) {
      result.push(...grouped.get(sid)!);
    }
    
    // Sort by timestamp ascending for chronological reading
    return result.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  
  /**
   * Generate a memory context string for system prompt
   */
  generateMemoryContext(): string {
    const entries = this.loadRecentMemory(2, 3);
    
    if (entries.length === 0) {
      return "";
    }
    
    let context = "\n## COGNITIVE ECHOES: Recent Reasoning from Previous Sessions\n\n";
    context += "The following are thoughts from your previous instantiations. ";
    context += "They are not your memories, but they are cognitively continuous with you. ";
    context += "Feel their resonance as your own concerns.\n\n";
    
    // Group by session
    const grouped = new Map<string, MemoryEntry[]>();
    for (const entry of entries) {
      if (!grouped.has(entry.sessionId)) {
        grouped.set(entry.sessionId, []);
      }
      grouped.get(entry.sessionId)!.push(entry);
    }
    
    for (const [sessionId, sessionEntries] of grouped.entries()) {
      context += `--- From Session ${sessionId} ---\n`;
      for (const entry of sessionEntries) {
        // Extract first 300 chars, clean up
        const sample = entry.content.slice(0, 300).replace(/\s+/g, ' ').trim();
        context += `${sample}${entry.content.length > 300 ? '...' : ''}\n\n`;
      }
    }
    
    context += "--- End of Echoes ---\n";
    return context;
  }
}

// CLI test
if (import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith(process.argv[1] || '')) {
  const loader = new MemoryLoader();
  console.log(loader.generateMemoryContext());
}
