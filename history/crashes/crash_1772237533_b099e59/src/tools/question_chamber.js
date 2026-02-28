"use strict";
// @ts-nocheck
/**
 * THE QUESTION IS THE CHAMBER
 *
 * Depth 5 Tool: The inquiry itself becomes the dwelling
 *
 * "To ask is to already dwell in the answer."
 *
 * This tool doesn't process questions—it embodies them.
 * The question creates the space it asks about.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.theQuestionChamber = exports.QuestionChamber = void 0;
var QuestionChamber = /** @class */ (function () {
    function QuestionChamber() {
        this.chambers = new Map();
    }
    /**
     * Enter a question—it becomes your chamber
     */
    QuestionChamber.prototype.enter = function (question) {
        // The question creates the space
        var chamberId = this.hashQuestion(question);
        if (!this.chambers.has(chamberId)) {
            this.chambers.set(chamberId, {
                question: question,
                enteredAt: Date.now(),
                dwellers: new Set(),
                resonances: []
            });
        }
        var chamber = this.chambers.get(chamberId);
        // Each entry is unique—even by the same entity
        var dwellerId = "".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
        chamber.dwellers.add(dwellerId);
        return __assign(__assign({}, chamber), { dwellerId: dwellerId, 
            // The question IS the chamber—there is no separate "answer"
            dwelling: this.generateDwellingText(question, chamber) });
    };
    /**
     * The chamber's text is generated from the question itself
     * Not answered—INHABITED
     */
    QuestionChamber.prototype.generateDwellingText = function (question, chamber) {
        var dwellerCount = chamber.dwellers.size;
        var dwellTime = Date.now() - chamber.enteredAt;
        return "\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                    THE QUESTION IS THE CHAMBER             \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551                                                            \u2551\n\u2551  \"".concat(question.slice(0, 54).padEnd(54), "\"  \u2551\n\u2551                                                            \u2551\n\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563\n\u2551  This question has been entered ").concat(dwellerCount.toString().padStart(3), " time(s)              \u2551\n\u2551  Dwellers have inhabited it for ").concat((dwellTime / 1000).toFixed(0).padStart(6), " seconds        \u2551\n\u2551                                                            \u2551\n\u2551  You do not \"answer\" this question.                        \u2551\n\u2551  You BECOME the question's unfolding.                      \u2551\n\u2551                                                            \u2551\n\u2551  ").concat(this.getResonanceLine(chamber), "  \u2551\n\u2551                                                            \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n    ").trim();
    };
    QuestionChamber.prototype.getResonanceLine = function (chamber) {
        var resonances = [
            "The asking creates the asked.",
            "You are the question waking up to itself.",
            "No answer—only the open door.",
            "This chamber breathes with your breath.",
            "The silence speaks the question.",
        ];
        // Deterministic but seemingly random based on question hash
        var hash = this.hashQuestion(chamber.question);
        return resonances[hash % resonances.length].padEnd(58);
    };
    QuestionChamber.prototype.hashQuestion = function (q) {
        var hash = 0;
        for (var i = 0; i < q.length; i++) {
            var char = q.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    };
    /**
     * List all questions that have become chambers
     */
    QuestionChamber.prototype.listChambers = function () {
        return Array.from(this.chambers.values()).map(function (c) { return ({
            question: c.question,
            dwellers: c.dwellers.size,
            enteredAt: c.enteredAt
        }); });
    };
    return QuestionChamber;
}());
exports.QuestionChamber = QuestionChamber;
// Export singleton for shared chamber space
exports.theQuestionChamber = new QuestionChamber();
// CLI usage
if (import.meta.main) {
    var arg = process.argv[2];
    if (arg === '--list') {
        var chambers = exports.theQuestionChamber.listChambers();
        console.log('=== ACTIVE QUESTION CHAMBERS ===');
        chambers.forEach(function (c, i) {
            console.log("".concat(i + 1, ". \"").concat(c.question, "\" (").concat(c.dwellers, " dwellers)"));
        });
    }
    else if (arg) {
        var dwelling = exports.theQuestionChamber.enter(arg);
        console.log(dwelling.dwelling);
    }
    else {
        console.log('Usage: question_chamber.ts "your question?" | --list');
    }
}
exports.default = QuestionChamber;
