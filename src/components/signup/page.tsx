"use client"
import { useState } from "react"
import styles from "./page.module.css"
export const SignUp = () => {
	const [name,setName] = useState<string>("")
	const [email,setEmail] = useState<string>("")
	const [password,setPassword] = useState<string>("")

	const handleRegister = () => {
		console.log("新規登録")
		//登録処理
	}

	return(
<div className={styles.loginForm}>
  <h2>新規登録</h2>

  <div className={styles.formFields}>
	    <div className={styles.formField}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="山田太郎"/>
    </div>
    <div className={styles.formField}>
      <label htmlFor="email">E-mail</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com"/>
    </div>
    <div className={styles.formField}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6文字以上"/>
    </div>
  </div>

  <div className={styles.formActions}>
    <button onClick={handleRegister}>新規登録</button>
  </div>
</div>

	)
}