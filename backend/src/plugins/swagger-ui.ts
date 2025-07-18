import fp from "fastify-plugin";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

export default fp<FastifySwaggerUiOptions>(
  async (fastify) => {
    fastify.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });
  },
  {
    dependencies: ["swagger"],
  }
);
