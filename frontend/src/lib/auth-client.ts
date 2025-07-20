import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

const BETTER_AUTH_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL!;

if (!BETTER_AUTH_URL) {
  throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL is not set");
}

export const authClient = createAuthClient({
  baseURL: BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        phone: {
          type: "string",
          required: true,
          returned: true,
        },
      },
    }),
  ],
});
