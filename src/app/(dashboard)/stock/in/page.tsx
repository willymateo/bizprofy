import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { CreatableStockTypes, GetStockPayload } from "@/services/stock/interfaces";
import { getTableData } from "../components/Table/SimpleTable/utils";
import { STOCK_ROUTES_BY_TYPE, STOCK_TYPE_IDS } from "../constants";
import { PAGE_SIZE_OPTIONS } from "../current/Table/constants";
import { SimpleTable } from "../components/Table/SimpleTable";
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
    limit = PAGE_SIZE_OPTIONS[0],
    offset = 0,
  },
}: Props) => {
  const transactionDateGreaterThanOrEqualToDate = dayjs(transactionDateGreaterThanOrEqualTo);
  const transactionDateLessThanOrEqualToDate = dayjs(transactionDateLessThanOrEqualTo);
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (
    !transactionDateGreaterThanOrEqualToDate.isValid() ||
    !transactionDateLessThanOrEqualToDate.isValid() ||
    transactionDateGreaterThanOrEqualToDate.isAfter(transactionDateLessThanOrEqualToDate) ||
    isNaN(offset) ||
    isNaN(limit)
  ) {
    redirect(
      `/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockIn]}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      })}`,
    );
  }

  const result = await getStock({
    stockTypeIds: [STOCK_TYPE_IDS[CreatableStockTypes.stockIn]],
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
    offset,
    limit,
  });

  const tableData = getTableData(result);

  return (
    <SimpleTable
      {...tableData}
      transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
      href={`/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockIn]}`}
      transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
      columns={COLUMNS_TO_SHOW}
      offset={offset}
      limit={limit}
    />
  );
};

export default StockIn;
