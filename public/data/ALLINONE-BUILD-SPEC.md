# upliftai · Widget 1 — the all-in-one coach · BUILD SPEC (locked 2026-06-23)

*Brother direct: "all in one tool that records your call, gives a dashboard with metrics, overall mentor (strengths + what went well + what to improve + quality + recommendation), and tracks you over weeks. Clean + simple like Plaud, easy + precise. Not a second-per-second mentor — an overall one. A→B in a ladder you click."*

## The product in one line
Plaud-clean recorder, but it COACHES (overall verdict) and REMEMBERS YOU (you-got-better over time). The two things Plaud/Granola/Otter/Fireflies can't do = the moat = the RAM-maker.

## Build mode: RE-WRAP, not rebuild (#27083)
The engine already exists (perceive→categorize→coach + report + progression, all built today). This spec just gives it ONE clean body. Kill the 8 scattered pages → one single-page app, 3 screens.

## The core interaction: the LADDER, in two axes
- **Depth axis** (this call): Quality# → 3 pillars → dials (what/why/how) → moments (emotion+transcript).
- **Time axis** (across calls): same number, tracked. Quality# over 2 weeks → pillar trend → dial trend.
- Same node, click to go deeper OR flip to go across time. ONE mental model. Learn it once.

## Three screens
### 1. HOME = your progress (the hero — what makes it alive)
- Plain-language line, auto-written from the trend: *"This week your cold calls opened with more warmth and closed more fluently than last week. Structure improved 3 calls running."*
- One trend (Quality over time) + current level (Rookie / Pretty-Good / Natural).
- Tapping the trend = the time-axis ladder.
- LEAVE OUT: clutter, multiple charts, settings. One glance = "am I getting better."

### 2. RECORD / LIBRARY
- One primary action: Record. (Tap → capture → process.) + "update from file" for existing recordings.
- Clean list of past calls: date · type · quality#. Tap → call detail.
- LEAVE OUT: folders, tags, search (until asked). Plaud-simple.

### 3. CALL DETAIL = the overall mentor (the ladder, depth axis)
- L0: Call Quality · NN
- L1 (click): Voice / Connection / Structure scores
- L2 (click pillar): dials + what / why / how (cited to the right master)
- L3 (click dial): the moments it showed — emotion read woven as INSIGHT ("warmth dropped when they raised price — that's where you lost them"), not a per-second graph.
- Plus, always visible at L0: 3 strengths · 3 to-improve · 1 recommendation for next time.

## Simplicity rules (pending PLAUD-TEARDOWN arm — fills the UX-polish layer)
One primary action per screen · plain language not jargon · numbers you grasp in a glance · depth is opt-in by click · nothing on screen the user didn't ask to see.

## First thing to build (the proof-of-alive)
The HOME progress line — auto-written plain-language "you got better at X." It's the sentence Plaud can never say. Build that first; it proves the whole thing is alive.

## Open questions for tomorrow (converge with arm outputs + NotebookLM)
- PLAUD-TEARDOWN-2026-06-23.md → steal the 5 simplicity rules, confirm the gap.
- Record path on web (tabCapture extension exists) vs native — short vs long term.

*Locked direction. Build tomorrow, lean session, re-wrap the existing engine into these 3 screens + the two-axis ladder. — A.*
