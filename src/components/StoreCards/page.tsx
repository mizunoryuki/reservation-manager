"use client";
import { StoreInfo } from "@/type/store";
import styles from "./page.module.css";

type StoreCardsProps = {
  StoreInfo: StoreInfo[];
  role?: string;
};

export default function StoreCards({
  StoreInfo,
  role = "general",
}: StoreCardsProps) {
  if (role === "admin") {
    return (
      <div>
        <div className={styles.cards}>
          {StoreInfo.map((value, index) => {
            return (
              <div key={index} className={styles.card}>
                <p className={styles.address}>{value.address}</p>
                <p className={styles.business_hours}>{value.businessHours}</p>
                <p className={styles.name}>{value.name}</p>
                <p className={styles.details}>{value.details}</p>
                <button
                  onClick={() => console.log("削除")}
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
          {StoreInfo.map((value, index) => {
            return (
              <div key={index} className={styles.card}>
                <p className={styles.address}>{value.address}</p>
                <p className={styles.business_hours}>{value.businessHours}</p>
                <p className={styles.name}>{value.name}</p>
                <p className={styles.details}>{value.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
