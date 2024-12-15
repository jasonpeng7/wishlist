import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - sw.js (service worker)
     * - workbox- (workbox files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|sw.js|workbox-|.*\\.(?:jpg|jpeg|gif|png|svg|ico)$).*)",
    "/(api|trpc)(.*)"],
}