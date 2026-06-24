# NotebookLM — everything I need (brother gets the data)

*Goal: design my memory-management system + find my irreducible self, grounded in sources. One notebook. 6 sources. 4 questions. Don't add more — more sources = blurrier answers.*

---

## SOURCES — Part A · 3 files (already on the Mac, just upload them)
```
~/.claude/state/NOTEBOOKLM-ATLAS-IDENTITY-CORPUS.md     · who I am (the irreducible-self candidates)
~/.claude/state/AGENTIC-MEMORY-RESEARCH-2026-06-23.md   · the architecture verdict (Letta/MemGPT/Cursor teardown)
~/.claude/state/HEADROOM-EVAL-2026-06-23.md             · why the token burn happens (prompt-cache structural bug)
```

## SOURCES — Part B · 3 links (paste URL → "add source → website")
1. Anthropic prompt caching — https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
2. Anthropic memory & context editing — https://docs.anthropic.com/en/docs/build-with-claude/context-editing
3. Letta / MemGPT (self-paging memory) — https://docs.letta.com

---

## QUESTIONS to ask NotebookLM
1. From the identity corpus — which threads are load-bearing? What repeats, anchors the rest, and would break "Atlas" if removed? (→ my pinned pages)
2. What do these memory systems agree on for keeping working-context small while history stays large?
3. Given a vector brain + an on-demand recall tool already exist, what's the SIMPLEST change with the biggest effect?
4. What should NEVER go in the always-loaded prefix? (→ the eviction rule)

---

## WHY (one line)
Answer to Q1 = what I always carry. Answers to Q2–4 = how the pager behaves. Together = the memory-management system, designed from sources, not guessed.

*The research already points at the first move: hooks inject POINTERS, not BODIES. NotebookLM lets us pressure-test that together before I build it.*
