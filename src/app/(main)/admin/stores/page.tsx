import AdminStores from "@/components/admin/AdminStores/page";
import { getAccessTokenFromCookie } from "@/lib/getCookie";
import { redirect } from "next/navigation";

export default async function Stores() {
  const token = await getAccessTokenFromCookie();
  if (!token) {
    redirect("/");
  }

  return <AdminStores token={token}/>;
}
