import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { sign } from "@/lib/auth";

function passwordsMatch(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  if (providedBuf.length !== expectedBuf.length) {
    return false;
  }
  return timingSafeEqual(providedBuf, expectedBuf);
}

export async function POST(request: Request) {
  const password = process.env.ATLAS_PASSWORD;
  const secret = process.env.ATLAS_SESSION_SECRET;

  if (!password || !secret) {
    return NextResponse.json({ error: "misconfigured" }, { status: 500 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  if (!body.password || !passwordsMatch(body.password, password)) {
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("atlas_session", sign(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
