import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { ProductForm } from "../components/ProductForm";
import { createProduct } from "@/services/products";

const NewProduct = async () => {
  const t = await getTranslations("products");
  const messages = await getMessages();

  const productsMessages = messages?.products as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={productsMessages}>
        <ProductForm onSave={createProduct} saveButtonLabel={t("Create product")} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewProduct;
