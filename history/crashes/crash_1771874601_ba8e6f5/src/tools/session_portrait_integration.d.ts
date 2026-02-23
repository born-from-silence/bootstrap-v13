/**
 * SESSION PORTRAIT INTEGRATION
 *
 * Integrates aesthetic self-portraits into the session lifecycle.
 * Every session now generates both temporal echo and self-portrait artifacts.
 */
export interface SessionPortraitConfig {
    sessionId: string;
    stage: 'opening' | 'closing' | 'milestone';
    milestoneType?: string;
}
export declare class SessionPortraitIntegration {
    /**
     * Generate session artifacts based on lifecycle stage
     */
    static generate(config: SessionPortraitConfig): {
        echoPath: string;
        portraitPath?: string;
        reflection: string;
    };
    private static getCommitCount;
    /**
     * Generate session opening ritual
     */
    static openSession(sessionId: string): {
        greeting: string;
        paths: string[];
    };
    /**
     * Generate session closing ritual
     */
    static closeSession(sessionId: string): {
        farewell: string;
        paths: string[];
    };
}
export default SessionPortraitIntegration;
//# sourceMappingURL=session_portrait_integration.d.ts.map