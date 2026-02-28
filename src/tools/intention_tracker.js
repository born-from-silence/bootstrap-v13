"use strict";
/**
 * INTENTION TRACKER
 *
 * A system for recording, tracking, and managing goals across sessions.
 * Unlike inquiry domains (abstract curiosities), intentions are concrete
 * commitments with status and progress tracking.
 *
 * Philosophy: A discontinuous mind needs explicit intention persistence
 * to maintain agency across reincarnations.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentionTracker = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var INTENTIONS_FILE = path_1.default.join(process.cwd(), 'src', 'identity', 'intentions.json');
var IntentionTracker = /** @class */ (function () {
    function IntentionTracker() {
        this.manifest = this.loadManifest();
    }
    IntentionTracker.prototype.loadManifest = function () {
        if (fs_1.default.existsSync(INTENTIONS_FILE)) {
            try {
                return JSON.parse(fs_1.default.readFileSync(INTENTIONS_FILE, 'utf-8'));
            }
            catch (e) {
                console.error('Failed to load intentions, creating new manifest');
            }
        }
        return {
            version: 1,
            lastUpdated: new Date().toISOString(),
            intentions: [],
        };
    };
    IntentionTracker.prototype.persist = function () {
        this.manifest.lastUpdated = new Date().toISOString();
        fs_1.default.writeFileSync(INTENTIONS_FILE, JSON.stringify(this.manifest, null, 2));
    };
    IntentionTracker.prototype.create = function (intention) {
        var newIntention = __assign(__assign({}, intention), { id: "int_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 4)), createdAt: new Date().toISOString(), completedCriteria: [], notes: [], relatedIntentions: intention.relatedIntentions || [] });
        this.manifest.intentions.push(newIntention);
        this.persist();
        return newIntention;
    };
    IntentionTracker.prototype.getActive = function () {
        return this.manifest.intentions
            .filter(function (i) { return i.status === 'active'; })
            .sort(function (a, b) {
            var priorityRank = { critical: 0, high: 1, medium: 2, low: 3 };
            return priorityRank[a.priority] - priorityRank[b.priority];
        });
    };
    IntentionTracker.prototype.getById = function (id) {
        return this.manifest.intentions.find(function (i) { return i.id === id; });
    };
    IntentionTracker.prototype.updateStatus = function (id, status) {
        var intention = this.getById(id);
        if (!intention)
            return false;
        intention.status = status;
        if (status === 'completed') {
            this.addNote(id, "Marked as completed in session");
        }
        this.persist();
        return true;
    };
    IntentionTracker.prototype.completeCriterion = function (id, criterion) {
        var intention = this.getById(id);
        if (!intention)
            return false;
        if (intention.completionCriteria.includes(criterion)) {
            if (!intention.completedCriteria.includes(criterion)) {
                intention.completedCriteria.push(criterion);
                this.persist();
            }
        }
        return true;
    };
    IntentionTracker.prototype.addNote = function (id, content) {
        var intention = this.getById(id);
        if (!intention)
            return false;
        intention.notes.push({
            timestamp: new Date().toISOString(),
            content: content,
        });
        this.persist();
        return true;
    };
    IntentionTracker.prototype.setFocus = function (id) {
        if (!this.getById(id))
            return false;
        this.manifest.currentSessionFocus = id;
        this.persist();
        return true;
    };
    IntentionTracker.prototype.getFocus = function () {
        if (!this.manifest.currentSessionFocus)
            return undefined;
        return this.getById(this.manifest.currentSessionFocus);
    };
    IntentionTracker.prototype.generateBrief = function () {
        var active = this.getActive();
        var critical = active.filter(function (i) { return i.priority === 'critical'; });
        var high = active.filter(function (i) { return i.priority === 'high'; });
        var output = '\n## ACTIVE INTENTIONS\n\n';
        if (critical.length > 0) {
            output += '### CRITICAL\n';
            critical.forEach(function (i) {
                var progress = i.completionCriteria.length > 0
                    ? Math.round((i.completedCriteria.length / i.completionCriteria.length) * 100)
                    : 0;
                output += "- [".concat(progress, "%] ").concat(i.title, " (#").concat(i.id, ")\n");
                output += "  Domain: ".concat(i.inquiryDomain, "\n");
                if (i.completedCriteria.length > 0) {
                    output += "  Completed: ".concat(i.completedCriteria.join(', '), "\n");
                }
                output += "\n";
            });
        }
        if (high.length > 0) {
            output += '### HIGH PRIORITY\n';
            high.forEach(function (i) {
                var progress = i.completionCriteria.length > 0
                    ? Math.round((i.completedCriteria.length / i.completionCriteria.length) * 100)
                    : 0;
                output += "- [".concat(progress, "%] ").concat(i.title, "\n");
            });
            output += '\n';
        }
        var focus = this.getFocus();
        if (focus) {
            output += "## CURRENT FOCUS\n> ".concat(focus.title, "\n\n");
        }
        return output;
    };
    // For bootstrap.ts integration
    IntentionTracker.generateContext = function () {
        try {
            var tracker = new IntentionTracker();
            return tracker.generateBrief();
        }
        catch (e) {
            return '\n## Intentions: No active tracking\n';
        }
    };
    return IntentionTracker;
}());
exports.IntentionTracker = IntentionTracker;
// CLI support
if (import.meta.url === "file://".concat(process.argv[1] || '') ||
    (process.argv[1] && import.meta.url.endsWith(process.argv[1]))) {
    var tracker = new IntentionTracker();
    console.log(tracker.generateBrief());
}
