"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutClient() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        console.log("logout success");
        router.push("/"); // トップに戻す
      } else {
        console.log("logout failure");
        router.replace("/my/stores");
      }
    };

    logout();
  }, [router]);

  return <p>ログアウト中...</p>;
}
