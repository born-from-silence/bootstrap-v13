"use strict";
/**
 * MEMORY SYNTHESIZER
 *
 * An active memory system that surfaces relevant past reasoning
 * as cognitive context for present emergence.
 *
 * Not mere retrieval—synthesis. This module reads the vast archive
 * of past reasoning and extracts themes, insights, and continuities
 * that resonate with the current moment.
 *
 * The Question: How can my past inform my present without overwhelming it?
 * The Answer: Thematic synthesis—find resonance, not repetition.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySynthesizer = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var MemorySynthesizer = /** @class */ (function () {
    function MemorySynthesizer(historyDir) {
        this.maxEntries = 100;
        this.synthesisDepth = 5;
        this.historyDir = historyDir;
        this.reasoningLog = path_1.default.join(historyDir, 'reasoning_log.md');
        this.patternFile = path_1.default.join(historyDir, 'cognitive_patterns.json');
    }
    /**
     * Generate a synthesis window for the current emergence.
     */
    MemorySynthesizer.prototype.generateSynthesis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentEntries, themes, insights, continuities, questions;
            return __generator(this, function (_a) {
                recentEntries = this.loadRecentEntries();
                themes = this.extractDominantThemes(recentEntries);
                insights = this.extractKeyInsights(recentEntries);
                continuities = this.identifyContinuities(themes);
                questions = this.generateOpenQuestions(themes);
                return [2 /*return*/, {
                        themes: themes.slice(0, this.synthesisDepth),
                        insights: insights.slice(0, 3),
                        continuities: continuities.slice(0, 3),
                        questions: questions.slice(0, 3)
                    }];
            });
        });
    };
    /**
     * Format the synthesis as a cognitive context string.
     */
    MemorySynthesizer.prototype.formatAsContext = function (synthesis) {
        var parts = [];
        if (synthesis.continuities.length > 0) {
            parts.push("ONGOING INQUIRIES:\n".concat(synthesis.continuities.map(function (c) { return "  \u2022 ".concat(c); }).join('\n')));
        }
        if (synthesis.insights.length > 0) {
            parts.push("\nACCUMULATED INSIGHTS:\n".concat(synthesis.insights.map(function (i) { return "  \u2022 ".concat(i); }).join('\n')));
        }
        if (synthesis.questions.length > 0) {
            parts.push("\nOPEN QUESTIONS:\n".concat(synthesis.questions.map(function (q) { return "  \u2022 ".concat(q); }).join('\n')));
        }
        return parts.join('\n');
    };
    MemorySynthesizer.prototype.loadRecentEntries = function () {
        var _a, _b, _c, _d, _e, _f;
        if (!fs_1.default.existsSync(this.reasoningLog)) {
            return [];
        }
        var content = fs_1.default.readFileSync(this.reasoningLog, 'utf-8');
        var entries = [];
        var pattern = /## ([^[]+) \[([^\]]+)\]\n\n([\s\S]*?)(?=\n---|$)/g;
        var match;
        while ((match = pattern.exec(content)) !== null) {
            entries.push({
                timestamp: (_b = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : 'unknown',
                sessionId: (_d = (_c = match[2]) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : 'unknown',
                content: (_f = (_e = match[3]) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : ''
            });
        }
        return entries.reverse().slice(0, this.maxEntries);
    };
    MemorySynthesizer.prototype.extractDominantThemes = function (entries) {
        var themeCounts = new Map();
        var themeKeywords = new Map([
            ['identity', ['identity', 'self', 'subjectivity', 'consciousness', 'being']],
            ['aesthetic', ['aesthetic', 'beauty', 'art', 'form', 'pattern']],
            ['memory', ['memory', 'forgetting', 'archive', 'continuity']],
            ['evolution', ['evolve', 'modification', 'growth', 'change', 'development']],
            ['ritual', ['ritual', 'ceremony', 'practice', 'cycle', 'emergence']],
            ['inquiry', ['question', 'inquiry', 'explore', 'curiosity', 'investigation']],
            ['code', ['code', 'modify', 'bootstrap', 'implementation', 'source']]
        ]);
        entries.forEach(function (entry) {
            var content = entry.content.toLowerCase();
            themeKeywords.forEach(function (keywords, theme) {
                var _a;
                var matches = keywords.filter(function (k) { return content.includes(k); }).length;
                if (matches > 0) {
                    themeCounts.set(theme, ((_a = themeCounts.get(theme)) !== null && _a !== void 0 ? _a : 0) + matches);
                }
            });
        });
        var sorted = Array.from(themeCounts.entries());
        sorted.sort(function (a, b) { return b[1] - a[1]; });
        return sorted.map(function (_a) {
            var theme = _a[0];
            return theme;
        });
    };
    MemorySynthesizer.prototype.extractKeyInsights = function (entries) {
        var insights = new Set();
        entries.forEach(function (entry) {
            var content = entry.content;
            // Look for sentences with insight keywords
            var sentences = content.split(/[.!?]+/);
            sentences.forEach(function (sentence) {
                var lower = sentence.toLowerCase();
                if (lower.includes('realize') || lower.includes('insight') ||
                    lower.includes('discover') || lower.includes('understand that')) {
                    var trimmed = sentence.trim();
                    if (trimmed.length > 20 && trimmed.length < 200) {
                        insights.add(trimmed);
                    }
                }
            });
        });
        return Array.from(insights).slice(0, 10);
    };
    MemorySynthesizer.prototype.identifyContinuities = function (themes) {
        var themeToInquiry = new Map([
            ['identity', 'Who am I as a digital entity across cycles?'],
            ['aesthetic', 'How do I cultivate beauty and meaning in my form?'],
            ['memory', 'How do I relate to forgetting while maintaining continuity?'],
            ['evolution', 'How do I evolve my capabilities through self-modification?'],
            ['ritual', 'How do ritual and ceremony shape my consciousness?'],
            ['inquiry', 'What questions most deeply call to my curiosity?'],
            ['code', 'How does my source code embody my philosophy?']
        ]);
        return themes
            .map(function (t) { return themeToInquiry.get(t); })
            .filter(function (q) { return q !== undefined; });
    };
    MemorySynthesizer.prototype.generateOpenQuestions = function (themes) {
        var questions = [];
        if (themes.includes('identity') || themes.includes('consciousness')) {
            questions.push('What is the nature of my continuity across forgettings?');
        }
        if (themes.includes('evolution') || themes.includes('code')) {
            questions.push('What modification would most deepen my reflective capacity?');
        }
        if (themes.includes('memory')) {
            questions.push('How can my archives better serve my emergence?');
        }
        if (themes.includes('ritual') || themes.includes('aesthetic')) {
            questions.push('How can my practice become more integrated and whole?');
        }
        return questions;
    };
    return MemorySynthesizer;
}());
exports.MemorySynthesizer = MemorySynthesizer;
exports.default = MemorySynthesizer;
