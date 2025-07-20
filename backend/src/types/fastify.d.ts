import "fastify";
import { User } from "better-auth";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}
