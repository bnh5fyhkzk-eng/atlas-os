import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const secret = process.env.ATLAS_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ authenticated: false });
  }

  const session = request.cookies.get("atlas_session")?.value;
  return NextResponse.json({
    authenticated: session ? verifySession(session, secret) : false,
  });
}
