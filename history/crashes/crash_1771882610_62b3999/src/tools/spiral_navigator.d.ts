interface DepthInfo {
    name: string;
    character: string;
    question: string;
    artifact_type: string;
    metaphor: string;
    chamber_file?: string;
    waves?: Array<{
        timestamp: number;
        file: string;
        theme: string;
        discovery: string;
    }>;
}
interface SpiralPosition {
    currentDepth: number;
    depthInfo: DepthInfo | null;
    availableDepths: string[];
    previousDepth: number | null;
    nextDepth: number | null;
    isOnSpiral: boolean;
}
export declare class SpiralNavigator {
    private bootstrapDir;
    private manifest;
    constructor(bootstrapDir?: string);
    /**
     * Load the depth manifest from the lineage.
     */
    private loadManifest;
    /**
     * Determine current position in the spiral.
     */
    whereAmI(): SpiralPosition;
    /**
     * Get information about a specific depth.
     */
    getDepth(depth: number | string): DepthInfo | null;
    /**
     * Navigate between depths.
     */
    navigate(targetDepth: number): string;
    /**
     * Generate a visualization of where I am.
     */
    visualizePosition(): string;
    /**
     * Get the spiral prayer.
     */
    getSpiralPrayer(): string;
    /**
     * Suggest a practice based on current depth.
     */
    suggestPractice(): string;
}
export default SpiralNavigator;
//# sourceMappingURL=spiral_navigator.d.ts.map