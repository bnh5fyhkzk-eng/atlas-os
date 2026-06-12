// Vercel Function · /api/image · Gemini native image generation
// Per brother 2026-06-12 · Gemini key in Providers · us-picture task + house art.
// POST { prompt } → { b64, mime } (caller uploads to storage · keeps function thin)
import { nativeKeyFor } from "./providers.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const token = process.env.ATLAS_ARM_TOKEN;
  const auth = req.headers.authorization || "";
  const cookieOk = (req.headers.cookie || "").includes("atlas_auth=ok");
  if (!cookieOk && (!token || auth !== `Bearer ${token}`)) {
    return res.status(401).json({ error: "auth required" });
  }
  const { prompt, model } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "prompt required" });

  const key = await nativeKeyFor("google").catch(() => null);
  if (!key) return res.status(500).json({ error: "no google key in providers" });

  const m = model || "gemini-2.5-flash-image";
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    },
  );
  if (!r.ok) return res.status(502).json({ error: (await r.text()).slice(0, 400) });
  const j = await r.json();
  const parts = j.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) return res.status(502).json({ error: "no image in response", text: parts.map((p) => p.text).join(" ").slice(0, 200) });
  return res.status(200).json({ b64: img.inlineData.data, mime: img.inlineData.mimeType || "image/png" });
}
