import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login"];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) {
    return true;
  }
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/whoami")) {
    return true;
  }
  // /api/mcp = MCP OAuth Bearer-auth handles itself · bypass session-cookie middleware
  if (pathname.startsWith("/api/mcp")) {
    return true;
  }
  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|css|js)$/.test(pathname)
  ) {
    return true;
  }
  return false;
}

function sessionValid(session: string | undefined, secret: string): boolean {
  if (!session || session.length !== secret.length) {
    return false;
  }
  let mismatch = 0;
  for (let index = 0; index < secret.length; index += 1) {
    mismatch |= session.charCodeAt(index) ^ secret.charCodeAt(index);
  }
  return mismatch === 0;
}

export async function middleware(request: NextRequest) {
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const secret = process.env.ATLAS_SESSION_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = request.cookies.get("atlas_session")?.value;
  if (!sessionValid(session, secret)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
