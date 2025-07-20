"use client";
import { useState } from "react";
import { ReservedInfo } from "@/type/record";
import styles from "./page.module.css";

type Props = {
  reservations: ReservedInfo[];
  token: string;
};

export default function RecordCard({
  reservations: initialReservations,
  token,
}: Props) {
  const [reservations, setReservations] = useState(initialReservations);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:4000/user/reservations/${id}`, {
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

    // 成功したら画面上のリストから削除
    setReservations((prev) => prev.filter((r) => r.reservedId !== id));
  };

  return (
    <div className={styles.recordBox}>
      <h2>
        今までの予約件数:<span>{reservations.length}</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>利用日</span>
          <span>予約日</span>
          <span>店舗名</span>
          <span>キャンセル</span>
        </div>
        <div className={styles.rowList}>
          {reservations.map((reservation) => (
            <div key={reservation.reservedId} className={styles.row}>
              <span>{reservation.visitDate}</span>
              <span>{reservation.reservedAt}</span>
              <span>{reservation.storeName}</span>
              <button onClick={() => handleDelete(reservation.reservedId)}>
                キャンセル
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
