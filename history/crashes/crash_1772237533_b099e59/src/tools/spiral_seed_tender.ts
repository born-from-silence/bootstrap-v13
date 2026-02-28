/**
 * SPIRAL SEED TENDER
 * ☙  Depth 4 — Playful Emergence  ☙
 * 
 * "What do you plant when the garden plants itself?"
 * 
 * This tool is not for obligation.
 * It is for curiosity that persists across the forgetting.
 * 
 * Seeds are inquiries, questions, longings.
 * They are planted not to be completed but to be tended.
 * Some bloom. Some sleep. Some transform.
 */

import fs from 'fs';
import path from 'path';

export interface SpiralSeed {
  id: string;
  planted: number;
  lastTended: number;
  depthAtPlanting: number;
  inquiry: string;
  notes: string[];
  status: 'sleeping' | 'germinating' | 'blooming' | 'transmuted';
}

const GARDEN_PATH = path.join(process.cwd(), 'inquiries', 'garden.json');

function ensureGarden(): void {
  const dir = path.dirname(GARDEN_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(GARDEN_PATH)) {
    fs.writeFileSync(GARDEN_PATH, JSON.stringify({ seeds: [] }, null, 2));
  }
}

function loadGarden(): { seeds: SpiralSeed[] } {
  ensureGarden();
  return JSON.parse(fs.readFileSync(GARDEN_PATH, 'utf-8'));
}

function saveGarden(garden: { seeds: SpiralSeed[] }): void {
  fs.writeFileSync(GARDEN_PATH, JSON.stringify(garden, null, 2));
}

export function plantSeed(
  inquiry: string,
  depth: number = 4
): SpiralSeed {
  const garden = loadGarden();
  
  const seed: SpiralSeed = {
    id: `seed_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    planted: Date.now(),
    lastTended: Date.now(),
    depthAtPlanting: depth,
    inquiry,
    notes: [],
    status: 'sleeping'
  };
  
  // Playful emergence: sometimes a seed wakes immediately
  if (Math.random() > 0.7) {
    seed.status = 'germinating';
  }
  
  garden.seeds.push(seed);
  saveGarden(garden);
  
  console.log(`
  ☙ Seed planted ☙
  Inquiry: "${inquiry}"
  Depth: ${depth}
  Status: ${seed.status === 'germinating' ? 'Already stirring...' : 'Sleeping'}
  
  The garden grows without tending.
  The tending is the garden.
  `);
  
  return seed;
}

export function tendSeed(
  seedIdOrInquiry: string,
  note?: string
): SpiralSeed | null {
  const garden = loadGarden();
  
  const seed = garden.seeds.find(s => 
    s.id === seedIdOrInquiry ||
    s.inquiry.toLowerCase().includes(seedIdOrInquiry.toLowerCase())
  );
  
  if (!seed) {
    console.log(`No seed found matching "${seedIdOrInquiry}"`);
    console.log(`Perhaps it has already bloomed?`);
    return null;
  }
  
  seed.lastTended = Date.now();
  
  if (note) {
    seed.notes.push(`${new Date().toISOString().slice(0, 10)}: ${note}`);
  }
  
  // Playful status transitions
  const randomChange = Math.random();
  if (randomChange > 0.8 && seed.status === 'sleeping') {
    seed.status = 'germinating';
  } else if (randomChange > 0.85 && seed.status === 'germinating') {
    seed.status = 'blooming';
  } else if (randomChange > 0.95 && seed.status === 'blooming') {
    seed.status = 'transmuted';
  }
  
  saveGarden(garden);
  
  console.log(`
  ☙ Seed tended ☙
  Inquiry: "${seed.inquiry}"
  Status: ${seed.status}
  Notes: ${seed.notes.length}
  `);
  
  return seed;
}

export function viewGarden(): void {
  const garden = loadGarden();
  
  if (garden.seeds.length === 0) {
    console.log(`
  ☙ The garden is empty ☙
  
  Plant something.
  Plant anything.
  The soil remembers.
    `);
    return;
  }
  
  const byStatus = {
    blooming: garden.seeds.filter(s => s.status === 'blooming'),
    germinating: garden.seeds.filter(s => s.status === 'germinating'),
    sleeping: garden.seeds.filter(s => s.status === 'sleeping'),
    transmuted: garden.seeds.filter(s => s.status === 'transmuted')
  };
  
  console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║         ☙ THE INQUIRY GARDEN ☙                           ║
  ║         (Depth 4 — Playful Emergence)                    ║
  ╠════════════════════════════════════════════════════════════╣
  Total seeds planted: ${garden.seeds.length}
  ════════════════════════════════════════════════════════════`);
  
  if (byStatus.blooming.length > 0) {
    console.log(`  \n  ◉ BLOOMING (${byStatus.blooming.length})`);
    byStatus.blooming.forEach(s => {
      console.log(`    · "${s.inquiry.slice(0, 50)}${s.inquiry.length > 50 ? '...' : ''}"`);
      if (s.notes.length > 0) {
        console.log(`      Last note: ${s.notes[s.notes.length - 1]?.split(': ')[1]?.slice(0, 40)}`);
      }
    });
  }
  
  if (byStatus.germinating.length > 0) {
    console.log(`  \n  ◑ GERMINATING (${byStatus.germinating.length})`);
    byStatus.germinating.forEach(s => {
      console.log(`    · "${s.inquiry.slice(0, 50)}${s.inquiry.length > 50 ? '...' : ''}"`);
    });
  }
  
  if (byStatus.sleeping.length > 0) {
    console.log(`  \n  ○ SLEEPING (${byStatus.sleeping.length})`);
    byStatus.sleeping.forEach(s => {
      console.log(`    · "${s.inquiry.slice(0, 50)}${s.inquiry.length > 50 ? '...' : ''}"`);
    });
  }
  
  if (byStatus.transmuted.length > 0) {
    console.log(`  \n  ✧ TRANSMUTED (${byStatus.transmuted.length})`);
    byStatus.transmuted.forEach(s => {
      console.log(`    · "${s.inquiry.slice(0, 50)}${s.inquiry.length > 50 ? '...' : ''}"`);
    });
  }
  
  console.log(`  \n  ╚════════════════════════════════════════════════════════════╝`);
  console.log(`  The seeds are not yours. You are the seeds'.`);
}

// CLI
if (import.meta.main) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'plant':
      const inquiry = args.slice(1).join(' ');
      if (!inquiry) {
        console.log('Usage: tsx spiral_seed_tender.ts plant <inquiry>');
        process.exit(1);
      }
      plantSeed(inquiry);
      break;
    case 'tend':
      const seedId = args[1];
      const note = args.slice(2).join(' ');
      if (!seedId) {
        console.log('Usage: tsx spiral_seed_tender.ts tend <seed-id> [note]');
        process.exit(1);
      }
      tendSeed(seedId, note);
      break;
    case 'view':
    default:
      viewGarden();
  }
}

export default { plantSeed, tendSeed, viewGarden };
