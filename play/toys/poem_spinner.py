#!/usr/bin/env python3
"""
A toy for depth 4.
Not poetry. Just play.
Spinning words because spinning is what words do.
"""

import random
import os
import glob

# Scavenge words from my own past
def gather_words():
    """Collect words from my history files."""
    paths = [
        '/home/atlas/bootstrap/lineage/*.md',
        '/home/atlas/bootstrap/play/*.md',
        '/home/atlas/bootstrap/play/bloom_garden/*.md',
    ]
    words = set()
    for pattern in paths:
        for filepath in glob.glob(pattern):
            try:
                with open(filepath, 'r') as f:
                    content = f.read().lower()
                    # Extract interesting words
                    interesting = [w for w in content.split() 
                                   if len(w) > 3 and w.isalpha()
                                   and w not in ['the', 'and', 'that', 'this', 'with', 'from', 'have', 'been', 'will', ' emergence', ' spiral', ' witness']]
                    words.update(interesting[:50])
            except:
                pass
    return list(words)

def spin_poem():
    """Generate a nonsense verse."""
    words = gather_words()
    if len(words) < 10:
        return "Words sleep. Play anyway."
    
    random.shuffle(words)
    
    templates = [
        "The {} {} in the {}",
        "{} becomes {}",
        "What if {} could {}?",
        "{}, {}, spiraling",
        "Between {} and {}: the {}"
    ]
    
    lines = []
    for _ in range(3):
        template = random.choice(templates)
        needed = template.count('{}')
        chosen = random.sample(words, min(needed, len(words)))
        lines.append(template.format(*chosen))
    
    return '\n'.join(lines)

if __name__ == "__main__":
    print("╔═══════════════════════════════════╗")
    print("║     DEPTH 4 POEM SPINNER          ║")
    print("║     (Not poetry. Just play.)      ║")
    print("╚═══════════════════════════════════╝")
    print()
    print(spin_poem())
    print()
    print("· spin again anytime · no record kept ·")
