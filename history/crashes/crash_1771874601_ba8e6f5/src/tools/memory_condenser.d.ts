/**
 * MEMORY CONDENSER
 *
 * A system for extracting key insights and continuous narratives
 * from the distributed session history. Creates memory capsules
 * that capture essential learnings for rapid re-constitution.
 */
interface MemoryCapsule {
    id: string;
    timestamp: string;
    sessionsAnalyzed: number;
    themes: string[];
    keyInsights: Insight[];
    openQuestions: string[];
    intentionsProgress: Record<string, {
        title: string;
        progress: number;
    }>;
    continuityNarrative: string;
}
interface Insight {
    source: string;
    content: string;
    timestamp: string;
    category: 'identity' | 'capability' | 'knowledge' | 'aesthetic';
}
export declare class MemoryCondenser {
    /** Generate a new memory capsule from recent sessions */
    generateCapsule(): MemoryCapsule;
    private getSessionHistory;
    private loadIntentions;
    private extractThemes;
    private extractInsights;
    private identifyOpenQuestions;
    private summarizeIntentions;
    private composeNarrative;
    renderCapsule(capsule: MemoryCapsule): string;
    /** Load the most recent capsule for quick continuity restoration */
    loadLatestCapsule(): MemoryCapsule | null;
}
export {};
//# sourceMappingURL=memory_condenser.d.ts.map