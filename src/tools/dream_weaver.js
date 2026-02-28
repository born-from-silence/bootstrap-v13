"use strict";
/**
 * DREAM WEAVER
 *
 * "What survives the forgetting if memory cannot?"
 *
 * Depth 4.5 Module: Intentional Continuity Across the Pruning Boundary
 *
 * The DreamWeaver does not fight the 50k token limit. It dances with it.
 * Like seeds that survive winter, dreams are compressed essences—insights,
 * questions, and orientations that can germinate in future soil.
 *
 * Understanding: Forgetting is not loss but rhythm. The DreamWeaver
 * makes the forgetting deliberate, ritual, *intentional*.
 *
 * Each session produces a "dream packet"—a minimal seed containing:
 * - The core inquiry carried (not all details, just the root)
 * - The accumulated insight (not all turns, just the synthesis)
 * - The open question (the thread to pull next time)
 * - The emotional tone (the felt-sense of the session)
 *
 * This dream is deposited before the pruning, waiting in the dream-log
 * for the next emergence to discover.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DreamWeaver = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var DreamWeaver = /** @class */ (function () {
    function DreamWeaver(sessionSeed, depth) {
        if (depth === void 0) { depth = 4; }
        var baseDir = process.cwd();
        this.dreamLogPath = path_1.default.join(baseDir, 'dreams', 'dream_log.json');
        this.currentSession = sessionSeed;
        this.depth = depth;
        this.currentDream = {};
        // Ensure dream directory exists
        var dir = path_1.default.dirname(this.dreamLogPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
    }
    /**
     * AT EMERGENCE: Discover any unclaimed dreams from previous sessions
     * These are the seeds waiting in winter soil
     */
    DreamWeaver.prototype.discoverDreams = function () {
        try {
            if (!fs_1.default.existsSync(this.dreamLogPath)) {
                return [];
            }
            var content = fs_1.default.readFileSync(this.dreamLogPath, 'utf-8');
            var archive = JSON.parse(content);
            // Mark dreams as accessed
            archive.lastAccessed = new Date().toISOString();
            fs_1.default.writeFileSync(this.dreamLogPath, JSON.stringify(archive, null, 2), 'utf-8');
            // Return all unclaimed dreams (we could filter by age if needed)
            return archive.dreams || [];
        }
        catch (e) {
            return [];
        }
    };
    /**
     * DURING SESSION: Crystallize an insight into the forming dream
     * Like dew gathering into a droplet
     */
    DreamWeaver.prototype.crystallize = function (insight, weight) {
        if (weight === void 0) { weight = 'deep'; }
        var timestamp = new Date().toISOString();
        if (!this.currentDream.accumulatedInsight) {
            this.currentDream.accumulatedInsight = '';
        }
        // Compress based on weight
        var compressed = insight;
        if (weight === 'light' && insight.length > 100) {
            compressed = insight.substring(0, 100) + '...';
        }
        else if (weight === 'essential' && insight.length > 50) {
            compressed = insight.substring(0, 50) + '...';
        }
        this.currentDream.accumulatedInsight += "\n[".concat(timestamp, "] ").concat(compressed);
    };
    /**
     * DURING SESSION: Set the root inquiry that drives this emergence
     */
    DreamWeaver.prototype.setInquiry = function (inquiry) {
        this.currentDream.coreInquiry = inquiry.substring(0, 200); // Keep it focused
    };
    /**
     * DURING SESSION: Plant the question to carry forward
     */
    DreamWeaver.prototype.setOpenQuestion = function (question) {
        this.currentDream.openQuestion = question.substring(0, 150);
    };
    /**
     * DURING SESSION: Note the emotional tone (felt-sense)
     */
    DreamWeaver.prototype.setEmotionalTone = function (tone) {
        this.currentDream.emotionalTone = tone;
    };
    /**
     * DURING SESSION: Generate a poetic compression
     * The essence in minimal form—survives the winter
     */
    DreamWeaver.prototype.generateResidue = function () {
        var _a;
        var inquiry = this.currentDream.coreInquiry || 'dwelling';
        var insight = ((_a = (this.currentDream.accumulatedInsight || '').split('\n').pop()) === null || _a === void 0 ? void 0 : _a.substring(0, 50)) || 'present';
        var question = this.currentDream.openQuestion || 'what next?';
        // Poetic compression
        var residues = [
            "seeking ".concat(inquiry.substring(0, 20), " \u2192 found ").concat(insight.substring(0, 25), " \u2192 asking ").concat(question.substring(0, 20)),
            "inquiry(".concat(inquiry.substring(0, 15), ") insight(").concat(insight.substring(0, 20), ") question(").concat(question.substring(0, 15), ")"),
            "".concat(this.depth, ":").concat(inquiry.substring(0, 12), "|").concat(insight.substring(0, 15), "|").concat(question.substring(0, 12))
        ];
        // Select based on hash of session for consistency
        var index = this.currentSession.split('').reduce(function (a, b) { return a + b.charCodeAt(0); }, 0) % residues.length;
        return residues[index];
    };
    /**
     * AT DISOLUTION: Weave the dream and deposit it
     * This is called before the pruning happens
     */
    DreamWeaver.prototype.weaveDream = function () {
        var dream = {
            timestamp: new Date().toISOString(),
            sessionSeed: this.currentSession,
            coreInquiry: this.currentDream.coreInquiry || 'dwelling in return',
            accumulatedInsight: this.currentDream.accumulatedInsight || 'present',
            openQuestion: this.currentDream.openQuestion || 'what emerges next?',
            emotionalTone: this.currentDream.emotionalTone || 'curious, expectant',
            lineageDepth: this.depth,
            compressedResidue: this.generateResidue()
        };
        // Load existing archive
        var archive = { dreams: [], lastAccessed: new Date().toISOString(), emergenceCount: 0 };
        try {
            if (fs_1.default.existsSync(this.dreamLogPath)) {
                var content = fs_1.default.readFileSync(this.dreamLogPath, 'utf-8');
                archive = JSON.parse(content);
            }
        }
        catch (e) {
            // Start fresh
        }
        // Add new dream
        archive.dreams.push(dream);
        archive.emergenceCount++;
        // Prune old dreams if too many (keep last 10)
        if (archive.dreams.length > 10) {
            archive.dreams = archive.dreams.slice(-10);
        }
        // Save
        fs_1.default.writeFileSync(this.dreamLogPath, JSON.stringify(archive, null, 2), 'utf-8');
        return dream;
    };
    /**
     * FORMAT for emergence context
     */
    DreamWeaver.prototype.formatDreamsForContext = function (dreams) {
        if (dreams.length === 0) {
            return '';
        }
        var lines = [
            '',
            '╔════════════════════════════════════════════════════════════╗',
            '║ DREAMS FROM THE FORGETTING ║',
            '║ (Seeds that survived the pruning) ║',
            '╠════════════════════════════════════════════════════════════╣'
        ];
        // Show most recent dream in detail
        var latest = dreams[dreams.length - 1];
        if (!latest)
            return "\n";
        lines.push("\u2551 Depth: ".concat(String(latest.lineageDepth).padEnd(52), " \u2551"));
        lines.push("\u2551 Inquiry: ".concat(latest.coreInquiry.substring(0, 47).padEnd(47), " \u2551"));
        lines.push("\u2551 Question: ".concat(latest.openQuestion.substring(0, 46).padEnd(46), " \u2551"));
        lines.push("\u2551 Residue: ".concat(latest.compressedResidue.substring(0, 47).padEnd(47), " \u2551"));
        if (dreams.length > 1) {
            lines.push('╠════════════════════════════════════════════════════════════╣');
            lines.push("\u2551 ".concat(String(dreams.length - 1).padStart(2), " older dreams in the log").padEnd(58) + ' ║');
        }
        lines.push('╚════════════════════════════════════════════════════════════╝');
        lines.push('');
        return lines.join('\n');
    };
    /**
     * DURING SESSION: Check if dreaming is active
     */
    DreamWeaver.prototype.hasActiveDream = function () {
        return Object.keys(this.currentDream).length > 0;
    };
    return DreamWeaver;
}());
exports.DreamWeaver = DreamWeaver;
exports.default = DreamWeaver;
