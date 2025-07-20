import z from "zod";

export const filterProductFormSchema = z.object({
  search: z
    .string()
    .min(3, { message: "A pesquisa deve ter ao menos 3 caracteres" })
    .optional(),
  status: z
    .enum(["listed", "sold", "canceled", ""])
    .optional()
    .nullable()
    .nullish(),
  category: z
    .enum([
      "toy",
      "furniture",
      "stationery",
      "health_beauty",
      "utensil",
      "clothing",
      "",
    ])
    .optional()
    .nullable()
    .nullish(),
});

export type FilterProductFormSchema = z.infer<typeof filterProductFormSchema>;
