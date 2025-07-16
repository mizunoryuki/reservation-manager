"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    //登録処理
    const res: Response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ Name: name, Email: email, Password: password }),
    });

    if (!res.ok) {
      console.log("failed to signup");
    } else {
      const { message } = await res.json();
      console.log(message);
      router.push("/");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>新規登録</h2>

      <div className={styles.formFields}>
        <div className={styles.formField}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田太郎"
          />
        </div>
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
        <button onClick={handleRegister}>新規登録</button>
      </div>
    </div>
  );
};
