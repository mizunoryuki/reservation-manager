import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const loginUrl = new URL("/", request.url);
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  const decoded = jwt.decode(token);
  if (!decoded) {
    console.log("decode failure");
    return NextResponse.redirect(loginUrl);
  }

  const role =
    typeof decoded === "object" && decoded !== null && "user_role" in decoded
      ? (decoded as { user_role?: string }).user_role
      : undefined;

  if (!role) {
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/my/stores/", request.url));
  }

  if (pathname.startsWith("/my") && role !== "general") {
    return NextResponse.redirect(new URL("/admin/stores/", request.url));
  }

  return NextResponse.next();
}

// 適用するルート
export const config = {
  matcher: ["/my/:path*", "/admin/:path*"],
};
