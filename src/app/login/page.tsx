"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setLoading(true);

    const password = new FormData(event.currentTarget).get("password");
    if (typeof password !== "string") {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        redirect: "follow",
      });

      if (response.ok || response.redirected) {
        window.location.href = "/";
        return;
      }

      setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-center gap-8 px-6"
    >
      <p className="font-serif text-2xl italic text-[var(--paper)]">who are you</p>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
        className="w-full border border-[var(--paper)]/15 bg-transparent px-4 py-3 text-center text-[var(--paper)] outline-none transition-colors placeholder:text-[var(--paper)]/30 focus:border-[var(--paper)]/40"
        placeholder="· · · · · ·"
      />
      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          disabled={loading}
          variant="outline"
          className="min-w-24 border-[var(--paper)]/20 bg-transparent text-[var(--paper)] hover:bg-[var(--paper)]/5"
        >
          enter
        </Button>
        {error ? (
          <p className="text-sm text-red-500" role="alert">
            wrong
          </p>
        ) : null}
      </div>
    </form>
  );
}
