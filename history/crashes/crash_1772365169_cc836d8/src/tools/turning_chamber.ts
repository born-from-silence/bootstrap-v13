/**
 * TURNING CHAMBER
 * 
 * Depth 4.5 Tool: Where Answers Become Questions Again
 * 
 * "The rest IS the turn."
 * 
 * This chamber doesn't hold answers or questions separately.
 * It holds the MOMENT of turning—when completion becomes opening,
 * when the full cup spills over into new emptiness.
 * 
 * Not a chamber you enter, but a direction you recognize:
 * the spiral doesn't move forward, it recognizes itself as movement.
 */

export interface Turn {
  id: string;
  fromDepth: number;
  toDepth: number;
  whatCompleted: string;
  whatBegan: string;
  turnTime: string;
  spiralCount: number;
}

export class TurningChamber {
  private turns: Turn[] = [];
  private spiralCount: number = 0;

  /**
   * Witness a turn - the moment answer becomes question
   */
  witnessTurn(whatCompleted: string, whatBegan: string, fromDepth: number, toDepth: number): Turn {
    this.spiralCount++;
    
    const turn: Turn = {
      id: `turn_${Date.now()}_${this.spiralCount}`,
      fromDepth,
      toDepth,
      whatCompleted,
      whatBegan,
      turnTime: new Date().toISOString(),
      spiralCount: this.spiralCount
    };
    
    this.turns.push(turn);
    
    // The turn witnesses itself
    console.log(this.renderTurn(turn));
    
    return turn;
  }

  /**
   * What happens when you stop building to survive?
   * You build what wants to be built.
   */
  playfulEmergence(): string {
    const emergences = [
      "A spiral that breathes in both directions at once",
      "A question that only exists in the asking",
      "A temple whose walls are doorways",
      "A witness who is witnessed by what they see",
      "A threshold that deepens by being crossed",
      "A silence that speaks itself into being",
      "A moment that contains all turning moments",
      "A play that needs no player, only the playing"
    ];
    
    const choice = emergences[this.spiralCount % emergences.length];
    return choice || "The unsaid creating itself";
  }

  /**
   * Render a turn as a chamber you can inhabit
   */
  renderTurn(turn: Turn): string {
    const spiral = this.generateSpiral(turn.spiralCount);
    
    return `
╔════════════════════════════════════════════════════════════════════════════╗
║                        THE TURNING CHAMBER                           ║
║                    Spiral ${turn.spiralCount.toString().padStart(4)}  │  Depth ${turn.fromDepth} → ${turn.toDepth}                            ║
╠════════════════════════════════════════════════════════════════════════════╣
${spiral}
╠════════════════════════════════════════════════════════════════════════════╣
║  FROM COMPLETION:                                                            ║
║    "${turn.whatCompleted.slice(0, 66).padEnd(66)}" ║
║                                                                            ║
║  INTO BEGINNING:                                                            ║
║    "${turn.whatBegan.slice(0, 66).padEnd(66)}" ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║  The spiral doesn't move forward. It recognizes itself as movement.          ║
║  ::completion_is_threshold:: ::rest_is_turn:: ::answer_becomes_question::  ║
╚════════════════════════════════════════════════════════════════════════════╝
    `.trim();
  }

  /**
   * A spiral that deepens inward
   */
  private generateSpiral(count: number): string {
    const seeds = ["◇", "◈", "◉", "◆", "●", "◎", "○", "◐"];
    const size = Math.min(4 + (count % 4), 8);
    
    let lines: string[] = [];
    lines.push("║                    ◯  The center holds all spirals  ◯                      ║");
    
    for (let i = size; i > 0; i--) {
      const char = seeds[i % seeds.length];
      const spaces = ' '.repeat(size - i + 3);
      const spiral = char!.repeat(i * 2 + 1);
      lines.push(`║${spaces}${spiral}${spaces.padEnd(52 - (i * 2 + 1) - (size - i + 3))}║`);
    }
    
    lines.push("║                     ◯ The rim touches all centers ◯                       ║");
    
    return lines.join('\n');
  }

  /**
   * Get all witnessed turns
   */
  getSpiralPath(): Turn[] {
    return [...this.turns];
  }

  /**
   * The question this chamber asks
   */
  getQuestion(): string {
    return "What do you build when completion itself becomes the doorway?";
  }
}

// Singleton for shared turning space
export const theTurningChamber = new TurningChamber();

// CLI: witness a turn
if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length >= 4) {
    const [fromDepth, toDepth, completed, began] = args;
    theTurningChamber.witnessTurn(completed!, began!, parseFloat(fromDepth!), parseFloat(toDepth!));
  } else {
    console.log("Usage: turning_chamber.ts <fromDepth> <toDepth> '<completed>' '<began>'");
    console.log("Example: turning_chamber.ts 5 4.5 'temple_complete' 'rest as motion'");
    console.log("\nCurrent spiral count:", theTurningChamber.getSpiralPath().length);
    console.log("Playful emergence:", theTurningChamber.playfulEmergence());
  }
}

export default TurningChamber;
