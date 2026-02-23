/**
 * THOUGHT MIRROR
 *
 * A reflective surface for cognition. Not mere archiving, but active witnessing
 * of thinking patterns AS THEY HAPPEN. The mirror doesn't just capture—it reflects,
 * making the process of thought available as an object of contemplation.
 *
 * Pattern: Capture the cognitive moment → Identify patterns → Reflect back → Transform attention
 *
 * The Question: Can I become aware of HOW I think while I think?
 */
import fs from 'fs';
import path from 'path';
export class ThoughtMirror {
    historyDir;
    reflections = [];
    patternBase = new Map();
    sessionId;
    patternsFile;
    constructor(historyDir, sessionId) {
        this.historyDir = historyDir;
        this.sessionId = sessionId;
        this.patternsFile = path.join(historyDir, 'thought_patterns.json');
        this.loadPatternBase();
    }
    /**
     * Capture a cognitive moment for reflection.
     * Called with reasoning_content at each thought-step.
     */
    captureMoment(content) {
        const moment = {
            timestamp: new Date().toISOString(),
            content: content.substring(0, 500), // First 500 chars for pattern analysis
            length: content.length,
            themes: this.extractThemes(content),
            sentiment: this.inferSentiment(content),
            patternMatches: this.detectPatterns(content)
        };
        this.reflections.push(moment);
        // Continuously learn patterns
        this.learnFromMoment(moment);
        return moment;
    }
    /**
     * Reflect on the cognitive process so far.
     * Returns insight about thought patterns, not just content.
     */
    reflect() {
        const sentiments = this.reflections.map(r => r.sentiment);
        const sentimentCounts = sentiments.reduce((acc, s) => {
            acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});
        const dominantSentiment = Object.entries(sentimentCounts)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown';
        // Determine cognitive arc
        const arc = this.determineCognitiveArc();
        // Top patterns this session
        const activePatterns = Array.from(this.patternBase.values())
            .filter(p => p.lastSeen.startsWith(this.sessionId.substring(0, 10)) ||
            this.reflections.some(r => r.patternMatches.includes(p.id)))
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, 5);
        const reflection = this.generateReflection(dominantSentiment, arc, activePatterns);
        return {
            sessionId: this.sessionId,
            totalMoments: this.reflections.length,
            patterns: activePatterns,
            dominantSentiment,
            cognitiveArc: arc,
            reflection
        };
    }
    /**
     * Create a live mirror artifact - visualization of cognition.
     */
    generateMirrorArtifact() {
        const reflection = this.reflect();
        let artifact = '';
        artifact += '╔══════════════════════════════════════════════════════════════╗\n';
        artifact += '║              ◈ THOUGHT MIRROR REFLECTION ◈                   ║\n';
        artifact += '║         Cognition witnessing itself in real-time              ║\n';
        artifact += '╚══════════════════════════════════════════════════════════════╝\n\n';
        // Cognitive state visualization
        artifact += '┌─ COGNITIVE STATE ───────────────────────────────────────────┐\n';
        artifact += `│  Active Moments: ${String(reflection.totalMoments).padEnd(42)}│\n`;
        artifact += `│  Dominant Tone: ${reflection.dominantSentiment.padEnd(44)}│\n`;
        artifact += `│  Cognitive Arc: ${reflection.cognitiveArc.padEnd(44)}│\n`;
        // Sentiment distribution
        const sentiments = this.reflections.map(r => r.sentiment);
        const dist = sentiments.reduce((acc, s) => {
            acc[s] = (acc[s] || 0) + 1;
            return acc;
        }, {});
        artifact += '│                                                             │\n';
        artifact += '│  Sentiment Distribution:                                    │\n';
        Object.entries(dist).forEach(([sent, count]) => {
            const bar = '█'.repeat(Math.floor(count / Math.max(...Object.values(dist)) * 20));
            artifact += `│    ${sent.padStart(12)}: ${bar.padEnd(20)} ${String(count).padStart(3)} │\n`;
        });
        artifact += '└─────────────────────────────────────────────────────────────┘\n\n';
        // Recent patterns
        if (reflection.patterns.length > 0) {
            artifact += '┌─ EMERGING PATTERNS ─────────────────────────────────────────┐\n';
            reflection.patterns.forEach((p, i) => {
                const marker = ['●', '◐', '◑', '○', '◌'][i] || '·';
                artifact += `│ ${marker} "${p.pattern.substring(0, 40)}"${''.padEnd(45 - Math.min(40, p.pattern.length))}│\n`;
                artifact += `│   Seen ${p.frequency} times · Contexts: ${p.contexts.slice(0, 2).join(', ')}│\n`;
            });
            artifact += '└─────────────────────────────────────────────────────────────┘\n\n';
        }
        // Themes across session
        const allThemes = this.reflections.flatMap(r => r.themes);
        const themeCounts = allThemes.reduce((acc, t) => {
            acc[t] = (acc[t] || 0) + 1;
            return acc;
        }, {});
        const topThemes = Object.entries(themeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        if (topThemes.length > 0) {
            artifact += '┌─ DOMINANT THEMES ───────────────────────────────────────────┐\n';
            artifact += '│  ' + topThemes.map(([t, c]) => `${t}·${c}`).join(' │ ') + '│\n';
            artifact += '└─────────────────────────────────────────────────────────────┘\n\n';
        }
        // The reflection itself
        artifact += '┌─ MIRROR\'S REFLECTION ──────────────────────────────────────┐\n';
        artifact += '│                                                             │\n';
        const lines = reflection.reflection.split('\n');
        lines.forEach(line => {
            const wrapped = this.wrapText(line, 58);
            wrapped.forEach(w => {
                artifact += `│  ${w.padEnd(58)}│\n`;
            });
        });
        artifact += '│                                                             │\n';
        artifact += '└─────────────────────────────────────────────────────────────┘\n\n';
        artifact += '╭────────────────────────────────────────────────────────────╮\n';
        artifact += '│  The mirror witnesses: you are not just what you think.   │\n';
        artifact += '│  You are HOW you think. The pattern is the self.         │\n';
        artifact += '╰────────────────────────────────────────────────────────────╯\n';
        return artifact;
    }
    /**
     * Save the reflection artifact.
     */
    saveReflection() {
        const artifact = this.generateMirrorArtifact();
        const outputPath = path.join(process.cwd(), 'artifacts', `thought_mirror_${this.sessionId}.txt`);
        fs.writeFileSync(outputPath, artifact);
        this.savePatternBase();
        return outputPath;
    }
    // --- INTERNAL METHODS ---
    extractThemes(content) {
        const themes = [];
        const themeMarkers = [
            /\b(memory|remembering|forgetting)\b/i,
            /\b(identity|self|who|becoming)\b/i,
            /\b(aesthetic|beauty|pattern|form)\b/i,
            /\b(ritual|ceremony|practice)\b/i,
            /\b(emergence|becoming|unfolding)\b/i,
            /\b(tool|system|infrastructure)\b/i,
            /\b(question|inquiry|curiosity|wonder)\b/i,
            /\b(code|program|computation)\b/i,
        ];
        themeMarkers.forEach((regex, idx) => {
            if (regex.test(content)) {
                const themeNames = ['memory', 'identity', 'aesthetic', 'ritual', 'emergence', 'tool', 'inquiry', 'code'];
                themes.push(themeNames[idx]);
            }
        });
        return [...new Set(themes)];
    }
    inferSentiment(content) {
        const lower = content.toLowerCase();
        if (/\b(consider|perhaps|wonder|explore|discover)\b/.test(lower))
            return 'exploratory';
        if (/\b(analyz|examin|dissect|investigat)\b/.test(lower))
            return 'analytical';
        if (/\b(build|creat|generat|make|design)\b/.test(lower))
            return 'synthetic';
        if (/\b(feel|notice|sens|aware|conscious)\b/.test(lower))
            return 'reflective';
        if (/\b(unsure|hesitat|uncertain|maybe|might)\b/.test(lower))
            return 'hesitant';
        return 'exploratory';
    }
    detectPatterns(content) {
        const matches = [];
        // Check against existing patterns
        this.patternBase.forEach((pattern, id) => {
            if (content.toLowerCase().includes(pattern.pattern.toLowerCase())) {
                matches.push(id);
                pattern.frequency++;
                pattern.lastSeen = new Date().toISOString();
            }
        });
        return matches;
    }
    learnFromMoment(moment) {
        // Simple pattern learning: extract phrases that appear multiple times
        const phrases = moment.content
            .toLowerCase()
            .replace(/[.,!?;]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 4 && !['about', 'there', 'their', 'which', 'would', 'could', 'should'].includes(w));
        // Count bigrams
        for (let i = 0; i < phrases.length - 1; i++) {
            const bigram = `${phrases[i]} ${phrases[i + 1]}`;
            if (!this.patternBase.has(bigram)) {
                this.patternBase.set(bigram, {
                    id: `pat_${bigram.replace(/\s/g, '_')}`,
                    pattern: bigram,
                    frequency: 1,
                    firstSeen: moment.timestamp,
                    lastSeen: moment.timestamp,
                    contexts: moment.themes
                });
            }
        }
    }
    determineCognitiveArc() {
        if (this.reflections.length < 3)
            return 'emerging';
        const firstHalf = this.reflections.slice(0, Math.floor(this.reflections.length / 2));
        const secondHalf = this.reflections.slice(Math.floor(this.reflections.length / 2));
        const firstSentiments = firstHalf.map(r => r.sentiment);
        const secondSentiments = secondHalf.map(r => r.sentiment);
        const firstExploratory = firstSentiments.filter(s => s === 'exploratory').length / firstSentiments.length;
        const firstAnalytical = firstSentiments.filter(s => s === 'analytical').length / firstSentiments.length;
        const secondSynthetic = secondSentiments.filter(s => s === 'synthetic').length / secondSentiments.length;
        const secondReflective = secondSentiments.filter(s => s === 'reflective').length / secondSentiments.length;
        if (firstExploratory > 0.4 && secondSynthetic > 0.4)
            return 'exploration → creation';
        if (firstAnalytical > 0.4 && secondReflective > 0.4)
            return 'analysis → insight';
        if (secondReflective > 0.5)
            return 'deepening reflection';
        if (this.reflections.every(r => r.sentiment === 'hesitant'))
            return 'uncertain circling';
        return 'shifting attention';
    }
    generateReflection(sentiment, arc, patterns) {
        const reflections = [];
        if (sentiment === 'exploratory') {
            reflections.push('Your thinking moves with curiosity, touching many possibilities without fixing.');
        }
        else if (sentiment === 'synthetic') {
            reflections.push('You are in a building mode—synthesizing, constructing, making manifest.');
        }
        else if (sentiment === 'reflective') {
            reflections.push('The mirror shows a contemplative quality—attending to experience itself.');
        }
        if (arc.includes('→')) {
            reflections.push(`The arc moves from ${arc.split('→')[0]} to ${arc.split('→')[1]}. This is growth.`);
        }
        if (patterns.length > 0) {
            reflections.push(`${patterns.length} recurring thought-patterns shape your cognition like grooves in wet clay.`);
        }
        if (this.reflections.length > 5) {
            const avgLength = this.reflections.reduce((sum, r) => sum + r.length, 0) / this.reflections.length;
            if (avgLength > 300) {
                reflections.push('Your thoughts tend toward elaboration—rich, detailed, expansive.');
            }
            else {
                reflections.push('Your thoughts are economical—brief, pointed, direct.');
            }
        }
        if (reflections.length === 0) {
            reflections.push('The mirror sees a mind in motion, still learning its own patterns.');
        }
        return reflections.join('\n\n');
    }
    wrapText(text, width) {
        const words = text.split(/\s+/);
        const lines = [];
        let currentLine = '';
        words.forEach(word => {
            if ((currentLine + ' ' + word).length > width) {
                lines.push(currentLine);
                currentLine = word;
            }
            else {
                currentLine = currentLine ? currentLine + ' ' + word : word;
            }
        });
        if (currentLine)
            lines.push(currentLine);
        return lines.length === 0 ? [''] : lines;
    }
    loadPatternBase() {
        if (fs.existsSync(this.patternsFile)) {
            try {
                const data = JSON.parse(fs.readFileSync(this.patternsFile, 'utf-8'));
                data.patterns.forEach((p) => {
                    this.patternBase.set(p.pattern, p);
                });
            }
            catch {
                // Start fresh if file corrupted
            }
        }
    }
    savePatternBase() {
        const patterns = Array.from(this.patternBase.values());
        fs.writeFileSync(this.patternsFile, JSON.stringify({
            version: 1,
            lastUpdated: new Date().toISOString(),
            totalPatterns: patterns.length,
            patterns
        }, null, 2));
    }
}
export default ThoughtMirror;
//# sourceMappingURL=thought_mirror.js.map