import fp from "fastify-plugin";
import { fastifyCookie } from "@fastify/cookie";
// Types
import type { FastifyCookieOptions } from "@fastify/cookie";

export default fp<FastifyCookieOptions>(async (fastify) => {
  fastify.register(fastifyCookie);
});
