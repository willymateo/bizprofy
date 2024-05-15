import type { Metadata } from "next";

import { NoProductsFound } from "./components/NoProductsFound";
import { UnAuthorized } from "../../components/UnAuthorized";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "@/services/products";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

export const metadata: Metadata = {
  description: "Business management system",
  title: "Products | Bizprofy",
};

const Products = async () => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.products?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

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
