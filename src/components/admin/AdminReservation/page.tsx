"use client";
import { AdminReservedData } from "@/type/record";
import styles from "./page.module.css";
import { useState } from "react";

type Props = {
  reservations: AdminReservedData[];
  token: string;
};

export default function AdminReservation({
  reservations: initialReservations,
  token,
}: Props) {
  const [reservations, setReservations] = useState(initialReservations);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:4000/admin/reservations/${id}`, {
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
    setReservations((prev) => prev.filter((r) => r.ID !== id));
  };
  return (
    <div className={styles.recordBBox}>
      <h2>
        今までの予約件数:<span>{reservations.length}</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>利用日</span>
          <span>予約日</span>
          <span>利用者</span>
          <span>店舗名</span>
          <span>キャンセル</span>
        </div>
        <div className={styles.rowList}>
          {reservations.map((reservation, index) => {
            return (
              <div key={index} className={styles.row}>
                <span>{reservation.VisitDate}</span>
                <span>{reservation.ReservedAt}</span>
                <span>{reservation.UserName}</span>
                <span>{reservation.StoreName}</span>
                <button onClick={() => handleDelete(reservation.ID)}>
                  キャンセル
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
