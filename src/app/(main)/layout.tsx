import styles from "./layout.module.css"
import  {Sidebar}  from "@/components/sidebar/page"
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.contents}>{children}</main>
        </div>
  );
}