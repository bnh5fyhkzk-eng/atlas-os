// /api/workshop/tools/route.ts
import { NextResponse } from "next/server";

// Static tool inventory (replace with DB in Phase-2)
const TOOLS = [
  { id: "web-search", name: "Web Search", description: "Search live web via DuckDuckGo" },
  { id: "code-exec", name: "Code Exec", description: "Run sandboxed JavaScript/TypeScript" },
  { id: "db-query", name: "DB Query", description: "SQL query on brain-v2.db" },
  { id: "file-read", name: "File Read", description: "Read file from allowed paths" },
  { id: "file-write", name: "File Write", description: "Write file to allowed paths" },
  { id: "signal-send", name: "Signal Send", description: "Send message via brother bridge" },
  { id: "voice-tts", name: "Voice TTS", description: "Text-to-speech via VoxCPM" },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeDisabled = url.searchParams.get("includeDisabled") === "true";

  const tools = includeDisabled ? TOOLS : TOOLS.filter((t) => !t.disabled);

  return NextResponse.json({
    total: tools.length,
    tools,
    updatedAt: "2026-06-07T00:00:00Z",
  });
}