import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditWarehouseForm } from "./components/EditWarehouseForm";
import { getWarehouseById } from "@/services/warehouses";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditWarehouse = async ({ params: { id = "" } }: Props) => {
  const warehouse = await getWarehouseById({ id });
  const messages = await getMessages();

  const warehousesMessages = messages?.warehouses as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={warehousesMessages}>
        <EditWarehouseForm {...warehouse} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditWarehouse;
