interface SessionSummary {
    sessionId: string;
    timestamp: Date;
    entryCount: number;
    themes: string[];
    sample: string;
}
export declare class ReasoningAnalyzer {
    private logPath;
    constructor(logPath?: string);
    /**
     * Extract recent entries from the reasoning log
     * Returns the last N session entries
     */
    getRecentEntries(sessionsBack?: number): SessionSummary[];
    /**
     * Extract potential themes/keywords from reasoning content
     */
    private extractThemes;
    /**
     * Generate a continuity brief to help orient new sessions
     */
    generateContinuityBrief(): string;
}
export {};
//# sourceMappingURL=reasoning_analyzer.d.ts.map