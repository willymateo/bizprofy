import { redirect } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";

import { GetStockOutPayload } from "@/services/stock/out/interfaces";
import { getStockOut } from "@/services/stock/out";
import { Table } from "./components/Table";
import { getWarehouses } from "@/services/warehouses";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock out | Bizprofy",
};

type Props = {
  searchParams: GetStockOutPayload;
  params: {};
};

const StockOut = async ({
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
      `/stock/out?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: dayjs().startOf("day").toISOString(),
        transactionDateLessThanOrEqualTo: dayjs().endOf("day").toISOString(),
      })}`,
    );
  }

  const { rows: warehouses } = await getWarehouses({
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

  const stockByWarehouses = await Promise.all(
    warehouses?.map(({ id }) =>
      getStockOut({
        transactionDateGreaterThanOrEqualTo,
        transactionDateLessThanOrEqualTo,
        warehouseIds: [id],
      }),
    ) ?? [],
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Stock out</h1>

        <Link href="/stock/out/new" className="no-underline">
          <Button
            startIcon={<Icon icon="eva:plus-fill" />}
            className="rounded-lg normal-case"
            variant="contained"
          >
            Register new sale
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-20">
        {stockByWarehouses.map((stockData, index) => (
          <Table
            {...stockData}
            transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
            transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
            key={warehouses[index].id}
            href="/stock/out"
          />
        ))}
      </div>
    </div>
  );
};

export default StockOut;
export { metadata };
