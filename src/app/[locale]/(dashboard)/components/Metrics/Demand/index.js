import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import dayjs from "dayjs";

import { getProductCategoriesStockStatus } from "@/services/products/categories";
import { SalesByProductCategory } from "./Charts/SalesByProductCategory";
import { getCustomersStockStatus } from "@/services/customers";
import { getProductsStockStatus } from "@/services/products";
import { SalesByCustomer } from "./Charts/SalesByCustomer";
import { SalesByProduct } from "./Charts/SalesByProduct";

const Demand = async () => {
  const messages = await getMessages();

  const startDate = dayjs().subtract(30, "days").toISOString();
  const endDate = dayjs().toISOString();
  const { data: customersStockStatus } = await getCustomersStockStatus({
    transactionDateGreaterThanOrEqualTo: startDate,
    transactionDateLessThanOrEqualTo: endDate,
    orderByField: "stock_out_total_quantity",
  });

  const { data: productsStockStatus } = await getProductsStockStatus({
    transactionDateGreaterThanOrEqualTo: startDate,
    transactionDateLessThanOrEqualTo: endDate,
    orderByField: "stock_out_total_quantity",
  });

  const { data: productCategoriesStockStatus } = await getProductCategoriesStockStatus({
    transactionDateGreaterThanOrEqualTo: startDate,
    transactionDateLessThanOrEqualTo: endDate,
    orderByField: "stock_out_total_quantity",
  });

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:grid-row-2">
      <NextIntlClientProvider messages={messages?.Home}>
        <SalesByCustomer data={customersStockStatus} startDate={startDate} endDate={endDate} />
        <SalesByProduct data={productsStockStatus} startDate={startDate} endDate={endDate} />
        <SalesByProductCategory
          data={productCategoriesStockStatus}
          startDate={startDate}
          endDate={endDate}
        />
      </NextIntlClientProvider>
    </div>
  );
};

export { Demand };
