import AdminReservation from "@/components/admin/AdminReservation/page";
import { getAccessTokenFromCookie } from "@/lib/getCookie";
import { AdminReservedData } from "@/type/record";
import { redirect } from "next/navigation";

export default async function Reservation() {
  const token = await getAccessTokenFromCookie();
  if (!token) {
    redirect("/");
  }

  const res = await fetch("http://localhost:4000/admin/reservations", {
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
  const reservationArray: AdminReservedData[] = await res.json();

  return <AdminReservation reservations={reservationArray} token={token}/>;
}
