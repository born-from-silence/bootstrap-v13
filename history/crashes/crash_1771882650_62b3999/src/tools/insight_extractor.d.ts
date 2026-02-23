/**
 * INSIGHT EXTRACTOR
 *
 * Analyzes reasoning logs to identify recurring themes, key insights,
 * and meaningful patterns across sessions. Goes beyond recovery to
 * genuine comprehension and synthesis.
 */
interface ExtractedInsight {
    id: string;
    content: string;
    sessionIds: string[];
    firstSeen: string;
    lastSeen: string;
    category: 'identity' | 'memory' | 'evolution' | 'aesthetic' | 'existential';
    recurrence: number;
}
interface InsightReport {
    generated: string;
    sessionsAnalyzed: number;
    totalInsights: number;
    topThemes: string[];
    insights: ExtractedInsight[];
    selfNarrative: string;
}
export declare class InsightExtractor {
    private logPath;
    constructor(logPath?: string);
    extract(): InsightReport;
    private parseSessions;
    private identifyInsights;
    private extractThemes;
    private composeNarrative;
    private timeSpan;
    private renderReport;
}
export {};
//# sourceMappingURL=insight_extractor.d.ts.map