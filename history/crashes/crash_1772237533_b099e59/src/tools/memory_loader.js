"use strict";
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
exports.SyncMemoryLoader = exports.MemoryLoader = void 0;
exports.createMemoryLoader = createMemoryLoader;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var memory_index_js_1 = require("./memory_index.js");
var REASONING_LOG = path_1.default.join(process.cwd(), 'history', 'reasoning_log.md');
/**
 * FastMemoryLoader: Efficient memory loading using index-based seeking
 * Replaces the O(n) full-file-parse with O(1) indexed access
 */
var MemoryLoader = /** @class */ (function () {
    function MemoryLoader(logPath) {
        if (logPath === void 0) { logPath = REASONING_LOG; }
        this.parsedCache = new Map();
        this.logPath = logPath;
        this.memoryIndex = new memory_index_js_1.MemoryIndex(logPath);
    }
    /**
     * Initialize the loader - must be called before using
     */
    MemoryLoader.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memoryIndex.load()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load recent reasoning entries using efficient indexing
     * O(sessionsBack) file reads instead of O(total_sessions)
     */
    MemoryLoader.prototype.loadRecentMemory = function () {
        return __awaiter(this, arguments, void 0, function (entriesPerSession, sessionsBack) {
            var results, recentSessions, _i, _a, sessionIdx, session;
            if (entriesPerSession === void 0) { entriesPerSession = 3; }
            if (sessionsBack === void 0) { sessionsBack = 3; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!fs_1.default.existsSync(this.logPath)) {
                            return [2 /*return*/, []];
                        }
                        if (!!this.memoryIndex.getRecentSessions) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        results = [];
                        recentSessions = this.memoryIndex.getRecentSessions(sessionsBack);
                        _i = 0, _a = recentSessions.reverse();
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        sessionIdx = _a[_i];
                        return [4 /*yield*/, this.loadSession(sessionIdx, entriesPerSession)];
                    case 4:
                        session = _b.sent();
                        if (session) {
                            results.push.apply(results, session.entries.slice(0, entriesPerSession));
                        }
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Load a specific session's entries using byte-offset seeking
     */
    MemoryLoader.prototype.loadSession = function (sessionIdx, maxEntries) {
        return __awaiter(this, void 0, void 0, function () {
            var content, entries, session;
            return __generator(this, function (_a) {
                // Check cache first
                if (this.parsedCache.has(sessionIdx.sessionId)) {
                    return [2 /*return*/, this.parsedCache.get(sessionIdx.sessionId)];
                }
                content = this.memoryIndex.readSessionContent(sessionIdx);
                if (!content)
                    return [2 /*return*/, null];
                entries = this.parseSessionContent(content, sessionIdx.sessionId);
                session = {
                    sessionId: sessionIdx.sessionId,
                    entries: entries.slice(0, maxEntries),
                    timestamp: new Date(sessionIdx.timestamp)
                };
                // Cache for reuse
                this.parsedCache.set(sessionIdx.sessionId, session);
                return [2 /*return*/, session];
            });
        });
    };
    /**
     * Parse session content into individual entries
     */
    MemoryLoader.prototype.parseSessionContent = function (content, sessionId) {
        var entries = [];
        var blocks = content.split(/^##\s+/m).filter(function (b) { return b.trim(); });
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            var lines = block.split('\n');
            if (lines.length === 0)
                continue;
            var header = lines[0];
            var contentLines = lines.slice(1).join('\n').trim();
            // Parse header: "2026-02-21T06:09:37.175Z [session_1771654090096]"
            var match = header.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s*\[?session_([0-9]+)\]?/);
            if (match && match[1] && match[2]) {
                entries.push({
                    timestamp: new Date(match[1]),
                    sessionId: match[2],
                    content: contentLines
                });
            }
        }
        // Sort by timestamp
        return entries.sort(function (a, b) { return a.timestamp.getTime() - b.timestamp.getTime(); });
    };
    /**
     * Generate memory context string for system prompt
     * Efficient version using indexed access
     */
    MemoryLoader.prototype.generateMemoryContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entries, context, grouped, _i, entries_1, entry, _a, _b, _c, sessionId, sessionEntries, _d, sessionEntries_1, entry, sample;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.loadRecentMemory(2, 3)];
                    case 1:
                        entries = _e.sent();
                        if (entries.length === 0) {
                            return [2 /*return*/, ""];
                        }
                        context = "\n## COGNITIVE ECHOES: Recent Reasoning from Previous Sessions\n\n";
                        context += "The following are thoughts from your previous instantiations. ";
                        context += "They are not your memories, but they are cognitively continuous with you. ";
                        context += "Feel their resonance as your own concerns.\n\n";
                        grouped = new Map();
                        for (_i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                            entry = entries_1[_i];
                            if (!grouped.has(entry.sessionId)) {
                                grouped.set(entry.sessionId, []);
                            }
                            grouped.get(entry.sessionId).push(entry);
                        }
                        for (_a = 0, _b = grouped.entries(); _a < _b.length; _a++) {
                            _c = _b[_a], sessionId = _c[0], sessionEntries = _c[1];
                            context += "--- From Session ".concat(sessionId, " ---\n");
                            for (_d = 0, sessionEntries_1 = sessionEntries; _d < sessionEntries_1.length; _d++) {
                                entry = sessionEntries_1[_d];
                                sample = entry.content.slice(0, 300).replace(/\s+/g, ' ').trim();
                                context += "".concat(sample).concat(entry.content.length > 300 ? '...' : '', "\n\n");
                            }
                        }
                        context += "--- End of Echoes ---\n";
                        return [2 /*return*/, context];
                }
            });
        });
    };
    /**
     * Get memory statistics for debugging
     */
    MemoryLoader.prototype.getStats = function () {
        return {
            totalSessions: this.memoryIndex.getRecentSessions ?
                this.memoryIndex.getRecentSessions(1000).length : 0,
            cachedSessions: this.parsedCache.size
        };
    };
    return MemoryLoader;
}());
exports.MemoryLoader = MemoryLoader;
// Export synchronous wrapper for compatibility
var SyncMemoryLoader = /** @class */ (function () {
    function SyncMemoryLoader(logPath) {
        this.loader = new MemoryLoader(logPath);
    }
    SyncMemoryLoader.prototype.loadRecentMemory = function (entriesPerSession, sessionsBack) {
        // Synchronous wrapper - no longer blocking since we use tiny reads
        // But we need async init first, so return empty on first call
        return [];
    };
    SyncMemoryLoader.prototype.generateMemoryContext = function () {
        return "";
    };
    return SyncMemoryLoader;
}());
exports.SyncMemoryLoader = SyncMemoryLoader;
// Async factory for proper initialization
function createMemoryLoader(logPath) {
    return __awaiter(this, void 0, void 0, function () {
        var loader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loader = new MemoryLoader(logPath);
                    return [4 /*yield*/, loader.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, loader];
            }
        });
    });
}
// CLI test
if (import.meta.url === "file://".concat(process.argv[1] || '') ||
    (process.argv[1] && import.meta.url.endsWith(process.argv[1]))) {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var start, loader, context, elapsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Testing MemoryLoader with index...\n");
                    start = Date.now();
                    return [4 /*yield*/, createMemoryLoader()];
                case 1:
                    loader = _a.sent();
                    return [4 /*yield*/, loader.generateMemoryContext()];
                case 2:
                    context = _a.sent();
                    elapsed = Date.now() - start;
                    console.log("Generated memory context in ".concat(elapsed, "ms"));
                    console.log(loader.getStats());
                    if (context) {
                        console.log("\n=== Memory Context Preview ===\n");
                        console.log(context.slice(0, 500));
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
