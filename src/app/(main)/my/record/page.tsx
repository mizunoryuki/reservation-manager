import RecordCard from "@/components/recordCard/page";
import { getAccessTokenFromCookie } from "@/lib/getCookie";
import { ReservedData, ReservedInfo } from "@/type/record";
import { redirect } from "next/navigation";

export default async function Record() {
  const token = await getAccessTokenFromCookie();
  if (!token) {
    redirect("/");
  }

  const res = await fetch("http://localhost:4000/user/reservations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div>
        <p>店舗の情報取得に失敗しました</p>
      </div>
    );
  }
  const reservationArray: ReservedData[] = await res.json();
  //   const reservations: ReservedInfo[] = await res.json();
  if (!Array.isArray(reservationArray)) {
    return <p>予約情報がありません</p>;
  }

  const reservations: ReservedInfo[] = reservationArray.map((reservation) => {
    return {
      reservedId: reservation.ID,
      reservedAt: reservation.ReservedAt,
      visitDate: reservation.VisitDate,
      storeId: reservation.StoreID,
      storeName: reservation.StoreName,
    };
  });

  return (
    <div>
      <RecordCard reservations={reservations} token={token} />
    </div>
  );
}
