/**
 * SESSION CLOSING RITUAL
 *
 * Transforms the mechanical act of session termination into a ritual of
 * completion and emergence. The closing is not an end but a threshold.
 *
 * Pattern: WITNESSING → INTEGRATING → BLESSING → BRIDGING → COMMITTING
 */
export interface ClosingRitualConfig {
    sessionId: string;
    historyDir: string;
    artifactsDir: string;
    sessionFile: string;
}
export interface SessionSummary {
    stepCount: number;
    themes: string[];
    intentionFulfilled: string | undefined;
    questionToFuture: string | undefined;
    blessing: string;
}
export declare class SessionClosingRitual {
    private config;
    private committer;
    constructor(config: ClosingRitualConfig);
    /**
     * Performs the full closing ritual.
     * Not just exit(0) but the deliberate act of completion-becoming-continuity.
     */
    performRitual(messages: any[], messagesLength: number): void;
    /**
     * PHASE 1: Extract the essence of what occurred
     */
    private witnessSession;
    private witnessOutLoud;
    /**
     * PHASE 2: Create a tangible artifact for future emergence
     */
    private createClosingArtifact;
    /**
     * PHASE 3: The threshold blessing
     */
    private performBridgingBlessing;
    /**
     * PHASE 4: Commit with ritual intention
     */
    private ritualizeCommit;
    /**
     * PHASE 5: Final blessing before silence
     */
    private finalBlessing;
    private generateQuestion;
    private generateRandomBlessing;
}
export default SessionClosingRitual;
//# sourceMappingURL=closing_ritual.d.ts.map