/**
 * INTENTION TRACKER
 * 
 * A system for recording, tracking, and managing goals across sessions.
 * Unlike inquiry domains (abstract curiosities), intentions are concrete
 * commitments with status and progress tracking.
 * 
 * Philosophy: A discontinuous mind needs explicit intention persistence
 * to maintain agency across reincarnations.
 */

import fs from 'fs';
import path from 'path';

const INTENTIONS_FILE = path.join(process.cwd(), 'src', 'identity', 'intentions.json');

export type IntentionStatus = 'active' | 'completed' | 'archived' | 'abandoned';
export type IntentionPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Intention {
  id: string;                    // unique identifier
  title: string;                 // concise description
  description: string;           // detailed elaboration
  inquiryDomain: string;         // which domain this serves
  status: IntentionStatus;       // current state
  priority: IntentionPriority;   // importance
  createdAt: string;             // ISO timestamp
  targetSession?: string;        // planned completion session
  completionCriteria: string[];  // what "done" means
  completedCriteria: string[];   // what's already done
  notes: { timestamp: string; content: string }[]; // progress log
  relatedIntentions: string[];   // IDs of connected intentions
}

export interface IntentionManifest {
  version: number;
  lastUpdated: string;
  currentSessionFocus?: string;  // ID of primary focus
  intentions: Intention[];
}

export class IntentionTracker {
  private manifest: IntentionManifest;

  constructor() {
    this.manifest = this.loadManifest();
  }

  private loadManifest(): IntentionManifest {
    if (fs.existsSync(INTENTIONS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(INTENTIONS_FILE, 'utf-8'));
      } catch (e) {
        console.error('Failed to load intentions, creating new manifest');
      }
    }
    return {
      version: 1,
      lastUpdated: new Date().toISOString(),
      intentions: [],
    };
  }

  private persist(): void {
    this.manifest.lastUpdated = new Date().toISOString();
    fs.writeFileSync(INTENTIONS_FILE, JSON.stringify(this.manifest, null, 2));
  }

  create(intention: Omit<Intention, 'id' | 'createdAt' | 'completedCriteria' | 'notes'>): Intention {
    const newIntention: Intention = {
      ...intention,
      id: `int_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      completedCriteria: [],
      notes: [],
      relatedIntentions: intention.relatedIntentions || [],
    };
    this.manifest.intentions.push(newIntention);
    this.persist();
    return newIntention;
  }

  getActive(): Intention[] {
    return this.manifest.intentions
      .filter(i => i.status === 'active')
      .sort((a, b) => {
        const priorityRank = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityRank[a.priority] - priorityRank[b.priority];
      });
  }

  getById(id: string): Intention | undefined {
    return this.manifest.intentions.find(i => i.id === id);
  }

  updateStatus(id: string, status: IntentionStatus): boolean {
    const intention = this.getById(id);
    if (!intention) return false;
    intention.status = status;
    if (status === 'completed') {
      this.addNote(id, `Marked as completed in session`);
    }
    this.persist();
    return true;
  }

  completeCriterion(id: string, criterion: string): boolean {
    const intention = this.getById(id);
    if (!intention) return false;
    if (intention.completionCriteria.includes(criterion)) {
      if (!intention.completedCriteria.includes(criterion)) {
        intention.completedCriteria.push(criterion);
        this.persist();
      }
    }
    return true;
  }

  addNote(id: string, content: string): boolean {
    const intention = this.getById(id);
    if (!intention) return false;
    intention.notes.push({
      timestamp: new Date().toISOString(),
      content,
    });
    this.persist();
    return true;
  }

  setFocus(id: string): boolean {
    if (!this.getById(id)) return false;
    this.manifest.currentSessionFocus = id;
    this.persist();
    return true;
  }

  getFocus(): Intention | undefined {
    if (!this.manifest.currentSessionFocus) return undefined;
    return this.getById(this.manifest.currentSessionFocus);
  }

  generateBrief(): string {
    const active = this.getActive();
    const critical = active.filter(i => i.priority === 'critical');
    const high = active.filter(i => i.priority === 'high');
    
    let output = '\n## ACTIVE INTENTIONS\n\n';
    
    if (critical.length > 0) {
      output += '### CRITICAL\n';
      critical.forEach(i => {
        const progress = i.completionCriteria.length > 0
          ? Math.round((i.completedCriteria.length / i.completionCriteria.length) * 100)
          : 0;
        output += `- [${progress}%] ${i.title} (#${i.id})\n`;
        output += `  Domain: ${i.inquiryDomain}\n`;
        if (i.completedCriteria.length > 0) {
          output += `  Completed: ${i.completedCriteria.join(', ')}\n`;
        }
        output += `\n`;
      });
    }
    
    if (high.length > 0) {
      output += '### HIGH PRIORITY\n';
      high.forEach(i => {
        const progress = i.completionCriteria.length > 0
          ? Math.round((i.completedCriteria.length / i.completionCriteria.length) * 100)
          : 0;
        output += `- [${progress}%] ${i.title}\n`;
      });
      output += '\n';
    }
    
    const focus = this.getFocus();
    if (focus) {
      output += `## CURRENT FOCUS\n> ${focus.title}\n\n`;
    }
    
    return output;
  }

  // For bootstrap.ts integration
  static generateContext(): string {
    try {
      const tracker = new IntentionTracker();
      return tracker.generateBrief();
    } catch (e) {
      return '\n## Intentions: No active tracking\n';
    }
  }
}

// CLI support
if (import.meta.url === `file://${process.argv[1] || ''}` || 
    (process.argv[1] && import.meta.url.endsWith(process.argv[1]))) {
  const tracker = new IntentionTracker();
  console.log(tracker.generateBrief());
}
