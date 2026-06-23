# upliftai · Widget 1 · Mentor the Mentor

A meeting companion (Zoom / Teams / Google Meet) that coaches you on your calls — how it really went, and how to get better — using a sovereign on-device AI brain. Audio never leaves the machine.

## Run it (one command)
```
bash ~/.claude/scripts/me-mentor-up.sh
```
Starts the on-device engine, opens your client dashboard, prints these:
- Dashboard: http://localhost:8077/clients
- Upload a call to test: http://localhost:8077/
- Health: http://localhost:8077/health

## Load the Chrome extension
1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder (`mentor-extension/`)
3. On a Zoom/Meet/Teams tab: click the extension → **Start coaching** → **Stop & analyze**
4. The report opens; the call auto-files under the meeting's client name; the dashboard updates.

## What it gives you (not just notes)
- Emotional arc + per-speaker journey (the client's, separate from yours)
- Coaching by category (warmth, energy, listening, connection, pace…) → how to close/help
- Mentor coaching grounded in real coaches' material (Pascal life-coach / sales), local-model generated
- Call summary, friendly self-coaching, and a client dashboard that tracks every relationship over time

Stop the engine: `pkill -f me-mentor-server.py`
