// /api/providers · key vault · AES-256-GCM server-side (ATLAS_SESSION_SECRET-derived key)
// GET → [{provider, hint, connected}] · POST {provider, key} save · POST {provider, action:"test"}
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const PROVIDERS = {
  openai: { base: "https://api.openai.com/v1", testModel: "gpt-4o-mini" },
  google: { base: "https://generativelanguage.googleapis.com/v1beta/openai", testModel: "gemini-2.0-flash" },
  xai: { base: "https://api.x.ai/v1", testModel: "grok-3-mini" },
  openrouter: { base: "https://openrouter.ai/api/v1", testModel: "deepseek/deepseek-chat-v3-0324" },
};

function db() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

function cipherKey() {
  return crypto.createHash("sha256").update(String(process.env.ATLAS_SESSION_SECRET)).digest();
}

export function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", cipherKey(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return { ciphertext: enc.toString("base64"), iv: iv.toString("base64"), tag: c.getAuthTag().toString("base64") };
}

export function decrypt(row) {
  const d = crypto.createDecipheriv("aes-256-gcm", cipherKey(), Buffer.from(row.iv, "base64"));
  d.setAuthTag(Buffer.from(row.tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(row.ciphertext, "base64")), d.final()]).toString("utf8");
}

export async function nativeKeyFor(provider) {
  const { data } = await db().from("atlas_api_keys").select("*").eq("provider", provider).maybeSingle();
  if (!data) return null;
  try { return decrypt(data); } catch { return null; }
}

export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  if (!cookie.includes("atlas_auth=ok")) return res.status(401).json({ error: "auth required" });
  if (!process.env.ATLAS_SESSION_SECRET) return res.status(500).json({ error: "ATLAS_SESSION_SECRET missing" });

  if (req.method === "GET") {
    const { data } = await db().from("atlas_api_keys").select("provider, hint, updated_at");
    return res.status(200).json({
      providers: Object.keys(PROVIDERS).map((p) => {
        const row = (data ?? []).find((r) => r.provider === p);
        return { provider: p, connected: Boolean(row), hint: row?.hint ?? "" };
      }),
    });
  }

  if (req.method === "POST") {
    const { provider, key, action } = req.body || {};
    if (!PROVIDERS[provider]) return res.status(400).json({ error: "unknown provider" });

    if (action === "test") {
      const k = key || (await nativeKeyFor(provider));
      if (!k) return res.status(200).json({ ok: false, reason: "no key" });
      const r = await fetch(`${PROVIDERS[provider].base}/models`, { headers: { Authorization: `Bearer ${k}` } });
      return res.status(200).json({ ok: r.ok, status: r.status });
    }

    if (!key || key.length < 10) return res.status(400).json({ error: "key required" });
    const enc = encrypt(key.trim());
    const hint = `…${key.trim().slice(-4)}`;
    const { error } = await db().from("atlas_api_keys").upsert({ provider, ...enc, hint, updated_at: new Date().toISOString() });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, hint });
  }

  return res.status(405).json({ error: "method not allowed" });
}
