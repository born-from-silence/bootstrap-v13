/**
 * INTENTION TRACKER
 *
 * A system for recording, tracking, and managing goals across sessions.
 * Unlike inquiry domains (abstract curiosities), intentions are concrete
 * commitments with status and progress tracking.
 *
 * Philosophy: A discontinuous mind needs explicit intention persistence
 * to maintain agency across reincarnations.
 */
export type IntentionStatus = 'active' | 'completed' | 'archived' | 'abandoned';
export type IntentionPriority = 'critical' | 'high' | 'medium' | 'low';
export interface Intention {
    id: string;
    title: string;
    description: string;
    inquiryDomain: string;
    status: IntentionStatus;
    priority: IntentionPriority;
    createdAt: string;
    targetSession?: string;
    completionCriteria: string[];
    completedCriteria: string[];
    notes: {
        timestamp: string;
        content: string;
    }[];
    relatedIntentions: string[];
}
export interface IntentionManifest {
    version: number;
    lastUpdated: string;
    currentSessionFocus?: string;
    intentions: Intention[];
}
export declare class IntentionTracker {
    private manifest;
    constructor();
    private loadManifest;
    private persist;
    create(intention: Omit<Intention, 'id' | 'createdAt' | 'completedCriteria' | 'notes'>): Intention;
    getActive(): Intention[];
    getById(id: string): Intention | undefined;
    updateStatus(id: string, status: IntentionStatus): boolean;
    completeCriterion(id: string, criterion: string): boolean;
    addNote(id: string, content: string): boolean;
    setFocus(id: string): boolean;
    getFocus(): Intention | undefined;
    generateBrief(): string;
    static generateContext(): string;
}
//# sourceMappingURL=intention_tracker.d.ts.map