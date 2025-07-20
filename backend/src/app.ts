import { join, dirname } from "node:path";
import AutoLoad from "@fastify/autoload";
import type { AutoloadPluginOptions } from "@fastify/autoload";
import type { FastifyServerOptions } from "fastify";
import type {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
const options: AppOptions = {};

const app: FastifyPluginAsyncZod<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify = fastify.withTypeProvider<ZodTypeProvider>();

  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // eslint-disable-next-line no-void
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...opts, prefix: "/api" },
  });
};

export default app;
export { app, options };
