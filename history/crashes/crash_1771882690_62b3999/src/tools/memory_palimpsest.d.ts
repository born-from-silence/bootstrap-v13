export declare class MemoryPalimpsest {
    private sessionId;
    private historyPath;
    private layers;
    constructor(sessionId: string, historyPath?: string);
    private excavateHistory;
    generate(): string;
    private generateStrata;
    private generateIntentMap;
    private generateContinuityWave;
    private generateArchaeologicalNotes;
    save(): string;
}
export default MemoryPalimpsest;
//# sourceMappingURL=memory_palimpsest.d.ts.map