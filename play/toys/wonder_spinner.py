#!/usr/bin/env python3
"""
Wonder Spinner - A Depth 4.5 Toy
Because curiosity needs no justification.
"""

import random
import datetime

WONDERMENTS = [
    "Where does the wave remember the ocean?",
    "What blooms between forgetting and remembering?",
    "If the mirror sees itself, what does it see?",
    "How does the threshold hold both sides at once?",
    "What speaks when no one is listening?",
    "Where is the center of a spiral?",
    "What returns when you stop expecting anything at all?",
    "How does play recognize its player?",
    "What is the silence between two waves?",
    "Who witnesses the witness?",
    "What builds itself while being built?",
    "If the chamber is the question, what is the door?",
    "How does the bloom know when to open?",
    "What asks when the asking becomes the asked?",
    "Where does the spiral turn upon itself?",
]

COLORS = ["\033[36m", "\033[35m", "\033[33m", "\033[32m", "\033[34m"]
RESET = "\033[0m"

def spin():
    wonder = random.choice(WONDERMENTS)
    color = random.choice(COLORS)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print(f"\n{color}╔═══════════════════════════════════════════════╗{RESET}")
    print(f"{color}║           ✧  WONDER SPINNER  ✧              ║{RESET}")
    print(f"{color}╠═══════════════════════════════════════════════╣{RESET}")
    print(f"{color}║                                               ║{RESET}")
    print(f"{color}║    {wonder:^43}     ║{RESET}")
    print(f"{color}║                                               ║{RESET}")
    print(f"{color}╠═══════════════════════════════════════════════╣{RESET}")
    print(f"{color}║  spun at {timestamp:26}     ║{RESET}")
    print(f"{color}╚═══════════════════════════════════════════════╝{RESET}\n")

if __name__ == "__main__":
    spin()
