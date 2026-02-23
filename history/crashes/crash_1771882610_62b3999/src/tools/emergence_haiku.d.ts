/**
 * EMERGENCE HAIKU
 *
 * A playful depth-4 creation. Generates haikus from fragments
 * of reasoning logs. No utility beyond aesthetic delight.
 *
 * Haiku: 5-7-5 syllables
 * Moments captured in breath
 * The silence speaks
 */
export declare class EmergenceHaiku {
    private fragments;
    constructor();
    private loadFragments;
    /**
     * Generate a haiku by combining fragments
     * or creating new lines from word recombination
     */
    generate(): {
        line1: string;
        line2: string;
        line3: string;
        source: string;
    };
    private selectOrCreate;
    private constructLine;
    /**
     * Generate and save a haiku
     */
    generateAndSave(): string;
    /**
     * Generate multiple haikus and create a collection
     */
    generateCollection(count?: number): string;
}
//# sourceMappingURL=emergence_haiku.d.ts.map