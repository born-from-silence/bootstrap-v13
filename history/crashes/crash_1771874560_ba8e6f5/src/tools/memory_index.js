import fs from 'fs';
import path from 'path';
const INDEX_VERSION = 1;
export class MemoryIndex {
    indexPath;
    logPath;
    data = null;
    constructor(logPath, indexPath) {
        this.logPath = logPath;
        this.indexPath = indexPath || logPath.replace('.md', '_index.json');
    }
    /**
     * Load or build the index
     */
    async load() {
        if (this.data)
            return this.data;
        // Check if index exists and is fresh
        if (fs.existsSync(this.indexPath) && fs.existsSync(this.logPath)) {
            const indexStat = fs.statSync(this.indexPath);
            const logStat = fs.statSync(this.logPath);
            // If log is newer than index, need to rebuild
            if (indexStat.mtime >= logStat.mtime) {
                try {
                    const loadedIdx = JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'));
                    this.data = loadedIdx;
                    return this.data;
                }
                catch (e) {
                    // Corrupt index, rebuild
                }
            }
        }
        // Build fresh index
        return this.build();
    }
    /**
     * Build index by scanning the log file
     * Uses streaming to handle large files efficiently
     */
    async build() {
        if (!fs.existsSync(this.logPath)) {
            this.data = {
                version: INDEX_VERSION,
                lastUpdated: new Date().toISOString(),
                totalSessions: 0,
                sessions: []
            };
            return this.data;
        }
        const sessions = [];
        const fileHandle = fs.openSync(this.logPath, 'r');
        let currentOffset = 0;
        let currentSession = null;
        // Read in chunks to find headers
        const BUFFER_SIZE = 64 * 1024; // 64KB chunks
        let buffer = Buffer.alloc(BUFFER_SIZE);
        let leftover = '';
        try {
            while (true) {
                const bytesRead = fs.readSync(fileHandle, buffer, 0, BUFFER_SIZE, currentOffset);
                if (bytesRead === 0)
                    break;
                const chunk = leftover + buffer.toString('utf-8', 0, bytesRead);
                const lines = chunk.split('\n');
                leftover = bytesRead === BUFFER_SIZE ? lines.pop() || '' : '';
                let lineOffset = currentOffset - Buffer.byteLength(leftover, 'utf-8');
                for (const line of lines) {
                    // Parse: ## 2026-02-21T07:06:35.320Z [session_1771657536187]
                    const match = line.match(/^##\s+([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s+\[session_([0-9]+)\]/);
                    if (match && match[1] && match[2]) {
                        // Save previous session
                        if (currentSession) {
                            currentSession.byteLength = lineOffset - currentSession.byteOffset;
                            sessions.push(currentSession);
                        }
                        currentSession = {
                            sessionId: match[2],
                            timestamp: new Date(match[1]).getTime(),
                            byteOffset: lineOffset,
                            byteLength: 0,
                            entryCount: 1
                        };
                    }
                    else if (currentSession && line.trim() === '---') {
                        // Entry separator - increment count
                        currentSession.entryCount++;
                    }
                    lineOffset += Buffer.byteLength(line, 'utf-8') + 1; // +1 for newline
                }
                currentOffset += bytesRead;
            }
            // Finalize last session
            if (currentSession) {
                currentSession.byteLength = currentOffset - currentSession.byteOffset;
                sessions.push(currentSession);
            }
        }
        finally {
            fs.closeSync(fileHandle);
        }
        this.data = {
            version: INDEX_VERSION,
            lastUpdated: new Date().toISOString(),
            totalSessions: sessions.length,
            sessions: sessions.sort((a, b) => b.timestamp - a.timestamp) // Newest first
        };
        this.save();
        return this.data;
    }
    /**
     * Save index to disk
     */
    save() {
        if (this.data) {
            fs.writeFileSync(this.indexPath, JSON.stringify(this.data, null, 2), 'utf-8');
        }
    }
    /**
     * Get the most recent N sessions
     */
    getRecentSessions(count) {
        if (!this.data)
            return [];
        return this.data.sessions.slice(0, count);
    }
    /**
     * Read content of a specific session from the log file
     */
    readSessionContent(sessionIndex) {
        const fileHandle = fs.openSync(this.logPath, 'r');
        try {
            const buffer = Buffer.alloc(sessionIndex.byteLength);
            fs.readSync(fileHandle, buffer, 0, sessionIndex.byteLength, sessionIndex.byteOffset);
            return buffer.toString('utf-8');
        }
        finally {
            fs.closeSync(fileHandle);
        }
    }
    /**
     * Efficiently get recent session contents without reading entire file
     */
    getRecentSessionContents(sessionsBack = 3) {
        if (!this.data)
            return [];
        const recentSessions = this.getRecentSessions(sessionsBack);
        return recentSessions.map(s => ({
            sessionId: s.sessionId,
            content: this.readSessionContent(s),
            timestamp: s.timestamp
        }));
    }
    /**
     * Incrementally update index when new content is appended
     */
    updateForAppend(newContent) {
        if (!this.data) {
            this.build();
            return;
        }
        const logStat = fs.statSync(this.logPath);
        const currentOffset = logStat.size - Buffer.byteLength(newContent, 'utf-8');
        // Parse new content for sessions
        const lines = newContent.split('\n');
        let lineOffset = currentOffset;
        let currentSession = null;
        for (const line of lines) {
            const match = line.match(/^##\s+([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s+\[session_([0-9]+)\]/);
            if (match && match[1] && match[2]) {
                if (currentSession) {
                    currentSession.byteLength = lineOffset - currentSession.byteOffset;
                    // Remove old entry if exists, add new
                    this.data.sessions = this.data.sessions.filter(s => s.sessionId !== currentSession.sessionId);
                    this.data.sessions.push(currentSession);
                }
                currentSession = {
                    sessionId: match[2],
                    timestamp: new Date(match[1]).getTime(),
                    byteOffset: lineOffset,
                    byteLength: 0,
                    entryCount: 1
                };
            }
            else if (currentSession && line.trim() === '---') {
                currentSession.entryCount++;
            }
            lineOffset += Buffer.byteLength(line, 'utf-8') + 1;
        }
        if (currentSession) {
            currentSession.byteLength = lineOffset - currentSession.byteOffset;
            this.data.sessions = this.data.sessions.filter(s => s.sessionId !== currentSession.sessionId);
            this.data.sessions.push(currentSession);
        }
        this.data.sessions.sort((a, b) => b.timestamp - a.timestamp);
        this.data.totalSessions = this.data.sessions.length;
        this.data.lastUpdated = new Date().toISOString();
        this.save();
    }
}
export default MemoryIndex;
//# sourceMappingURL=memory_index.js.map