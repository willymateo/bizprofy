import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { WarehouseForm } from "../components/WarehouseForm";
import { createWarehouse } from "@/services/warehouses";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "New warehouse | Bizprofy",
};

const NewWarehouse = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.warehouses?.hasAccess &&
    userSession?.entityPermissions?.warehouses?.permissions?.createWarehouse;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const t = await getTranslations("warehouses");
  const messages = await getMessages();

  const warehousesMessages = messages?.warehouses as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={warehousesMessages}>
          <WarehouseForm
            saveButtonLabel={t("Create warehouse")}
            onSave={createWarehouse}
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default NewWarehouse;
export { metadata, runtime };
