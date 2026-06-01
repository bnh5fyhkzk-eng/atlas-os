import "server-only"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/auth"

export async function getServerSession(): Promise<boolean> {
  const secret = process.env.ATLAS_SESSION_SECRET
  if (!secret) {
    return false
  }

  const cookieStore = await cookies()
  const session = cookieStore.get("atlas_session")?.value
  if (!session) {
    return false
  }

  return verifySession(session, secret)
}
