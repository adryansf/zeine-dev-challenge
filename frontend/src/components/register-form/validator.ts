import z from "zod";

const fileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.url(),
  id: z.string(),
});

export const registerFormSchema = z
  .object({
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
    confirmPassword: z.string({ error: "Confirmação de senha é obrigatória" }),
    profile: z.union([
      z.file({ error: "A foto de perfil é obrigatória" }),
      fileMetadataSchema,
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
