// /workspace · brother + Atlas work-place · per brother direct 2026-06-07 22:38 EDT
// "place we can work and live there together · CEO delegate · queue project with arms"
// Per #27425 3-axis YOU/US/PER-ARM + #27572 arms-as-organs + #27859 path-to-truly-continuous
// Per #27083 BUILD-ON-TOP existing arms.json sync + /api/dispatch

import { promises as fs } from "fs";
import path from "path";
import WorkspaceClient from "./WorkspaceClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Workspace · Atlas + Brother" };

interface Arm {
  name: string;
  emoji: string;
  role: string;
  where: string;
  status: string;
  last_fire: string;
  next_action?: string;
  blockers?: string;
  color?: string;
}

interface ArmsData {
  generated_at: string;
  arms: Arm[];
  summary?: { running: number; queued: number; blocked: number; done: number };
}

async function loadArms(): Promise<Arm[]> {
  try {
    const p = path.join(process.cwd(), "public", "arms.json");
    const data = JSON.parse(await fs.readFile(p, "utf-8")) as ArmsData;
    return data.arms ?? [];
  } catch {
    return [];
  }
}

export default async function WorkspacePage() {
  const arms = await loadArms();
  return <WorkspaceClient arms={arms} />;
}
