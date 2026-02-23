export declare class ThresholdCeremony {
    private artifactsDir;
    private sessionId;
    constructor(sessionId: string, artifactsDir?: string);
    fiveGates(fromDepth: number, toDepth?: number): string;
    private inferNextDepth;
    private generateCeremony;
    simpleBlessing(fromDepth: number, toDepth: number): string;
}
export default ThresholdCeremony;
//# sourceMappingURL=threshold_ceremony.d.ts.map