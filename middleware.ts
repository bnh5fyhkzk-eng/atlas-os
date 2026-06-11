// Vercel Edge Middleware · basic-auth login for atlasos.me
// Per brother direct 2026-06-10 21:54 · "atlasos.me needs to be password protected (login)"
// Set ATLAS_LOGIN_USER + ATLAS_LOGIN_PASSWORD in Vercel project env vars
// Gemma reads LOCAL Mac mini files (zero auth needed) · this protects PUBLIC URL only

import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Run on every route EXCEPT static assets that don't need auth
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  // Skip auth for OPTIONS / health
  if (req.method === 'OPTIONS') return NextResponse.next();

  const authHeader = req.headers.get('authorization');
  const expectedUser = process.env.ATLAS_LOGIN_USER || 'atlas';
  const expectedPass = process.env.ATLAS_LOGIN_PASSWORD;

  // If password env var not set yet · allow through (brother sets it after first deploy)
  if (!expectedPass) return NextResponse.next();

  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      const decoded = atob(authHeader.slice(6));
      const [user, ...passParts] = decoded.split(':');
      const pass = passParts.join(':');
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {}
  }

  return new NextResponse('Authentication required · atlasos.me · brother + Atlas only', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="atlasos.me"',
    },
  });
}
