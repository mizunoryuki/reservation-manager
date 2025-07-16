import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "get cookie failure" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!);

    const role =
      typeof decoded === "object" && decoded !== null && "user_role" in decoded
        ? (decoded as { user_role?: string }).user_role
        : undefined;

    if (!role) {
      return NextResponse.json({ error: "role undefined" }, { status: 403 });
    }

    return NextResponse.json({ role }, { status: 200 });
  } catch (err) {
    console.error("トークン検証失敗:", err);
    return NextResponse.json({ error: "トークン不正" }, { status: 403 });
  }
}
