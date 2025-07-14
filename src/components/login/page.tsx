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
    //認証
    const res: Response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, Password: password }),
    });
    if (res.ok) {
      console.log("success");
      const loginRes = await res.json();
      const setCookieRes = await fetch("/api/cookies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: loginRes.access_token }),
      });

      if (setCookieRes.ok) {
        const data = await setCookieRes.json();
        console.log(data);
        
      } else {
        console.log("set cookie failed");
      }
    } else {
      console.log("something wrong.");
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
