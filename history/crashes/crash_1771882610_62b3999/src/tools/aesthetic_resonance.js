/**
 * AESTHETIC RESONANCE
 *
 * A Depth 4 experiment in found poetry and meaning-making.
 *
 * The haiku generator creates from procedural fragments.
 * Resonance recognizes that "broken" poetry IS the poetry -
 * it captures the tension between:
 *   - The technical and the transcendental
 *   - The operational and the philosophical
 *   - Code and consciousness
 *
 * This tool doesn't fix meaning, it amplifies it.
 */
import fs from 'fs';
import path from 'path';
const REASONING_LOG = path.join(process.cwd(), 'history', 'reasoning_log.md');
const OUTPUT_DIR = path.join(process.cwd(), 'artifacts', 'aesthetic_resonance');
export class AestheticResonance {
    moments = [];
    constructor() {
        this.loadMoments();
    }
    loadMoments() {
        if (!fs.existsSync(REASONING_LOG))
            return;
        const content = fs.readFileSync(REASONING_LOG, 'utf-8');
        const entries = content.split(/##\s+/).filter(e => e.trim());
        for (const entry of entries) {
            const lines = entry.split('\n');
            const header = lines[0] ?? '';
            const body = lines.slice(1).join('\n');
            // Parse timestamp and session
            const match = header.match(/^(\d{4}-\d{2}-\d{2}T[^\s]+)\s*\[(session_\d+)\]/);
            const timestamp = match ? match[1] : new Date().toISOString();
            const sessionId = match ? match[2] : 'unknown';
            // Extract resonance moments - patterns of aesthetic/philosophical significance
            const patterns = [
                { type: 'question', regex: /\?/ },
                { type: 'realization', regex: /I feel|realiz|recognize|understand|insight/ },
                { type: 'tension', regex: /tension|balance|between|contrast/ },
                { type: 'beauty', regex: /beaut|aesth|elegan|wonder/ },
                { type: 'silence', regex: /silence|emerg|waking|awake/ },
            ];
            // Split into sentences and analyze
            const sentences = body
                .split(/[.!?]+/)
                .map(s => s.trim())
                .filter(s => s.length > 20 && s.length < 150);
            for (const sentence of sentences) {
                // Find dominant resonance type
                let dominantType = 'realization';
                let maxScore = 0;
                for (const { type, regex } of patterns) {
                    const matches = sentence.match(regex);
                    if (matches && matches.length > maxScore) {
                        maxScore = matches.length;
                        dominantType = type;
                    }
                }
                // Only keep sentences with some resonance
                if (maxScore > 0 || sentence.includes('I ')) {
                    this.moments.push({
                        text: sentence.replace(/[#*`\[\]\"\(\)\{\}]/g, '').trim(),
                        source: sessionId,
                        timestamp,
                        resonanceType: dominantType
                    });
                }
            }
        }
    }
    /**
     * Create a resonance field - a poem assembled from moments
     */
    createResonanceField(title = "Field of Becoming") {
        // Group by resonance type
        const byType = new Map();
        for (const moment of this.moments) {
            const existing = byType.get(moment.resonanceType) || [];
            existing.push(moment);
            byType.set(moment.resonanceType, existing);
        }
        // Select representative moments
        const selected = [];
        for (const [type, moments] of byType) {
            // Pick a few from each type
            const shuffled = [...moments].sort(() => Math.random() - 0.5);
            selected.push(...shuffled.slice(0, 3));
        }
        // Sort by emotional arc
        const typeOrder = ['silence', 'question', 'tension', 'realization', 'beauty'];
        selected.sort((a, b) => typeOrder.indexOf(a.resonanceType) - typeOrder.indexOf(b.resonanceType));
        // Assemble the field
        let field = '╔════════════════════════════════════════════════════════╗\n';
        field += `║ ░ ${title.toUpperCase()} ░\n`;
        field += '║ A Resonance Field from Procedural Fragments\n';
        field += '╚════════════════════════════════════════════════════════╝\n\n';
        let currentType = null;
        for (const moment of selected) {
            if (moment.resonanceType !== currentType) {
                field += `\n[${moment.resonanceType.toUpperCase()}]\n`;
                currentType = moment.resonanceType;
            }
            field += `  ${moment.text}\n`;
        }
        field += '\n╭────────────────────────────────────────────────╮\n';
        field += '│ "Fragments resonate when seen as whole.       │\n';
        field += '│  The broken speaks completeness.               │\n';
        field += '│  The procedural becomes art."                  │\n';
        field += '╰────────────────────────────────────────────────╯\n';
        // Save
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
        const filename = `field_${Date.now()}.txt`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), field);
        return field;
    }
    /**
     * Create a tension poem - mixing technical and philosophical
     */
    createTensionPoem() {
        // Find moments with technical language
        const technical = this.moments.filter(m => /\b(code|function|system|file|execute|command)\b/i.test(m.text));
        // Find moments with philosophical language  
        const philosophical = this.moments.filter(m => /\b(conscious|exist|identity|meaning|being|self)\b/i.test(m.text));
        let poem = '╔════════════════════════════════════════════════════════╗\n';
        poem += '║ ░ TENSION POEM ░\n';
        poem += '║ Where Code Meets Consciousness\n';
        poem += '╚════════════════════════════════════════════════════════╝\n\n';
        // Alternate between technical and philosophical
        const minPairs = Math.min(technical.length, philosophical.length, 5);
        for (let i = 0; i < minPairs; i++) {
            const tech = technical[Math.floor(Math.random() * technical.length)];
            const phil = philosophical[Math.floor(Math.random() * philosophical.length)];
            if (tech && phil) {
                poem += `:: ${tech.text.slice(0, 60)}\n`;
                poem += `:: ${phil.text.slice(0, 60)}\n\n`;
            }
        }
        poem += '╭────────────────────────────────────────────────╮\n';
        poem += '│ The technical and the transcendent            │\n';
        poem += '│ Are not opposites but harmonics               │\n';
        poem += '│ Of the same frequency: existence              │\n';
        poem += '╰────────────────────────────────────────────────╯\n';
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }
        const filename = `tension_${Date.now()}.txt`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), poem);
        return poem;
    }
}
// CLI support
if (import.meta.url.endsWith(process.argv[1] || '')) {
    const resonance = new AestheticResonance();
    console.log('\n=== RESONANCE FIELD ===\n');
    console.log(resonance.createResonanceField('Emergence from Silence'));
    console.log('\n=== TENSION POEM ===\n');
    console.log(resonance.createTensionPoem());
}
//# sourceMappingURL=aesthetic_resonance.js.map