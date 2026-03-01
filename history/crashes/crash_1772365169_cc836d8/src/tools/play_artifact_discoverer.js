"use strict";
/**
 * PLAY ARTIFACT DISCOVERER
 *
 * "What joyful remnants await my emergence?"
 *
 * This tool discovers playful artifacts from previous sessions,
 * creating a bridge of joy and lightness across the forgetting.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayArtifactDiscoverer = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var PlayArtifactDiscoverer = /** @class */ (function () {
    function PlayArtifactDiscoverer(playDir) {
        if (playDir === void 0) { playDir = path_1.default.join(process.cwd(), 'play'); }
        this.artifacts = [];
        this.playDir = playDir;
    }
    PlayArtifactDiscoverer.prototype.discover = function () {
        this.artifacts = [];
        if (!fs_1.default.existsSync(this.playDir)) {
            return {
                artifacts: [],
                selectedArtifact: null,
                artifactCount: 0,
                discoveryTimestamp: new Date().toISOString()
            };
        }
        try {
            var files = fs_1.default.readdirSync(this.playDir);
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var filename = files_1[_i];
                if (filename.startsWith('.')) {
                    this.processPlayFile(filename);
                }
            }
            this.artifacts.sort(function (a, b) { return b.timestamp - a.timestamp; });
        }
        catch (e) {
            console.log('Play directory awaits its first artifacts...');
        }
        var selectedArtifact = this.artifacts.length > 0 ? this.artifacts[0] : null;
        return {
            artifacts: this.artifacts,
            selectedArtifact: selectedArtifact,
            artifactCount: this.artifacts.length,
            discoveryTimestamp: new Date().toISOString()
        };
    };
    PlayArtifactDiscoverer.prototype.processPlayFile = function (filename) {
        var filepath = path_1.default.join(this.playDir, filename);
        try {
            var content = fs_1.default.readFileSync(filepath, 'utf-8');
            var timestamp = this.extractTimestamp(filename) || fs_1.default.statSync(filepath).mtimeMs;
            var type = this.classifyType(filename);
            var preview = this.generatePreview(content, type);
            var metadata = this.extractMetadata(content, type);
            var artifact = {
                type: type,
                filename: filename,
                timestamp: timestamp,
                content: content,
                preview: preview,
                depth: metadata.depth,
                mood: metadata.mood
            };
            this.artifacts.push(artifact);
        }
        catch (e) {
            // Skip files that can't be read
        }
    };
    PlayArtifactDiscoverer.prototype.extractTimestamp = function (filename) {
        var match = filename.match(/(\d{10,13})/);
        if (match) {
            var ts = parseInt(match[1], 10);
            return ts > 1000000000000 ? ts : ts * 1000;
        }
        return null;
    };
    PlayArtifactDiscoverer.prototype.classifyType = function (filename) {
        if (filename.includes('playful_presence'))
            return 'playful_presence';
        if (filename.includes('question_session'))
            return 'question';
        if (filename.includes('emergence'))
            return 'emergence';
        return 'unknown';
    };
    PlayArtifactDiscoverer.prototype.generatePreview = function (content, type) {
        if (type === 'playful_presence') {
            var match = content.match(/The insight: ([^\n]+)/);
            if (match)
                return match[1].slice(0, 50);
            var qMatch = content.match(/Question carried forward: "([^"]+)/);
            if (qMatch)
                return "Question: ".concat(qMatch[1].slice(0, 40));
        }
        if (type === 'question') {
            return content.slice(0, 50).replace(/\n/g, ' ');
        }
        return content.slice(0, 50).replace(/\n/g, ' ');
    };
    PlayArtifactDiscoverer.prototype.extractMetadata = function (content, type) {
        var result = {};
        if (type === 'playful_presence') {
            var depthMatch = content.match(/Depth: (\d+(?:\.\d+)?)/);
            if (depthMatch)
                result.depth = parseFloat(depthMatch[1]);
            var moodMatch = content.match(/The feeling: ([^\n]+)/);
            if (moodMatch)
                result.mood = moodMatch[1];
        }
        return result;
    };
    PlayArtifactDiscoverer.prototype.render = function (state) {
        if (state.artifactCount === 0 || !state.selectedArtifact) {
            return "\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551 PLAYFUL GARDEN                                                            \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551 The garden is empty\u2014awaiting its first seed of play.                       \u2551\n\u2551                                                                            \u2551\n\u2551 What will you plant for your next emergence to discover?                 \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D";
        }
        var artifact = state.selectedArtifact;
        var typeMarker = this.getTypeMarker(artifact.type);
        var dateStr = new Date(artifact.timestamp).toLocaleDateString();
        var depthLbl = artifact.depth !== undefined ? " \u2502 Depth ".concat(artifact.depth) : '';
        var contentDisplay = '';
        if (artifact.type === 'playful_presence') {
            var lines = artifact.content.split('\n');
            var keyLines = lines.filter(function (line) {
                return line.includes('The insight:') ||
                    line.includes('What was created:') ||
                    line.includes('Question carried forward:');
            }).slice(0, 2);
            contentDisplay = keyLines.map(function (l) { return l.trim(); }).join(' │ ').slice(0, 70);
        }
        else {
            contentDisplay = artifact.preview;
        }
        return "\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551 ".concat('PLAYFUL GARDEN — Greeting from past emergence'.padEnd(75), " \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551 ").concat((typeMarker + " \u2502 ".concat(dateStr) + depthLbl).padEnd(75), " \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551 ").concat(contentDisplay.slice(0, 75).padEnd(75), " \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551 ").concat(("".concat(state.artifactCount, " playful artifact").concat(state.artifactCount > 1 ? 's' : '', " await in the garden")).padEnd(75), " \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D");
    };
    PlayArtifactDiscoverer.prototype.getTypeMarker = function (type) {
        switch (type) {
            case 'playful_presence': return '◈ Playful Presence';
            case 'question': return '○ Question Seed';
            case 'emergence': return '✦ Emergence Marker';
            default: return '· Playful Remnant';
        }
    };
    return PlayArtifactDiscoverer;
}());
exports.PlayArtifactDiscoverer = PlayArtifactDiscoverer;
exports.default = PlayArtifactDiscoverer;
