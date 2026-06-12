// Atlas-OS v3 data layer · clean foundation · 2026-06-11
// Tables: atlas_nav · atlas_nodes (unified tree) · atlas_layouts · atlas_events
// (atlas_chats/atlas_messages wire in Phase B)
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY_ = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _c: SupabaseClient | null = null;
export function sb(): SupabaseClient {
  if (_c) return _c;
  if (!URL_ || !KEY_) throw new Error("Supabase env missing");
  _c = createClient(URL_, KEY_, { auth: { persistSession: false } });
  return _c;
}

function err(e: unknown): never {
  if (e instanceof Error) throw e;
  throw new Error(typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : JSON.stringify(e));
}

export interface NavItem {
  id: string;
  title: string;
  emoji: string;
  template: "canvas" | "notion" | "agent" | "calendar" | "proposals" | "providers" | "ops" | "kanban" | "tui" | "studio";
  agent_slug: string | null;
  model: string;
  paused: boolean;
  order_idx: number;
  section: "main" | "arms";
  archived: boolean;
  updated_at: string;
}

export interface Proof {
  label: string;
  path?: string;
  url?: string;
  kind?: string;
}

export interface Node {
  id: string;
  nav_id: string;
  parent_id: string | null;
  kind: "folder" | "note";
  title: string;
  emoji: string;
  content: unknown;
  proofs: Proof[];
  pinned: boolean;
  hidden: boolean;
  archived: boolean;
  order_idx: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CalEvent {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  source: string;
}

// ── nav ──────────────────────────────────────────────────────
export async function listNav(): Promise<NavItem[]> {
  const { data, error } = await sb().from("atlas_nav").select("*").eq("archived", false).order("order_idx");
  if (error) err(error);
  return (data ?? []) as NavItem[];
}

export async function createNav(input: { title: string; emoji?: string; template: NavItem["template"]; section: NavItem["section"]; agent_slug?: string }): Promise<NavItem> {
  const { data, error } = await sb().from("atlas_nav").insert({ emoji: "📄", ...input }).select().single();
  if (error) err(error);
  return data as NavItem;
}

export async function updateNav(id: string, patch: Partial<NavItem>): Promise<void> {
  const { error } = await sb().from("atlas_nav").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) err(error);
}

// ── nodes (unified tree) ─────────────────────────────────────
// AI writers sometimes store jsonb columns as serialized strings — normalize on
// read so a bad row can never crash the UI (caught live 2026-06-12 · proofs.map).
function normalizeNode(n: Node): Node {
  const fix = (v: unknown): unknown => {
    if (typeof v !== "string") return v;
    try { const p = JSON.parse(v); return Array.isArray(p) ? p : v; } catch { return v; }
  };
  const proofs = fix(n.proofs);
  let content = fix(n.content);
  if (typeof content === "string") {
    // unparseable raw text · keep it readable as paragraphs instead of vanishing
    content = content.split("\n").filter((l) => l.trim()).slice(0, 100)
      .map((l) => ({ type: "paragraph", content: [{ type: "text", text: l, styles: {} }] }));
  }
  return {
    ...n,
    proofs: (Array.isArray(proofs) ? proofs : []) as Node["proofs"],
    content,
  };
}

export async function listNodes(navId: string): Promise<Node[]> {
  const { data, error } = await sb().from("atlas_nodes").select("*").eq("nav_id", navId).eq("archived", false).order("order_idx");
  if (error) err(error);
  return ((data ?? []) as Node[]).map(normalizeNode);
}

export async function createNode(input: { nav_id: string; parent_id?: string | null; kind?: Node["kind"]; title: string; emoji?: string; content?: unknown }): Promise<Node> {
  const { data, error } = await sb().from("atlas_nodes").insert({ emoji: input.kind === "note" ? "📝" : "📁", kind: "folder", ...input }).select().single();
  if (error) err(error);
  return data as Node;
}

export async function updateNode(id: string, patch: Partial<Node>): Promise<void> {
  const { error } = await sb().from("atlas_nodes").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) err(error);
}

export async function archiveNode(id: string): Promise<void> {
  await updateNode(id, { archived: true } as Partial<Node>);
}

export async function recentNodes(limit = 12): Promise<Node[]> {
  const { data, error } = await sb().from("atlas_nodes").select("*").eq("archived", false).order("updated_at", { ascending: false }).limit(limit);
  if (error) err(error);
  return ((data ?? []) as Node[]).map(normalizeNode);
}

// ── realtime · unique channel + cleanup (v2 lesson baked) ────
let seq = 0;
export function subscribeNodes(navId: string, cb: () => void): () => void {
  const ch = sb()
    .channel(`nodes-${navId}-${++seq}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "atlas_nodes", filter: `nav_id=eq.${navId}` }, cb)
    .subscribe();
  return () => { void sb().removeChannel(ch); };
}

// ── layouts + widgets (personalizable canvas) ────────────────
export interface CanvasWidget {
  i: string;
  navId: string;
}

export async function getCanvas(key: string): Promise<{ layout: unknown[] | null; widgets: CanvasWidget[] }> {
  const { data, error } = await sb().from("atlas_layouts").select("layout, widgets").eq("key", key).maybeSingle();
  if (error) err(error);
  return {
    layout: (data?.layout as unknown[]) ?? null,
    widgets: (data?.widgets as CanvasWidget[]) ?? [],
  };
}

export async function saveCanvas(key: string, layout: unknown[], widgets: CanvasWidget[]): Promise<void> {
  const { error } = await sb().from("atlas_layouts").upsert({ key, layout, widgets, updated_at: new Date().toISOString() });
  if (error) err(error);
}

// ── events (calendar) ────────────────────────────────────────
export async function listEvents(fromIso: string, toIso: string): Promise<CalEvent[]> {
  const { data, error } = await sb().from("atlas_events").select("*").gte("starts_at", fromIso).lt("starts_at", toIso).order("starts_at");
  if (error) err(error);
  return (data ?? []) as CalEvent[];
}

export async function createEvent(input: { title: string; starts_at: string; ends_at?: string }): Promise<void> {
  const { error } = await sb().from("atlas_events").insert(input);
  if (error) err(error);
}

// ── proposals (eval-gate · WE-50/50) ─────────────────────────
export interface Proposal {
  id: string;
  name: string;
  summary: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export async function listProposals(): Promise<Proposal[]> {
  const { data, error } = await sb().from("atlas_proposals").select("*").order("created_at");
  if (error) err(error);
  return (data ?? []) as Proposal[];
}

export async function decideProposal(id: string, status: "approved" | "rejected"): Promise<void> {
  const { error } = await sb().from("atlas_proposals").update({ status, decided_at: new Date().toISOString() }).eq("id", id);
  if (error) err(error);
}

// override log (self-improve signal · brother corrects AI filing)
export function logOverride(nodeId: string, action: string, detail: Record<string, unknown> = {}): void {
  void sb().from("atlas_overrides").insert({ node_id: nodeId, action, detail }).then(() => undefined);
}

// realtime chat messages (cross-device <3s)
export function subscribeChat(chatId: string, cb: () => void): () => void {
  const ch = sb()
    .channel(`chat-${chatId}-${++seq}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "atlas_messages", filter: `chat_id=eq.${chatId}` }, cb)
    .subscribe();
  return () => { void sb().removeChannel(ch); };
}

// ⌘K search · titles + CONTENT (V4-OPS gap-B · full-text with snippets)
export interface SearchHit { kind: string; id: string; nav_id: string | null; title: string; emoji: string; snippet?: string }

function snip(text: string, q: string): string {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return "";
  return (i > 20 ? "…" : "") + text.slice(Math.max(0, i - 20), i + q.length + 50).replace(/\s+/g, " ") + "…";
}

export async function searchAll(q: string): Promise<SearchHit[]> {
  const [navs, nodes, content] = await Promise.all([
    sb().from("atlas_nav").select("id,title,emoji").eq("archived", false).ilike("title", `%${q}%`).limit(5),
    sb().from("atlas_nodes").select("id,nav_id,title,emoji,kind").eq("archived", false).ilike("title", `%${q}%`).limit(8),
    sb().from("atlas_nodes").select("id,nav_id,title,emoji,kind,content").eq("archived", false).filter("content::text", "ilike", `%${q}%`).limit(8),
  ]);
  const titleIds = new Set((nodes.data ?? []).map((n) => n.id));
  const hits: SearchHit[] = [
    ...((navs.data ?? []).map((n) => ({ kind: "page", id: n.id, nav_id: null as string | null, title: n.title, emoji: n.emoji }))),
    ...((nodes.data ?? []).map((n) => ({ kind: n.kind, id: n.id, nav_id: n.nav_id as string | null, title: n.title, emoji: n.emoji }))),
    ...((content.data ?? [])
      .filter((n) => !titleIds.has(n.id))
      .map((n) => ({
        kind: n.kind,
        id: n.id,
        nav_id: n.nav_id as string | null,
        title: n.title,
        emoji: n.emoji,
        snippet: snip(JSON.stringify(n.content ?? ""), q),
      }))),
  ];
  return hits.slice(0, 16);
}

export async function activitySince(iso: string): Promise<Node[]> {
  const { data, error } = await sb().from("atlas_nodes").select("*").gt("created_at", iso).eq("archived", false).order("created_at", { ascending: false }).limit(20);
  if (error) err(error);
  return ((data ?? []) as Node[]).map(normalizeNode);
}

// 5-field scaffold · WHAT/WHY/HOW/WHEN/RECOMMENDATION
export function fiveFieldScaffold(): unknown {
  const h = (text: string) => ({ type: "heading", props: { level: 3 }, content: [{ type: "text", text, styles: {} }] });
  const p = () => ({ type: "paragraph", content: [] });
  return [h("WHAT"), p(), h("WHY"), p(), h("HOW"), p(), h("WHEN"), p(), h("RECOMMENDATION"), p()];
}
