import z from "zod";

// Lib
import { auth as authBetter } from "../../lib/auth.ts";

// Types
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const auth: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  // Sign Up
  fastify.post(
    "/sign-up",
    {
      schema: {
        tags: ["auth"],
        body: z.object({
          name: z
            .string({ error: "Nome é obrigatório" })
            .min(3, { message: "Nome precisa ter ao menos 3 caracteres" }),
          phone: z
            .string({ error: "Telefone é obrigatório" })
            .min(8, { message: "Telefone muito curto" }),
          email: z.email({ error: "Formato de email inválido" }),
          password: z
            .string({ error: "Senha é obrigatória" })
            .min(8, { message: "Senha precisa ter pelo menos 8 caracteres" })
            .refine((p) => /[A-Z]/.test(p), {
              message: "Senha precisa ter ao menos uma letra maiúscula",
            })
            .refine((p) => /[0-9]/.test(p), {
              message: "Senha precisa ter ao menos um número",
            })
            .refine((p) => /[!@#$%^&*(),.?":{}|<>]/.test(p), {
              message: "Senha precisa conter ao menos um caractere especial",
            })
            .refine((p) => /[a-z]/.test(p), {
              message: "Senha precisa ter ao menos uma letra minúscula",
            }),
          callbackURL: z.url().optional(),
        }),
        response: {
          200: z.object({
            token: z.string(),
            user: z.object({
              id: z.string(),
              email: z.email(),
              name: z.string(),
              image: z.string().nullable(),
              emailVerified: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          400: z.object({
            statusCode: z.number(),
            code: z.string().optional(),
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    // @ts-ignore
    authBetter.api.signUpEmail
  );

  // Sign In
  fastify.post(
    "/sign-in",
    {
      schema: {
        tags: ["auth"],
        body: z.object({
          email: z.email({ error: "Formato de email inválido" }),
          password: z
            .string({ error: "Senha é obrigatória" })
            .min(8, { message: "Senha precisa ter pelo menos 8 caracteres" }),
          callbackURL: z.url().optional(),
          rememberMe: z.boolean().optional(),
        }),
        response: {
          200: z.object({
            redirect: z.boolean(),
            token: z.string(),
            user: z.object({
              id: z.string(),
              email: z.email(),
              name: z.string(),
              image: z.string().nullable(),
              emailVerified: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
          400: z.object({
            statusCode: z.number(),
            code: z.string().optional(),
            error: z.string(),
            message: z.string(),
          }),
        },
        security: [],
      },
    },
    // @ts-ignore (method = POST)
    authBetter.api.signInEmail
  );
};

export default auth;
