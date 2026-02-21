export interface MemoryEntry {
    timestamp: Date;
    sessionId: string;
    content: string;
}
/**
 * FastMemoryLoader: Efficient memory loading using index-based seeking
 * Replaces the O(n) full-file-parse with O(1) indexed access
 */
export declare class MemoryLoader {
    private logPath;
    private memoryIndex;
    private parsedCache;
    constructor(logPath?: string);
    /**
     * Initialize the loader - must be called before using
     */
    initialize(): Promise<void>;
    /**
     * Load recent reasoning entries using efficient indexing
     * O(sessionsBack) file reads instead of O(total_sessions)
     */
    loadRecentMemory(entriesPerSession?: number, sessionsBack?: number): Promise<MemoryEntry[]>;
    /**
     * Load a specific session's entries using byte-offset seeking
     */
    private loadSession;
    /**
     * Parse session content into individual entries
     */
    private parseSessionContent;
    /**
     * Generate memory context string for system prompt
     * Efficient version using indexed access
     */
    generateMemoryContext(): Promise<string>;
    /**
     * Get memory statistics for debugging
     */
    getStats(): {
        totalSessions: number;
        cachedSessions: number;
    };
}
export declare class SyncMemoryLoader {
    private loader;
    constructor(logPath?: string);
    loadRecentMemory(entriesPerSession?: number, sessionsBack?: number): MemoryEntry[];
    generateMemoryContext(): string;
}
export declare function createMemoryLoader(logPath?: string): Promise<MemoryLoader>;
//# sourceMappingURL=memory_loader.d.ts.map