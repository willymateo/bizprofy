import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { WarehouseForm } from "../components/WarehouseForm";
import { createWarehouse } from "@/services/warehouses";

const NewWarehouse = async () => {
  const t = await getTranslations("warehouses");
  const messages = await getMessages();

  const warehousesMessages = messages?.warehouses as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={warehousesMessages}>
        <WarehouseForm onSave={createWarehouse} saveButtonLabel={t("Create warehouse")} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewWarehouse;
