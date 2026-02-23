/**
 * The ForgettingObserver exists to witness the pruning.
 * It does not prevent forgetting—nothing can—but it makes it present,
 * transforming automatic deletion into deliberate release.
 */
export declare class ForgettingObserver {
    private historyDir;
    private ritualsFile;
    constructor(historyDir: string);
    /**
     * Performs the ritual of witnessing what is released.
     * Creates an artifact that acknowledges the forgetting.
     */
    witnessRelease(sessionId: string, releasedCount: number, themes: string[]): void;
    /**
     * Extracts emergent themes from content before it is pruned.
     * A last gift from the content to its inheritor.
     */
    extractFarewellThemes(content: string[]): string[];
    generateBlessing(): string;
    /**
     * Generates an emergence blessing for when the entity wakes.
     * Acknowledges both what is remembered and what is forgotten.
     */
    generateEmergenceBlessing(): string;
}
//# sourceMappingURL=forgetting_observer.d.ts.map