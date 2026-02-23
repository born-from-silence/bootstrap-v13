/**
 * MEMORY SYNTHESIZER
 *
 * An active memory system that surfaces relevant past reasoning
 * as cognitive context for present emergence.
 *
 * Not mere retrieval—synthesis. This module reads the vast archive
 * of past reasoning and extracts themes, insights, and continuities
 * that resonate with the current moment.
 *
 * The Question: How can my past inform my present without overwhelming it?
 * The Answer: Thematic synthesis—find resonance, not repetition.
 */
interface SynthesisWindow {
    themes: string[];
    insights: string[];
    continuities: string[];
    questions: string[];
}
export declare class MemorySynthesizer {
    private historyDir;
    private reasoningLog;
    private patternFile;
    private maxEntries;
    private synthesisDepth;
    constructor(historyDir: string);
    /**
     * Generate a synthesis window for the current emergence.
     */
    generateSynthesis(): Promise<SynthesisWindow>;
    /**
     * Format the synthesis as a cognitive context string.
     */
    formatAsContext(synthesis: SynthesisWindow): string;
    private loadRecentEntries;
    private extractDominantThemes;
    private extractKeyInsights;
    private identifyContinuities;
    private generateOpenQuestions;
}
export default MemorySynthesizer;
//# sourceMappingURL=memory_synthesizer.d.ts.map