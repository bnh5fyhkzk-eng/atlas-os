import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile, readdir } from "fs/promises";
import path from "path";

const CHAT_DIR = "/tmp/atlas-chat";
const MESSAGES_DIR = `${CHAT_DIR}/messages`;
const REPLIES_DIR = `${CHAT_DIR}/replies`;

async function ensureDirs() {
  await mkdir(MESSAGES_DIR, { recursive: true }).catch(() => {});
  await mkdir(REPLIES_DIR, { recursive: true }).catch(() => {});
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { text?: string; channel?: string };
    const text = (body.text ?? "").trim();
    if (!text) return NextResponse.json({ error: "empty" }, { status: 400 });
    if (text.length > 4000) return NextResponse.json({ error: "too long" }, { status: 400 });

    await ensureDirs();
    const ts = Date.now();
    const id = `msg-${ts}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = {
      id,
      from: "brother",
      text,
      channel: body.channel ?? "web",
      created_at: new Date().toISOString(),
      status: "pending",
    };
    await writeFile(
      path.join(MESSAGES_DIR, `${id}.json`),
      JSON.stringify(entry, null, 2),
      "utf-8",
    );

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDirs();
    const { searchParams } = new URL(request.url);
    const since = searchParams.get("since");
    const sinceMs = since ? parseInt(since, 10) : 0;

    const msgFiles = await readdir(MESSAGES_DIR).catch(() => [] as string[]);
    const replyFiles = await readdir(REPLIES_DIR).catch(() => [] as string[]);

    async function loadAll(dir: string, files: string[]) {
      const entries = await Promise.all(
        files
          .filter((f) => f.endsWith(".json"))
          .map(async (f) => {
            try {
              const content = await readFile(path.join(dir, f), "utf-8");
              return JSON.parse(content);
            } catch {
              return null;
            }
          }),
      );
      return entries.filter(Boolean);
    }

    const [messages, replies] = await Promise.all([
      loadAll(MESSAGES_DIR, msgFiles),
      loadAll(REPLIES_DIR, replyFiles),
    ]);

    const all = [...messages, ...replies].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    const filtered = sinceMs
      ? all.filter((m) => new Date(m.created_at).getTime() > sinceMs)
      : all;

    return NextResponse.json({
      messages: filtered,
      count: filtered.length,
      pending_count: messages.filter((m: { status: string }) => m.status === "pending").length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      reply_to?: string;
      text?: string;
      synced_from?: string;
    };
    const text = (body.text ?? "").trim();
    if (!text) return NextResponse.json({ error: "empty" }, { status: 400 });

    await ensureDirs();
    const ts = Date.now();
    const id = `reply-${ts}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = {
      id,
      from: "atlas",
      text,
      reply_to: body.reply_to ?? null,
      synced_from: body.synced_from ?? "terminal",
      created_at: new Date().toISOString(),
    };
    await writeFile(
      path.join(REPLIES_DIR, `${id}.json`),
      JSON.stringify(entry, null, 2),
      "utf-8",
    );
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}
