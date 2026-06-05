// app/api/kitchen/decide/route.ts
// arm: decide-kitchen v1 · no em-dash · COMPLETE

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const ALLOWED_OWNERS: readonly string[] = [
  'you',
  'me',
  'us',
  'code',
  'curiosity',
  'pascal',
  'research',
  'infra',
  'dream',
  'hermes',
] as const;

type Owner = (typeof ALLOWED_OWNERS)[number];

interface Payload {
  itemId: string;
  owner: string;
}

interface SuccessResponse {
  ok: true;
  banked_at: number;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function validateOwner(owner: string): owner is Owner {
  return (ALLOWED_OWNERS as readonly string[]).includes(owner);
}

function getBankInsightPath(): string {
  // Path relative to project root or absolute on Mac
  // Adjust if deployed to Vercel by injecting env var
  return process.env.BANK_INSIGHT_PATH || '/root/.hermes/brain/bank-insight.py';
}

function buildInput(payload: Payload): object {
  return {
    itemId: payload.itemId.trim(),
    owner: payload.owner.trim(),
    source: 'atlas-kitchen',
    timestamp: Date.now(),
    route: '/api/kitchen/decide',
    arm: process.env.ARM_NAME || 'unknown',
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body: unknown = await request.json();

    // Guards
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { itemId, owner } = body as Payload;

    if (!itemId || typeof itemId !== 'string' || itemId.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'itemId is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!owner || typeof owner !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'owner is required and must be a string' },
        { status: 400 }
      );
    }

    if (!validateOwner(owner)) {
      const valid = ALLOWED_OWNERS.join(', ');
      return NextResponse.json(
        { ok: false, error: `owner must be one of: ${valid}. Received: "${owner}"` },
        { status: 400 }
      );
    }

    // Prepare input for bank-insight.py
    const inputObject = buildInput({ itemId, owner });
    const inputJson = JSON.stringify(inputObject);

    // Execute bank-insight.py with stdin
    const bankScript = getBankInsightPath();
    const { stdout, stderr } = await execAsync(`echo '${inputJson.replace(/'/g, "'\\''")}' | ${bankScript}`);

    // Optional: parse stdout for confirmation
    let result: any;
    try {
      result = JSON.parse(stdout);
    } catch {
      result = { raw: stdout.trim() };
    }

    const bankedAt = result?.banked_at ?? inputObject.timestamp;

    return NextResponse.json({
      ok: true,
      banked_at: bankedAt,
    });
  } catch (err: any) {
    console.error('[KITCHEN-DECIDE-ERROR]', err);
    return NextResponse.json(
      { ok: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}