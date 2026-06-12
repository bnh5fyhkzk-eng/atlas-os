// Password gate · GOAL-1-FEEL T22 · formalizes atlas_auth cookie flow
// ATLAS_PASSWORD lives in Vercel env · /api/auth sets the cookie
import { useState, type ReactNode } from "react";

function hasAuthCookie(): boolean {
  return document.cookie.split(";").some((c) => c.trim().startsWith("atlas_auth=ok"));
}

export function AuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(hasAuthCookie());
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (authed) return <>{children}</>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Network error · try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="atlas-surface flex min-h-screen items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-xs px-6 text-center">
        <div className="text-4xl">🏠</div>
        <h1 className="mt-3 text-lg font-semibold">Atlas-OS</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--atlas-text-soft)" }}>
          Private house · enter password
        </p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
          style={{ borderColor: "var(--atlas-border)" }}
          placeholder="Password"
        />
        {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-3 w-full rounded-lg bg-stone-900 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {busy ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
