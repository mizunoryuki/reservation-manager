"use client";
import styles from "./page.module.css";
import { Shop } from "@/type/reservation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  shops: Shop[];
  token: string;
};

// Zod スキーマ定義
const reservationSchema = z.object({
  storeId: z.string().min(1, "店舗を選択してください"),
  visitDate: z.string().min(1, "予約日を選択してください"),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

export default function ReservationForm({ shops, token }: Props) {
  const today = new Date();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const initialDate = formatDate(today);

  const maxDate = (() => {
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    return formatDate(nextMonth);
  })();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      storeId: shops[0]?.storeId.toString() || "",
      visitDate: initialDate,
    },
  });

  const selectedStoreId = watch("storeId");
  const selectedDate = watch("visitDate");
  const selectedElemId = shops.findIndex(
    (shop) => shop.storeId.toString() === selectedStoreId
  );
  const store = shops[selectedElemId];

  const shopStartHour = parseInt(
    store?.businessHoursStart.split(":")[0] || "8",
    10
  );
  const shopEndHour = parseInt(
    store?.businessHoursFinish.split(":")[0] || "22",
    10
  );

  const now = new Date();

  const allSlots: string[] = [];
  for (let hour = 8; hour < 22; hour++) {
    if (hour >= shopStartHour && hour < shopEndHour) {
      const from = `${hour.toString().padStart(2, "0")}:00`;
      const to = `${(hour + 1).toString().padStart(2, "0")}:00`;

      const slotDateTime = new Date(`${selectedDate}T${from}`);
      if (
        selectedDate > formatDate(now) ||
        (selectedDate === formatDate(now) && slotDateTime > now)
      ) {
        allSlots.push(`${from} ~ ${to}`);
      }
    }
  }

  const columnCount = 3;
  const columns: string[][] = Array.from(
    { length: columnCount },
    (_, colIndex) => allSlots.filter((_, i) => i % columnCount === colIndex)
  );

  const onSubmit = () => {};

  const handleReservation = async (slot: string) => {
    if (!selectedStoreId || !selectedDate) {
      alert("店舗と予約日を選択してください");
      return;
    }

    const res = await fetch("http://localhost:4000/user/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        store_id: Number(selectedStoreId),
        visit_date: selectedDate,
        visit_time: slot.split("~")[0].trim(),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <div>
          <label>店舗</label>
          <select {...register("storeId")}>
            {shops.map((shop) => (
              <option key={shop.storeId} value={shop.storeId}>
                {shop.name}
              </option>
            ))}
          </select>
          {errors.storeId && (
            <p className={styles.error}>{errors.storeId.message}</p>
          )}
        </div>

        <div>
          <label>予約日</label>
          <input
            type="date"
            {...register("visitDate")}
            min={initialDate}
            max={maxDate}
          />
          {errors.visitDate && (
            <p className={styles.error}>{errors.visitDate.message}</p>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {columns.map((column, colIdx) => (
          <div key={colIdx} className={styles.column}>
            {column.map((slot, rowIdx) => (
              <div key={rowIdx} className={styles.slot}>
                <p>{slot}</p>
                <button type="button" onClick={() => handleReservation(slot)}>
                  予約する
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </form>
  );
}
