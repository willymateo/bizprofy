import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { ProductForm } from "../components/ProductForm";
import { createProduct } from "@/services/products";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "New product | Bizprofy",
};

const NewProduct = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.products?.hasAccess &&
    userSession?.entityPermissions?.products?.permissions?.createProduct;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const t = await getTranslations("products");
  const messages = await getMessages();

  const productsMessages = messages?.products as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={productsMessages}>
          <ProductForm
            saveButtonLabel={t("Create product")}
            onSave={createProduct}
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default NewProduct;
