import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { getTableData } from "../components/Table/SimpleTable/utils";
import { PAGE_SIZE_OPTIONS } from "../current/Table/constants";
import { SimpleTable } from "../components/Table/SimpleTable";
import { getStockOut } from "@/services/stockOut";
import { COLUMNS_TO_SHOW } from "./constants";

type Props = {
  searchParams: GetStockPayload;
  params: {};
};

const StockOut = async ({
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
      `/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockOut]}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      })}`,
    );
  }

  const result = await getStockOut({
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
      href={`/stock/${STOCK_ROUTES_BY_TYPE[CreatableStockTypes.stockOut]}`}
      transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
      columns={COLUMNS_TO_SHOW}
      offset={offset}
      limit={limit}
    />
  );
};

export default StockOut;
