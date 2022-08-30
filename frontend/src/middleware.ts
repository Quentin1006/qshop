import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (!req.url.match(/^(?:(?!\.png$|\.jpg$|\.svg$).)*$/)) {
    return NextResponse.next();
  }

  const idSession = 's-1234';

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-id-session', idSession);

  const res = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  const unauthSession = await getIronSession<any>(req, res, {
    password: process.env.SESSION_SECRET!,
    cookieName: process.env.COOKIE_NAME!,
  });

  console.log('in middleware', { unauthSession });
  if (!unauthSession.id) {
    unauthSession.id = idSession;
    await unauthSession.save();
  }
  console.log('in middleware, before setting cookie', { unauthSession });
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
