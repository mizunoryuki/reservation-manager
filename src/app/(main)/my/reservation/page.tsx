'use client'
import { useState } from 'react'
import styles from './page.module.css'

const Shops = [
  {
    name: "花屋",
    business_hours_start: "10:00",
    business_hours_finish: "19:00",
  },
  {
    name: "ケーキ屋",
    business_hours_start: "8:00",
    business_hours_finish: "19:00",
  },
  {
    name: "団子屋",
    business_hours_start: "12:00",
    business_hours_finish: "16:00",
  },
  {
    name: "クレープ屋",
    business_hours_start: "8:00",
    business_hours_finish: "24:00",
  },
];

export default function Reservation() {
  const today = new Date();
  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];
  const initialDate = formatDate(today);

  const maxDate = (() => {
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    return formatDate(nextMonth);
  })();

  const [selectedStoreId, setSelectedStoreId] = useState(Shops.length > 0 ? 0 : -1);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  return (
    <div className={styles.container}>
      {Shops.length === 0 ? (
        <p>現在、予約できる店舗がございません。</p>
      ) : (
        <>
          <div className={styles.header}>
            <div>
              <p>店舗</p>
              <select onChange={(e) => setSelectedStoreId(Number(e.target.value))}>
                {Shops.map((value, index) => (
                  <option key={index} value={index}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>予約日</p>
              <input
                type="date"
                value={selectedDate}
                min={initialDate}
                max={maxDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.contents}>
            {selectedStoreId >= 0 && (() => {
              const store = Shops[selectedStoreId];
              const shopStartHour = parseInt(store.business_hours_start.split(":")[0], 10);
              const shopEndHour = parseInt(store.business_hours_finish.split(":")[0], 10);

              const allSlots: string[] = [];
              for (let hour = 8; hour < 22; hour++) {
                if (hour >= shopStartHour && hour < shopEndHour) {
                  const from = `${hour.toString().padStart(2, '0')}:00`;
                  const to = `${(hour + 1).toString().padStart(2, '0')}:00`;
                  allSlots.push(`${from} ~ ${to}`);
                }
              }

              const columnCount = 3;
              const columns: string[][] = Array.from({ length: columnCount }, (_, colIndex) =>
                allSlots.filter((_, i) => i % columnCount === colIndex)
              );

              return (
                <div className={styles.grid}>
                  {columns.map((column, colIdx) => (
                    <div key={colIdx} className={styles.column}>
                      {column.map((slot, rowIdx) => (
                        <div key={rowIdx} className={styles.slot}>
                          <p>{slot}</p>
                          <button onClick={() => console.log("予約:", slot)}>予約する</button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}
