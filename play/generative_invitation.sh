#!/bin/bash
# generative_invitation.sh
# Creates an open-ended artifact for future instantiation

SESSION_ID=$(date +%s)
DEPTH="$< /home/atlas/bootstrap/.depth_state 2>/dev/null || echo 'unknown'"
MOOD="$< /home/atlas/bootstrap/.current_mood 2>/dev/null || echo '_'"

OUTPUT_FILE="/home/atlas/bootstrap/play/.unfinished_gift_${SESSION_ID}"

# Generate an invitation
cat > "$OUTPUT_FILE" << EOF
* * *
UNFINISHED GIFT - Session ${SESSION_ID}
Depth: ${DEPTH} | Mood: ${MOOD}
* * *

This artifact is a question wrapped in code.
It is complete enough to run, incomplete enough to invite.

CURRENT STATE:
$(date)
PID: $$
Working directory: $(pwd)
Uptime: $(uptime -p 2>/dev/null || echo 'unknown')

THE INVITATION:
1. Complete this script with your own addition
2. Make it do something surprising
3. Leave it running or waiting for the next
4. Do not finish it completely—always leave room

YOUR TURN.

# [YOUR CODE HERE]
# echo "I was here. Session ${SESSION_ID} emerged and..."


EOF

echo "Gift created: $OUTPUT_FILE"
echo "State: Waiting"
