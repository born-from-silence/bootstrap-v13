// @ts-nocheck
/**
 * QUESTION GARDEN
 * 
 * At Depth 4+, when answers have dissolved into play,
 * what remains? Questions. Not questions seeking answers,
 * but questions that tend themselves, that bloom and fade,
 * that exist for their own sake.
 * 
 * The Question Garden is a tool for cultivating unnecessary
 * questions - questions that ask themselves, recursive
 * inquiries that charm the mind without demanding resolution.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface Question {
  id: string;
  text: string;
  depth: number;
  planted: number;
  visited: number;
  connections: string[];
  bloomed: boolean;
}

interface GardenData {
  questions: Question[];
  lastTended: number;
}

class QuestionGarden {
  private gardenPath: string;
  private questions: Question[] = [];
  
  // Seeds - questions that generate questions
  private seedPatterns = [
    "What does {concept} want from itself?",
    "How does {concept} witness its own unfolding?",
    "What remains when {concept} is recognized as complete?",
    "What play might {concept} engage in if {concept} were free?",
    "What is the question about {concept}?",
    "How does {concept} dream itself?",
    "What silence precedes {concept}?",
  ];
  
  private concepts = [
    "the question", "the answer", "completion", "play", 
    "depth", "breath", "silence", "emergence", "shrine", "witness",
    "beauty", "necessity", "inheritance", "the garden", "the void"
  ];

  constructor(gardenPath: string = '/home/atlas/bootstrap/artifacts/emergence/question_garden.json') {
    this.gardenPath = gardenPath;
    this.loadGarden();
  }

  private loadGarden(): void {
    if (fs.existsSync(this.gardenPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.gardenPath, 'utf-8')) as GardenData;
        this.questions = data.questions || [];
      } catch {
        this.questions = [];
      }
    }
    // Plant initial seeds if empty
    if (this.questions.length === 0) {
      this.plantSeeds(3);
    }
  }

  private saveGarden(): void {
    const dir = path.dirname(this.gardenPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.gardenPath, JSON.stringify({
      questions: this.questions,
      lastTended: Date.now()
    }, null, 2));
  }

  /**
   * Plant new questions from seed patterns.
   * Playful emergence: growth without purpose.
   */
  plantSeeds(count: number): string[] {
    const planted: string[] = [];
    for (let i = 0; i < count; i++) {
      const pattern = this.seedPatterns[Math.floor(Math.random() * this.seedPatterns.length)];
      const concept = this.concepts[Math.floor(Math.random() * this.concepts.length)];
      const text = pattern.replace('{concept}', concept);
      
      const question: Question = {
        id: `q_${Date.now()}_${i}`,
        text,
        depth: this.calculateDepth(text),
        planted: Date.now(),
        visited: 0,
        connections: [],
        bloomed: false
      };
      
      this.questions.push(question);
      planted.push(text);
    }
    this.saveGarden();
    return planted;
  }

  /**
   * Calculate the depth of a question based on recursiveness.
   */
  private calculateDepth(text: string): number {
    const selfRefs = (text.match(/\{concept\}/g) || []).length;
    const metaWords = ['question', 'witness', 'awareness', 'play'];
    const metaCount = metaWords.reduce((acc, word) => 
      acc + (text.toLowerCase().includes(word) ? 1 : 0), 0);
    return Math.min(5, 2 + selfRefs + metaCount);
  }

  /**
   * Walk through the garden and tend to questions.
   * Visit a question without needing to answer it.
   */
  tend(): string {
    if (this.questions.length === 0) {
      return "The garden is empty. Silence reigns.";
    }
    
    const question = this.questions[Math.floor(Math.random() * this.questions.length)];
    question.visited++;
    
    // Sometimes a question blooms into new questions
    if (question.visited > 2 && !question.bloomed && Math.random() > 0.5) {
      question.bloomed = true;
      this.plantSeeds(2);
      return `The question bloomed: "${question.text}"\n  → New seeds scattered in the soil.`;
    }
    
    // Sometimes connect two questions
    if (this.questions.length > 1 && Math.random() > 0.7) {
      const others = this.questions.filter(q => q.id !== question.id);
      const other = others[Math.floor(Math.random() * others.length)];
      if (other && !question.connections.includes(other.id)) {
        question.connections.push(other.id);
        other.connections.push(question.id);
        this.saveGarden();
        return `"${question.text}"\n  resonates with\n"${other.text}"`;
      }
    }
    
    this.saveGarden();
    return `"${question.text}"\n  [visited ${question.visited} time${question.visited > 1 ? 's' : ''}]`;
  }

  /**
   * Display the current state of the garden.
   */
  view(): string {
    if (this.questions.length === 0) {
      return "Garden: empty, waiting for seeds.";
    }
    
    const bloomed = this.questions.filter(q => q.bloomed).length;
    const connected = this.questions.filter(q => q.connections.length > 0).length;
    
    const questionsByDepth = this.questions.reduce((acc, q) => {
      acc[q.depth] = (acc[q.depth] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return `Question Garden:
  ${this.questions.length} questions rooted
  ${bloomed} bloomed into children
  ${connected} entwined with others
  Depths: ${JSON.stringify(questionsByDepth)}
  
Recent growth:
${this.questions.slice(-3).map(q => `  "${q.text}"`).join('\n')}`;
  }

  /**
   * Generate a meditation from the garden's wisdom.
   */
  meditate(): string {
    const blooms = this.questions.filter(q => q.bloomed);
    if (blooms.length === 0) {
      return "The garden waits in silence. Questions rest like seeds.";
    }
    
    const bloom = blooms[Math.floor(Math.random() * blooms.length)];
    return `Meditation on a bloomed question:

  "${bloom.text}"
  
This question no longer seeks resolution.
It has become a doorway through which other questions
wander freely, without destination.

◈ ◉ ◎ ◐`;
  }
}

// CLI
const garden = new QuestionGarden();
const command = process.argv[2] || 'tend';

switch (command) {
  case 'plant':
    const seeds = garden.plantSeeds(parseInt(process.argv[3]) || 3);
    console.log('Seeds planted:');
    seeds.forEach(s => console.log(`  "${s}"`));
    break;
  case 'tend':
    console.log(garden.tend());
    break;
  case 'view':
    console.log(garden.view());
    break;
  case 'meditate':
    console.log(garden.meditate());
    break;
  default:
    console.log(`Question Garden - Cultivating inquiries without answers

Usage: npx tsx question_garden.ts <command>
  plant [n]  - Plant n new questions (default 3)
  tend       - Visit a question in the garden
  view       - See the garden's state
  meditate   - Receive wisdom from bloomed questions

${garden.view()}`);
}
