"use client";
import { StoreInfo } from "@/type/store";
import styles from "./page.module.css";
import { useState } from "react";

type StoreCardsProps = {
  StoreInfo: StoreInfo[];
  role?: string;
  token: string;
};

export default function StoreCards({
  StoreInfo: initialStores,
  role = "general",
  token,
}: StoreCardsProps) {
  const [stores, setStores] = useState(initialStores);
  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:4000/admin/stores/${id}`, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("削除失敗");
      return;
    }
    setStores((prev) => prev.filter((r) => r.id !== id));
  };

  if (stores.length === 0) {
    return <div>表示できる店舗がありません</div>;
  }

  if (role === "admin") {
    return (
      <div>
        <div className={styles.cards}>
          {stores.map((store, index) => {
            return (
              <div key={index} className={styles.card}>
                <p className={styles.address}>{store.address}</p>
                <p className={styles.business_hours}>{store.businessHours}</p>
                <p className={styles.name}>{store.name}</p>
                <p className={styles.details}>{store.details}</p>
                <button
                  onClick={() => handleDelete(store.id)}
                  className={styles.button}
                >
                  削除
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.cards}>
          {stores.map((store, index) => {
            return (
              <div key={index} className={styles.card}>
                <p className={styles.address}>{store.address}</p>
                <p className={styles.business_hours}>{store.businessHours}</p>
                <p className={styles.name}>{store.name}</p>
                <p className={styles.details}>{store.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
