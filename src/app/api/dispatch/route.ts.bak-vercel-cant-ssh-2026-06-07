// /api/dispatch · brother + Atlas dispatch to arm-board on Hostinger
// Per brother direct 2026-06-07 22:38 EDT · "place we can work and live there together · CEO delegate · queue project with arms"
// Per #27083 BUILD-ON-TOP existing hermes kanban CLI · #27513 Hostinger primary

import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const exec = promisify(execFile);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID_ARMS = ["pascal", "code", "research", "infra", "hermes", "charle"] as const;
type Arm = typeof VALID_ARMS[number];

interface DispatchBody {
  arm?: Arm;
  title?: string;
  body?: string;
  source?: "brother-direct" | "atlas-routed";
}

export async function POST(req: NextRequest) {
  let payload: DispatchBody;
  try {
    payload = (await req.json()) as DispatchBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const { arm, title, body, source = "brother-direct" } = payload;

  if (!arm || !VALID_ARMS.includes(arm)) {
    return NextResponse.json(
      { ok: false, error: `arm must be one of ${VALID_ARMS.join(", ")}` },
      { status: 400 }
    );
  }
  if (!title || title.trim().length < 3) {
    return NextResponse.json({ ok: false, error: "title required (min 3 chars)" }, { status: 400 });
  }

  // Build hermes kanban create command
  const titleClean = title.trim().slice(0, 200);
  const bodyClean = (body || `dispatched from atlasos.me /workspace · source=${source} · ${new Date().toISOString()}`).slice(0, 4000);

  try {
    const { stdout, stderr } = await exec(
      "ssh",
      [
        "-o",
        "ConnectTimeout=8",
        "-o",
        "BatchMode=yes",
        "root@82.25.93.174",
        "/root/.local/bin/hermes",
        "kanban",
        "--board",
        arm,
        "create",
        "--body",
        bodyClean,
        "--created-by",
        `atlasos-${source}`,
        "--json",
        titleClean,
      ],
      { timeout: 12_000 }
    );
    const task = JSON.parse(stdout);
    return NextResponse.json({
      ok: true,
      task_id: task.id,
      arm,
      title: task.title,
      status: task.status,
      created_at: task.created_at,
      source,
      stderr: stderr || undefined,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `dispatch failed · ${message.slice(0, 500)}` },
      { status: 500 }
    );
  }
}
