"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const START_HOUR = 8;
const FINISH_HOUR = 22;

// バリデーションスキーマ
const storeSchema = z
  .object({
    name: z.string().min(1, "店舗名は必須です"),
    address: z.string().min(1, "住所は必須です"),
    details: z.string().min(1, "内容は必須です"),
    startTime: z.string(),
    endTime: z.string(),
  })
  .refine(
    (data) => {
      const [startHour] = data.startTime.split(":").map(Number);
      const [endHour] = data.endTime.split(":").map(Number);
      return endHour > startHour;
    },
    {
      message: "閉店時間は開店時間より後にしてください",
      path: ["endTime"],
    }
  );

type StoreFormInputs = z.infer<typeof storeSchema>;

type Props = {
  token: string;
};

export default function AdminRegistration({ token }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormInputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      details: "",
      startTime: `${START_HOUR.toString().padStart(2, "0")}:00`,
      endTime: `${(START_HOUR + 1).toString().padStart(2, "0")}:00`,
    },
  });

  const onSubmit = async (data: StoreFormInputs) => {
    const res = await fetch("http://localhost:4000/admin/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        address: data.address,
        details: data.details,
        business_start_time: data.startTime,
        business_end_time: data.endTime,
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
      <form className={styles.registerBox} onSubmit={handleSubmit(onSubmit)}>
        <h2>店舗の新規登録</h2>
        <div className={styles.inputBox}>
          <div className={styles.formBox}>
            <label>店舗名</label>
            <input type="text" placeholder="〇〇商店" {...register("name")} />
          </div>
          <div>
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.formBox}>
            <label>住所</label>
            <input
              type="text"
              placeholder="東京都渋谷区〇〇"
              {...register("address")}
            />
          </div>
          <div>
            {errors.address && (
              <p className={styles.error}>{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.formBox}>
            <label>内容</label>
            <textarea
              placeholder="特別な人に送るための花束を作らせていただきます。"
              rows={4}
              cols={40}
              {...register("details")}
            />
          </div>
          <div>
            {errors.details && (
              <p className={styles.error}>{errors.details.message}</p>
            )}
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.businessHours}>
            <p>営業時間</p>
            <div className={styles.timeContainer}>
              <div className={styles.timeBox}>
                <label>開店時間</label>
                <select {...register("startTime")}>
                  {Array.from({ length: FINISH_HOUR - START_HOUR }, (_, i) => {
                    const hour = (START_HOUR + i).toString().padStart(2, "0");
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
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
                <select {...register("endTime")}>
                  {Array.from({ length: FINISH_HOUR - START_HOUR }, (_, i) => {
                    const hour = (START_HOUR + i + 1)
                      .toString()
                      .padStart(2, "0");
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div>
            {errors.endTime && (
              <p className={styles.error}>{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div className={styles.buttonBox}>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  );
}
