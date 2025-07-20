import z from "zod";
import { eq, and } from "drizzle-orm";

// DB
import { db } from "../../db/index.ts";
import { schema } from "../../db/schema/index.ts";
import {
  productStatusEnum,
  productCategoryEnum,
  productSchema,
} from "../../db/schema/product.ts";

// Hooks
import { verifyAuth } from "../../hooks/verify-auth.ts";

// Helpers
import { removeObject, uploadObject } from "../../helpers/minio.ts";

// Zod
import { httpResponses } from "../../zod-schemas/http-response.ts";

// Types
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { SQLWrapper } from "drizzle-orm";
import type { ProductSchema } from "../../db/schema/product.ts";

const paramsSchema = z.object({
  idProduct: z.coerce.number().int().positive(),
});

const PRODUCTS_PER_PAGE = 6;

const productCreateBodySchema = z.object({
  title: z.string().max(255),
  price: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/),
  description: z.string(),
  category: z.enum(productCategoryEnum.enumValues),
});

const products: FastifyPluginAsyncZod = async (
  fastify,
  opts
): Promise<void> => {
  // Upload Product Photo
  fastify.patch(
    "/:idProduct/photo/upload",
    {
      // Desabilitar validação do body e validar só o params
      validatorCompiler: ({ schema, httpPart }) => {
        if (httpPart === "params") {
          const parse = (
            schema as unknown as typeof paramsSchema
          ).safeParse.bind(schema);
          return (value) => {
            const result = parse(value);
            if (result.success) return { value: result.data };
            return { error: result.error };
          };
        }

        return () => true;
      },
      schema: {
        tags: ["products"],
        consumes: ["multipart/form-data"],
        body: z.object({
          file: z.file().describe("binary"),
        }),
        response: {
          204: httpResponses[204],
          404: httpResponses[404],
          500: httpResponses[500],
        },
        params: paramsSchema,
      },
      preHandler: [verifyAuth],
    },
    async function (request, reply) {
      const idProduct = request.params.idProduct;
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

        const product = await db.query.product.findFirst({
          where: (product, { eq, and }) =>
            and(eq(product.idUser, user.id), eq(product.id, idProduct)),
        });

        if (!product) {
          return reply.notFound("Produto não encontrado.");
        }

        await db
          .update(schema.product)
          .set({
            image: url,
          })
          .where(and(eq(schema.product.id, product.id)));

        // Deletar imagem antiga
        if (product?.image) {
          const parts = product.image?.split("/");
          await removeObject({
            name: parts[parts.length - 1],
          });
        }

        return reply.status(204).send();
      } catch (err) {
        return reply.internalServerError();
      }
    }
  );

  // Get Products
  fastify.get(
    "/",
    {
      schema: {
        tags: ["products"],
        querystring: z.object({
          page: z.coerce.number().default(1),
          search: z.string().optional(),
          status: z.enum(productStatusEnum.enumValues).optional(),
          category: z.enum(productCategoryEnum.enumValues).optional(),
        }),
        response: {
          200: z.object({
            products: z.array(productSchema),
            page: z.number().min(1),
            totalPages: z.number().min(1),
          }),
          500: httpResponses[500],
        },
      },
      preHandler: [verifyAuth],
    },
    async function (request, reply) {
      try {
        const { search, status, category } = request.query;
        let { page = 1 } = request.query;

        const user = request.user!;

        // Count and calc Total Pages
        const totalProducts = await db.$count(
          schema.product,
          eq(schema.product.idUser, user.id)
        );

        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE) || 1;

        if (totalPages === 1) page = 1;

        // Get Products
        const products = await db.query.product.findMany({
          where: (product, { eq, ilike, and }) => {
            const where: SQLWrapper[] = [eq(product.idUser, user.id)];

            if (search) where.push(ilike(product.title, `%${search}%`));

            if (status) where.push(eq(product.status, status));

            if (category) where.push(eq(product.category, category));

            return and(...where);
          },
          orderBy: (product, { desc }) => desc(product.updatedAt),
          limit: PRODUCTS_PER_PAGE,
          offset: PRODUCTS_PER_PAGE * (page - 1),
        });

        return reply.send({
          products: products as unknown as ProductSchema[],
          page,
          totalPages,
        });
      } catch (err) {
        return reply.internalServerError();
      }
    }
  );

  // Create Product
  fastify.post(
    "/",
    {
      schema: {
        tags: ["products"],
        body: productCreateBodySchema,
        response: {
          201: productSchema,
          500: httpResponses[500],
        },
      },
      preHandler: [verifyAuth],
    },
    async function (request, reply) {
      const user = request.user!;
      const data = request.body;

      try {
        const [newProduct] = await db
          .insert(schema.product)
          .values({
            title: data.title,
            price: data.price,
            category: data.category,
            description: data.description,
            idUser: user.id,
          })
          .returning();

        return reply.code(201).send(newProduct);
      } catch (err) {
        return reply.internalServerError();
      }
    }
  );

  fastify.patch(
    "/:idProduct",
    {
      schema: {
        tags: ["products"],
        body: productCreateBodySchema.partial().and(
          z.object({
            status: z.enum(productStatusEnum.enumValues).optional(),
          })
        ),
        params: paramsSchema,
        response: {
          200: productSchema,
          404: httpResponses[404],
          500: httpResponses[500],
        },
      },
      preHandler: [verifyAuth],
    },
    async function (request, reply) {
      const idProduct = request.params.idProduct;
      const user = request.user!;
      const data = request.body;

      try {
        const product = await db.query.product.findFirst({
          where: (product, { eq, and }) =>
            and(eq(product.id, idProduct), eq(product.idUser, user.id)),
        });

        if (!product) return reply.notFound("Produto não encontrado.");

        const [updatedProduct] = await db
          .update(schema.product)
          .set({
            ...data,
          })
          .where(eq(schema.product.id, product.id))
          .returning();

        return reply.send(updatedProduct);
      } catch (err) {
        return reply.internalServerError();
      }
    }
  );
};

export default products;
