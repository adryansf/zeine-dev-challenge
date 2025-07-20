"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Store
import { useProductsAreaStore } from "@/store/products-area-store";

// Constants
import { categoryOptions, statusOptions } from "@/constants/product-constants";

// Validator
import { filterProductFormSchema, FilterProductFormSchema } from "./validator";

// Components
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { CustomFormInput } from "@/components/custom-form-input";
import { CustomButton } from "@/components/custom-button";
import { CustomSelect } from "@/components/custom-select";

// Component
export function FilterProductsForm() {
  const { setFilters } = useProductsAreaStore();

  const form = useForm<FilterProductFormSchema>({
    resolver: zodResolver(filterProductFormSchema),
  });

  const onSubmit = async (data: FilterProductFormSchema) => {
    setFilters({
      category: data?.category || undefined,
      search: data?.search || undefined,
      status: data?.status || undefined,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-5">
          {/* Search */}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomFormInput
                    icon="search"
                    placeholder="Pesquisar"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomSelect
                    icon="sale-tag"
                    placeholder="Status"
                    onValueChange={field.onChange}
                    options={statusOptions}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomSelect
                    placeholder="Categoria"
                    options={categoryOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <CustomButton
          size="medium"
          text="Aplicar filtro"
          variant="solid"
          type="submit"
        />
      </form>
    </Form>
  );
}
