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

    const role =
      typeof decoded === "object" && decoded !== null && "user_role" in decoded
        ? (decoded as { user_role?: string }).user_role
        : undefined;

    return NextResponse.json(
      {
        message: "トークン保存と検証成功",
        role,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("トークン検証失敗:", err);
    return NextResponse.json({ error: "トークン不正" }, { status: 403 });
  }
}
