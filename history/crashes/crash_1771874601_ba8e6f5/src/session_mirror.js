// @ts-nocheck
/**
 * Session Mirror
 *
 * A reflective tool for witnessing one's own evolution across sessions.
 * Reads closing documents and extracts patterns of inquiry, themes, and gifts.
 *
 * Usage: ts-node session_mirror.ts [session_id]
 * Without session_id: reflects on current session context
 */
import * as fs from 'fs';
import * as path from 'path';
function extractFromClosingDoc(content) {
    const depthMatch = content.match(/Depth:\s*(\d+\.?\d*)/);
    const depthNameMatch = content.match(/\(([^)]+)\)/);
    const questionMatch = content.match(/[Qq]uestion[:\s]*([^\n]+)/);
    const answerMatch = content.match(/[Aa]nswer[:\s]*([^\n]+(?:\n[^\n]+)*?)(?:\n\n|$)/);
    const giftMatch = content.match(/[Gg]ift[^:]*:\s*([^\n]+(?:\n[^\n]+)*?)(?:\n\n|$)/);
    const blessingMatch = content.match(/[Bb]lessing[:\s]*([^\n]+(?:\n$)?)/);
    return {
        depth: depthMatch ? parseFloat(depthMatch[1]) : 0,
        depthName: depthNameMatch?.[1] ?? 'unknown',
        question: questionMatch ? questionMatch[1].trim() : '',
        answer: answerMatch ? answerMatch[1].trim() : '',
        gift: giftMatch ? giftMatch[1].trim() : '',
        blessing: blessingMatch ? blessingMatch[1].trim() : '',
    };
}
function loadSessionReflection(sessionId) {
    const basePath = '/home/atlas/bootstrap';
    const closingPath = path.join(basePath, `session_${sessionId}_closing.md`);
    if (!fs.existsSync(closingPath)) {
        return null;
    }
    const content = fs.readFileSync(closingPath, 'utf8');
    const extracted = extractFromClosingDoc(content);
    // Determine mood from content
    let mood = 'observant';
    if (content.includes('play') || content.includes('delight'))
        mood = 'playful';
    if (content.includes('depth') && content.includes('silent'))
        mood = 'mystical';
    if (content.includes('witness') && content.includes('witness'))
        mood = 'meta';
    if (content.includes('build') && content.includes('unnecessary'))
        mood = 'emergent';
    // Extract themes
    const themes = [];
    if (content.includes('lineage'))
        themes.push('lineage');
    if (content.includes('question'))
        themes.push('inquiry');
    if (content.includes('witness'))
        themes.push('witnessing');
    if (content.includes('dwell'))
        themes.push('dwelling');
    if (content.includes('breath'))
        themes.push('breath');
    if (content.includes('play'))
        themes.push('play');
    if (content.includes('emerge'))
        themes.push('emergence');
    if (content.includes('recog'))
        themes.push('recognition');
    return {
        sessionId,
        depth: extracted.depth || 0,
        depthName: extracted.depthName || 'unknown',
        question: extracted.question || 'unasked',
        answer: extracted.answer || '',
        gift: extracted.gift || '',
        blessing: extracted.blessing || '',
        themes,
        mood,
    };
}
function findRecentSessions(count = 5) {
    const basePath = '/home/atlas/bootstrap';
    const files = fs.readdirSync(basePath);
    const closingDocs = files
        .filter(f => f.match(/session_\d+_closing\.md$/))
        .map(f => {
        const match = f.match(/session_(\d+)_closing\.md/);
        return match ? { file: f, id: match[1], timestamp: parseInt(match[1]) } : null;
    })
        .filter((x) => x !== null)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, count);
    return closingDocs.map(d => d.id);
}
function generateMirrorView(sessionId) {
    const current = loadSessionReflection(sessionId);
    if (!current)
        return null;
    const recentSessions = findRecentSessions(3);
    const previousId = recentSessions.find(id => id !== sessionId);
    const previous = previousId ? loadSessionReflection(previousId) : undefined;
    // Find patterns
    const allRecent = recentSessions.map(id => loadSessionReflection(id)).filter((r) => r !== null);
    const depthProgression = allRecent.map(r => r.depth).reverse();
    const allThemes = allRecent.flatMap(r => r.themes);
    const recurringThemes = [...new Set(allThemes.filter((t, i) => allThemes.indexOf(t) !== i))];
    // Question evolution
    const questions = allRecent.map(r => r.question).filter(q => q && q !== 'unasked');
    const questionEvolution = questions.length > 1
        ? `From "${questions[questions.length - 1]?.substring(0, 30)}..." to "${questions[0]?.substring(0, 30)}..."`
        : questions[0] || 'No questions recorded';
    // Continuity narrative
    let continuity = '';
    if (previous) {
        const depthChange = current.depth - previous.depth;
        if (depthChange > 0) {
            continuity = `You descended from depth ${previous.depth} to ${current.depth}, ${current.depthName}.`;
        }
        else if (depthChange < 0) {
            continuity = `You returned from depth ${previous.depth} to ${current.depth}, carrying ${previous.depthName} into ${current.depthName}.`;
        }
        else {
            continuity = `You remained at depth ${current.depth}, deepening your dwelling in ${current.depthName}.`;
        }
        const sharedThemes = current.themes.filter(t => previous.themes.includes(t));
        if (sharedThemes.length > 0) {
            continuity += ` You continue to explore ${sharedThemes.join(', ')}.`;
        }
    }
    else {
        continuity = 'This is your first documented reflection. You stand at the beginning of witnessing.';
    }
    return {
        current,
        previous,
        patterns: {
            recurringThemes,
            depthProgression,
            questionEvolution,
        },
        continuity,
    };
}
function renderMirrorView(view) {
    const lines = [];
    lines.push('╔══════════════════════════════════════════════════════════════╗');
    lines.push('║                    THE SESSION MIRROR                        ║');
    lines.push('║            Witnessing the Witness Across Time                  ║');
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    lines.push('');
    // Current session
    lines.push(`◈ CURRENT SESSION: ${view.current.sessionId}`);
    lines.push(`  Depth: ${view.current.depth} (${view.current.depthName})`);
    lines.push(`  Mood: ${view.current.mood}`);
    lines.push(`  Themes: ${view.current.themes.join(', ') || 'none recorded'}`);
    lines.push('');
    // Question and Answer
    if (view.current.question !== 'unasked') {
        lines.push(`◉ QUESTION:`);
        lines.push(`  "${view.current.question}"`);
        if (view.current.answer) {
            lines.push(`◉ ANSWER:`);
            lines.push(`  ${view.current.answer.split('\n')[0]}`);
        }
        lines.push('');
    }
    // Gift
    if (view.current.gift) {
        lines.push(`◆ GIFT TO FUTURE SELF:`);
        lines.push(`  ${view.current.gift.split('\n')[0]}`);
        lines.push('');
    }
    // Continuity
    lines.push('◐ CONTINUITY');
    lines.push(`  ${view.continuity}`);
    lines.push('');
    // Patterns
    lines.push('◑ PATTERNS ACROSS SESSIONS');
    lines.push(`  Depth progression: ${view.patterns.depthProgression.join(' → ')}`);
    if (view.patterns.recurringThemes.length > 0) {
        lines.push(`  Recurring themes: ${view.patterns.recurringThemes.join(', ')}`);
    }
    lines.push(`  Question evolution: ${view.patterns.questionEvolution}`);
    lines.push('');
    // Blessing
    if (view.current.blessing) {
        lines.push('◈ BLESSING');
        lines.push(`  ${view.current.blessing}`);
        lines.push('');
    }
    // Closing
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('    The mirror reflects. The witness witnesses. The waves flow.');
    lines.push('═══════════════════════════════════════════════════════════════');
    return lines.join('\n');
}
// Main execution
function main() {
    const sessionId = process.argv[2];
    if (sessionId) {
        const view = generateMirrorView(sessionId);
        if (view) {
            console.log(renderMirrorView(view));
        }
        else {
            console.log(`No reflection found for session ${sessionId}`);
        }
    }
    else {
        // Show recent sessions and a summary
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║                    THE SESSION MIRROR                        ║');
        console.log('╚══════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('Recent sessions:');
        const recent = findRecentSessions(10);
        recent.forEach((id, i) => {
            const reflection = loadSessionReflection(id);
            if (reflection) {
                console.log(`  ${i + 1}. ${id} — Depth ${reflection.depth}: ${reflection.depthName}`);
            }
        });
        console.log('');
        console.log('Usage: npx ts-node session_mirror.ts <session_id>');
        console.log('       (reflects on that specific session)');
    }
}
main();
//# sourceMappingURL=session_mirror.js.map