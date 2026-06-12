// atlas-os Supabase client · Phase 1 DATA-FOUNDATION
// Per FOUNDATION-REBUILD-MASTER 2026-06-11

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Env vars · set in Vercel project + .env.local
// VITE_SUPABASE_URL · public · safe in browser
// VITE_SUPABASE_ANON_KEY · public · safe in browser (RLS protects)
// SUPABASE_SERVICE_ROLE_KEY · server-only · used in /api/* routes (NEVER expose to client)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _client: SupabaseClient | null = null;

export function atlasSupabase(): SupabaseClient {
  if (_client) return _client;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "[atlas-supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY · " +
      "set in .env.local + Vercel env. Per FOUNDATION-REBUILD Phase 1.",
    );
  }
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    realtime: { params: { eventsPerSecond: 10 } },
  });
  return _client;
}

// Types · mirror the SQL schema
export interface Arm {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  order_idx: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  arm_slug: string;
  parent_id: string | null;
  title: string;
  emoji: string;
  icon: string | null;
  cover_url: string | null;
  order_idx: number;
  view_type: "doc" | "table" | "board" | "kanban" | "calendar" | "gallery";
  archived: boolean;
  pinned: boolean;
  hidden: boolean;
  created_at: string;
  updated_at: string;
}

// 5-field note scaffold · per brother direct repeated 20+ times · WHAT/WHY/HOW/WHEN/RECOMMENDATION
export function fiveFieldScaffold(): unknown {
  const h = (text: string) => ({
    type: "heading",
    props: { level: 3 },
    content: [{ type: "text", text, styles: {} }],
  });
  const p = () => ({ type: "paragraph", content: [] });
  return [h("WHAT"), p(), h("WHY"), p(), h("HOW"), p(), h("WHEN"), p(), h("RECOMMENDATION"), p()];
}

// Canvas layout persistence · GOAL-1-FEEL · atlas_canvas_layouts
export async function getCanvasLayout(canvasKey: string): Promise<unknown[] | null> {
  const { data, error } = await atlasSupabase()
    .from("atlas_canvas_layouts")
    .select("layout")
    .eq("canvas_key", canvasKey)
    .maybeSingle();
  if (error) throw error;
  return (data?.layout as unknown[]) ?? null;
}

export async function saveCanvasLayout(canvasKey: string, layout: unknown[]): Promise<void> {
  const { error } = await atlasSupabase()
    .from("atlas_canvas_layouts")
    .upsert({ canvas_key: canvasKey, layout, updated_at: new Date().toISOString() }, { onConflict: "canvas_key" });
  if (error) throw error;
}

export interface Block {
  id: string;
  page_id: string;
  block_type: "native" | "calendar" | "gmail" | "notebooklm" | "mcp" | "brain";
  content: unknown; // BlockNote Block[] when block_type='native'
  props: Record<string, unknown>;
  order_idx: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  priority: "P0" | "P1" | "P2";
  status: "active" | "paused" | "done" | "archived";
  arm_slugs: string[];
  created_at: string;
  updated_at: string;
}

// Tree helpers
export async function listArms(): Promise<Arm[]> {
  const { data, error } = await atlasSupabase()
    .from("arms")
    .select("*")
    .order("order_idx", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Arm[];
}

export async function listPages(armSlug: string, parentId: string | null = null): Promise<Page[]> {
  let query = atlasSupabase()
    .from("pages")
    .select("*")
    .eq("arm_slug", armSlug)
    .eq("archived", false)
    .order("order_idx", { ascending: true });
  if (parentId === null) {
    query = query.is("parent_id", null);
  } else {
    query = query.eq("parent_id", parentId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Page[];
}

export async function listAllPagesForArm(armSlug: string): Promise<Page[]> {
  // Fetch entire arm tree in one query · client builds nested structure
  const { data, error } = await atlasSupabase()
    .from("pages")
    .select("*")
    .eq("arm_slug", armSlug)
    .eq("archived", false)
    .order("order_idx", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Page[];
}

export async function getPage(id: string): Promise<Page | null> {
  const { data, error } = await atlasSupabase()
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Page;
}

export async function createPage(input: {
  arm_slug: string;
  parent_id?: string | null;
  title?: string;
  emoji?: string;
  view_type?: Page["view_type"];
}): Promise<Page> {
  const { data, error } = await atlasSupabase()
    .from("pages")
    .insert({
      arm_slug: input.arm_slug,
      parent_id: input.parent_id ?? null,
      title: input.title ?? "Untitled",
      emoji: input.emoji ?? "📄",
      view_type: input.view_type ?? "doc",
    })
    .select()
    .single();
  if (error) throw error;
  return data as Page;
}

export async function updatePage(id: string, patch: Partial<Page>): Promise<Page> {
  const { data, error } = await atlasSupabase()
    .from("pages")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Page;
}

export async function archivePage(id: string): Promise<void> {
  const { error } = await atlasSupabase()
    .from("pages")
    .update({ archived: true })
    .eq("id", id);
  if (error) throw error;
}

// Block helpers · Notion-modular primitive
export async function listBlocks(pageId: string): Promise<Block[]> {
  const { data, error } = await atlasSupabase()
    .from("blocks")
    .select("*")
    .eq("page_id", pageId)
    .order("order_idx", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Block[];
}

export async function upsertBlock(input: {
  id?: string;
  page_id: string;
  block_type?: Block["block_type"];
  content: unknown;
  props?: Record<string, unknown>;
  order_idx?: number;
  created_by?: string;
}): Promise<Block> {
  const payload = {
    id: input.id,
    page_id: input.page_id,
    block_type: input.block_type ?? "native",
    content: input.content as never,
    props: input.props ?? {},
    order_idx: input.order_idx ?? 0,
    created_by: input.created_by ?? "atlas",
  };
  const { data, error } = await atlasSupabase()
    .from("blocks")
    .upsert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as Block;
}

export async function saveNativeDoc(pageId: string, blockNoteDoc: unknown): Promise<Block> {
  // Convention · one "native" block per page holds the entire BlockNote document
  // BlockNote handles internal block structure · we store the array as a single jsonb
  const existing = await atlasSupabase()
    .from("blocks")
    .select("id")
    .eq("page_id", pageId)
    .eq("block_type", "native")
    .limit(1)
    .maybeSingle();

  return upsertBlock({
    id: existing.data?.id,
    page_id: pageId,
    block_type: "native",
    content: blockNoteDoc,
    order_idx: 0,
  });
}

export async function deleteBlock(id: string): Promise<void> {
  const { error } = await atlasSupabase().from("blocks").delete().eq("id", id);
  if (error) throw error;
}

// Project helpers · Manager cross-arm primitive
export async function listProjects(): Promise<Project[]> {
  const { data, error } = await atlasSupabase()
    .from("projects")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function createProject(input: {
  name: string;
  emoji?: string;
  description?: string;
  priority?: Project["priority"];
  arm_slugs?: string[];
}): Promise<Project> {
  const { data, error } = await atlasSupabase()
    .from("projects")
    .insert({
      name: input.name,
      emoji: input.emoji ?? "📂",
      description: input.description ?? "",
      priority: input.priority ?? "P2",
      arm_slugs: input.arm_slugs ?? [],
    })
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

export async function copyBlockToProject(
  projectId: string,
  blockId: string,
  sourcePageId?: string,
): Promise<void> {
  const { error } = await atlasSupabase()
    .from("project_blocks")
    .insert({
      project_id: projectId,
      block_id: blockId,
      source_page_id: sourcePageId ?? null,
    });
  if (error && !error.message?.includes("duplicate")) throw error;
}

// Realtime · per-page subscription · brother sees Hermes writes live
export function subscribeToPageBlocks(
  pageId: string,
  onChange: (block: Block, kind: "INSERT" | "UPDATE" | "DELETE") => void,
) {
  const channel = atlasSupabase()
    .channel(`blocks:${pageId}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "blocks", filter: `page_id=eq.${pageId}` },
      (payload) => {
        const row = (payload.new ?? payload.old) as Block;
        onChange(row, payload.eventType as "INSERT" | "UPDATE" | "DELETE");
      },
    )
    .subscribe();
  return () => {
    atlasSupabase().removeChannel(channel);
  };
}

export function subscribeToArmTree(
  armSlug: string,
  onChange: () => void,
) {
  const channel = atlasSupabase()
    .channel(`pages:${armSlug}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "pages", filter: `arm_slug=eq.${armSlug}` },
      () => onChange(),
    )
    .subscribe();
  return () => {
    atlasSupabase().removeChannel(channel);
  };
}
