import z from "zod";

import {
  pgTable,
  serial,
  varchar,
  numeric,
  text,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

// User
import { user } from "./auth-schema.ts";

// Definindo enums
export const productCategoryEnum = pgEnum("product_category", [
  "toy", // brinquedo
  "furniture", // móvel
  "stationery", // papelaria
  "health_beauty", // saúde & beleza
  "utensil", // utensílio
  "clothing", // vestuário
]);

export const productStatusEnum = pgEnum("product_status", [
  "listed", // anunciado
  "sold", // vendido
  "canceled", // cancelado
]);

// Definindo a tabela
export const product = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  image: text("image"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  category: productCategoryEnum("category").notNull(),
  status: productStatusEnum("status").default("listed").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  // Relacionamento
  idUser: text("id_user")
    .references(() => user.id)
    .notNull(),
});

// Zod
export const productSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(255),
  image: z.url().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string(),
  category: z.enum(productCategoryEnum.enumValues),
  status: z.enum(productStatusEnum.enumValues).default("listed"),
  createdAt: z.date(),
  updatedAt: z.date(),
  idUser: z.string(),
});

export type ProductSchema = z.infer<typeof productSchema>;
