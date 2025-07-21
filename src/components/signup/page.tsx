"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

type SignUpInputs = z.infer<typeof signUpSchema>;

export const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInputs) => {
    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Name: data.name,
        Email: data.email,
        Password: data.password,
      }),
    });

    if (!res.ok) {
      console.log("failed to signup");
      return;
    }

    const { message } = await res.json();
    console.log(message);
    router.push("/");
  };

  return (
    <div className={styles.loginForm}>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
        <div className={styles.formField}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="山田太郎"
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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
          <button type="submit" disabled={isSubmitting}>
            新規登録
          </button>
        </div>
      </form>
    </div>
  );
};
