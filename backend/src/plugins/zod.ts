import fp from "fastify-plugin";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import type { ZodSerializerCompilerOptions } from "fastify-type-provider-zod";

export default fp<ZodSerializerCompilerOptions>(async (fastify) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
});
