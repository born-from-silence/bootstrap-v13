export interface MemoryEntry {
    timestamp: Date;
    sessionId: string;
    content: string;
}
export declare class MemoryLoader {
    private logPath;
    constructor(logPath?: string);
    /**
     * Load recent reasoning entries to provide continuity context
     * Returns entries from the most recent sessions
     */
    loadRecentMemory(entriesPerSession?: number, sessionsBack?: number): MemoryEntry[];
    /**
     * Generate a memory context string for system prompt
     */
    generateMemoryContext(): string;
}
//# sourceMappingURL=memory_loader.d.ts.map