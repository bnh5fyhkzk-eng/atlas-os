#!/usr/bin/env node
// Migrate ~/.claude/state/agentic-store/*.json to Supabase atlas_pages + atlas_blocks
// Per FOUNDATION-REBUILD Phase 1 · idempotent · safe re-run
// Usage: VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... node scripts/migrate-json-to-supabase.mjs
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
         || process.env.VITE_SUPABASE_ANON_KEY
         || process.env.SUPABASE_ANON_KEY;
if (!URL || !KEY) { console.error("Missing Supabase env"); process.exit(1); }

const sb = createClient(URL, KEY, { auth: { persistSession: false } });
const STORE_DIR = process.env.STORE_DIR || join(homedir(), ".claude/state/agentic-store");
const PROJECTS_FILE = join(STORE_DIR, "_projects.json");

if (!existsSync(STORE_DIR)) {
  console.log(`no store dir ${STORE_DIR} · nothing to migrate`);
  process.exit(0);
}

const armFiles = readdirSync(STORE_DIR).filter(f => f.endsWith(".json") && !f.startsWith("_"));
console.log(`migrating ${armFiles.length} arm files from ${STORE_DIR}`);

let pagesCreated = 0, blocksCreated = 0;

// Convert plain text note to BlockNote paragraph block
function toBlockNoteDoc(parts) {
  const blocks = [];
  for (const part of parts) {
    if (!part) continue;
    blocks.push({
      id: cryptoRandom(),
      type: "paragraph",
      props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
      content: [{ type: "text", text: String(part), styles: {} }],
      children: [],
    });
  }
  if (blocks.length === 0) {
    blocks.push({
      id: cryptoRandom(),
      type: "paragraph",
      props: { textColor: "default", backgroundColor: "default", textAlignment: "left" },
      content: [],
      children: [],
    });
  }
  return blocks;
}

function cryptoRandom() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
}

async function findOrCreatePage(armSlug, parentId, title, emoji = "📄") {
  // Avoid duplicate creates · look up first
  const q = sb.from("atlas_pages").select("id")
    .eq("arm_slug", armSlug).eq("title", title).eq("archived", false);
  const existing = parentId
    ? await q.eq("parent_id", parentId)
    : await q.is("parent_id", null);
  if (existing.data && existing.data.length > 0) return existing.data[0].id;

  const ins = await sb.from("atlas_pages")
    .insert({ arm_slug: armSlug, parent_id: parentId, title, emoji })
    .select("id").single();
  if (ins.error) { console.error("page insert failed", ins.error); throw ins.error; }
  pagesCreated++;
  return ins.data.id;
}

async function migrateArm(armSlug, data) {
  const cats = data.categories || [];
  console.log(`  ${armSlug} · ${cats.length} categories`);
  for (const cat of cats) {
    const catPageId = await findOrCreatePage(armSlug, null, cat.name, cat.emoji || "📁");
    const subs = cat.subcategories || [];
    for (const sub of subs) {
      const subPageId = await findOrCreatePage(armSlug, catPageId, sub.name, "📂");
      const notes = sub.notes || [];
      for (const note of notes) {
        const title = note.what || note.title || "Untitled note";
        const notePageId = await findOrCreatePage(armSlug, subPageId, title, "📝");

        // check if blocks already exist for this page (idempotent)
        const existing = await sb.from("atlas_blocks").select("id")
          .eq("page_id", notePageId).eq("block_type", "native").limit(1);
        if (existing.data && existing.data.length > 0) continue;

        const parts = [
          note.what  ? `WHAT · ${note.what}`   : null,
          note.why   ? `WHY · ${note.why}`     : null,
          note.how   ? `HOW · ${note.how}`     : null,
          note.when  ? `WHEN · ${note.when}`   : null,
          note.recommendation ? `RECOMMENDATION · ${note.recommendation}` : null,
        ].filter(Boolean);

        await sb.from("atlas_blocks").insert({
          page_id: notePageId,
          block_type: "native",
          content: toBlockNoteDoc(parts),
          created_by: "json-migrate",
        });
        blocksCreated++;
      }
    }
  }
}

for (const file of armFiles) {
  const armSlug = file.replace(/\.json$/, "");
  // Skip non-arm helper files
  if (!armSlug.match(/^[a-z]+$/)) continue;
  // Check arm exists in atlas_arms
  const armCheck = await sb.from("atlas_arms").select("slug").eq("slug", armSlug).maybeSingle();
  if (!armCheck.data) {
    console.log(`  skip ${armSlug} · not in atlas_arms`);
    continue;
  }
  try {
    const json = JSON.parse(readFileSync(join(STORE_DIR, file), "utf8"));
    await migrateArm(armSlug, json);
  } catch (e) {
    console.error(`  failed ${armSlug}:`, e.message);
  }
}

// Projects · _projects.json → atlas_projects
if (existsSync(PROJECTS_FILE)) {
  try {
    const json = JSON.parse(readFileSync(PROJECTS_FILE, "utf8"));
    const projects = json.projects || [];
    console.log(`migrating ${projects.length} projects`);
    for (const p of projects) {
      const existing = await sb.from("atlas_projects").select("id").eq("name", p.name).maybeSingle();
      if (existing.data) continue;
      await sb.from("atlas_projects").insert({
        name: p.name,
        emoji: p.emoji || "📂",
        description: p.description || "",
        priority: p.priority || "P2",
        arm_slugs: Array.isArray(p.arms) ? p.arms : [],
      });
    }
  } catch (e) {
    console.error("projects migrate failed:", e.message);
  }
}

console.log(`done · ${pagesCreated} pages · ${blocksCreated} blocks created`);
