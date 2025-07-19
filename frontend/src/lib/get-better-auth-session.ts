import { headers } from "next/headers";
import { authClient } from "./auth-client";

export async function getBetterAuthSession() {
  return authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
}
