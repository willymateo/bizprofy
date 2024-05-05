import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { ProductCategoryForm } from "../components/ProductCategoryForm";
import { createProductCategory } from "@/services/products/categories";

const NewProductCategory = async () => {
  const t = await getTranslations("products.categories");
  const messages = await getMessages();

  const productCategoriesMessages = (messages?.products as AbstractIntlMessages)
    .categories as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={productCategoriesMessages}>
        <ProductCategoryForm
          saveButtonLabel={t("Create product category")}
          onSave={createProductCategory}
        />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewProductCategory;
