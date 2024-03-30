import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { NoProductCategoriesFound } from "./components/NoProductCategoriesFound";
import { ProductCategoryCard } from "./components/ProductCategoryCard";
import { getProductCategories } from "@/services/products";

const metadata: Metadata = {
  description: "Business management system",
  title: "Product types | Bizprofy",
};

const ProductCategories = async () => {
  const { rows } = await getProductCategories();

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Product categories</h1>

        <Link href="/products/categories/new" className="no-underline">
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            Add product category
          </Button>
        </Link>
      </div>

      {!rows?.length && <NoProductCategoriesFound />}

      {rows?.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-stretch gap-5">
          {rows?.map(product => <ProductCategoryCard key={product.id} {...product} />)}
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
export { metadata };
