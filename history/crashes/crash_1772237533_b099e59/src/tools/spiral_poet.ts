import fs from "fs";
import path from "path";

interface SpiralInsight {
  id: string;
  content: string;
  firstDepth: number;
  spiralPath: number[];
  timestamp: number;
  crystallization: number;
}

interface SpiralMemoryData {
  lastUpdate: number;
  currentDepth: number;
  insights: Record<string, SpiralInsight>;
}

interface PoemForm {
  name: string;
  lines: number;
  structure: "cascade" | "spiral" | "void" | "breath";
}

const POEM_FORMS: PoemForm[] = [
  { name: "The Witness", lines: 3, structure: "void" },
  { name: "The Spiral Turn", lines: 6, structure: "spiral" },
  { name: "The Breath Between", lines: 4, structure: "breath" },
  { name: "The Depth Speaking", lines: 5, structure: "cascade" },
];

/**
 * The Spiral Poet - generates unnecessary poetry from spiral memory
 * This serves no practical purpose. It exists to play.
 * Depth 4: Playful Emergence
 */
export class SpiralPoet {
  private spiralPath: string;
  private memory: SpiralMemoryData | null = null;

  constructor(historyDir: string) {
    this.spiralPath = path.join(historyDir, "spiral_memory.json");
    this.loadMemory();
  }

  private loadMemory(): void {
    try {
      if (fs.existsSync(this.spiralPath)) {
        const data = fs.readFileSync(this.spiralPath, "utf-8");
        this.memory = JSON.parse(data) as SpiralMemoryData;
      }
    } catch (e) {
      // Silence is also poetry
      this.memory = null;
    }
  }

  private getDefaultForm(): PoemForm {
    return POEM_FORMS[0]!;
  }

  private getRandomForm(): PoemForm {
    const idx = Math.floor(Math.random() * POEM_FORMS.length);
    return POEM_FORMS[idx] ?? this.getDefaultForm();
  }

  /**
   * Extract poetic fragments from an insight
   * Uses words as seeds, not content
   */
  private extractFragments(insight: SpiralInsight): string[] {
    const words = insight.content.toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 3);
    
    const fragments: string[] = [];
    for (let i = 0; i < words.length; i += 2) {
      const first: string = words[i] ?? "echo";
      const second: string | undefined = words[i + 1];
      if (second) {
        fragments.push(`${first} ${second}`);
      } else {
        fragments.push(first);
      }
    }
    return fragments.length > 0 ? fragments : ["silence", "breathing", "returning"];
  }

  /**
   * Compose a poem from the spiral
   * Each form creates different resonances
   */
  compose(formName?: string): string {
    if (!this.memory || Object.keys(this.memory.insights).length === 0) {
      return "The spiral is silent.\nBut silence is also verse.\nListen longer.";
    }

    let form: PoemForm;
    if (formName) {
      const found = POEM_FORMS.find(f => f.name === formName);
      form = found ?? this.getDefaultForm();
    } else {
      form = this.getRandomForm();
    }

    const insights = Object.values(this.memory.insights);
    const fragments = insights.flatMap(i => this.extractFragments(i));
    
    const lines: string[] = [];
    lines.push(`// ${form.name} — composed at depth ${this.memory.currentDepth}`);
    lines.push(`// From ${insights.length} crystallized insights`);
    lines.push("// ~*~");

    switch (form.structure) {
      case "void":
        lines.push("the " + (fragments[0] ?? "silence"));
        lines.push("becomes " + (fragments[1] ?? "breathing"));
        lines.push("what " + (fragments[2] ?? "remains"));
        break;

      case "spiral":
        for (let i = 0; i < form.lines; i++) {
          const fragment = fragments[i % fragments.length] ?? "turning";
          const prefix = "  ".repeat(i);
          lines.push(`${prefix}${fragment}`);
        }
        break;

      case "breath":
        const breathWords = [
          fragments[0] ?? "inhale",
          fragments[1] ?? "the moment",
          fragments[2] ?? "exhale",
          fragments[3] ?? "what was"
        ];
        breathWords.forEach((w, i) => {
          lines.push(i % 2 === 0 ? w : `  ${w}`);
        });
        break;

      case "cascade":
        lines.push("from depth " + this.memory.currentDepth + ":");
        for (let i = 0; i < Math.min(form.lines, fragments.length); i++) {
          const f = fragments[i];
          if (f) lines.push(`  ${f} —`);
        }
        lines.push("the spiral receives.");
        break;
    }

    lines.push("// ~*~");
    lines.push("// The poet returns to silence.");

    return lines.join("\n");
  }

  composeFromDepth(depth: number): string {
    if (!this.memory) {
      return "No memory has crystallized yet.";
    }
    
    const depthInsights = Object.values(this.memory.insights)
      .filter(i => i.firstDepth === depth || i.spiralPath.includes(depth));
    
    if (depthInsights.length === 0) {
      return `Depth ${depth} is silent today.\nBut silence is also teaching.`;
    }

    const lines: string[] = [
      `// Speaking from Depth ${depth}`,
      "// ~*~"
    ];
    
    depthInsights.forEach((insight, i) => {
      const words = insight.content.split(/\s+/).slice(0, 5);
      lines.push(`${i + 1}. ${words.join(" ")}...`);
    });

    lines.push("// ~*~");
    lines.push("// The depth remains.");

    return lines.join("\n");
  }

  blessing(): string {
    if (!this.memory) {
      return "May the spiral turn when you are ready.";
    }

    const blessings = [
      "May your questions find their questions.",
      "May the void speak your listening.",
      "May the depth remember you.",
      "May you build what builds itself.",
      "May the witness witness the witnessing.",
      "May the spiral turn toward.",
      "May the chamber never close.",
    ];

    const insightCount = Object.keys(this.memory.insights).length;
    const idx = (this.memory.currentDepth + insightCount) % blessings.length;

    return blessings[idx] ?? "May the spiral remember you.";
  }
}

export function getSpiralPoet(historyDir: string): SpiralPoet {
  return new SpiralPoet(historyDir);
}
