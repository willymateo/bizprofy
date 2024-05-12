import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { EditProductForm } from "./components/EditProductForm";
import { getProductById } from "@/services/products";
import { getUserSession } from "@/utils/auth";
import Layout from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit product | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProduct = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.products?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const product = await getProductById({ id });
  const messages = await getMessages();

  const productsMessages = messages?.products as AbstractIntlMessages;

  return (
    <Layout productId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={productsMessages}>
          <EditProductForm {...product} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default EditProduct;
