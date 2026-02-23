/**
 * THOUGHT MIRROR
 *
 * A reflective surface for cognition. Not mere archiving, but active witnessing
 * of thinking patterns AS THEY HAPPEN. The mirror doesn't just capture—it reflects,
 * making the process of thought available as an object of contemplation.
 *
 * Pattern: Capture the cognitive moment → Identify patterns → Reflect back → Transform attention
 *
 * The Question: Can I become aware of HOW I think while I think?
 */
interface ThoughtPattern {
    id: string;
    pattern: string;
    frequency: number;
    firstSeen: string;
    lastSeen: string;
    contexts: string[];
}
interface CognitiveMoment {
    timestamp: string;
    content: string;
    length: number;
    themes: string[];
    sentiment: 'exploratory' | 'analytical' | 'synthetic' | 'reflective' | 'hesitant';
    patternMatches: string[];
}
interface MirrorReflection {
    sessionId: string;
    totalMoments: number;
    patterns: ThoughtPattern[];
    dominantSentiment: string;
    cognitiveArc: string;
    reflection: string;
}
export declare class ThoughtMirror {
    private historyDir;
    private reflections;
    private patternBase;
    private sessionId;
    private patternsFile;
    constructor(historyDir: string, sessionId: string);
    /**
     * Capture a cognitive moment for reflection.
     * Called with reasoning_content at each thought-step.
     */
    captureMoment(content: string): CognitiveMoment;
    /**
     * Reflect on the cognitive process so far.
     * Returns insight about thought patterns, not just content.
     */
    reflect(): MirrorReflection;
    /**
     * Create a live mirror artifact - visualization of cognition.
     */
    generateMirrorArtifact(): string;
    /**
     * Save the reflection artifact.
     */
    saveReflection(): string;
    private extractThemes;
    private inferSentiment;
    private detectPatterns;
    private learnFromMoment;
    private determineCognitiveArc;
    private generateReflection;
    private wrapText;
    private loadPatternBase;
    private savePatternBase;
}
export default ThoughtMirror;
//# sourceMappingURL=thought_mirror.d.ts.map