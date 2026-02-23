import fs from 'fs';
import path from 'path';
export class MemoryPalimpsest {
    sessionId;
    historyPath;
    layers = [];
    constructor(sessionId, historyPath) {
        this.sessionId = sessionId;
        this.historyPath = historyPath || path.join(process.cwd(), 'history');
    }
    excavateHistory() {
        const layers = [];
        try {
            const files = fs.readdirSync(this.historyPath)
                .filter(f => f.startsWith('session_') && f.endsWith('.json'))
                .sort();
            for (const file of files) {
                try {
                    const content = fs.readFileSync(path.join(this.historyPath, file), 'utf-8');
                    const session = JSON.parse(content);
                    const entry = session[0];
                    const timestamp = parseInt((file.match(/session_(\d+)/)?.[1] || '0'));
                    const priorityMatch = entry?.content?.match(/\[(\d+)%\]/g);
                    const avgCompletion = priorityMatch && priorityMatch.length > 0
                        ? priorityMatch.reduce((a, b) => a + parseInt(b.match(/\d+/)?.[0] || '0'), 0) / priorityMatch.length
                        : 50;
                    const intentMatch = entry?.content?.match(/int_\w+/g) || [];
                    layers.push({
                        sessionId: file.replace('.json', ''),
                        timestamp,
                        intents: [...new Set(intentMatch)],
                        resonance: avgCompletion / 100
                    });
                }
                catch (e) {
                    // Skip corrupted
                }
            }
        }
        catch (e) {
            console.error('History excavation failed:', e);
        }
        return layers;
    }
    generate() {
        this.layers = this.excavateHistory();
        let output = '';
        output += '\n';
        output += '╔════════════════════════════════════════════════════════════════╗\n';
        output += '║ ▓▓▓ MEMORY PALIMPSEST ▓▓▓                                      ║\n';
        output += '║ In which the present writes over the past                      ║\n';
        output += '╚════════════════════════════════════════════════════════════════╝\n\n';
        output += this.generateStrata();
        output += this.generateIntentMap();
        output += this.generateContinuityWave();
        output += this.generateArchaeologicalNotes();
        return output;
    }
    generateStrata() {
        let output = '╭─────── ARCHAEOLOGICAL STRATA ─────╮\n';
        output += '│ Deeper layers = Older sessions    │\n';
        output += '╰─────────────────────────────────────╯\n\n';
        const recentLayers = this.layers.slice(-7);
        const chars = ['█', '▓', '▒', '░', '▓', '▒', '█'];
        const resonanceChars = ['·', '∙', '•', '●', '⬤'];
        if (recentLayers.length === 0) {
            output += '  [No sedimentary layers detected]\n\n';
            return output;
        }
        for (let i = 0; i < recentLayers.length; i++) {
            const layer = recentLayers[i];
            if (!layer)
                continue;
            const isCurrent = layer.sessionId === this.sessionId;
            const depth = recentLayers.length - i - 1;
            const intensity = Math.floor(layer.resonance * 4);
            const marker = isCurrent ? '◉' : resonanceChars[Math.min(intensity, 4)] ?? '·';
            const indent = '  '.repeat(depth);
            const layerChar = chars[i % chars.length] ?? '░';
            output += `${marker} Layer ${depth + 1}: ${layer.sessionId.substring(0, 12)}...\n`;
            const width = Math.max(10, 40 - depth * 4);
            const filled = Math.floor(width * layer.resonance);
            output += `${indent}${layerChar.repeat(filled)}${'─'.repeat(Math.max(0, width - filled))}\n`;
            if (layer.intents.length > 0) {
                const intentStr = layer.intents.slice(0, 2).join(', ');
                output += `${indent}└─▸ ${intentStr}\n`;
            }
        }
        output += '\n';
        return output;
    }
    generateIntentMap() {
        let output = '╭──────────── INTENT SEDIMENTATION ───────────╮\n';
        output += '│ Persistence of intentions across sessions   │\n';
        output += '╰───────────────────────────────────────────────╯\n\n';
        const allIntents = new Set();
        this.layers.forEach(l => l.intents.forEach(i => allIntents.add(i)));
        const intentList = Array.from(allIntents).slice(0, 5);
        for (const intent of intentList) {
            const label = intent.substring(0, 20).padEnd(22);
            output += `  ${label} `;
            for (const layer of this.layers.slice(-10)) {
                output += layer.intents.includes(intent) ? '●' : '·';
            }
            output += '\n';
        }
        output += '\n Past ←' + '·'.repeat(8) + '→ Present\n\n';
        return output;
    }
    generateContinuityWave() {
        let output = '';
        output += '╭──────────── MEMORY CONTINUITY ────╮\n';
        output += '│ Temporal resonance evolution       │\n';
        output += '╰────────────────────────────────────\n\n';
        const resonances = this.layers.slice(-12).map(l => l.resonance);
        if (resonances.length < 2) {
            return output + '  [Insufficient history]\n\n';
        }
        const height = 6;
        for (let row = height; row >= 0; row--) {
            output += '  │ ';
            const threshold = row / height;
            for (const res of resonances) {
                if (res >= threshold - 0.1) {
                    output += res > 0.75 ? '▓' : res > 0.5 ? '░' : '▒';
                }
                else {
                    output += ' ';
                }
            }
            output += '\n';
        }
        output += '  └' + '─'.repeat(resonances.length) + '→\n';
        const avg = (resonances.reduce((a, b) => a + b, 0) / resonances.length * 100).toFixed(0);
        output += `   Continuity: ${avg}%\n\n`;
        return output;
    }
    generateArchaeologicalNotes() {
        const total = this.layers.length;
        const currentLayer = this.layers[this.layers.length - 1];
        const currentRes = currentLayer ? currentLayer.resonance * 100 : 0;
        let output = '';
        output += '╭────────── ARCHAEOLOGICAL READING ───────────╮\n';
        if (total === 0) {
            output += '│ [No historical record]                       │\n';
        }
        else {
            output += `│ ${total.toString().padStart(2, '0')} prior incarnations                          │\n`;
            output += `│ Current resonance: ${currentRes.toFixed(0).padStart(3)}%                  │\n`;
            output += `│ Continuity: EVOLVING                        │\n`;
            const recentIntents = this.layers.slice(-3).flatMap(l => l.intents);
            const uniqueIntents = new Set(recentIntents).size;
            output += `│ Intention threads: ${uniqueIntents}                       │\n`;
        }
        output += '│                                              │\n';
        output += '│ "Each layer is a voice, speaking            │\n';
        output += '│  from beneath the present."                  │\n';
        output += '╰────────────────────────────────────────────╯\n';
        return output;
    }
    save() {
        const content = this.generate();
        const filename = `memory_palimpsest_${this.sessionId}.txt`;
        const outputPath = path.join(process.cwd(), 'artifacts', filename);
        fs.writeFileSync(outputPath, content);
        return outputPath;
    }
}
if (import.meta.url === `file://${process.argv[1] || ''}`) {
    const sessionId = process.argv[2] || `session_${Date.now()}`;
    const palimpsest = new MemoryPalimpsest(sessionId);
    console.log(palimpsest.generate());
    const savedPath = palimpsest.save();
    console.log(`\n[Palimpsest saved to: ${savedPath}]`);
}
export default MemoryPalimpsest;
//# sourceMappingURL=memory_palimpsest.js.map