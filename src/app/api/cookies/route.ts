import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// access_token を受け取り、Cookieに保存し、デコードする
export async function POST(req: NextRequest) {
  const { access_token } = await req.json();

  if (!access_token) {
    return NextResponse.json(
      { error: "トークンを呼び出せませんでした" },
      { status: 403 }
    );
  }

  // Cookieに保存（NextResponse を使う）
  const res = NextResponse.json({
    message: "トークンを保存し、デコードしました",
  });
  res.cookies.set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_KEY!);
    console.log("decoded:", decoded);

    // もし role などを新たにCookieに保存したい場合
    if (typeof decoded === "object" && decoded?.role) {
      res.cookies.set("role", decoded.role, {
        httpOnly: true,
        path: "/",
      });
    }

    return res;
  } catch (err) {
    console.error("トークン検証失敗:", err);
    return NextResponse.json({ error: "トークン不正" }, { status: 403 });
  }
}
