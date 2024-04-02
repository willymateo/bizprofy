import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { GetStockInPayload } from "@/services/stockIn/interfaces";
import { getTableData } from "./components/Table/utils";
import { getStockIn } from "@/services/stockIn";
import { Table } from "./components/Table";

type Props = {
  searchParams: GetStockInPayload;
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
      `/stock/in?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
      })}`,
    );
  }

  const result = await getStockIn({
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
  });

  const tableData = getTableData(result);

  return (
    <Table
      {...tableData}
      transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
      transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
      href="/stock/in"
    />
  );
};

export default StockIn;
