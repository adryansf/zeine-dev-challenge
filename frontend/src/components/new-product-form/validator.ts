import z from "zod";

const fileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.url(),
  id: z.string(),
});

export const newProductFormSchema = z.object({
  title: z
    .string({ error: "O título é obrigatório" })
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .max(255, "O título deve ter no máximo 255 caracteres"),
  price: z
    .string({ error: "O preço é obrigatório" })
    .regex(
      /^R\$\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/,
      "O preço deve ser um número válido com até duas casas decimais"
    ),
  description: z.string({ error: "A descrição é obrigatória" }),
  category: z.enum(
    ["toy", "furniture", "stationery", "health_beauty", "utensil", "clothing"],
    {
      error: "Categoria inválida",
    }
  ),
  photo: z.union([
    z.file({ error: "A foto do produto é obrigatória" }),
    fileMetadataSchema,
  ]),
});

export type NewProductFormSchema = z.infer<typeof newProductFormSchema>;
