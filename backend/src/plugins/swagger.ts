import fp from "fastify-plugin";
import { fastifySwagger } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

// Types
import type { FastifySwaggerOptions } from "@fastify/swagger";

export default fp<FastifySwaggerOptions>(
  async (fastify) => {
    fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Gestao de Marketplace API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
      transform: jsonSchemaTransform,
    });
  },
  {
    name: "swagger",
    dependencies: ["zod-type-provider"],
  }
);
