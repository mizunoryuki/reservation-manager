"use client";
import { useState } from "react";
import styles from "./page.module.css";

const START_HOUR = 8;
const FINISH_HOUR = 22;

type Props = {
  token: string;
};

export default function AdminRegistration({ token }: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [startTime, setStartTime] = useState(
    `${START_HOUR.toString().padStart(2, "0")}:00`
  );
  const [endTime, setEndTime] = useState(
    `${(START_HOUR + 1).toString().padStart(2, "0")}:00`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/admin/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        address: address,
        details: details,
        business_start_time: startTime,
        business_end_time: endTime,
      }),
    });

    if (res.ok) {
      alert("店舗登録成功！");
    } else {
      const error = await res.text();
      console.error("登録失敗:", error);
      alert("店舗登録失敗");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.registerBox} onSubmit={handleSubmit}>
        <h2>店舗の新規登録</h2>
        <div className={styles.formBox}>
          <label>店舗名</label>
          <input
            type="text"
            placeholder="〇〇商店"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formBox}>
          <label>住所</label>
          <input
            type="text"
            placeholder="東京都渋谷区〇〇"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
              <select
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              >
                {Array.from({ length: FINISH_HOUR - START_HOUR }, (_, i) => {
                  const time = START_HOUR + i;
                  const padded = time.toString().padStart(2, "0");
                  return (
                    <option key={padded} value={`${padded}:00`}>
                      {padded}:00
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.kara}>
              <p>から</p>
            </div>
            <div className={styles.timeBox}>
              <label>閉店時間</label>
              <select
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime}
              >
                {Array.from({ length: FINISH_HOUR - START_HOUR }, (_, i) => {
                  const time = START_HOUR + i + 1;
                  const padded = time.toString().padStart(2, "0");
                  return (
                    <option key={padded} value={`${padded}:00`}>
                      {padded}:00
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  );
}
