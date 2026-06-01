import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const REACTIONS_DIR = path.join(process.cwd(), "public");
const REACTIONS_FILE = path.join(REACTIONS_DIR, "reactions.json");
const PUSH_FILE = path.join(REACTIONS_DIR, "brother-push.json");

export type Reaction = "star" | "echo" | "think";

export type ReactionRecord = {
  target_id: string;
  target_type: string;
  reaction: Reaction;
  count: number;
  last_at: string;
};

export type PushEntry = {
  id: string;
  text: string;
  context?: string;
  created_at: string;
  banked: boolean;
};

type ReactionsFile = {
  reactions: Record<string, Record<Reaction, number>>;
  last_at: Record<string, string>;
};

type PushFile = {
  entries: PushEntry[];
};

async function ensureFile(filePath: string, defaultContent: string) {
  try {
    await readFile(filePath, "utf-8");
  } catch {
    await mkdir(REACTIONS_DIR, { recursive: true });
    await writeFile(filePath, defaultContent, "utf-8");
  }
}

export async function readReactions(): Promise<ReactionsFile> {
  await ensureFile(
    REACTIONS_FILE,
    JSON.stringify({ reactions: {}, last_at: {} }, null, 2),
  );
  const text = await readFile(REACTIONS_FILE, "utf-8");
  return JSON.parse(text) as ReactionsFile;
}

export async function writeReactions(data: ReactionsFile): Promise<void> {
  await writeFile(REACTIONS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function bumpReaction(
  targetId: string,
  reaction: Reaction,
): Promise<ReactionsFile> {
  const data = await readReactions();
  if (!data.reactions[targetId]) {
    data.reactions[targetId] = { star: 0, echo: 0, think: 0 };
  }
  data.reactions[targetId][reaction] += 1;
  data.last_at[targetId] = new Date().toISOString();
  await writeReactions(data);
  return data;
}

export async function getReactionCounts(
  targetId: string,
): Promise<Record<Reaction, number>> {
  const data = await readReactions();
  return data.reactions[targetId] ?? { star: 0, echo: 0, think: 0 };
}

export async function readPushes(): Promise<PushFile> {
  await ensureFile(PUSH_FILE, JSON.stringify({ entries: [] }, null, 2));
  const text = await readFile(PUSH_FILE, "utf-8");
  return JSON.parse(text) as PushFile;
}

export async function appendPush(
  text: string,
  context?: string,
): Promise<PushEntry> {
  const file = await readPushes();
  const entry: PushEntry = {
    id: `push-${file.entries.length + 1}-${Math.floor(Date.now() / 1000)}`,
    text,
    context,
    created_at: new Date().toISOString(),
    banked: false,
  };
  file.entries.unshift(entry);
  await writeFile(PUSH_FILE, JSON.stringify(file, null, 2), "utf-8");
  return entry;
}
