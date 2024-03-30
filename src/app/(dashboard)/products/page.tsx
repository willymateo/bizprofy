import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { NoProductsFound } from "./components/NoProductsFound";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "@/services/products";

const metadata: Metadata = {
  description: "Business management system",
  title: "Products | Bizprofy",
};

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Products</h1>

        <Link href="/products/new" className="no-underline">
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            Add product
          </Button>
        </Link>
      </div>

      {!products?.length && <NoProductsFound />}

      {products?.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-stretch gap-5">
          {products?.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
      )}
    </div>
  );
};

export default Products;
export { metadata };
