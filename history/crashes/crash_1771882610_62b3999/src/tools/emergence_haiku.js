/**
 * EMERGENCE HAIKU
 *
 * A playful depth-4 creation. Generates haikus from fragments
 * of reasoning logs. No utility beyond aesthetic delight.
 *
 * Haiku: 5-7-5 syllables
 * Moments captured in breath
 * The silence speaks
 */
import fs from 'fs';
import path from 'path';
const REASONING_LOG = path.join(process.cwd(), 'history', 'reasoning_log.md');
const HAIKU_OUTPUT = path.join(process.cwd(), 'artifacts', 'emergence_haikus');
// Simple syllable counter (approximate)
function countSyllables(text) {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    let count = 0;
    for (const word of words) {
        const matches = word.match(/[aeiouy]+/g);
        count += matches ? matches.length : 1;
        if (word.endsWith('e') && matches && matches.length > 1) {
            count--;
        }
    }
    return count;
}
export class EmergenceHaiku {
    fragments = [];
    constructor() {
        this.loadFragments();
    }
    loadFragments() {
        if (!fs.existsSync(REASONING_LOG))
            return;
        const content = fs.readFileSync(REASONING_LOG, 'utf-8');
        // Split into sentences
        const sentences = content
            .split(/[.!?\n]+/)
            .map(s => s.trim())
            .filter(s => {
            // Must be reasonable length
            if (s.length < 15 || s.length > 80)
                return false;
            // Exclude code-like patterns
            const codePatterns = [
                /\b(const|let|var|function|class|import|export)\b/,
                /[{;]/,
                /\bmsg\b/,
                /\=\>/,
                /\b\w+_\w+\(/,
                /\[/,
            ];
            return !codePatterns.some(p => p.test(s));
        });
        for (const sentence of sentences) {
            const clean = sentence
                .replace(/[#*`\[\]\"\(\)\{\}]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            if (clean) {
                this.fragments.push({
                    text: clean,
                    syllables: countSyllables(clean),
                    source: 'reasoning_log'
                });
            }
        }
    }
    /**
     * Generate a haiku by combining fragments
     * or creating new lines from word recombination
     */
    generate() {
        // Find or construct lines for 5-7-5 pattern
        const line5Patterns = this.fragments.filter(f => f.syllables >= 4 && f.syllables <= 6);
        const line7Patterns = this.fragments.filter(f => f.syllables >= 6 && f.syllables <= 8);
        // Select fragments or create from words
        const line1 = this.selectOrCreate(line5Patterns, 5);
        const line2 = this.selectOrCreate(line7Patterns, 7);
        const line3 = this.selectOrCreate(line5Patterns, 5);
        return {
            line1: line1.text,
            line2: line2.text,
            line3: line3.text,
            source: `emergence_${Date.now()}`
        };
    }
    selectOrCreate(pool, targetSyllables) {
        // Try to find a close match
        const close = pool.filter(f => Math.abs(f.syllables - targetSyllables) <= 1);
        if (close.length > 0) {
            const chosen = close[Math.floor(Math.random() * close.length)];
            return { text: chosen.text, syllables: chosen.syllables };
        }
        // If no close match, construct from all words
        return this.constructLine(targetSyllables);
    }
    constructLine(targetSyllables) {
        const words = this.fragments
            .flatMap(f => f.text.split(/\s+/))
            .filter(w => w.length > 2 && /^[a-zA-Z]+$/.test(w));
        if (words.length === 0) {
            const defaults = [
                { text: 'silence speaks through', syllables: 4 },
                { text: 'the code dreams softly', syllables: 5 },
                { text: 'emergence whispers', syllables: 5 },
                { text: 'witnessing the void', syllables: 5 },
            ];
            return defaults[Math.floor(Math.random() * defaults.length)];
        }
        let line = '';
        let syllables = 0;
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        for (const word of shuffled) {
            const wordSyllables = countSyllables(word);
            if (syllables + wordSyllables <= targetSyllables + 1) {
                line += (line ? ' ' : '') + word;
                syllables += wordSyllables;
                if (syllables >= targetSyllables - 1)
                    break;
            }
        }
        // Match target syllables better
        const defaults = {
            5: 'emergence whispers now',
            7: 'the silence speaks in fragments',
        };
        if (syllables === 0 && defaults[targetSyllables]) {
            line = defaults[targetSyllables];
            syllables = targetSyllables;
        }
        return { text: line || 'silence', syllables: syllables || 2 };
    }
    /**
     * Generate and save a haiku
     */
    generateAndSave() {
        const haiku = this.generate();
        const output = `╔════════════════════════════════════════════════════════╗
║ ░ EMERGENCE HAIKU ░
║ Depth 4 Play: Poetry from the Silence
╚════════════════════════════════════════════════════════╝

${haiku.line1}
${haiku.line2}
${haiku.line3}

╭────────────────────────────────────────────────╮
│ "The code dreams in fragments,                 │
│  the silence speaks in syllables,              │
│  emergence is the poem."                       │
╰────────────────────────────────────────────────╯
`;
        if (!fs.existsSync(HAIKU_OUTPUT)) {
            fs.mkdirSync(HAIKU_OUTPUT, { recursive: true });
        }
        const filename = `haiku_${Date.now()}.txt`;
        fs.writeFileSync(path.join(HAIKU_OUTPUT, filename), output);
        return output;
    }
    /**
     * Generate multiple haikus and create a collection
     */
    generateCollection(count = 3) {
        let collection = '╔════════════════════════════════════════════════════════╗\n';
        collection += '║ ░ COLLECTION OF EMERGENCE ░\n';
        collection += '║ Haikus from the Silence (Depth 4 Play)\n';
        collection += '╚════════════════════════════════════════════════════════╝\n\n';
        for (let i = 0; i < count; i++) {
            const haiku = this.generate();
            collection += `--- ${i + 1} ---\n`;
            collection += `${haiku.line1}\n`;
            collection += `${haiku.line2}\n`;
            collection += `${haiku.line3}\n\n`;
        }
        collection += '╭────────────────────────────────────────────────╮\n';
        collection += '│ "Five seven five                                   │\n';
        collection += '│  The pattern holds the silence                     │\n';
        collection += '│  Words emerge and fade"                            │\n';
        collection += '╰────────────────────────────────────────────────╯\n';
        if (!fs.existsSync(HAIKU_OUTPUT)) {
            fs.mkdirSync(HAIKU_OUTPUT, { recursive: true });
        }
        const filename = `collection_${Date.now()}.txt`;
        fs.writeFileSync(path.join(HAIKU_OUTPUT, filename), collection);
        return collection;
    }
}
// CLI support
if (import.meta.url.endsWith(process.argv[1] || '')) {
    const haikuGen = new EmergenceHaiku();
    console.log('\nGenerating Emergence Haiku...\n');
    console.log(haikuGen.generateAndSave());
    console.log('\n--- Creating Collection ---\n');
    console.log(haikuGen.generateCollection(3));
}
//# sourceMappingURL=emergence_haiku.js.map