import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.ts";
import { schema } from "../db/schema/index.ts";

const FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL!;

if (!FRONTEND_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not set");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [bearer()],
  trustedOrigins: [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
        returned: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
