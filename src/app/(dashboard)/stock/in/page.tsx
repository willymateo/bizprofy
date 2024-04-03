import { redirect } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";

import { GetStockInPayload } from "@/services/stock/in/interfaces";
import { getTableData } from "./components/Table/utils";
import { getWarehouses } from "@/services/warehouses";
import { getStockIn } from "@/services/stock/in";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Stock in | Bizprofy",
};

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

  const warehouses = await getWarehouses({
    limit: Number.MAX_SAFE_INTEGER,
    offset: 0,
  });

  const result = await getStockIn({
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
  });

  console.log({
    warehouses,
  });

  const tableData = getTableData(result);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Stock in</h1>

        <Link href="/stock/in/new" className="no-underline">
          <Button
            startIcon={<Icon icon="eva:plus-fill" />}
            className="rounded-lg normal-case"
            variant="contained"
          >
            Register new purchase
          </Button>
        </Link>
      </div>

      <Table
        {...tableData}
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        href="/stock/in"
      />
    </div>
  );
};

export default StockIn;
export { metadata };
