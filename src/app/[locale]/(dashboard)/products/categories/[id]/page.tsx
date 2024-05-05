import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditProductCategoryForm } from "./components/EditProductCategoryForm";
import { getProductCategoryById } from "@/services/products/categories";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProductCategory = async ({ params: { id = "" } }: Props) => {
  const productCategory = await getProductCategoryById({ id });
  const messages = await getMessages();

  const productCategoriesMessages = (messages?.products as AbstractIntlMessages)
    .categories as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={productCategoriesMessages}>
        <EditProductCategoryForm {...productCategory} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditProductCategory;
