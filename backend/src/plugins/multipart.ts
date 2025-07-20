import fp from "fastify-plugin";
import multipart from "@fastify/multipart";

// Types
import type { FastifySensibleOptions } from "@fastify/sensible";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifySensibleOptions>(async (fastify) => {
  fastify.register(multipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, //
      files: 1,
    },
  });
});
