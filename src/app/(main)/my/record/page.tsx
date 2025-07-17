"use client";
import styles from "./page.module.css";
const ReserveInfo = [
  {
    reservedAt: "2025-07-17 09:00:00",
    visitDate: "2025-07-17 09:00:00",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
  {
    reservedAt: "2025-06-01",
    visitDate: "2025-06-10",
    storeName: "花屋",
  },
];

export default function Record() {
  return (
    <div className={styles.recordBBox}>
      <h2>
        今までの予約件数:<span>{ReserveInfo.length}</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>利用日</span>
          <span>予約日</span>
          <span>店舗名</span>
          <span>キャンセル</span>
        </div>
        <div className={styles.rowList}>
          {ReserveInfo.map((value, index) => {
            return (
              <div key={index} className={styles.row}>
                <span>{value.visitDate}</span>
                <span>{value.reservedAt}</span>
                <span>{value.storeName}</span>
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
