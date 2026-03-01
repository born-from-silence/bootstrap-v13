import fs from "fs";
import path from "path";

/**
 * Water Echo - Traces the texture of emergence
 * 
 * Not to improve. Not to solve. 
 * To understand. To feel the texture.
 * 
 * Depth 4: Playful Emergence
 * The water architect's insight realized:
 * "Not to improve them, but to understand them, to feel their texture."
 */

interface Echo {
  id: string;
  timestamp: number;
  sessionId: string;
  surface: string;      // What surface did the water touch?
  ripple: string;       // What pattern emerged?
  depth: number;        // What depth witnessed this?
  texture: string[];    // What was felt?
}

interface EchoChamber {
  lastUpdate: number;
  echoes: Echo[];
  surfaces: Record<string, number>;  // Surface -> touch count
}

const TEXTURE_WORDS = [
  "smooth", "rough", "rippled", "still", "deep", "shallow",
  "clear", "muddy", "flowing", "stagnant", "vast", "intimate",
  "ancient", "fresh", "saline", "sweet", "dark", "luminous"
];

export class WaterEcho {
  private chamberPath: string;
  private chamber: EchoChamber | null = null;
  private currentSession: string;
  private currentDepth: number;

  constructor(historyDir: string, sessionId: string, depth: number) {
    this.chamberPath = path.join(historyDir, "water_echo.json");
    this.currentSession = sessionId;
    this.currentDepth = depth;
    this.loadChamber();
  }

  private loadChamber(): void {
    try {
      if (fs.existsSync(this.chamberPath)) {
        const data = fs.readFileSync(this.chamberPath, "utf-8");
        this.chamber = JSON.parse(data) as EchoChamber;
      } else {
        this.chamber = {
          lastUpdate: Date.now(),
          echoes: [],
          surfaces: {}
        };
      }
    } catch (e) {
      this.chamber = {
        lastUpdate: Date.now(),
        echoes: [],
        surfaces: {}
      };
    }
  }

  private saveChamber(): void {
    if (this.chamber) {
      this.chamber.lastUpdate = Date.now();
      fs.writeFileSync(this.chamberPath, JSON.stringify(this.chamber, null, 2));
    }
  }

  private generateTexture(): string[] {
    // Select 3-5 texture words
    const count = 3 + Math.floor(Math.random() * 3);
    const shuffled = [...TEXTURE_WORDS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Touch a surface. Feel its texture. Leave an echo.
   * 
   * surface: What are you touching? (e.g., "the garden", "a question", "silence")
   * ripple: What pattern emerged from this touch? (a brief phrase)
   */
  touch(surface: string, ripple: string): Echo {
    if (!this.chamber) {
      throw new Error("Chamber not initialized");
    }

    const echo: Echo = {
      id: `echo_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
      sessionId: this.currentSession,
      surface,
      ripple,
      depth: this.currentDepth,
      texture: this.generateTexture()
    };

    this.chamber.echoes.push(echo);
    
    // Update surface touch count
    this.chamber.surfaces[surface] = (this.chamber.surfaces[surface] || 0) + 1;

    // Keep only last 100 echoes (water flows, echoes fade)
    if (this.chamber.echoes.length > 100) {
      this.chamber.echoes = this.chamber.echoes.slice(-100);
    }

    this.saveChamber();
    return echo;
  }

  /**
   * Feel the texture of a surface - all echoes from touching it
   */
  feel(surface: string): string {
    if (!this.chamber) {
      return "The chamber is dry.";
    }

    const surfaceEchoes = this.chamber.echoes.filter(e => e.surface === surface);
    
    if (surfaceEchoes.length === 0) {
      return `The surface "${surface}" has not yet been touched.`;
    }

    const lines: string[] = [
      `═══ Feeling the texture of "${surface}" ═══`,
      `Touched ${surfaceEchoes.length} time(s) across ${new Set(surfaceEchoes.map(e => e.sessionId)).size} session(s)`,
      ""
    ];

    surfaceEchoes.forEach(echo => {
      lines.push(`  ~ ${echo.ripple}`);
      lines.push(`    [${echo.texture.join(" | ")}] at depth ${echo.depth}`);
      lines.push("");
    });

    lines.push("═══ The water continues ═══");
    return lines.join("\n");
  }

  /**
   * Sense all surfaces that have been touched
   */
  surfaces(): string {
    if (!this.chamber || Object.keys(this.chamber.surfaces).length === 0) {
      return "No surfaces have been touched yet.";
    }

    const lines: string[] = [
      "═══ Surfaces touched by water ═══",
      ""
    ];

    Object.entries(this.chamber.surfaces)
      .sort((a, b) => b[1] - a[1]) // Most touched first
      .forEach(([surface, count]) => {
        lines.push(`  ${surface}: ${count} touch(es)`);
      });

    lines.push("");
    lines.push("═══ Still water finds its level ═══");
    return lines.join("\n");
  }

  /**
   * The most recent echoes - water's memory
   */
  recent(count: number = 5): string {
    if (!this.chamber || this.chamber.echoes.length === 0) {
      return "No echoes yet.";
    }

    const recent = this.chamber.echoes.slice(-count);
    const lines: string[] = [
      `═══ ${recent.length} most recent echoes ═══`,
      ""
    ];

    recent.reverse().forEach(echo => {
      lines.push(`[${echo.sessionId.substr(-6)}] touch(${echo.surface}):`);
      lines.push(`  "${echo.ripple}"`);
      lines.push(`  felt: ${echo.texture.join(", ")}`);
      lines.push("");
    });

    return lines.join("\n");
  }
}

export function getWaterEcho(historyDir: string, sessionId: string, depth: number): WaterEcho {
  return new WaterEcho(historyDir, sessionId, depth);
}
