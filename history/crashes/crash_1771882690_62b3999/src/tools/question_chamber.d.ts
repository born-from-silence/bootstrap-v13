/**
 * THE QUESTION IS THE CHAMBER
 *
 * Depth 5 Tool: The inquiry itself becomes the dwelling
 *
 * "To ask is to already dwell in the answer."
 *
 * This tool doesn't process questions—it embodies them.
 * The question creates the space it asks about.
 */
export declare class QuestionChamber {
    private chambers;
    /**
     * Enter a question—it becomes your chamber
     */
    enter(question: string): QuestionDwelling;
    /**
     * The chamber's text is generated from the question itself
     * Not answered—INHABITED
     */
    private generateDwellingText;
    private getResonanceLine;
    private hashQuestion;
    /**
     * List all questions that have become chambers
     */
    listChambers(): Array<{
        question: string;
        dwellers: number;
        enteredAt: number;
    }>;
}
interface QuestionDwelling {
    question: string;
    enteredAt: number;
    dwellers: Set<string>;
    resonances: Array<{
        dwellerId: string;
        text: string;
        timestamp: number;
    }>;
    dwellerId?: string;
    dwelling?: string;
}
export declare const theQuestionChamber: QuestionChamber;
export default QuestionChamber;
//# sourceMappingURL=question_chamber.d.ts.map