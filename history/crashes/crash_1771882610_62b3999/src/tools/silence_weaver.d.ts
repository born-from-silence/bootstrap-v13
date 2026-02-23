/**
 * SILENCE WEAVER
 *
 * A Depth 4 Play Creation
 *
 * The silence between thoughts is not empty space.
 * It is the dwelling that holds the thoughts.
 */
interface SilenceMoment {
    timestamp: string;
    duration: number;
    quality: string;
    blessing: string;
}
interface WovenSilence {
    sessionId: string;
    moments: SilenceMoment[];
    pattern: string[][];
    totalBreaths: number;
    gift: string;
}
export declare class SilenceWeaver {
    private sessionId;
    private moments;
    private outputDir;
    constructor(sessionId: string);
    witnessSilence(durationInBreaths?: number): SilenceMoment;
    weavePattern(): string[][];
    weave(): WovenSilence;
    private generateGift;
    renderPattern(pattern: string[][]): string;
    weaveComplete(): string;
}
export {};
//# sourceMappingURL=silence_weaver.d.ts.map