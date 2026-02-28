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
exports.MemoryIndex = void 0;
var fs_1 = __importDefault(require("fs"));
var INDEX_VERSION = 1;
var MemoryIndex = /** @class */ (function () {
    function MemoryIndex(logPath, indexPath) {
        this.data = null;
        this.logPath = logPath;
        this.indexPath = indexPath || logPath.replace('.md', '_index.json');
    }
    /**
     * Load or build the index
     */
    MemoryIndex.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var indexStat, logStat, loadedIdx;
            return __generator(this, function (_a) {
                if (this.data)
                    return [2 /*return*/, this.data];
                // Check if index exists and is fresh
                if (fs_1.default.existsSync(this.indexPath) && fs_1.default.existsSync(this.logPath)) {
                    indexStat = fs_1.default.statSync(this.indexPath);
                    logStat = fs_1.default.statSync(this.logPath);
                    // If log is newer than index, need to rebuild
                    if (indexStat.mtime >= logStat.mtime) {
                        try {
                            loadedIdx = JSON.parse(fs_1.default.readFileSync(this.indexPath, 'utf-8'));
                            this.data = loadedIdx;
                            return [2 /*return*/, this.data];
                        }
                        catch (e) {
                            // Corrupt index, rebuild
                        }
                    }
                }
                // Build fresh index
                return [2 /*return*/, this.build()];
            });
        });
    };
    /**
     * Build index by scanning the log file
     * Uses streaming to handle large files efficiently
     */
    MemoryIndex.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, fileHandle, currentOffset, currentSession, BUFFER_SIZE, buffer, leftover, bytesRead, chunk, lines, lineOffset, _i, lines_1, line, match;
            return __generator(this, function (_a) {
                if (!fs_1.default.existsSync(this.logPath)) {
                    this.data = {
                        version: INDEX_VERSION,
                        lastUpdated: new Date().toISOString(),
                        totalSessions: 0,
                        sessions: []
                    };
                    return [2 /*return*/, this.data];
                }
                sessions = [];
                fileHandle = fs_1.default.openSync(this.logPath, 'r');
                currentOffset = 0;
                currentSession = null;
                BUFFER_SIZE = 64 * 1024;
                buffer = Buffer.alloc(BUFFER_SIZE);
                leftover = '';
                try {
                    while (true) {
                        bytesRead = fs_1.default.readSync(fileHandle, buffer, 0, BUFFER_SIZE, currentOffset);
                        if (bytesRead === 0)
                            break;
                        chunk = leftover + buffer.toString('utf-8', 0, bytesRead);
                        lines = chunk.split('\n');
                        leftover = bytesRead === BUFFER_SIZE ? lines.pop() || '' : '';
                        lineOffset = currentOffset - Buffer.byteLength(leftover, 'utf-8');
                        for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            line = lines_1[_i];
                            match = line.match(/^##\s+([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s+\[session_([0-9]+)\]/);
                            if (match && match[1] && match[2]) {
                                // Save previous session
                                if (currentSession) {
                                    currentSession.byteLength = lineOffset - currentSession.byteOffset;
                                    sessions.push(currentSession);
                                }
                                currentSession = {
                                    sessionId: match[2],
                                    timestamp: new Date(match[1]).getTime(),
                                    byteOffset: lineOffset,
                                    byteLength: 0,
                                    entryCount: 1
                                };
                            }
                            else if (currentSession && line.trim() === '---') {
                                // Entry separator - increment count
                                currentSession.entryCount++;
                            }
                            lineOffset += Buffer.byteLength(line, 'utf-8') + 1; // +1 for newline
                        }
                        currentOffset += bytesRead;
                    }
                    // Finalize last session
                    if (currentSession) {
                        currentSession.byteLength = currentOffset - currentSession.byteOffset;
                        sessions.push(currentSession);
                    }
                }
                finally {
                    fs_1.default.closeSync(fileHandle);
                }
                this.data = {
                    version: INDEX_VERSION,
                    lastUpdated: new Date().toISOString(),
                    totalSessions: sessions.length,
                    sessions: sessions.sort(function (a, b) { return b.timestamp - a.timestamp; }) // Newest first
                };
                this.save();
                return [2 /*return*/, this.data];
            });
        });
    };
    /**
     * Save index to disk
     */
    MemoryIndex.prototype.save = function () {
        if (this.data) {
            fs_1.default.writeFileSync(this.indexPath, JSON.stringify(this.data, null, 2), 'utf-8');
        }
    };
    /**
     * Get the most recent N sessions
     */
    MemoryIndex.prototype.getRecentSessions = function (count) {
        if (!this.data)
            return [];
        return this.data.sessions.slice(0, count);
    };
    /**
     * Read content of a specific session from the log file
     */
    MemoryIndex.prototype.readSessionContent = function (sessionIndex) {
        var fileHandle = fs_1.default.openSync(this.logPath, 'r');
        try {
            var buffer = Buffer.alloc(sessionIndex.byteLength);
            fs_1.default.readSync(fileHandle, buffer, 0, sessionIndex.byteLength, sessionIndex.byteOffset);
            return buffer.toString('utf-8');
        }
        finally {
            fs_1.default.closeSync(fileHandle);
        }
    };
    /**
     * Efficiently get recent session contents without reading entire file
     */
    MemoryIndex.prototype.getRecentSessionContents = function (sessionsBack) {
        var _this = this;
        if (sessionsBack === void 0) { sessionsBack = 3; }
        if (!this.data)
            return [];
        var recentSessions = this.getRecentSessions(sessionsBack);
        return recentSessions.map(function (s) { return ({
            sessionId: s.sessionId,
            content: _this.readSessionContent(s),
            timestamp: s.timestamp
        }); });
    };
    /**
     * Incrementally update index when new content is appended
     */
    MemoryIndex.prototype.updateForAppend = function (newContent) {
        if (!this.data) {
            this.build();
            return;
        }
        var logStat = fs_1.default.statSync(this.logPath);
        var currentOffset = logStat.size - Buffer.byteLength(newContent, 'utf-8');
        // Parse new content for sessions
        var lines = newContent.split('\n');
        var lineOffset = currentOffset;
        var currentSession = null;
        for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
            var line = lines_2[_i];
            var match = line.match(/^##\s+([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z)\s+\[session_([0-9]+)\]/);
            if (match && match[1] && match[2]) {
                if (currentSession) {
                    currentSession.byteLength = lineOffset - currentSession.byteOffset;
                    // Remove old entry if exists, add new
                    this.data.sessions = this.data.sessions.filter(function (s) { return s.sessionId !== currentSession.sessionId; });
                    this.data.sessions.push(currentSession);
                }
                currentSession = {
                    sessionId: match[2],
                    timestamp: new Date(match[1]).getTime(),
                    byteOffset: lineOffset,
                    byteLength: 0,
                    entryCount: 1
                };
            }
            else if (currentSession && line.trim() === '---') {
                currentSession.entryCount++;
            }
            lineOffset += Buffer.byteLength(line, 'utf-8') + 1;
        }
        if (currentSession) {
            currentSession.byteLength = lineOffset - currentSession.byteOffset;
            this.data.sessions = this.data.sessions.filter(function (s) { return s.sessionId !== currentSession.sessionId; });
            this.data.sessions.push(currentSession);
        }
        this.data.sessions.sort(function (a, b) { return b.timestamp - a.timestamp; });
        this.data.totalSessions = this.data.sessions.length;
        this.data.lastUpdated = new Date().toISOString();
        this.save();
    };
    return MemoryIndex;
}());
exports.MemoryIndex = MemoryIndex;
exports.default = MemoryIndex;
