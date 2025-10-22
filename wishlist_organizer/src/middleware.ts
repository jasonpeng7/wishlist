// FOR SECURITY - CHECKS IF USER IS AUTHENTICATED BEFORE ACCESSING PROTECTED PATHS

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const protectedPaths = ['/dashboard', '/groups', '/wishlists'];
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      await jose.jwtVerify(token, secret);
      // allow req to proceed if token is valid
      return NextResponse.next();
    } catch (error) {
      // otherwise redirect to signin
      console.error('JWT verification failed:', error);
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('token'); // clear invalid token
      return response;
    }
  }

  return NextResponse.next();
}

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
}
