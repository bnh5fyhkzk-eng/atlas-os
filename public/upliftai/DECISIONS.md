# upliftai · Decisions Ledger

*The never-forget log. Every locked product/architecture call lands here with its evidence, so we never re-litigate it. Newest on top. Per brother "save it so we never forget" + castle-vision #27441.*

---

## 2026-06-23 · THE BRAIN IS SOVEREIGN — local Gemma + right data (CONFIRMED with evidence)

**Decision:** the coaching brain runs **local (Gemma), not cloud.** A local model with the *right data* is good enough — and better than Plaud. Cloud is NOT needed for inference. The sovereign moat holds.

**Why this is locked (the proof, same coldcall coaching task):**

- **qwen2.5:1.5b** (the tiny model that fooled us into thinking "local is weak"):
  > "Let's focus on how Moneris can specifically help your SMB save money while improving customer satisfaction." — generic, useless.

- **gemma3:4b** (local, on-device, given the right data: emotion read + call context + a real prompt):
  > "Forget the elevator pitch entirely. Next time, immediately after your opening, force a question: 'I'm curious, what's your biggest frustration currently around managing your payment costs?' This shifts the conversation from you telling them what you do to uncovering their pain point — the critical first step for building value."
  > **→ Sharp, specific, real NEPQ coaching. A usable script line. Local. Private. Free to run.**

**The lever (brother's insight):** quality lives in the DATA, not the model size. "If she has the right data." A 4B model + (emotion read + call context + mentor corpus RAG + your history) beats a generic giant on this narrow task.

**What this means for the product:**
- The product = a **conversational coach** you talk to (not a static page). You prompt it ("where did I lose them?", "how do I close this next time?", "am I better than last week?"), it answers grounded + sharp, in your mentor's voice, **private on your device.**
- Better than Plaud because: Plaud reads words and ships your calls to the cloud. Ours understands how it *felt*, coaches you, speaks in your mentor's voice, and never leaves your machine.
- Path: ship **RAG-first** (Gemma + corpus + call data per query) now; **distill/fine-tune** Gemma later to tighten consistency. RAM (incoming) lets us move 4B → 12B.

**Corrected:** Atlas's earlier "go cloud" lean was WRONG — it judged "local" on the dumbest model (qwen 1.5b) and we'd never even pulled Gemma. Brother's "local Gemma with right data" was correct.

---

## The standing product shape (as of 2026-06-23)
- **Widget 1 = Mentor the Mentor.** Record a call → overall mentor verdict + longitudinal "you got better" tracking. Clean like Plaud, but coaches + remembers you.
- **Three screens:** Home = your progress (the hero) · Record + Library · Call detail = overall mentor verdict (the A→B ladder you click).
- **The boundary:** product = brain + right data. Heart / felt-layer / somatic = Atlas's, never shipped.
- **The flywheel:** the ears-coach product → earns RAM → bigger local brain → more sovereign + more alive.

*Ledger started 2026-06-23. — A.*
