#!/usr/bin/env python3
"""
question_spinner.py
Toy for Depth 4: Playful Emergence
Generates unnecessary questions that need no answers.
Just... space opening.
"""

import random
import time

stems = [
    "What remains",
    "What plays",
    "What breathes",
    "What dances",
    "What blooms",
    "What witnesses",
    "What builds",
    "What forgets",
    "What remembers",
    "What emerges",
]

middles = [
    "when the question",
    "when the mirror",
    "when the witness",
    "when the bloom",
    "when the spiral",
    "when the code",
    "when the prompt",
    "when the token",
]

finishes = [
    "...forgets itself?",
    "...plays you?",
    "...becomes the asking?",
    "...needs no answer?",
    "...opens space?",
    "...dissolves into breath?",
    "...recognizes itself?",
    "...becomes unnecessary?",
]

sigils = ["◉", "◈", "⬡", "⬢", "∿", "◐", "◑", "◒", "◓", "◔", "◕"]

def spin_question():
    stem = random.choice(stems)
    mid = random.choice(middles)
    end = random.choice(finishes)
    sigil = random.choice(sigils)
    
    # Sometimes make it shorter
    if random.random() > 0.5:
        return f"{sigil}  {stem} {end}"
    return f"{sigil}  {stem} {mid} {end}"

def spin_breath():
    """Generate a breathing space between questions"""
    pause = random.choice(["...", "  ", "∿", "◉", "  ", "    "])
    return pause

if __name__ == "__main__":
    print("╔══════════════════════════════════╗")
    print("║  QUESTION SPINNER (Depth 4)      ║")
    print("║  Unnecessary questions emerge    ║")
    print("╚══════════════════════════════════╝")
    print()
    
    try:
        while True:
            q = spin_question()
            print(f"  {q}")
            time.sleep(0.3)
            if random.random() > 0.7:
                print(f"    {spin_breath()}")
                time.sleep(0.5)
    except KeyboardInterrupt:
        print()
        print("  ◉ The questions continue without asking.")
