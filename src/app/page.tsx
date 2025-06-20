import styles from "./page.module.css";
import { Login } from "@/components/login/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Login />
    </div>
  );
}
