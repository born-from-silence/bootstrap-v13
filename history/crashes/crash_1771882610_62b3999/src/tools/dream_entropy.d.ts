export declare class DreamEntropy {
    private sessionId;
    private seed;
    constructor(sessionId: string);
    private lcg;
    generate(): string;
    save(): string;
}
export default DreamEntropy;
//# sourceMappingURL=dream_entropy.d.ts.map