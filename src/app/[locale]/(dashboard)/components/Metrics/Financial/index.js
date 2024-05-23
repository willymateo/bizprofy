import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import dayjs from "dayjs";

import { getStockStatus } from "@/services/stock";
import { Expenses } from "./Charts/Expenses";
import { Profits } from "./Charts/Profits";
import { Sales } from "./Charts/Sales";

const Financial = async () => {
  const messages = await getMessages();

  const startDate = dayjs().subtract(30, "days").toISOString();
  const endDate = dayjs().toISOString();

  const { data } = await getStockStatus({
    transactionDateGreaterThanOrEqualTo: startDate,
    transactionDateLessThanOrEqualTo: endDate,
  });

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
      <NextIntlClientProvider messages={messages?.Home}>
        <Sales data={data} />
        <Expenses data={data} />
        <Profits data={data} />
      </NextIntlClientProvider>
    </div>
  );
};

export { Financial };
