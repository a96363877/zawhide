import { type NextRequest, NextResponse } from "next/server"
import { detectBot, isMobileDevice, isRateLimited } from "./lib/server/security"

// List of public routes that should remain accessible
// Even when the site is locked
const PUBLIC_ROUTES = [
  "/alternative-view",
  "/desktop-detected",
  "/api/health", // Health check endpoint if needed
  "/favicon.ico",
  "/_next", // Next.js assets
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow access to public routes and static assets
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if the request is from a bot
  if (await detectBot(request)) {
    // Redirect bots to the alternative view
    const url = request.nextUrl.clone()
    url.pathname = "/alternative-view"
    url.searchParams.set("source", encodeURIComponent(pathname))
    return NextResponse.redirect(url)
  }

  // Check if the request is rate limited
  if (await isRateLimited(request)) {
    const url = request.nextUrl.clone()
    url.pathname = "/alternative-view"
    url.searchParams.set("reason", "rate-limited")
    return NextResponse.redirect(url)
  }

  // Check if the request is from a mobile device
  // Only allow mobile devices to access the site
  if (!(await isMobileDevice(request))) {
    const url = request.nextUrl.clone()
    url.pathname = "/desktop-detected"
    url.searchParams.set("source", encodeURIComponent(pathname))
    return NextResponse.redirect(url)
  }

  // If the request passes all checks, allow access
  return NextResponse.next()
}

// Configure the middleware to run on all routes
export const config = {
  matcher: [
    // Apply to all routes
    "/(.*)",
    // Exclude static files if needed
    // '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
