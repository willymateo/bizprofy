import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { CreatableStockTypes, ExtraStockTypes } from "../interfaces";
import { STOCK_ROUTES_BY_TYPE, STOCK_TYPE_IDS } from "../constants";
import { GetStockPayload } from "@/services/stock/interfaces";
import { getTableData } from "./Table/utils";
import { getStock } from "@/services/stock";
import { Table } from "./Table";

type Props = {
  searchParams: GetStockPayload;
  params: {};
};

const CurrentStock = async ({
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
      `/stock/${STOCK_ROUTES_BY_TYPE[ExtraStockTypes.currentStock]}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
      })}`,
    );
  }

  const { rows } = await getStock({
    stockTypeIds: [
      STOCK_TYPE_IDS[CreatableStockTypes.stockOut],
      STOCK_TYPE_IDS[CreatableStockTypes.stockIn],
    ],
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

  const newTableData = getTableData({ rows });

  return (
    <Table
      transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
      transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
      tableData={newTableData}
    />
  );
};

export default CurrentStock;
