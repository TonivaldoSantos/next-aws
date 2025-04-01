import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard") ||
                          req.nextUrl.pathname.startsWith("/profile") ||
                          req.nextUrl.pathname.startsWith("/settings");

  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Redirect authenticated users to dashboard if they try to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Configure Middleware to run on the following paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
