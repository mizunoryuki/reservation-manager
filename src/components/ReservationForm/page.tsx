"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Shop } from "@/type/reservation";

type Props = {
  shops: Shop[];
  token: string;
};

export default function ReservationForm({ shops, token }: Props) {
  const today = new Date();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const initialDate = formatDate(today);

  const maxDate = (() => {
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    return formatDate(nextMonth);
  })();

  const [selectedElemId, setSelectedElemId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const store = shops[selectedElemId];
  const shopStartHour = parseInt(store.businessHoursStart.split(":")[0], 10);
  const shopEndHour = parseInt(store.businessHoursFinish.split(":")[0], 10);

  const allSlots: string[] = [];
  for (let hour = 8; hour < 22; hour++) {
    if (hour >= shopStartHour && hour < shopEndHour) {
      const from = `${hour.toString().padStart(2, "0")}:00`;
      const to = `${(hour + 1).toString().padStart(2, "0")}:00`;
      allSlots.push(`${from} ~ ${to}`);
    }
  }

  const columnCount = 3;
  const columns: string[][] = Array.from(
    { length: columnCount },
    (_, colIndex) => allSlots.filter((_, i) => i % columnCount === colIndex)
  );

  const handleReservation = async (slot: string) => {
    console.log(slot.split("~")[0].trimEnd());
    const res = await fetch("http://localhost:4000/user/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        store_id: shops[selectedElemId].storeId,
        visit_date: selectedDate,
        visit_time: slot.split("~")[0].trimEnd(),
      }),
    });

    if (res.ok) {
      alert("予約が完了しました");
    } else {
      const error = await res.text();
      console.error("登録失敗:", error);
      alert("予約が失敗しました😭");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <label>店舗</label>
          <select onChange={(e) => setSelectedElemId(Number(e.target.value))}>
            {shops.map((shop, index) => (
              <option key={index} value={index}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>予約日</label>
          <input
            type="date"
            value={selectedDate}
            min={initialDate}
            max={maxDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {columns.map((column, colIdx) => (
          <div key={colIdx} className={styles.column}>
            {column.map((slot, rowIdx) => (
              <div key={rowIdx} className={styles.slot}>
                <p>{slot}</p>
                <button onClick={() => handleReservation(slot)}>
                  予約する
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
