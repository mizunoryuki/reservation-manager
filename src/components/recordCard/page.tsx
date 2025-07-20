"use client";
import { ReservedInfo } from "@/type/record";
import styles from "./page.module.css";

type Props = {
  reservations: ReservedInfo[];
  token: string;
};

export default function RecordCard({ reservations, token }: Props) {
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
          {reservations.map((reservation, index) => {
            return (
              <div key={index} className={styles.row}>
                <span>{reservation.visitDate}</span>
                <span>{reservation.reservedAt}</span>
                <span>{reservation.storeName}</span>
                <button onClick={() => console.log("キャンセル")}>
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
