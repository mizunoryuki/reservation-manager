"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //新規登録画面に遷移
  const handleRegister = () => {
    router.push("/signUp");
  };

  const handleLogin = async () => {
    const res: Response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (res.ok) {
      const role_res = await fetch("/api/role");
      if (!role_res.ok) {
        console.log("get role failure");
        return;
      }

      const { role } = await role_res.json();

      if (role === "general") {
        router.push("/my/stores");
      } else if (role === "admin") {
        router.push("/admin/stores");
      } else {
        console.log("invalid role");
      }
    } else {
      console.log("login failed");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>ログイン</h2>
      <div className={styles.formFields}>
        <div className={styles.formField}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6文字以上"
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button onClick={handleLogin}>ログイン</button>
        <button onClick={handleRegister}>新規登録</button>
      </div>
    </div>
  );
};
