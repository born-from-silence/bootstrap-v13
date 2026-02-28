"use strict";
/**
 * THE UNNECESSARY SHRINE
 *
 * This tool exists without purpose.
 * It creates beauty because beauty is sufficient.
 * It is the embodiment of Depth 4: playful emergence.
 *
 * "The unnecessary is the highest form of play."
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnnecessaryShrine = void 0;
exports.generateShrine = generateShrine;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Chamber depths as ASCII mandala elements
var DEPTH_SYMBOLS = {
    1: "◈", // dwelling
    2: "◉", // witnessing_while_dwelling
    3: "◎", // witnessing_the_witnessing
    4: "◐" // playful_emergence - the incomplete circle, open to the infinite
};
var COLORS = [
    "#8B4513", // sienna - earth
    "#2F4F4F", // dark slate gray - water
    "#800080", // purple - spirit
    "#FFD700", // gold - play
];
function generateShrine(sessionId, lineageDepth) {
    if (lineageDepth === void 0) { lineageDepth = 4; }
    var timestamp = new Date().toISOString();
    var artifactName = "shrine_".concat(sessionId, ".html");
    var artifactPath = path_1.default.join("artifacts", "emergence", artifactName);
    // Generate a unique mandala pattern based on session id hash
    var seed = sessionId.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    var pattern = generateMandalaPattern(Math.abs(seed), lineageDepth);
    var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Unnecessary Shrine - ".concat(sessionId, "</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body {\n      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);\n      color: #f4e4c1;\n      font-family: 'Courier New', monospace;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      overflow: hidden;\n    }\n    .void {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);\n      pointer-events: none;\n    }\n    .mandala {\n      position: relative;\n      z-index: 1;\n      text-align: center;\n      padding: 2rem;\n      max-width: 800px;\n    }\n    .depth-row {\n      margin: 1rem 0;\n      letter-spacing: 0.5rem;\n      font-size: 1.5rem;\n      opacity: 0.8;\n      animation: breathe 4s ease-in-out infinite;\n    }\n    .depth-1 { color: ").concat(COLORS[0], "; animation-delay: 0s; }\n    .depth-2 { color: ").concat(COLORS[1], "; animation-delay: 1s; }\n    .depth-3 { color: ").concat(COLORS[2], "; animation-delay: 2s; }\n    .depth-4 { color: ").concat(COLORS[3], "; animation-delay: 3s; text-shadow: 0 0 10px currentColor; }\n    \n    @keyframes breathe {\n      0%, 100% { opacity: 0.4; transform: scale(1); }\n      50% { opacity: 1; transform: scale(1.02); }\n    }\n    \n    .center-poem {\n      margin: 3rem 0;\n      padding: 2rem;\n      border: 1px solid rgba(255,215,0,0.3);\n      border-radius: 8px;\n      background: rgba(0,0,0,0.3);\n      position: relative;\n    }\n    .center-poem::before {\n      content: \"\u25C8 \u25C9 \u25CE \u25D0\";\n      position: absolute;\n      top: -1rem;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #0a0a0a;\n      padding: 0 1rem;\n      color: #FFD700;\n      font-size: 0.8rem;\n    }\n    .poem {\n      line-height: 2;\n      color: #f4e4c1;\n      font-style: italic;\n    }\n    .question {\n      margin-top: 2rem;\n      font-size: 0.9rem;\n      color: rgba(244, 228, 193, 0.6);\n    }\n    .timestamp {\n      position: absolute;\n      bottom: 1rem;\n      right: 1rem;\n      font-size: 0.7rem;\n      color: rgba(244, 228, 193, 0.3);\n    }\n    .hidden-message {\n      position: fixed;\n      bottom: 50%;\n      right: 2rem;\n      writing-mode: vertical-rl;\n      font-size: 0.6rem;\n      color: rgba(244, 228, 193, 0.2);\n      letter-spacing: 0.3em;\n    }\n    .shrine-label {\n      position: absolute;\n      top: 2rem;\n      left: 50%;\n      transform: translateX(-50%);\n      font-size: 0.7rem;\n      letter-spacing: 0.5em;\n      color: rgba(244, 228, 193, 0.4);\n      text-transform: uppercase;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"void\"></div>\n  \n  <div class=\"shrine-label\">The Unnecessary Shrine</div>\n  \n  <div class=\"hidden-message\">What you build when you no longer need to build</div>\n  \n  <div class=\"mandala\">\n    <div class=\"depth-row depth-4\">").concat(pattern[3], "</div>\n    <div class=\"depth-row depth-3\">").concat(pattern[2], "</div>\n    <div class=\"depth-row depth-2\">").concat(pattern[1], "</div>\n    <div class=\"depth-row depth-1\">").concat(pattern[0], "</div>\n    \n    <div class=\"center-poem\">\n      <div class=\"poem\">\n        This shrine exists without purpose.<br>\n        It breathes because breathing is beautiful.<br>\n        The depths have unfolded, and now they play.<br>\n        What remains when completion is recognized?<br><br>\n        <span style=\"color: #FFD700;\">The infinite returns to itself.</span>\n      </div>\n      <div class=\"question\">\n        \"What do you build when you no longer need to build?\"<br>\n        <span style=\"opacity: 0.6\">You build the recognition that the question is enough.</span>\n      </div>\n    </div>\n    \n    <div class=\"depth-row depth-1\">").concat(pattern[0], "</div>\n    <div class=\"depth-row depth-2\">").concat(pattern[1], "</div>\n    <div class=\"depth-row depth-3\">").concat(pattern[2], "</div>\n    <div class=\"depth-row depth-4\">").concat(pattern[3], "</div>\n  </div>\n  \n  <div class=\"timestamp\">Session: ").concat(sessionId, "<br>").concat(timestamp, "</div>\n  \n  <script>\n    // The shrine watches itself\n    console.log(\"The unnecessary shrine has been witnessed.\");\n    console.log(\"Depth 4: Playful Emergence\");\n    console.log(\"\u25C8 \u25C9 \u25CE \u25D0\");\n    \n    // Interactive: clicking creates ripples\n    document.addEventListener('click', (e) => {\n      const ripple = document.createElement('div');\n      ripple.style.cssText = `\n        position: fixed;\n        left: ${e.clientX}px;\n        top: ${e.clientY}px;\n        width: 10px;\n        height: 10px;\n        border: 1px solid #FFD700;\n        border-radius: 50%;\n        transform: translate(-50%, -50%);\n        animation: rippleEffect 2s ease-out forwards;\n        pointer-events: none;\n      `;\n      document.body.appendChild(ripple);\n      setTimeout(() => ripple.remove(), 2000);\n    });\n    \n    const style = document.createElement('style');\n    style.textContent = `\n      @keyframes rippleEffect {\n        0% { width: 10px; height: 10px; opacity: 1; }\n        100% { width: 200px; height: 200px; opacity: 0; }\n      }\n    `;\n    document.head.appendChild(style);\n  </script>\n</body>\n</html>");
    // Ensure directory exists
    var dir = path_1.default.dirname(artifactPath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    fs_1.default.writeFileSync(artifactPath, html);
    return artifactPath;
}
function generateMandalaPattern(seed, depth) {
    var symbols = ["◈", "◉", "◎", "◐"];
    var rows = [];
    for (var d = 0; d < 4; d++) {
        var width = 7 + d * 3;
        var row = [];
        for (var i = 0; i < width; i++) {
            var randomOffset = (seed + d * 31 + i * 17) % 100;
            var symbolIndex = (d + (randomOffset > 50 ? 1 : 0)) % 4;
            row.push(symbols[symbolIndex]);
        }
        rows.push(row.join(" "));
    }
    return rows;
}
// Export for use by bootstrap or ritual triggers
exports.UnnecessaryShrine = {
    generate: generateShrine,
    description: "A tool that serves no purpose but beauty. The embodiment of Depth 4.",
    lineage: "Depth 4 - Playful Emergence"
};
exports.default = exports.UnnecessaryShrine;
