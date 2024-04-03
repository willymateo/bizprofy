import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { GetCurrentStockPayload } from "@/services/stock/current/interfaces";
import { getCurrentStock } from "@/services/stock/current";
import { getTableData } from "./components/Table/utils";
import { Table } from "./components/Table";

type Props = {
  searchParams: GetCurrentStockPayload;
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
      `/stock/current?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
      })}`,
    );
  }

  const { rows } = await getCurrentStock({
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
      href="/stock/current"
    />
  );
};

export default CurrentStock;
