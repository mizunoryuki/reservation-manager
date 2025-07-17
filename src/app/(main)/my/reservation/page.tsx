import ReservationForm from "@/components/ReservationForm/page";
import { convertToHHMM } from "@/lib/convertToHHMM";
import { getAccessTokenFromCookie } from "@/lib/getCookie";
import { StoreData } from "@/type/store";
import { redirect } from "next/navigation";
import { Shop } from "@/type/reservation";

export default async function ReservationPage() {
  //トークンの取得
  const token = await getAccessTokenFromCookie();
  if (!token) {
    redirect("/");
  }

  const res = await fetch("http://localhost:4000/stores", {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return <p>店舗データの取得に失敗しました。</p>;
  }

  const storeList: StoreData[] = await res.json();

  //StoreData[]からShop[]に変換
  const stores: Shop[] = storeList.map((store) => {
    return {
      storeId: store.ID,
      name: store.Name,
      businessHoursStart: convertToHHMM(store.BusinessStartTime),
      businessHoursFinish: convertToHHMM(store.BusinessEndTime),
    };
  });

  return (
    <div>
      {stores.length === 0 ? (
        <p>現在、予約できる店舗がございません。</p>
      ) : (
        <ReservationForm shops={stores} token={token}/>
      )}
    </div>
  );
}
