// Components
import { FilterProductsForm } from "@/components/filter-products-form";
import { ProductsArea } from "@/components/products-area";

export default function Products() {
  return (
    <main className="flex flex-col gap-2.5 px-10 py-4 lg:gap-10 xl:px-[168px] lg:py-16">
      <section className="col-span-12 w-full">
        <h1 className="title-md text-gray-500">Seus Produtos</h1>
        <p className="body-sm text-gray-300">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </section>

      <section className={`flex gap-6 w-full items-start`}>
        <aside className="w-full max-w-xs lg:max-w-[327px] p-6 rounded-[20px] bg-white gap-6 text-greay-300 title-sm space-y-6">
          <h2>Filtrar</h2>
          <FilterProductsForm />
        </aside>

        <ProductsArea />
      </section>
    </main>
  );
}
