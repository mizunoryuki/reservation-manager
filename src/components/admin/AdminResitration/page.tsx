"use client";
import { useState } from "react";
import styles from "./page.module.css";

const START_HOUR = 8;
const FINISH_HOUR = 22;

export default function AdminRegistration() {
  const [details, setDetails] = useState("");
  const [selectedtime, setSelectedTime] = useState(`0${START_HOUR + 1}`);

  return (
    <div className={styles.container}>
      <form className={styles.registerBox}>
        <h2>店舗の新規登録</h2>
        <div className={styles.formBox}>
          <label>店舗名</label>
          <input type="text" placeholder="〇〇商店" />
        </div>
        <div className={styles.formBox}>
          <label>住所</label>
          <input type="text" placeholder="東京都渋谷区〇〇" />
        </div>
        <div className={styles.formBox}>
          <label>内容</label>
          <textarea
            placeholder="特別な人に送るための花束を作らせていただきます。"
            rows={4}
            cols={40}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className={styles.businessHours}>
          <p>営業時間</p>
          <div className={styles.timeContainer}>
            <div className={styles.timeBox}>
              <label>開店時間</label>
              <select onChange={(e) => setSelectedTime(e.target.value)}>
                {Array.from(
                  { length: FINISH_HOUR - START_HOUR },
                  (_, index) => {
                    const time = START_HOUR + index;
                    const paddedTime = time.toString().padStart(2, "0");
                    const paddedTimeNext = (time + 1)
                      .toString()
                      .padStart(2, "0");

                    return (
                      <option key={index} value={paddedTimeNext}>
                        {paddedTime}:00
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div className={styles.kara}>
              <p>から</p>
            </div>
            <div className={styles.timeBox}>
              <label>開店時間</label>
              <p>{selectedtime}:00</p>
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <button type="submit" onClick={() => console.log("登録")}>
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
