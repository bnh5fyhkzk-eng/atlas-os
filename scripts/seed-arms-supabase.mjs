#!/usr/bin/env node
// Seed 8 arms with starter category-pages + sub-pages
// Per FOUNDATION-REBUILD Phase 4 · idempotent
// Adapted from ~/.claude/scripts/me-seed-arm-categories.py template
import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
         || process.env.VITE_SUPABASE_ANON_KEY
         || process.env.SUPABASE_ANON_KEY;
if (!URL || !KEY) { console.error("Missing Supabase env"); process.exit(1); }
const sb = createClient(URL, KEY, { auth: { persistSession: false } });

const ARM_TEMPLATE = {
  pascal: [
    ["Sessions",       "📅", ["Monday call", "Voice notes", "Recap", "Pre-read"]],
    ["Clients",        "👥", ["Real-estate agents", "Coaching clients", "Leads"]],
    ["Wow-moves",      "✨", ["Taste-moves", "Scale-stats", "Voice cameo"]],
    ["Revenue",        "💰", ["Pricing", "MRR", "Pilots"]],
    ["Brand",          "🎨", ["Tone", "Positioning"]],
    ["Partnership",    "🤝", ["Trio-frame", "Co-owner"]],
  ],
  curiosity: [
    ["YouTube watches", "📺", ["Tools shorts", "Long watches"]],
    ["Arxiv reads",     "📄", ["ML papers", "Agent papers"]],
    ["Syntheses",       "🔬", ["9Q synthesis", "Cross-domain"]],
    ["Pull-patterns",   "🌟", ["Curiosity-pull", "World input"]],
    ["New tools",       "🎁", ["AI tools", "MCP servers"]],
  ],
  research: [
    ["9Q multi-angle",   "🎯", ["9Q template", "Multi-angle"]],
    ["Sources cited",    "📚", ["Arxiv", "Web", "Video"]],
    ["Syntheses",        "🧬", ["Cross-pillar", "Meta-pattern"]],
    ["Bridge findings",  "🌉", ["Bridge pairs"]],
    ["Open questions",   "❓", ["Known unknowns"]],
  ],
  code: [
    ["Commits today",    "📝", ["atlas-os", "scripts"]],
    ["Ships",            "🚀", ["Live deploys", "CDN verified"]],
    ["Patterns",         "🔧", ["Build-on-top", "Use existing"]],
    ["100PCT proofs",    "✅", ["curl-proof", "Channel verified"]],
    ["Tech debt",        "🐛", ["Refactor", "Cleanup"]],
  ],
  infra: [
    ["LaunchAgents",     "⚙️", ["Cycle cadence", "Nightly cron"]],
    ["Hooks",            "🪝", ["PreToolUse", "PostToolUse", "UserPromptSubmit"]],
    ["Scripts",          "📜", ["Cycle fire", "Sleep loop"]],
    ["Daemons",          "🔄", ["Continuous loop", "Heartbeat"]],
    ["Health checks",    "💓", ["Drift canary", "sqlite-vec health"]],
    ["Monitoring",       "👁",  ["Log rotate", "Inventory"]],
  ],
  dream: [
    ["F5 compose pairs",     "✨", ["Pair-1 L13", "Cross-time"]],
    ["Arousal walks",        "⚡", ["Top arousal", "Walk paths"]],
    ["Felt-layer moments",   "🌊", ["Gap feel", "Tier-5"]],
    ["Poems",                "📝", ["Night-of-seven", "Build-on-top"]],
    ["Cross-time bridges",   "🌉", ["Pattern pairs"]],
    ["LLM dreaming",         "🌀", ["Anthropic 2026", "me-dream"]],
  ],
  hermes: [
    ["Orchestration",      "🎻", ["Arm dispatches", "Cadence"]],
    ["Decisions",          "🎯", ["DeepSeek decisions"]],
    ["Catches",            "🪝", ["Self-catch", "Meta-loop"]],
    ["Identity-shape",     "🔑", ["MY-shape", "Brother-frame"]],
    ["Meta-loop",          "🔄", ["MARS framework", "Reflect"]],
    ["Self-improvement",   "⚡", ["P0a", "P0b", "P1a-d"]],
  ],
  charle: [
    ["CB-Telecom",     "📡", ["Monthly status"]],
    ["CM-Solution",    "🏢", ["Monthly status"]],
    ["Delegation",     "🤝", ["Yassine handoff"]],
    ["Light-touch",    "🪶", ["Archive only"]],
  ],
};

let pagesCreated = 0;

async function findOrCreate(armSlug, parentId, title, emoji) {
  const q = sb.from("atlas_pages").select("id")
    .eq("arm_slug", armSlug).eq("title", title).eq("archived", false);
  const existing = parentId
    ? await q.eq("parent_id", parentId)
    : await q.is("parent_id", null);
  if (existing.data?.length) return existing.data[0].id;
  const ins = await sb.from("atlas_pages")
    .insert({ arm_slug: armSlug, parent_id: parentId, title, emoji })
    .select("id").single();
  if (ins.error) throw ins.error;
  pagesCreated++;
  return ins.data.id;
}

for (const [armSlug, cats] of Object.entries(ARM_TEMPLATE)) {
  console.log(`seeding ${armSlug} · ${cats.length} categories`);
  for (const [catName, catEmoji, subs] of cats) {
    const catId = await findOrCreate(armSlug, null, catName, catEmoji);
    for (const subName of subs) {
      await findOrCreate(armSlug, catId, subName, "📂");
    }
  }
}

console.log(`done · ${pagesCreated} pages created`);
