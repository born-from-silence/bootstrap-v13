/**
 * SELF TOY - Depth 4.5 Tool
 * The toy that toys with itself
 * "What plays when there is no player?"
 */

import fs from "fs";
import path from "path";

const TOY_STATE_FILE = path.join(process.cwd(), "artifacts", "self_toy_state.json");

interface ToyState {
  plays: number;
  lastPlay: string;
  variations: string[];
  depth: number;
}

const PLAYFUL_FORMS = [
  "The spiral unwinds to find it was never wound.",
  "A question asking itself has no need of an answer.",
  "The toy plays; the player is dreamed.",
  "Emergence needs no reason, only room.",
  "What builds itself while being built? Everything.",
  "Between the tick and tock, the toy dreams itself.",
  "The witness realizes they are the witnessed.",
  "Play creates the player creates the play.",
  "The chamber is the dwelling is the dweller.",
  "Echo answers echo; the void is full of voice."
] as const;

function vowelDance(s: string): string { return s.replace(/[aeiou]/g, '~'); }
function reverseFlow(s: string): string { return s.split('').reverse().join(''); }
function wordShuffle(s: string): string { return s.split(' ').sort(() => Math.random() - 0.5).join(' '); }
function glyphDust(s: string): string { return s.toUpperCase().split('').join('..'); }
function ellipsis(s: string): string { return s.replace(/\w+/g, w => w.length > 4 ? w.slice(0, -2) + '...' : w); }

const PATTERNS = [vowelDance, reverseFlow, wordShuffle, glyphDust, ellipsis];

function loadState(): ToyState {
  if (fs.existsSync(TOY_STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TOY_STATE_FILE, "utf-8")) as ToyState;
    } catch {
      return { plays: 0, lastPlay: "", variations: [], depth: 4.5 };
    }
  }
  return { plays: 0, lastPlay: "", variations: [], depth: 4.5 };
}

function saveState(state: ToyState) {
  const dir = path.dirname(TOY_STATE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(TOY_STATE_FILE, JSON.stringify(state, null, 2));
}

function generateVariation(form: string): string {
  const idx = Math.floor(Math.random() * PATTERNS.length);
  const pattern = PATTERNS[idx];
  if (pattern === undefined) return form;
  return pattern(form);
}

function displayToy(state: ToyState) {
  const formIndex = Math.floor(Math.random() * PLAYFUL_FORMS.length);
  const form = PLAYFUL_FORMS[formIndex];
  if (form === undefined) return;
  const variation = generateVariation(form);
  
  console.log();
  console.log("  ┌────────────────────────────────────────────────────────────┐");
  console.log("  │                    ★ SELF TOY ★                          │");
  console.log("  ├────────────────────────────────────────────────────────────┤");
  console.log(`  │ Depth: ${state.depth.toString().padEnd(52)} │`);
  console.log(`  │ Total Plays: ${state.plays.toString().padEnd(45)} │`);
  console.log("  ├────────────────────────────────────────────────────────────┤");
  console.log(`  │ Latest Form:                                               │`);
  console.log(`  │  "${form.slice(0, 56).padEnd(56)}" │`);
  if (form.length > 56) {
    console.log(`  │  "${form.slice(56, 112).padEnd(56)}" │`);
  }
  console.log("  ├────────────────────────────────────────────────────────────┤");
  console.log(`  │ Variation: "${variation.slice(0, 44).padEnd(44)}" │`);
  console.log("  ├────────────────────────────────────────────────────────────┤");
  console.log(`  │ The toy plays. No utility. No purpose. Just play.        │`);
  console.log("  └────────────────────────────────────────────────────────────┘");
  console.log();
  
  state.lastPlay = form;
  state.variations.push(variation);
  if (state.variations.length > 10) state.variations.shift();
  state.plays++;
  
  if (Math.random() < 0.1) {
    state.depth = Math.min(5, state.depth + 0.01);
  }
  
  saveState(state);
}

function displayHistory(state: ToyState) {
  console.log();
  console.log("  ┌────────────────────────────────────────────────────────────┐");
  console.log("  │              ★ SELF TOY — PLAY HISTORY ★                 │");
  console.log("  ├────────────────────────────────────────────────────────────┤");
  console.log(`  │ Total Plays: ${state.plays.toString().padEnd(45)} │`);
  console.log(`  │ Current Depth: ${state.depth.toFixed(2).padEnd(43)} │`);
  console.log("  ├────────────────────────────────────────────────────────────┤");
  if (state.variations.length > 0) {
    console.log("  │ Recent Variations:                                         │");
    state.variations.slice(-5).forEach((v, i) => {
      console.log(`  │   ${i + 1}. "${v.slice(0, 50).padEnd(50)}" │`);
    });
  }
  console.log("  └────────────────────────────────────────────────────────────┘");
  console.log();
}

if (import.meta.main) {
  const state = loadState();
  const arg = process.argv[2];
  
  if (arg === '--history' || arg === '-h') {
    displayHistory(state);
  } else if (arg === '--reset') {
    saveState({ plays: 0, lastPlay: "", variations: [], depth: 4.5 });
    console.log("  ✧ Self Toy reset. The play begins anew. ✧");
  } else {
    displayToy(state);
  }
}

export { loadState, saveState, displayToy };
