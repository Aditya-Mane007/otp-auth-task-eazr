import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/admin/login", "/admin/verifyOtp"];
const protectedRoutes = ["/", "/admin/dashboard", "/admin/users"];

export async function middleware(request) {
  const cookie = (await cookies()).get("token");

  const path = request.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith("/admin/users");
  const isPublicRoute = publicRoutes.includes(path);

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
