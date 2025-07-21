"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

// Orval
import {
  patchApiProductsIdProductPhotoUpload,
  usePostApiProducts,
} from "@/orval/products/products";

// Validator
import { newProductFormSchema, NewProductFormSchema } from "./validator";

// Constants
import { categoryOptions } from "@/constants/product-constants";

// Components
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { CustomFormInput } from "@/components/custom-form-input";
import { CustomFormTextArea } from "@/components/custom-form-textarea";
import { CustomButton } from "@/components/custom-button";
import { CustomSelect } from "@/components/custom-select";
import { UploadProductPhoto } from "@/components/upload-product-photo";
import { CustomFormMessage } from "@/components/custom-form-message";
import { CustomFormCurrencyInput } from "../custom-form-currency-input";

// Component
export function NewProductForm() {
  const queryClient = useQueryClient();
  const createProductMutation = usePostApiProducts();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<NewProductFormSchema>({
    resolver: zodResolver(newProductFormSchema),
  });
  const onSubmit = async ({
    photo,
    category,
    description,
    price,
    title,
  }: NewProductFormSchema) => {
    setLoading(true);
    const file = photo as File;

    const formattedPrice = price
      .replace("R$", "")
      .replace(".", "")
      .replace(",", ".")
      .trim();

    try {
      const newProduct = await createProductMutation.mutateAsync({
        data: {
          category,
          description,
          price: formattedPrice,
          title,
        },
      });

      await patchApiProductsIdProductPhotoUpload(newProduct.id, {
        file,
      });

      queryClient.invalidateQueries();
      toast.success("Produto criado com sucesso.");
      router.push("/produtos");
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível criar o produto");
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section
          className={`flex items-center gap-6 w-full flex-col lg:flex-row lg:items-start`}
        >
          <aside className="w-full max-w-xs lg:max-w-[415px]">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <UploadProductPhoto
                        onUpload={field.onChange}
                        {...field}
                      />
                      <CustomFormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </aside>
          <div className="flex flex-col gap-5 p-5 bg-white rounded-[20px] lg:gap-8 lg:p-8 w-full">
            <h3 className="title-sm text-gray-300">Dados do produto</h3>

            {/* Form area */}
            <div className="flex flex-col gap-5 w-full">
              {/* Row */}
              <div className="flex gap-5 w-full">
                {/* Titulo */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-7/12">
                      <FormControl>
                        <CustomFormInput
                          label="Título"
                          placeholder="Nome do produto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Titulo */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <CustomFormCurrencyInput
                          label="Valor"
                          fixedDecimalScale={true}
                          placeholder="R$ 0,00"
                          {...field}
                          getInputRef={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Row */}
              <div className="flex gap-5 w-full">
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <CustomFormTextArea
                          label="Descrição"
                          placeholder="Escreva detalhes sobre o produto, tamanho, características"
                          className="min-h-[120px] placeholder:items-center resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Row */}
              <div className="flex gap-5 w-full">
                {/* Description */}

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <CustomSelect
                          placeholder="Categoria"
                          label="Selecione"
                          options={categoryOptions}
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex w-full gap-3">
              <Link
                href="/produtos"
                data-loading={!!loading}
                className="flex flex-1 data-[loading=true]:hidden"
              >
                <CustomButton
                  size="medium"
                  text="Cancelar"
                  variant="outline"
                  type="button"
                />
              </Link>
              <CustomButton
                size="medium"
                text={loading ? "Criando..." : "Salvar e publicar"}
                variant="solid"
                type="submit"
                className="flex-1"
                disabled={loading}
              />
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
}
