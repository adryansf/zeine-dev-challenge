import fp from "fastify-plugin";
import { fastifySwagger } from "@fastify/swagger";
import type { FastifySwaggerOptions } from "@fastify/swagger";

export default fp<FastifySwaggerOptions>(
  async (fastify) => {
    fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "PlantaCerta API",
          version: "1.0.0",
        },
        servers: [{ url: "http://localhost:3000" }],
        components: {
          securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer" },
          },
        },
      },
    });
  },
  {
    name: "swagger",
  }
);
