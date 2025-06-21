import Link from "next/link"
import styles from "./page.module.css"

export const Sidebar = () => {
	return (
<aside className={styles.sidebar}>
      <h1 className={styles.logo}>予約管理</h1>
      <nav className={styles.nav}>
        <Link href="/my/stores">店舗一覧</Link>
        <Link href="/my/reservation">予約</Link>
		<Link href="/my/record">履歴</Link>
        <Link href="/">ログアウト</Link>
      </nav>
    </aside>
	)
}