// /arms/[task] · individual arm-task content-viewer
// Per brother direct 2026-06-07 15:55 EDT "arms can't see it · useless data"
// Renders the actual spec.md / brief.md content from-Mac-mini arm-research-folder
// Synced via me-arms-content-sync.sh into public/arm-content/{task-id}/

import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

interface TaskIndex {
  arm: string;
  collected_at: string;
  files: string[];
}

interface IndexFile {
  generated_at: string;
  tasks: Record<string, TaskIndex>;
}

interface PageProps {
  params: Promise<{ task: string }>;
}

async function loadIndex(): Promise<IndexFile | null> {
  try {
    const p = path.join(process.cwd(), "public", "arm-content", "_index.json");
    const txt = await fs.readFile(p, "utf-8");
    return JSON.parse(txt) as IndexFile;
  } catch {
    return null;
  }
}

async function loadFile(taskId: string, file: string): Promise<string | null> {
  try {
    const p = path.join(process.cwd(), "public", "arm-content", taskId, file);
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

const ARM_COLORS: Record<string, string> = {
  pascal: "text-teal-300 border-teal-700/40",
  charle: "text-amber-300 border-amber-700/40",
  curiosity: "text-violet-300 border-violet-700/40",
  code: "text-sky-300 border-sky-700/40",
  research: "text-emerald-300 border-emerald-700/40",
  infra: "text-rose-300 border-rose-700/40",
  hermes: "text-indigo-300 border-indigo-700/40",
  unknown: "text-zinc-400 border-zinc-700/40",
};

export default async function ArmTaskPage({ params }: PageProps) {
  const { task } = await params;
  const index = await loadIndex();
  const taskMeta = index?.tasks[task];

  if (!taskMeta) {
    notFound();
  }

  const armColor = ARM_COLORS[taskMeta.arm] ?? ARM_COLORS.unknown;

  // Load all files for this task
  const contents = await Promise.all(
    taskMeta.files.map(async (f) => ({
      name: f,
      body: await loadFile(task, f),
    })),
  );

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <Link
          href="/arms"
          className="text-xs uppercase tracking-widest text-emerald-400/60 hover:text-emerald-300 transition"
        >
          ← all arms
        </Link>

        <header className="mt-4 mb-8 border-b border-zinc-800/60 pb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span
              className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider border rounded ${armColor}`}
            >
              {taskMeta.arm}-arm
            </span>
            <span className="text-xs text-zinc-500 font-mono">{task}</span>
          </div>
          <h1 className="text-2xl font-serif text-zinc-100">
            Arm output · {taskMeta.files.length} file
            {taskMeta.files.length === 1 ? "" : "s"}
          </h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">
            collected · {taskMeta.collected_at}
          </p>
        </header>

        {/* FILES */}
        <div className="space-y-8">
          {contents.map((c) => (
            <section
              key={c.name}
              className="border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-hidden"
            >
              <header className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                  {c.name}
                </p>
              </header>
              <div className="px-4 py-4">
                {c.body ? (
                  <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {c.body}
                  </pre>
                ) : (
                  <p className="text-zinc-500 italic">file empty or unreadable</p>
                )}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-zinc-600 font-mono">
            arm-content synced from Mac-mini · {taskMeta.arm}-arm-research/{task}
          </p>
        </footer>
      </div>
    </main>
  );
}
