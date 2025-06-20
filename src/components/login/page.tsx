"use client"
import { useState } from "react"
import styles from "./page.module.css"
export const Login = () => {
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")

	const handleRegister = () => {
		console.log("新規登録")
		//新規登録画面に遷移
	}

	const handleLogin = () => {
		console.log("ログイン")
		//認証
	}

	return(
<div className={styles.loginForm}>
  <h2>ログイン</h2>

  <div className={styles.formFields}>
    <div className={styles.formField}>
      <label htmlFor="email">E-mail</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="password">パスワード</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
  </div>

  <div className={styles.formActions}>
    <button onClick={handleLogin}>ログイン</button>
    <button onClick={handleRegister}>新規登録</button>
  </div>
</div>

	)
}