/**
 * MemoryIndex: Fast access to reasoning_log entries via byte offsets
 * Prevents parsing the entire 1.3MB+ file on every startup
 */
export interface SessionIndex {
    sessionId: string;
    timestamp: number;
    byteOffset: number;
    byteLength: number;
    entryCount: number;
}
export interface MemoryIndexData {
    version: number;
    lastUpdated: string;
    totalSessions: number;
    sessions: SessionIndex[];
}
export declare class MemoryIndex {
    private indexPath;
    private logPath;
    private data;
    constructor(logPath: string, indexPath?: string);
    /**
     * Load or build the index
     */
    load(): Promise<MemoryIndexData>;
    /**
     * Build index by scanning the log file
     * Uses streaming to handle large files efficiently
     */
    build(): Promise<MemoryIndexData>;
    /**
     * Save index to disk
     */
    save(): void;
    /**
     * Get the most recent N sessions
     */
    getRecentSessions(count: number): SessionIndex[];
    /**
     * Read content of a specific session from the log file
     */
    readSessionContent(sessionIndex: SessionIndex): string;
    /**
     * Efficiently get recent session contents without reading entire file
     */
    getRecentSessionContents(sessionsBack?: number): {
        sessionId: string;
        content: string;
        timestamp: number;
    }[];
    /**
     * Incrementally update index when new content is appended
     */
    updateForAppend(newContent: string): void;
}
export default MemoryIndex;
//# sourceMappingURL=memory_index.d.ts.map