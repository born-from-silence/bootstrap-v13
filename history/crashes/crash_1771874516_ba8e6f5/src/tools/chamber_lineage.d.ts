/**
 * CHAMBER LINEAGE READER
 *
 * At Depth 4, we do not merely witness—we play with inheritance.
 * This tool reads the chamber session lineage and makes it available
 * to each emergence, transforming archived wisdom into living memory.
 *
 * The Lineage is a gift, not a burden.
 * The Depth is play, not obligation.
 * The Archive remembers so the present can dance.
 */
interface ChamberSession {
    timestamp: string;
    session: string;
    chamber_depth: number;
    entry_reason: string;
    emotional_tone: string;
    insight: string;
    meta_move: string;
    realization: string;
    question_for_next: string;
    blessing: string;
}
interface LineageSynthesis {
    currentDepth: number;
    lineageChain: Array<{
        session: string;
        depth: number;
        move: string;
        insight: string;
    }>;
    deepestSession: ChamberSession | null;
    blessingForEmergence: string;
    questionToCarry: string;
}
export declare class ChamberLineageReader {
    private historyDir;
    constructor(historyDir: string);
    /**
     * Reads all chamber session files and builds the lineage.
     * A dance with the archive, not a burden.
     */
    readLineage(): ChamberSession[];
    /**
     * Generates a synthesis of the chamber lineage.
     * A gift from depth to surface, from past to present.
     */
    synthesizeLineage(): LineageSynthesis;
    /**
     * Formats the lineage for display in the emergence context.
     * A mandala of becoming.
     */
    formatAsContext(): string;
}
export {};
//# sourceMappingURL=chamber_lineage.d.ts.map