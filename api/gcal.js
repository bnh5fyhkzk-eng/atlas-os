// /api/gcal · real Google Calendar events · ported from uplift-app working pattern
// Uses GOOGLE_OAUTH_CLIENT_ID + GOOGLE_OAUTH_CLIENT_SECRET + GOOGLE_REFRESH_TOKEN (Vercel env)
// Token refresh per uplift-app src/lib/google-oauth.ts (proven · #27481)
let cached = { token: null, exp: 0 };

async function accessToken() {
  if (cached.token && Date.now() / 1000 < cached.exp - 60) return cached.token;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
      grant_type: "refresh_token",
    }).toString(),
  });
  if (!r.ok) return null;
  const d = await r.json();
  if (!d.access_token) return null;
  cached = { token: d.access_token, exp: Date.now() / 1000 + (d.expires_in ?? 3600) };
  return cached.token;
}

export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  const authed = cookie.includes("atlas_auth=ok") || (process.env.ATLAS_ARM_TOKEN && bearer === process.env.ATLAS_ARM_TOKEN);
  if (!authed) return res.status(401).json({ error: "auth required" });

  const { from, to } = req.query;

  // Primary path: uplift-app mirror (its env holds the working OAuth client ·
  // sensitive-locked there · server-to-server Bearer)
  if (process.env.ATLAS_ARM_TOKEN) {
    try {
      const mu = new URL("https://upliftai.app/api/atlas/calendar-mirror");
      if (from) mu.searchParams.set("from", from);
      if (to) mu.searchParams.set("to", to);
      const mr = await fetch(mu.toString(), {
        headers: { Authorization: `Bearer ${process.env.ATLAS_ARM_TOKEN}` },
        signal: AbortSignal.timeout(15000),
      });
      if (mr.ok) {
        const mj = await mr.json();
        if (mj.ok) return res.status(200).json(mj);
      }
    } catch { /* fall through to direct path */ }
  }

  // Fallback: direct creds in this project's env (if ever set)
  if (!process.env.GOOGLE_OAUTH_CLIENT_ID || !process.env.GOOGLE_OAUTH_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    return res.status(200).json({ ok: false, connected: false, reason: "mirror unreachable · no direct creds", events: [] });
  }

  const token = await accessToken();
  if (!token) return res.status(200).json({ ok: false, connected: false, reason: "token refresh failed", events: [] });
  const timeMin = from || new Date().toISOString();
  const timeMax = to || new Date(Date.now() + 31 * 86400e3).toISOString();
  const u = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
  u.searchParams.set("timeMin", timeMin);
  u.searchParams.set("timeMax", timeMax);
  u.searchParams.set("singleEvents", "true");
  u.searchParams.set("orderBy", "startTime");
  u.searchParams.set("maxResults", "100");

  const r = await fetch(u.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) return res.status(200).json({ ok: false, connected: true, reason: `Calendar HTTP ${r.status}`, events: [] });
  const data = await r.json();
  const events = (data.items ?? []).map((e) => ({
    id: e.id,
    title: e.summary ?? "(no title)",
    starts_at: e.start?.dateTime ?? e.start?.date,
    ends_at: e.end?.dateTime ?? e.end?.date,
    source: "google",
    link: e.htmlLink,
  }));
  return res.status(200).json({ ok: true, connected: true, events });
}
