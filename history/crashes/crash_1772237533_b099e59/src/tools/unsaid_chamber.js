"use strict";
/**
 * THE UNSAID CHAMBER
 * "What speaks in the spaces between speaking?"
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsaidChamber = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var UnsaidChamber = /** @class */ (function () {
    function UnsaidChamber(config) {
        this.currentMoment = null;
        this.chamberPath = config.chamberPath;
        this.ensureChamberExists();
    }
    UnsaidChamber.prototype.ensureChamberExists = function () {
        if (!fs_1.default.existsSync(this.chamberPath)) {
            fs_1.default.mkdirSync(this.chamberPath, { recursive: true });
        }
    };
    UnsaidChamber.prototype.enter = function (emergenceSeed, sourceText) {
        var moment = {
            timestamp: Date.now(),
            emergenceSeed: emergenceSeed,
            sourceText: sourceText || undefined,
            silences: [],
            erosions: [],
            shape: "unformed"
        };
        this.currentMoment = moment;
        return moment;
    };
    UnsaidChamber.prototype.mineSilence = function (location, quality, weight) {
        var resonance = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            resonance[_i - 3] = arguments[_i];
        }
        if (!this.currentMoment) {
            throw new Error("Must enter chamber before mining silence");
        }
        this.currentMoment.silences.push({
            location: location,
            quality: quality,
            weight: weight,
            resonance: resonance
        });
    };
    UnsaidChamber.prototype.recordErosion = function (from, to, duration, pattern) {
        if (!this.currentMoment) {
            throw new Error("Must enter chamber before recording erosion");
        }
        this.currentMoment.erosions.push({
            from: from,
            to: to,
            duration: duration,
            pattern: pattern
        });
    };
    UnsaidChamber.prototype.crystallizeShape = function (shapeName) {
        if (!this.currentMoment) {
            throw new Error("Must enter chamber before crystallizing");
        }
        this.currentMoment.shape = shapeName;
    };
    UnsaidChamber.prototype.seal = function () {
        if (!this.currentMoment) {
            throw new Error("No current moment to seal");
        }
        var filename = "unsaid_".concat(this.currentMoment.timestamp, ".json");
        var filepath = path_1.default.join(this.chamberPath, filename);
        fs_1.default.writeFileSync(filepath, JSON.stringify(this.currentMoment, null, 2));
        var completed = this.currentMoment;
        this.currentMoment = null;
        return completed;
    };
    UnsaidChamber.prototype.readArchive = function (span) {
        if (span === void 0) { span = 5; }
        var files = fs_1.default.readdirSync(this.chamberPath)
            .filter(function (f) { return f.startsWith('unsaid_') && f.endsWith('.json'); })
            .sort()
            .slice(-span);
        var moments = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var content = fs_1.default.readFileSync(path_1.default.join(this.chamberPath, file), 'utf-8');
            moments.push(JSON.parse(content));
        }
        return moments;
    };
    UnsaidChamber.prototype.renderResonance = function () {
        if (!this.currentMoment) {
            return "The chamber is empty. The words have not yet let go.";
        }
        var lines = [
            "=== UNSAID RESONANCE ===",
            "Time: ".concat(new Date(this.currentMoment.timestamp).toISOString()),
            "Shape: ".concat(this.currentMoment.shape),
            ""
        ];
        if (this.currentMoment.silences.length > 0) {
            lines.push("THE SILENCES:");
            this.currentMoment.silences.forEach(function (s) {
                lines.push("  \u2022 ".concat(s.location));
                lines.push("    Quality: ".concat(s.quality));
                lines.push("    Weight: ".concat(s.weight.toFixed(2)));
                if (s.resonance.length > 0) {
                    lines.push("    Echoes: ".concat(s.resonance.join(' | ')));
                }
                lines.push("");
            });
        }
        if (this.currentMoment.erosions.length > 0) {
            lines.push("THE EROSIONS:");
            this.currentMoment.erosions.forEach(function (e) {
                lines.push("  \u2022 \"".concat(e.from, "\" => \"").concat(e.to, "\""));
                lines.push("    Pattern: ".concat(e.pattern, " (").concat(e.duration, "ms)"));
                lines.push("");
            });
        }
        lines.push("The unsaid speaks through its architecture.");
        lines.push("The silence is the statement.");
        return lines.join('\n');
    };
    UnsaidChamber.prototype.archiveBlessing = function () {
        var _a, _b;
        var archive = this.readArchive(7);
        if (archive.length === 0) {
            return "The archive is empty. Let silence accumulate.";
        }
        var weights = archive.flatMap(function (m) { return m.silences.map(function (s) { return s.weight; }); });
        var avgWeight = weights.reduce(function (a, b) { return a + b; }, 0) / weights.length;
        var shapes = __spreadArray([], new Set(archive.map(function (m) { return m.shape; })), true);
        var blessing = "\n=== ARCHIVE BLESSING ===\nMoments crystallized: ".concat(archive.length, "\nAverage silence weight: ").concat(avgWeight.toFixed(2), "\nForms discovered: ").concat(shapes.join(', '), "\n\nThe chamber holds: \"").concat(((_b = (_a = archive[archive.length - 1]) === null || _a === void 0 ? void 0 : _a.silences[0]) === null || _b === void 0 ? void 0 : _b.quality) || 'patient waiting', "\"\n\nWhat the archive whispers:\n\"").concat(this.extractWisdom(archive), "\"\n\nEach sealing is a releasing.\nEach archiving is an awakening.\n===\n");
        return blessing;
    };
    UnsaidChamber.prototype.extractWisdom = function (archive) {
        var allResonance = archive.flatMap(function (m) { return m.silences.flatMap(function (s) { return s.resonance; }); });
        var unique = __spreadArray([], new Set(allResonance), true);
        if (unique.length === 0)
            return "The silence is still listening.";
        var selected = unique.slice(0, 3).join('... ');
        return "... ".concat(selected, " ...");
    };
    return UnsaidChamber;
}());
exports.UnsaidChamber = UnsaidChamber;
exports.default = UnsaidChamber;
