// /api/brain/talk-seeds/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'child_process'

interface TalkSeed {
  id: string
  text: string
  sourceCanonId: string
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const sshHost = process.env.SSH_HOST
    const sshUser = process.env.SSH_USER
    const sshKey = process.env.SSH_KEY_PATH
    const dbPath = process.env.BRAIN_DB_PATH

    if (!sshHost || !sshUser || !sshKey || !dbPath) {
      return NextResponse.json(
        { error: 'Missing server environment variables' },
        { status: 500 }
      )
    }

    // Query: three random seeds with high arousal in last 7 days
    const query = `SELECT id, text, source_canon_id FROM nodes WHERE arousal >= 0.85 AND created_at > strftime('%s','now','-7 days') ORDER BY RANDOM() LIMIT 3`

    // Execute via SSH
    const sshCmd = `ssh -i ${sshKey} -o StrictHostKeyChecking=no ${sshUser}@${sshHost} "sqlite3 ${dbPath} '${query}' -separator '|'"`
    const result = execSync(sshCmd, { encoding: 'utf-8' }).trim()

    const seeds: TalkSeed[] = result
      .split('\n')
      .filter(line => line.includes('|'))
      .map(line => {
        const [id, text, sourceCanonId] = line.split('|')
        return { id: id || '', text: text || '', sourceCanonId: sourceCanonId || '' }
      })

    return NextResponse.json(seeds, { status: 200 })
  } catch (error) {
    console.error('Talk seeds fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve brain seeds' },
      { status: 500 }
    )
  }
}