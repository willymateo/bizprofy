import type { Metadata } from "next";

import { NoProductsFound } from "./components/NoProductsFound";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "@/services/products";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Products | Bizprofy",
};

const Products = async () => {
  const { rows = [] } = await getProducts({
    offset: 0,
    limit: 9,
  });

  return (
    <Layout>
      {!rows?.length && <NoProductsFound />}

      {rows?.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-5">
          {rows?.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
      )}
    </Layout>
  );
};

export default Products;
export { metadata };
