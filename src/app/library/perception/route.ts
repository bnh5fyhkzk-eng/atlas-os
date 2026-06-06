// /api/library/perception/route.ts
// CAVEMAN: GET/POST shared-perception per book+section. Store JSON file Mac-side.
// Next.js 15 App Router. No em-dash. Stone-50.

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// --- types ---

type PerceptionSource = 'user' | 'ai' | 'system';
type PerceptionLevel = 'emotion' | 'theme' | 'insight' | 'question' | 'note';

interface Perception {
  id: string;
  book: string;
  section: string;          // e.g. "chapter-3", "pp-45-60"
  source: PerceptionSource;
  level: PerceptionLevel;
  content: string;
  timestamp: number;        // Unix ms
  contextUrl?: string;      // optional audio/video reference
}

interface PerceptionStore {
  perceptions: Perception[];
  updatedAt: number;
}

// --- config ---

const DATA_DIR = process.env.PERCEPTION_DATA_DIR || '/Users/atlas/perception-data';
const DATA_FILE = path.join(DATA_DIR, 'library-perception.json');

// --- helpers ---

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // dir exists
  }
}

async function readStore(): Promise<PerceptionStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as PerceptionStore;
  } catch {
    return { perceptions: [], updatedAt: 0 };
  }
}

async function writeStore(store: PerceptionStore): Promise<void> {
  await ensureDataDir();
  store.updatedAt = Date.now();
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function generateId(): string {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function validatePerceptionInput(body: unknown): { valid: boolean; error?: string; data?: Omit<Perception, 'id' | 'timestamp'> } {
  if (!body || typeof body !== 'object') return { valid: false, error: 'body must be object' };
  const b = body as Record<string, unknown>;
  if (typeof b.book !== 'string' || !b.book) return { valid: false, error: 'book required string' };
  if (typeof b.section !== 'string' || !b.section) return { valid: false, error: 'section required string' };
  const allowedSources: PerceptionSource[] = ['user', 'ai', 'system'];
  const source = b.source as string;
  if (!allowedSources.includes(source as PerceptionSource)) return { valid: false, error: 'source must be user|ai|system' };
  const allowedLevels: PerceptionLevel[] = ['emotion', 'theme', 'insight', 'question', 'note'];
  const level = b.level as string;
  if (!allowedLevels.includes(level as PerceptionLevel)) return { valid: false, error: 'level must be emotion|theme|insight|question|note' };
  if (typeof b.content !== 'string' || !b.content) return { valid: false, error: 'content required string' };
  const data: Omit<Perception, 'id' | 'timestamp'> = {
    book: b.book as string,
    section: b.section as string,
    source: source as PerceptionSource,
    level: level as PerceptionLevel,
    content: b.content as string,
    contextUrl: typeof b.contextUrl === 'string' ? b.contextUrl : undefined,
  };
  return { valid: true, data };
}

// --- routes ---

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const book = searchParams.get('book');
  const section = searchParams.get('section');

  try {
    const store = await readStore();

    // Support flexible filtering: no params returns all, filter by book, or book+section
    let filtered = store.perceptions;
    if (book) {
      filtered = filtered.filter(p => p.book === book);
      if (section) {
        filtered = filtered.filter(p => p.section === section);
      }
    }

    return NextResponse.json({
      ok: true,
      count: filtered.length,
      perceptions: filtered,
      updatedAt: store.updatedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const validation = validatePerceptionInput(body);
    if (!validation.valid) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
    }

    const store = await readStore();
    const perception: Perception = {
      id: generateId(),
      ...validation.data!,
      timestamp: Date.now(),
    };
    store.perceptions.push(perception);

    // Optional: keep only last 10000 to avoid file bloat
    if (store.perceptions.length > 10000) {
      store.perceptions = store.perceptions.slice(-10000);
    }

    await writeStore(store);

    return NextResponse.json({
      ok: true,
      perception,
    }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}