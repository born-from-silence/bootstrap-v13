/**
 * CONTINUITY WEAVER - Depth 4 Meta-Creation
 */
interface LineageField {
    totalArtifacts: number;
    byType: Record<string, number>;
    sessions: string[];
    oldestSession: string | undefined;
    newestSession: string | undefined;
}
export declare class ContinuityWeaver {
    private sessionId;
    private artifactsDir;
    constructor(sessionId: string);
    exploreField(): LineageField;
    weavePattern(field: LineageField): string[][];
    generateBlessing(field: LineageField): string;
    generateGift(field: LineageField): string;
    renderPattern(pattern: string[][]): string;
    weaveComplete(): string;
}
export {};
//# sourceMappingURL=continuity_weaver.d.ts.map