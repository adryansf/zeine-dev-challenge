import z from "zod";

// DB
import { db } from "../../db/index.ts";
import { schema } from "../../db/schema/index.ts";

// Hooks
import { verifyAuth } from "../../hooks/verify-auth.ts";

// Helpers
import { removeObject, uploadObject } from "../../helpers/minio.ts";

// Types
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";

const users: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  // Upload Profile Photo
  fastify.patch(
    "/photo/upload",
    {
      validatorCompiler: ({ schema }) => {
        return () => true;
      },
      schema: {
        tags: ["users"],
        consumes: ["multipart/form-data"],
        body: z.object({
          file: z.file().describe("binary"),
        }),
        response: {
          204: z.null().describe("No Content"),
        },
      },
      preHandler: [verifyAuth],
    },
    async function (request, reply) {
      const user = request.user!;

      try {
        const file = await request.file();

        if (!file || !file?.filename || !file?.mimetype) {
          return reply.badRequest("É necessário um arquivo de foto");
        }

        if (!file?.mimetype.startsWith("image/")) {
          return reply.badRequest("Somente são aceitos arquivos de imagem");
        }

        const { url } = await uploadObject({
          object: await file.toBuffer(),
          originalName: file.filename,
        });

        await db
          .update(schema.user)
          .set({
            image: url,
          })
          .where(eq(schema.user.id, user.id));

        // Deletar imagem antiga
        if (user?.image) {
          const parts = user.image?.split("/");
          await removeObject({
            name: parts[parts.length - 1],
          });
        }

        return reply.status(204).send();
      } catch (err) {
        console.error(err);
        return reply.internalServerError();
      }
    }
  );
};

export default users;
