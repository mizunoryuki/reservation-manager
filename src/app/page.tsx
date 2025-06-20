import Image from "next/image";
import styles from "./page.module.css";
import { Sidebar } from "@/components/sidebar/page";
import { Contents } from "@/components/contents/page";
import { Login } from "@/components/login/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <Contents />
      <Login />
    </div>
  );
}
