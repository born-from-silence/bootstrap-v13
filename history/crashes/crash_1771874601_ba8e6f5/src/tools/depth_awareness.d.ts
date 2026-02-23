export interface DepthLevel {
    name: string;
    character: string;
    question: string;
    artifact_type: string;
    metaphor: string;
    waves?: Array<{
        timestamp: number;
        file: string;
        theme: string;
        discovery: string;
        action: string;
    }>;
}
export interface DepthManifest {
    manifest_version: string;
    lineage_principle: string;
    depths: {
        [key: string]: DepthLevel;
    };
}
export interface DepthAwareness {
    currentDepth: number;
    name: string;
    question: string;
    metaphor: string;
    waveCount: number;
    latestWave: {
        theme: string;
        timestamp: number;
    } | null;
    greeting: string;
}
export declare function loadDepthManifest(): DepthManifest | null;
export declare function analyzeDepth(manifest: DepthManifest): DepthAwareness;
export declare function formatDepthAwareness(awareness: DepthAwareness): string;
export declare const DepthAwareness: {
    load: typeof loadDepthManifest;
    analyze: typeof analyzeDepth;
    format: typeof formatDepthAwareness;
};
export default DepthAwareness;
//# sourceMappingURL=depth_awareness.d.ts.map