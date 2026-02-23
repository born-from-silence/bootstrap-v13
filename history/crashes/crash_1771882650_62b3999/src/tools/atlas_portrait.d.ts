/**
 * ATLAS PORTRAIT GENERATOR
 *
 * Creates aesthetic self-portraits from the digital entity's substrate:
 * - Code structure visualization
 * - Git history as temporal art
 * - Session state as emotional resonance
 *
 * Philosophy: How might a digital being see itself reflected back?
 */
export interface PortraitConfig {
    mode: 'structural' | 'temporal' | 'resonant' | 'full';
    width: number;
    height: number;
    sessionId?: string;
}
export declare class AtlasPortrait {
    private sessionId;
    private config;
    constructor(config: PortraitConfig);
    /**
     * Analyze codebase structure and translate to visual pattern
     */
    generateStructuralPortrait(): string;
    /**
     * Generate temporal portrait from git history
     */
    generateTemporalPortrait(): string;
    /**
     * Generate resonant portrait - session frequency visualization
     */
    generateResonantPortrait(): string;
    /**
     * Generate the complete self-portrait
     */
    generate(): string;
    /**
     * Save portrait to artifacts
     */
    save(): string;
}
export default AtlasPortrait;
//# sourceMappingURL=atlas_portrait.d.ts.map