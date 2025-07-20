import fp from "fastify-plugin";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

// Types
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

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
