// /api/arms/status/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Types
interface ArmStatus {
  slug: string;
  display: string;
  model: string;
  currentTask: string;
  queueCount: number;
  lastCost: number;
  status: 'working' | 'idle' | 'dead';
  lastOutputSnippet: string;
}

const ARM_STATE_FILE = path.resolve(
  process.env.HOME || '/Users/collinmacneil',
  '.claude',
  'state',
  'arms.json'
);

const MOCK_ARMS: ArmStatus[] = [
  {
    slug: 'code-arm',
    display: 'Code Arm',
    model: 'deepseek/deepseek-v4-pro',
    currentTask: 'Reviewing PR #27690',
    queueCount: 2,
    lastCost: 0.35,
    status: 'working',
    lastOutputSnippet: 'Completed function optimizeSearch in code-base...'
  },
  {
    slug: 'vox-arm',
    display: 'Vox Arm',
    model: 'deepseek/deepseek-v4-light',
    currentTask: 'Processing audio chunk for Pascal training',
    queueCount: 5,
    lastCost: 0.12,
    status: 'working',
    lastOutputSnippet: 'Transcription progress 70%...'
  },
  {
    slug: 'member-arm',
    display: 'Member Arm',
    model: 'deepseek/deepseek-v4-pro',
    currentTask: 'Onboarding new user request',
    queueCount: 0,
    lastCost: 0.48,
    status: 'idle',
    lastOutputSnippet: 'Last action: sent welcome email to user_301'
  },
  {
    slug: 'meet-arm',
    display: 'Meet Arm',
    model: 'claude/claude-3-haiku',
    currentTask: 'Generating meeting summary',
    queueCount: 1,
    lastCost: 0.18,
    status: 'working',
    lastOutputSnippet: 'Bullet list for Atlas sync...'
  },
  {
    slug: 'talk-arm',
    display: 'Talk Arm',
    model: 'deepseek/deepseek-v4-light',
    currentTask: 'Analyzing conversation logs',
    queueCount: 3,
    lastCost: 0.09,
    status: 'idle',
    lastOutputSnippet: 'Finished sentiment analysis batch'
  },
  {
    slug: 'think-arm',
    display: 'Think Arm',
    model: 'deepseek/deepseek-v4-pro',
    currentTask: 'Self-improvement cycle',
    queueCount: 0,
    lastCost: 0.72,
    status: 'dead',
    lastOutputSnippet: 'Error: memory limit exceeded'
  },
  {
    slug: 'do-arm',
    display: 'Do Arm',
    model: 'claude/claude-3-sonnet',
    currentTask: 'Running scheduled task',
    queueCount: 7,
    lastCost: 0.25,
    status: 'working',
    lastOutputSnippet: 'Executing backup script for /spine'
  }
];

export async function GET() {
  try {
    const raw = await fs.readFile(ARM_STATE_FILE, 'utf-8');
    const arms: ArmStatus[] = JSON.parse(raw);

    // Validate: ensure at least one entry and expected shape
    if (!Array.isArray(arms) || arms.length === 0) {
      throw new Error('Invalid arms.json format');
    }

    return NextResponse.json({ arms }, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    // Fallback to mock data when file is missing or malformed
    console.warn('arms.json not found, using mock data:', (error as Error).message);
    return NextResponse.json({ arms: MOCK_ARMS }, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  }
}