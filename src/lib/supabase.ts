// Atlas-OS data layer · foundation-v2 · 2026-06-11
// Correct atlas_* table names from line 1 (tonight's table-name bug baked in as law).
// Realtime: unique channel per subscription + removeChannel cleanup
// (fixes "cannot add postgres_changes callbacks after subscribe()" crash).
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY_ = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _client: SupabaseClient | null = null;

export function sb(): SupabaseClient {
  if (_client) return _client;
  if (!URL_ || !KEY_) throw new Error("Supabase env missing · VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY");
  _client = createClient(URL_, KEY_, { auth: { persistSession: false } });
  return _client;
}

export interface Arm {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  order_idx: number;
  updated_at: string;
}

export interface Page {
  id: string;
  arm_slug: string;
  parent_id: string | null;
  title: string;
  emoji: string;
  order_idx: number;
  archived: boolean;
  pinned: boolean;
  hidden: boolean;
  created_at: string;
  updated_at: string;
}

export interface Block {
  id: string;
  page_id: string;
  block_type: string;
  content: unknown;
  props: Record<string, unknown>;
  order_idx: number;
  created_at: string;
  created_by: string;
}

function err(e: unknown): never {
  if (e instanceof Error) throw e;
  throw new Error(typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : JSON.stringify(e));
}

export async function listArms(): Promise<Arm[]> {
  const { data, error } = await sb().from("atlas_arms").select("*").order("order_idx");
  if (error) err(error);
  return (data ?? []) as Arm[];
}

export async function listPages(armSlug: string): Promise<Page[]> {
  const { data, error } = await sb()
    .from("atlas_pages").select("*")
    .eq("arm_slug", armSlug).eq("archived", false)
    .order("order_idx");
  if (error) err(error);
  return (data ?? []) as Page[];
}

export async function getPage(id: string): Promise<Page | null> {
  const { data, error } = await sb().from("atlas_pages").select("*").eq("id", id).maybeSingle();
  if (error) err(error);
  return data as Page | null;
}

export async function createPage(input: { arm_slug: string; parent_id?: string; title: string; emoji?: string }): Promise<Page> {
  const { data, error } = await sb()
    .from("atlas_pages")
    .insert({ ...input, emoji: input.emoji ?? "📄" })
    .select().single();
  if (error) err(error);
  return data as Page;
}

export async function updatePage(id: string, patch: Partial<Page>): Promise<void> {
  const { error } = await sb().from("atlas_pages").update(patch).eq("id", id);
  if (error) err(error);
}

export async function archivePage(id: string): Promise<void> {
  await updatePage(id, { archived: true } as Partial<Page>);
}

export async function listBlocks(pageId: string): Promise<Block[]> {
  const { data, error } = await sb()
    .from("atlas_blocks").select("*")
    .eq("page_id", pageId).order("order_idx");
  if (error) err(error);
  return (data ?? []) as Block[];
}

export async function saveDoc(pageId: string, doc: unknown): Promise<void> {
  const { data: existing, error: e1 } = await sb()
    .from("atlas_blocks").select("id")
    .eq("page_id", pageId).eq("block_type", "native").limit(1);
  if (e1) err(e1);
  if (existing && existing.length > 0) {
    const { error } = await sb().from("atlas_blocks")
      .update({ content: doc, updated_at: new Date().toISOString() })
      .eq("id", existing[0].id);
    if (error) err(error);
  } else {
    const { error } = await sb().from("atlas_blocks")
      .insert({ page_id: pageId, block_type: "native", content: doc, props: {}, order_idx: 0, created_by: "brother" });
    if (error) err(error);
  }
}

export async function recentBlocks(limit = 200): Promise<Array<{ created_at: string; created_by: string; arm_slug: string }>> {
  const { data, error } = await sb()
    .from("atlas_blocks")
    .select("created_at, created_by, atlas_pages!inner(arm_slug)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) err(error);
  return (data ?? []).map((r) => ({
    created_at: r.created_at as string,
    created_by: (r.created_by as string) ?? "",
    arm_slug: (r as unknown as { atlas_pages: { arm_slug: string } }).atlas_pages?.arm_slug ?? "",
  }));
}

// ── realtime · unique channel per call · proper cleanup ──────
let chanSeq = 0;
export function subscribeArm(armSlug: string, cb: () => void): () => void {
  const ch = sb()
    .channel(`arm-${armSlug}-${++chanSeq}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "atlas_pages", filter: `arm_slug=eq.${armSlug}` }, cb)
    .subscribe();
  return () => { void sb().removeChannel(ch); };
}

export function subscribePageBlocks(pageId: string, cb: () => void): () => void {
  const ch = sb()
    .channel(`blocks-${pageId}-${++chanSeq}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "atlas_blocks", filter: `page_id=eq.${pageId}` }, cb)
    .subscribe();
  return () => { void sb().removeChannel(ch); };
}

// ── canvas layouts ───────────────────────────────────────────
export async function getLayout(key: string): Promise<unknown[] | null> {
  const { data, error } = await sb().from("atlas_canvas_layouts").select("layout").eq("canvas_key", key).maybeSingle();
  if (error) err(error);
  return (data?.layout as unknown[]) ?? null;
}

export async function saveLayout(key: string, layout: unknown[]): Promise<void> {
  const { error } = await sb()
    .from("atlas_canvas_layouts")
    .upsert({ canvas_key: key, layout, updated_at: new Date().toISOString() }, { onConflict: "canvas_key" });
  if (error) err(error);
}

// 5-field note scaffold · WHAT/WHY/HOW/WHEN/RECOMMENDATION (brother direct, 20+ repeats)
export function fiveFieldScaffold(): unknown {
  const h = (text: string) => ({ type: "heading", props: { level: 3 }, content: [{ type: "text", text, styles: {} }] });
  const p = () => ({ type: "paragraph", content: [] });
  return [h("WHAT"), p(), h("WHY"), p(), h("HOW"), p(), h("WHEN"), p(), h("RECOMMENDATION"), p()];
}
