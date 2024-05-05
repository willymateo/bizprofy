import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getWarehouses } from "@/services/warehouses";
import { getMessages } from "next-intl/server";
import { Table } from "./components/Table";

const CurrentStock = async () => {
  const messages = await getMessages();
  const { rows: warehouses = [] } =
    (await getWarehouses({
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
    })) ?? {};

  const currentStockMessages = (messages?.stock as AbstractIntlMessages)
    .current as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={currentStockMessages}>
      <div className="flex flex-col gap-20">
        {warehouses?.map(warehouse => <Table warehouse={warehouse} key={warehouse.id} />)}
      </div>
    </NextIntlClientProvider>
  );
};

export default CurrentStock;
