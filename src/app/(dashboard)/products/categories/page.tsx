import type { Metadata } from "next";

import { NoProductCategoriesFound } from "./components/NoProductCategoriesFound";
import { ProductCategoryCard } from "./components/ProductCategoryCard";
import { getProductCategories } from "@/services/products";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Product types | Bizprofy",
};

const ProductCategories = async () => {
  const { rows } = await getProductCategories();

  return (
    <Layout>
      {!rows?.length && <NoProductCategoriesFound />}

      {rows?.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-stretch gap-5">
          {rows?.map(product => <ProductCategoryCard key={product.id} {...product} />)}
        </div>
      )}
    </Layout>
  );
};

export default ProductCategories;
export { metadata };
