import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { ProductCategoryForm } from "../components/ProductCategoryForm";
import { createProductCategory } from "@/services/products/categories";
import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "New product | Bizprofy",
};

const NewProductCategory = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.products?.hasAccess &&
    userSession?.entityPermissions?.products?.permissions?.createProductCategory;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const t = await getTranslations("products.categories");
  const messages = await getMessages();

  const productCategoriesMessages = (messages?.products as AbstractIntlMessages)
    .categories as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={productCategoriesMessages}>
          <ProductCategoryForm
            saveButtonLabel={t("Create product category")}
            onSave={createProductCategory}
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default NewProductCategory;
export { metadata };
