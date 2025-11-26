import { NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("Authorization");

  const { pathname } = request.nextUrl;

  // Protected dashboard routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
