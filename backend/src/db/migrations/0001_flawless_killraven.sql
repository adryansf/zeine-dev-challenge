CREATE TYPE "public"."product_category" AS ENUM('toy', 'furniture', 'stationery', 'health_beauty', 'utensil', 'clothing');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('listed', 'sold', 'canceled');--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"image" text,
	"price" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"category" "product_category" NOT NULL,
	"status" "product_status" DEFAULT 'listed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id_user" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_id_user_user_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;