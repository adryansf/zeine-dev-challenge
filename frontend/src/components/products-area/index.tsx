"use client";

import React, { useMemo, useCallback } from "react";
import { LoaderIcon } from "lucide-react";

// Store
import { useProductsAreaStore } from "@/store/products-area-store";

// Constants
import { categoryToText } from "@/constants/product-constants";

// Orval
import { useGetApiProducts } from "@/orval/products/products";

// Lib
import { cn } from "@/lib/utils";

// Components
import { ProductCard } from "@/components/product-card";
import { TagStatus } from "@/components/tag-status";
import { Tag } from "@/components/tag";
import { Pagination } from "@/components/pagination";

// Component
export function ProductsArea(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    filters: { category, search, status },
    page,
    setPage,
  } = useProductsAreaStore();

  const { data, isLoading } = useGetApiProducts({
    page,
    category,
    search,
    status,
  });

  const products = useMemo(() => data?.products || [], [data]);

  const totalPages = useMemo(() => data?.totalPages || 1, [data]);

  const handleNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  const handlePreviousPage = useCallback(() => {
    setPage(page - 1);
  }, [page, setPage]);

  return (
    <main
      {...props}
      className={cn(`flex flex-wrap gap-4 w-full items-start`, props.className)}
    >
      {isLoading && (
        <div className="flex w-full justify-center">
          <LoaderIcon className="w-10 h-10 animate-spin" />
        </div>
      )}
      {products.map((product) => (
        <ProductCard.Root key={product.id}>
          <ProductCard.Image src={product.image}>
            <ProductCard.ImageTagArea>
              <TagStatus status={product.status} />
              <Tag text={categoryToText[product.category]} />
            </ProductCard.ImageTagArea>
          </ProductCard.Image>

          <ProductCard.Info
            price={Number(product.price)}
            title={product.title}
            description={product.description}
          />
        </ProductCard.Root>
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handleNext={handleNextPage}
        handlePrevious={handlePreviousPage}
      />
    </main>
  );
}
