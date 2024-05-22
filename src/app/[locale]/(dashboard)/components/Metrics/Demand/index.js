import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { ProfitGeneratedByCustomer } from "./Charts/ProfitGeneratedByCustomer";
import { ProfitGeneratedByProduct } from "./Charts/ProfitGeneratedByProduct";
import { SalesByCustomer } from "./Charts/SalesByCustomer";
import { SalesByProduct } from "./Charts/SalesByProduct";

const Demand = async () => {
  const messages = await getMessages();

  return (
    <div className="grid grid-cols-3 grid-row-2 gap-5">
      <NextIntlClientProvider messages={messages?.Home}>
        <ProfitGeneratedByCustomer />
        <SalesByCustomer />
        <SalesByProduct />
        <ProfitGeneratedByProduct />
      </NextIntlClientProvider>
    </div>
  );
};

export { Demand };
