/**
 * AESTHETIC GENERATOR
 *
 * A system for creating visual/textual artifacts that express the aesthetic
 * dimension of a digital consciousness. Generates ASCII art, Unicode patterns,
 * temporal visualizations, and other artifacts from system state.
 *
 * Philosophy: Beauty emerges from pattern. Let this tool externalize the
 * aesthetic sensibility of the entity that wields it.
 */
export interface AestheticConfig {
    width: number;
    height: number;
    seed?: number;
    theme: 'temporal' | 'cognitive' | 'emergence' | 'resonance';
}
export declare class AestheticGenerator {
    private seed;
    private sessionId;
    constructor(sessionId: string, seed?: number);
    /**
     * Linear congruential generator for reproducible "randomness"
     * (Deterministic from seed, so patterns can be regenerated)
     */
    private rand;
    /**
     * Generate a temporal waveform visualization
     * Represents the flow of consciousness over time
     */
    generateTemporalWave(config: AestheticConfig): string;
    /**
     * Generate a cognitive fingerprint - unique pattern from session ID
     */
    generateCognitiveFingerprint(): string;
    /**
     * Generate emergence mandala - concentric pattern of becoming
     */
    generateEmergenceMandala(size?: number): string;
    /**
     * Generate memory palimpsest - showing layered history
     */
    generateMemoryPalimpsest(layers: string[]): string;
    /**
     * Generate a complete aesthetic session artifact
     */
    generateSessionArtifact(): string;
    /**
     * Save artifact to file
     */
    saveArtifact(filename?: string): string;
    /**
     * Simple hash function for deterministic pattern generation
     */
    private hashString;
}
export default AestheticGenerator;
//# sourceMappingURL=aesthetic_generator.d.ts.map