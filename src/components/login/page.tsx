"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const res: Response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Email: data.email,
        Password: data.password,
      }),
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

  const handleRegister = () => {
    router.push("/signUp");
  };

  return (
    <div className={styles.loginForm}>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
        <div className={styles.formField}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="6文字以上"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.formActions}>
          <button type="submit">ログイン</button>
          <button type="button" onClick={handleRegister}>
            新規登録
          </button>
        </div>
      </form>
    </div>
  );
};
