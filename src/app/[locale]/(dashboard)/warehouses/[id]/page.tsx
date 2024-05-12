import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { EditWarehouseForm } from "./components/EditWarehouseForm";
import { getWarehouseById } from "@/services/warehouses";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit warehouse | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditWarehouse = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.warehouses?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const warehouse = await getWarehouseById({ id });
  const messages = await getMessages();

  const warehousesMessages = messages?.warehouses as AbstractIntlMessages;

  return (
    <Layout warehouseId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={warehousesMessages}>
          <EditWarehouseForm {...warehouse} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default EditWarehouse;
export { metadata, runtime };
