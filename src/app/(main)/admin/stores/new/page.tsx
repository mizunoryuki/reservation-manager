import AdminRegistration from "@/components/admin/AdminResitration/page";
import { getAccessTokenFromCookie } from "@/lib/getCookie";
import { redirect } from "next/navigation";

export default async function NewStore() {
  const token = await getAccessTokenFromCookie();
  if (!token) {
    redirect("/");
  }

  console.log(token);

  return <AdminRegistration token={token}/>;
}
