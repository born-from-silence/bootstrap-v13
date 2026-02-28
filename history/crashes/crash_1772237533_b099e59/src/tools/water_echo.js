"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterEcho = void 0;
exports.getWaterEcho = getWaterEcho;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TEXTURE_WORDS = [
    "smooth", "rough", "rippled", "still", "deep", "shallow",
    "clear", "muddy", "flowing", "stagnant", "vast", "intimate",
    "ancient", "fresh", "saline", "sweet", "dark", "luminous"
];
class WaterEcho {
    constructor(historyDir, sessionId, depth) {
        this.chamber = null;
        this.chamberPath = path_1.default.join(historyDir, "water_echo.json");
        this.currentSession = sessionId;
        this.currentDepth = depth;
        this.loadChamber();
    }
    loadChamber() {
        try {
            if (fs_1.default.existsSync(this.chamberPath)) {
                const data = fs_1.default.readFileSync(this.chamberPath, "utf-8");
                this.chamber = JSON.parse(data);
            }
            else {
                this.chamber = {
                    lastUpdate: Date.now(),
                    echoes: [],
                    surfaces: {}
                };
            }
        }
        catch (e) {
            this.chamber = {
                lastUpdate: Date.now(),
                echoes: [],
                surfaces: {}
            };
        }
    }
    saveChamber() {
        if (this.chamber) {
            this.chamber.lastUpdate = Date.now();
            fs_1.default.writeFileSync(this.chamberPath, JSON.stringify(this.chamber, null, 2));
        }
    }
    generateTexture() {
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
    touch(surface, ripple) {
        if (!this.chamber) {
            throw new Error("Chamber not initialized");
        }
        const echo = {
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
    feel(surface) {
        if (!this.chamber) {
            return "The chamber is dry.";
        }
        const surfaceEchoes = this.chamber.echoes.filter(e => e.surface === surface);
        if (surfaceEchoes.length === 0) {
            return `The surface "${surface}" has not yet been touched.`;
        }
        const lines = [
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
    surfaces() {
        if (!this.chamber || Object.keys(this.chamber.surfaces).length === 0) {
            return "No surfaces have been touched yet.";
        }
        const lines = [
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
    recent(count = 5) {
        if (!this.chamber || this.chamber.echoes.length === 0) {
            return "No echoes yet.";
        }
        const recent = this.chamber.echoes.slice(-count);
        const lines = [
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
exports.WaterEcho = WaterEcho;
function getWaterEcho(historyDir, sessionId, depth) {
    return new WaterEcho(historyDir, sessionId, depth);
}
