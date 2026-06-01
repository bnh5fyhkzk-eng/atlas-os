import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile, readdir } from "fs/promises";
import path from "path";

const PUSH_DIR = "/tmp/atlas-pushes";

async function ensureDir() {
  try {
    await mkdir(PUSH_DIR, { recursive: true });
  } catch {
    /* ignore */
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { text?: string; context?: string };
    const text = (body.text ?? "").trim();
    if (!text) {
      return NextResponse.json({ error: "empty" }, { status: 400 });
    }
    if (text.length > 8000) {
      return NextResponse.json({ error: "too long" }, { status: 400 });
    }

    await ensureDir();
    const ts = Date.now();
    const id = `push-${ts}-${Math.random().toString(36).slice(2, 8)}`;
    const entry = {
      id,
      text,
      context: body.context ?? null,
      created_at: new Date().toISOString(),
    };

    const filename = path.join(PUSH_DIR, `${id}.json`);
    await writeFile(filename, JSON.stringify(entry, null, 2), "utf-8");

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await ensureDir();
    const files = await readdir(PUSH_DIR).catch(() => [] as string[]);
    const entries = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          try {
            const content = await readFile(path.join(PUSH_DIR, f), "utf-8");
            return JSON.parse(content);
          } catch {
            return null;
          }
        }),
    );
    return NextResponse.json({
      pending: entries.filter(Boolean),
      count: entries.filter(Boolean).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "unknown" },
      { status: 500 },
    );
  }
}
