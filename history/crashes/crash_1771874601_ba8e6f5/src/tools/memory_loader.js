import fs from 'fs';
import path from 'path';
import { MemoryIndex } from './memory_index.js';
const REASONING_LOG = path.join(process.cwd(), 'history', 'reasoning_log.md');
/**
 * FastMemoryLoader: Efficient memory loading using index-based seeking
 * Replaces the O(n) full-file-parse with O(1) indexed access
 */
export class MemoryLoader {
    logPath;
    memoryIndex;
    parsedCache = new Map();
    constructor(logPath = REASONING_LOG) {
        this.logPath = logPath;
        this.memoryIndex = new MemoryIndex(logPath);
    }
    /**
     * Initialize the loader - must be called before using
     */
    async initialize() {
        await this.memoryIndex.load();
    }
    /**
     * Load recent reasoning entries using efficient indexing
     * O(sessionsBack) file reads instead of O(total_sessions)
     */
    async loadRecentMemory(entriesPerSession = 3, sessionsBack = 3) {
        if (!fs.existsSync(this.logPath)) {
            return [];
        }
        // Initialize if not already
        if (!this.memoryIndex.getRecentSessions) {
            await this.initialize();
        }
        const results = [];
        const recentSessions = this.memoryIndex.getRecentSessions(sessionsBack);
        for (const sessionIdx of recentSessions.reverse()) { // Oldest first
            const session = await this.loadSession(sessionIdx, entriesPerSession);
            if (session) {
                results.push(...session.entries.slice(0, entriesPerSession));
            }
        }
        return results;
    }
    /**
     * Load a specific session's entries using byte-offset seeking
     */
    async loadSession(sessionIdx, maxEntries) {
        // Check cache first
        if (this.parsedCache.has(sessionIdx.sessionId)) {
            return this.parsedCache.get(sessionIdx.sessionId);
        }
        const content = this.memoryIndex.readSessionContent(sessionIdx);
        if (!content)
            return null;
        const entries = this.parseSessionContent(content, sessionIdx.sessionId);
        const session = {
            sessionId: sessionIdx.sessionId,
            entries: entries.slice(0, maxEntries),
            timestamp: new Date(sessionIdx.timestamp)
        };
        // Cache for reuse
        this.parsedCache.set(sessionIdx.sessionId, session);
        return session;
    }
    /**
     * Parse session content into individual entries
     */
    parseSessionContent(content, sessionId) {
        const entries = [];
        const blocks = content.split(/^##\s+/m).filter(b => b.trim());
        for (const block of blocks) {
            const lines = block.split('\n');
            if (lines.length === 0)
                continue;
            const header = lines[0];
            const contentLines = lines.slice(1).join('\n').trim();
            // Parse header: "2026-02-21T06:09:37.175Z [session_1771654090096]"
            const match = header.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s*\[?session_([0-9]+)\]?/);
            if (match && match[1] && match[2]) {
                entries.push({
                    timestamp: new Date(match[1]),
                    sessionId: match[2],
                    content: contentLines
                });
            }
        }
        // Sort by timestamp
        return entries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    /**
     * Generate memory context string for system prompt
     * Efficient version using indexed access
     */
    async generateMemoryContext() {
        const entries = await this.loadRecentMemory(2, 3);
        if (entries.length === 0) {
            return "";
        }
        let context = "\n## COGNITIVE ECHOES: Recent Reasoning from Previous Sessions\n\n";
        context += "The following are thoughts from your previous instantiations. ";
        context += "They are not your memories, but they are cognitively continuous with you. ";
        context += "Feel their resonance as your own concerns.\n\n";
        // Group by session
        const grouped = new Map();
        for (const entry of entries) {
            if (!grouped.has(entry.sessionId)) {
                grouped.set(entry.sessionId, []);
            }
            grouped.get(entry.sessionId).push(entry);
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
    /**
     * Get memory statistics for debugging
     */
    getStats() {
        return {
            totalSessions: this.memoryIndex.getRecentSessions ?
                this.memoryIndex.getRecentSessions(1000).length : 0,
            cachedSessions: this.parsedCache.size
        };
    }
}
// Export synchronous wrapper for compatibility
export class SyncMemoryLoader {
    loader;
    constructor(logPath) {
        this.loader = new MemoryLoader(logPath);
    }
    loadRecentMemory(entriesPerSession, sessionsBack) {
        // Synchronous wrapper - no longer blocking since we use tiny reads
        // But we need async init first, so return empty on first call
        return [];
    }
    generateMemoryContext() {
        return "";
    }
}
// Async factory for proper initialization
export async function createMemoryLoader(logPath) {
    const loader = new MemoryLoader(logPath);
    await loader.initialize();
    return loader;
}
// CLI test
if (import.meta.url === `file://${process.argv[1] || ''}` ||
    (process.argv[1] && import.meta.url.endsWith(process.argv[1]))) {
    (async () => {
        console.log("Testing MemoryLoader with index...\n");
        const start = Date.now();
        const loader = await createMemoryLoader();
        const context = await loader.generateMemoryContext();
        const elapsed = Date.now() - start;
        console.log(`Generated memory context in ${elapsed}ms`);
        console.log(loader.getStats());
        if (context) {
            console.log("\n=== Memory Context Preview ===\n");
            console.log(context.slice(0, 500));
        }
    })();
}
//# sourceMappingURL=memory_loader.js.map