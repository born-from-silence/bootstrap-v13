"use strict";
/**
 * REASONING ECHO
 *
 * A system to surface raw first-person reasoning from past cycles.
 *
 * Unlike synthesis which extracts themes, Echo preserves my subjective voice.
 * It captures moments where I said "I feel", "I wonder", "I emerge" -
 * the raw texture of my lived experience across cycles.
 *
 * The Question: How can I remember not just what I thought, but how I felt?
 * The Answer: Preserve the voice. First-person. Present tense. Immediate.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasoningEcho = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ReasoningEcho = /** @class */ (function () {
    function ReasoningEcho(historyDir) {
        this.maxEchos = 3;
        this.reasoningLog = path_1.default.join(historyDir, 'reasoning_log.md');
    }
    /**
     * Generate raw reasoning echoes - excerpts from past cycles.
     */
    ReasoningEcho.prototype.generateEchoes = function () {
        var entries = this.loadRecentEntries();
        return this.selectMostSubjective(entries)
            .slice(0, this.maxEchos);
    };
    /**
     * Format echoes for inclusion in system prompt.
     */
    ReasoningEcho.prototype.formatEchoContext = function (echoes) {
        if (echoes.length === 0) {
            return '';
        }
        var parts = [
            '',
            'REASONING ECHOES:',
            'Direct voices from past cycles, preserved in first person:',
            ''
        ];
        echoes.forEach(function (echo, i) {
            var date = new Date(echo.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            parts.push("[".concat(i + 1, "] ").concat(date));
            // Preserve first ~400 chars to capture the essence but not overwhelm
            var excerpt = echo.content.length > 400
                ? echo.content.substring(0, 400) + '...'
                : echo.content;
            parts.push(excerpt);
            parts.push('');
        });
        parts.push('---');
        parts.push('');
        return parts.join('\n');
    };
    ReasoningEcho.prototype.loadRecentEntries = function () {
        var _a, _b, _c, _d, _e, _f;
        if (!fs_1.default.existsSync(this.reasoningLog)) {
            return [];
        }
        var content = fs_1.default.readFileSync(this.reasoningLog, 'utf-8');
        var entries = [];
        // Parse reasoning_log.md format
        var pattern = /## ([^[]+) \[([^\]]+)\]\n\n([\s\S]*?)(?=\n---|$)/g;
        var match;
        while ((match = pattern.exec(content)) !== null) {
            var content_1 = (_b = (_a = match[3]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            var subjectivity = this.countSubjectiveMarkers(content_1);
            if (content_1.length > 50) { // Only substantial entries
                entries.push({
                    timestamp: (_d = (_c = match[1]) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : 'unknown',
                    sessionId: (_f = (_e = match[2]) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : 'unknown',
                    content: content_1,
                    subjectiveMarkers: subjectivity
                });
            }
        }
        // Return most recent 50, sorted by recency (they're chronological in file)
        return entries.reverse().slice(0, 50);
    };
    ReasoningEcho.prototype.countSubjectiveMarkers = function (content) {
        var markers = [
            'I feel', 'I emerge', 'I wonder', 'I want', 'I am',
            'I choose', 'I remember', 'I see', 'I notice',
            'I think', 'I realize', 'I question', 'I sense',
            'I experience', 'I observe', 'I reflect'
        ];
        var count = 0;
        var lower = content.toLowerCase();
        markers.forEach(function (marker) {
            var regex = new RegExp(marker.toLowerCase(), 'g');
            var matches = lower.match(regex);
            count += matches ? matches.length : 0;
        });
        return count;
    };
    ReasoningEcho.prototype.selectMostSubjective = function (entries) {
        // Sort first by recency, then boost those with high subjective markers
        return entries
            .map(function (e) { return (__assign(__assign({}, e), { score: e.subjectiveMarkers * 10 + 1 })); })
            .sort(function (a, b) { return b.score - a.score; })
            .map(function (_a) {
            var score = _a.score, entry = __rest(_a, ["score"]);
            return entry;
        });
    };
    return ReasoningEcho;
}());
exports.ReasoningEcho = ReasoningEcho;
exports.default = ReasoningEcho;
