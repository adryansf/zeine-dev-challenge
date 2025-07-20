import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

// Types
import type { FastifyCorsOptions } from "@fastify/cors";

const FRONTEND_URL = process.env.NEXT_PUBLIC_BASE_URL!;

if (!FRONTEND_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not set");
}

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    maxAge: 86400,
  });
});
