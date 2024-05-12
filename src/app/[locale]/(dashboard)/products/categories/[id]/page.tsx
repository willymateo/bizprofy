import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditProductCategoryForm } from "./components/EditProductCategoryForm";
import { getProductCategoryById } from "@/services/products/categories";
import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { getUserSession } from "@/utils/auth";
import Layout from "./components/Layout";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProductCategory = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.products?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const productCategory = await getProductCategoryById({ id });
  const messages = await getMessages();

  const productCategoriesMessages = (messages?.products as AbstractIntlMessages)
    .categories as AbstractIntlMessages;

  return (
    <Layout productCategoryId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={productCategoriesMessages}>
          <EditProductCategoryForm {...productCategory} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default EditProductCategory;
