import { redirect } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";
import dayjs from "dayjs";

import { GetStockOutPayload } from "@/services/stock/out/interfaces";
import { getTableData } from "./components/Table/utils";
import { getStockOut } from "@/services/stock/out";
import { Table } from "./components/Table";

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

  const result = await getStockOut({
    transactionDateGreaterThanOrEqualTo,
    transactionDateLessThanOrEqualTo,
  });

  const tableData = getTableData(result);

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

      <Table
        {...tableData}
        transactionDateGreaterThanOrEqualTo={transactionDateGreaterThanOrEqualTo}
        transactionDateLessThanOrEqualTo={transactionDateLessThanOrEqualTo}
        href="/stock/out"
      />
    </div>
  );
};

export default StockOut;
export { metadata };
