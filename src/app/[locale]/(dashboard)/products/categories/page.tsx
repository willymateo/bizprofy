import type { Metadata } from "next";

import { NoProductCategoriesFound } from "./components/NoProductCategoriesFound";
import { ProductCategoryCard } from "./components/ProductCategoryCard";
import { getProductCategories } from "@/services/products/categories";
import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

export const metadata: Metadata = {
  description: "Business management system",
  title: "Product types | Bizprofy",
};

const ProductCategories = async () => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.products?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

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
