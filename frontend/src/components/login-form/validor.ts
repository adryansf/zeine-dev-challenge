import z from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
