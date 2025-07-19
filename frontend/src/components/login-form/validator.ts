import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Formato de email inválido" }),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(8, { message: "Senha precisa ter pelo menos 8 caracteres" }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
