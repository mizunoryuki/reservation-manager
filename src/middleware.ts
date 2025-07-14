import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const loginUrl = new URL("/", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  const decoded = jwt.decode(token);
  if (!decoded) {
    console.log("decode failure");
    return NextResponse.redirect(loginUrl);
  }
  console.log("success");
  return NextResponse.next();
}

// 適用するルート
export const config = {
  matcher: ["/my/:path*", "/admin/:path*"],
};
