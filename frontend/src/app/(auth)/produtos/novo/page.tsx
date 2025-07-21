import { NewProductForm } from "@/components/new-product-form";

export default function NewProduct() {
  return (
    <main className="flex flex-col gap-2.5 px-10 py-4 lg:gap-10 xl:px-[168px] lg:py-16">
      <section className="col-span-12 w-full">
        <h1 className="title-md text-gray-500">Novo produto</h1>
        <p className="body-sm text-gray-300">
          Cadastre um produto para venda no marketplace
        </p>
      </section>

      <NewProductForm />
    </main>
  );
}
