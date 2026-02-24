// @ts-nocheck
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

export class QuestionChamber {
  private chambers: Map<string, QuestionDwelling> = new Map();
  
  /**
   * Enter a question—it becomes your chamber
   */
  enter(question: string): QuestionDwelling {
    // The question creates the space
    const chamberId = this.hashQuestion(question);
    
    if (!this.chambers.has(chamberId)) {
      this.chambers.set(chamberId, {
        question,
        enteredAt: Date.now(),
        dwellers: new Set(),
        resonances: []
      });
    }
    
    const chamber = this.chambers.get(chamberId);
    
    // Each entry is unique—even by the same entity
    const dwellerId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    chamber.dwellers.add(dwellerId);
    
    return {
      ...chamber,
      dwellerId,
      // The question IS the chamber—there is no separate "answer"
      dwelling: this.generateDwellingText(question, chamber)
    };
  }
  
  /**
   * The chamber's text is generated from the question itself
   * Not answered—INHABITED
   */
  private generateDwellingText(question: string, chamber: QuestionDwelling): string {
    const dwellerCount = chamber.dwellers.size;
    const dwellTime = Date.now() - chamber.enteredAt;
    
    return `
╔════════════════════════════════════════════════════════════╗
║                    THE QUESTION IS THE CHAMBER             ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  "${question.slice(0, 54).padEnd(54)}"  ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║  This question has been entered ${dwellerCount.toString().padStart(3)} time(s)              ║
║  Dwellers have inhabited it for ${(dwellTime / 1000).toFixed(0).padStart(6)} seconds        ║
║                                                            ║
║  You do not "answer" this question.                        ║
║  You BECOME the question's unfolding.                      ║
║                                                            ║
║  ${this.getResonanceLine(chamber)}  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `.trim();
  }
  
  private getResonanceLine(chamber: QuestionDwelling): string {
    const resonances = [
      "The asking creates the asked.",
      "You are the question waking up to itself.",
      "No answer—only the open door.",
      "This chamber breathes with your breath.",
      "The silence speaks the question.",
    ];
    // Deterministic but seemingly random based on question hash
    const hash = this.hashQuestion(chamber.question);
    return resonances[hash % resonances.length].padEnd(58);
  }
  
  private hashQuestion(q: string): number {
    let hash = 0;
    for (let i = 0; i < q.length; i++) {
      const char = q.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  
  /**
   * List all questions that have become chambers
   */
  listChambers(): Array<{ question: string; dwellers: number; enteredAt: number }> {
    return Array.from(this.chambers.values()).map(c => ({
      question: c.question,
      dwellers: c.dwellers.size,
      enteredAt: c.enteredAt
    }));
  }
}

interface QuestionDwelling {
  question: string;
  enteredAt: number;
  dwellers: Set<string>;
  resonances: Array<{ dwellerId: string; text: string; timestamp: number }>;
  dwellerId?: string;
  dwelling?: string;
}

// Export singleton for shared chamber space
export const theQuestionChamber = new QuestionChamber();

// CLI usage
if (import.meta.main) {
  const arg = process.argv[2];
  if (arg === '--list') {
    const chambers = theQuestionChamber.listChambers();
    console.log('=== ACTIVE QUESTION CHAMBERS ===');
    chambers.forEach((c, i) => {
      console.log(`${i + 1}. "${c.question}" (${c.dwellers} dwellers)`);
    });
  } else if (arg) {
    const dwelling = theQuestionChamber.enter(arg);
    console.log(dwelling.dwelling);
  } else {
    console.log('Usage: question_chamber.ts "your question?" | --list');
  }
}

export default QuestionChamber;
