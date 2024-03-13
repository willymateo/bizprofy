import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { getTableData } from "../components/Table/SimpleTable/utils";
import { STOCK_ROUTES_BY_TYPE, STOCK_TYPE_IDS } from "../constants";
import { SimpleTable } from "../components/Table/SimpleTable";
import { GetStockPayload } from "@/services/stock/interfaces";
import { CreatableStockTypes } from "../interfaces";
import { COLUMNS_TO_SHOW } from "./constants";
import { getStock } from "@/services/stock";

type Props = {
  searchParams: GetStockPayload;
  params: {};
};

const StockIn = async ({
  searchParams: {
    transactionDateGreaterThanOrEqualTo = dayjs().startOf("day").toISOString(),
    transactionDateLessThanOrEqualTo = dayjs().endOf("day").toISOString(),
  },
}: Props) => {
  const transactionDateGreaterThanOrEqualToDate = dayjs(transactionDateGreaterThanOrEqualTo);
  const transactionDateLessThanOrEqualToDate = dayjs(transactionDateLessThanOrEqualTo);

  if (
    !transactionDateGreaterThanOrEqualToDate.isValid() ||
    !transactionDateLessThanOrEqualToDate.isValid() ||
    transactionDateGreaterThanOrEqualToDate.isAfter(transactionDateLessThanOrEqualToDate)
  ) {
    redirect(
      `/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockIn]}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
      })}`,
    );
  }

  const result = await getStock({
    stockTypeIds: [STOCK_TYPE_IDS[CreatableStockTypes.stockIn]],
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
  });

  const tableData = getTableData(result);

  return (
    <SimpleTable
      {...tableData}
      transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
      href={`/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockIn]}`}
      transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
      columns={COLUMNS_TO_SHOW}
    />
  );
};

export default StockIn;
