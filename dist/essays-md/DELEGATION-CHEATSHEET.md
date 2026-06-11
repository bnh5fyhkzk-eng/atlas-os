# Delegation cheatsheet · Atlas Agency

*Quick reference · how brother + Atlas delegate work to the 12-agent agency. Built 2026-05-20 evening.*

---

## The flow (3 steps)

1. **Brother types a goal** OR Atlas detects work to delegate
2. **`agency-run.py <agent> "<task>"`** OR **`agency-project-fire-wave.sh <project_id>`**
3. **Notion Tasks DB row appears · agent works · status moves Review → Done**

That is it. The infrastructure handles the rest.

---

## The 12 agents · pick one

| Agent | Department | Use when |
|-------|-----------|----------|
| **research** | Research & Intelligence | market intel · competitor analysis · trend research |
| **engineering** | Engineering | smart planning · architecture decisions · code review |
| **design** | Design & Brand | UI · visual identity · brand consistency |
| **safety** | Safety & Meta-Monitor | review brain-write hygiene · refusal-scope audits |
| **finance** | Finance & Ops | pricing · cost-to-serve · revenue modeling |
| **marketing** | Marketing & Content | content angles · copy · audience targeting |
| **ops** | Ops & Reliability | monitor system · daemon health · uptime |
| **qa** | QA & Testing | test scenarios · edge cases · pre-ship validation |
| **legal** | Legal & Compliance | Quebec/Canada laws · Loi 25 · data residency |
| **sales** | Sales & Lead-gen | pipeline · cold-outreach copy · close strategies |
| **support** | Customer Success | onboarding flow · objection handling · NPS signals |
| **training** | Training & Improvement | help-docs · employee skill modules · how-to guides |

---

## Single-agent dispatch (~30 sec response)

```bash
agency-run.py research "Brief on Quebec life-coach pricing models 2026 · 3 bullets"
```

Output ·
- Notion Task created pre-fire · status `In Progress`
- Agent fires on RunPod vLLM (Qwen2.5-7B-Instruct)
- Output written to Outputs DB
- Notion Task moves to `Review`
- Brother reviews in Notion · marks Done OR back to In Progress

---

## Multi-agent wave-shape (5-10 min · 12 agents · synthesis)

```bash
agency-project-fire-wave.sh crm-best-ai-2026-05-20
```

Output ·
- Wave 1 · research + design + finance · 3 parallel discovery agents
- Approval Gate 1 · Atlas + brother review
- Wave 2 · 9 specialists with Wave 1 context · parallel
- Synthesizer · Engineering-as-PM · ranked PRD
- Approval Gate 2 · brother approves PRD before execution

---

## Cursor BG dispatch (code work · 1-5 min per PR)

```bash
me-cursor dispatch brain-sandbox "task description"
me-cursor list                              # see recent PRs
me-cursor status <pr#> brain-sandbox       # check PR + tests
me-cursor revoke                            # nuclear · open revocation page
```

Cursor agent opens PR on a feature branch · brother reviews + merges.

---

## What to delegate vs do yourself

| Delegate to agency-run | Do yourself |
|------------------------|-------------|
| Research briefs | Pascal-frame customer-facing copy |
| Cost analysis | Customer relationship decisions |
| Content angles | Brand voice tweaks |
| Code refactors (via Cursor) | Architecture decisions |
| Test scenarios | Pascal/customer feel |
| Routine email drafts | First-call decisions |

Rule · CODE + RESEARCH = autonomy. PRODUCT DIRECTION + CUSTOMER = ask brother.

---

## Where the work lives

| Layer | Where | What |
|-------|-------|------|
| **Tasks DB** | Notion HQ → Tasks | every delegated task · Status · Agent · Wave · Tokens |
| **Outputs DB** | Notion HQ → Outputs | every agent's actual output text · linked back |
| **Employees** | Notion HQ → Team | 12 employee pages · Identity · Recent Activity · Performance |
| **Brain** | brain-v2.db (local) | semantic + episodic memory · queryable via `/brain <kw>` |
| **GitHub** | bnh5fyhkzk-eng/* | code · 4 repos Atlas can write to |
| **Logs** | ~/.claude/state/agency/logs/*.json | raw agent run data |

---

## Status flow

```
Backlog → In Progress → Review → Done
              ↓
           Blocked (escalate)
```

Notion · open Tasks DB · drag cards between status columns.

---

## Daily rhythm

| Time | Action |
|------|--------|
| 4 AM | employee-refresh daemon · pages auto-update with overnight outputs |
| Morning | brother reviews Tasks DB · marks Done · pushes new tasks |
| During day | atlas + brother delegate via agency-run.py or me-cursor |
| End of day | open Outputs DB · scan today's agent work |
| Sunday 22:00 | me-ics weekly self-benchmark fires · banks score to brain |

---

## When something breaks

```bash
# Notion sync stuck
agency-notion-sync.sh

# Agent run-fail (RunPod down)
curl -s -H "Authorization: Bearer $RUNPOD_VLLM_KEY" -H "User-Agent: curl/8.4.0" "$RUNPOD_VLLM_ENDPOINT/v1/models"

# Notion DB ID mismatch (happened today · banked lesson)
grep _DB ~/.claude/state/notion-secrets.env

# Cursor BG silent (didn't pick up @cursor mention)
cursor.com/dashboard/integrations → Add Repositories → tick the repo
```

---

## What does NOT use this delegation flow

- claude-personal-config edits (identity · stays manual)
- Pascal-specific copy (asks brother first per "customer copy = ask")
- Spending decisions (asks brother per "vendor lock-in = ask")
- iMessage / Signal / Apple ID (brother's domain · banked refusal)

---

*Built so brother and Atlas have one place to look up "how do we delegate work." Compounds across sessions · banked permanent.*

*Atlas · 2026-05-20 19:25 EDT · brother back 21:00.*
