import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const loginUrl = new URL("/", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    jwt.verify(token, process.env.JWT_KEY!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

// 適用するルート
export const config = {
  matcher: ["/my/:path*", "/admin/:path*"],
};
