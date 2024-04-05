import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { GetCurrentStockPayload } from "@/services/stock/current/interfaces";
import { getCurrentStock } from "@/services/stock/current";
import { getWarehouses } from "@/services/warehouses";
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

  const { rows: warehouses = [] } = await getWarehouses({
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

  const stockByWarehouses = await Promise.all(
    warehouses?.map(({ id }) =>
      getCurrentStock({
        transactionDateGreaterThanOrEqualTo,
        transactionDateLessThanOrEqualTo,
        warehouseIds: [id],
      }),
    ) ?? [],
  );

  console.log(
    JSON.stringify(
      {
        warehouses,
        stockByWarehouses,
      },
      null,
      2,
    ),
  );

  return (
    <div className="flex flex-col gap-20">
      {stockByWarehouses.map((stockData, index) => (
        <Table
          {...stockData}
          transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
          transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
          warehouse={warehouses[index]}
          key={warehouses[index].id}
          href="/stock/current"
        />
      ))}
    </div>
  );
};

export default CurrentStock;
