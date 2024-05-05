import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditProductForm } from "./components/EditProductForm";
import { getProductById } from "@/services/products";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProduct = async ({ params: { id = "" } }: Props) => {
  const product = await getProductById({ id });
  const messages = await getMessages();

  const productsMessages = messages?.products as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={productsMessages}>
        <EditProductForm {...product} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditProduct;
