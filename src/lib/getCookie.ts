import { cookies } from "next/headers";

export async function getAccessTokenFromCookie(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value ?? null;
  return token;
}
