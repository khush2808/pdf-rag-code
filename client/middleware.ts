// Middleware is disabled for this simplified version
// To enable authentication, configure Clerk and uncomment the lines below

// import { clerkMiddleware } from '@clerk/nextjs/server';
// export default clerkMiddleware();

export default function middleware() {
  // No-op middleware for now
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
