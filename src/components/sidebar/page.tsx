import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function Sidebar() {
  const token = (await cookies()).get("access_token")?.value;
  let role: string | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
        user_role?: string;
      };
      role = decoded.user_role ?? null;
    } catch {
      role = null;
    }
  }

  if (role === "general") {
    return (
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>予約管理</h1>
        <nav className={styles.nav}>
          <Link href="/my/stores">店舗一覧</Link>
          <Link href="/my/reservation">予約</Link>
          <Link href="/my/record">履歴</Link>
          <Link href="/logout">ログアウト</Link>
        </nav>
      </aside>
    );
  } else if (role === "admin") {
    return (
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>予約管理</h1>
        <nav className={styles.nav}>
          <Link href="/admin/stores">店舗一覧</Link>
          <Link href="/admin/stores/new">店舗追加</Link>
          <Link href="/admin/reservation">予約履歴</Link>
          <Link href="/logout">ログアウト</Link>
        </nav>
      </aside>
    );
  } else {
    console.log("トークンから権限を取得できませんでした");
    redirect("/");
  }
}
