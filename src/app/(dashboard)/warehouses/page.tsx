import { Icon } from "@iconify-icon/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { GetWarehousesPayload } from "@/services/warehouses/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getWarehouses } from "@/services/warehouses";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Warehouses | Bizprofy",
};

type Props = {
  searchParams: GetWarehousesPayload;
  params: {};
};

const WarehousesPage = async ({
  searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 },
}: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/warehouses?${new URLSearchParams({
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      }).toString()}`,
    );
  }

  const response = await getWarehouses({
    offset,
    limit,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Warehouses</h1>

        <Link href="/warehouses/new" className="no-underline">
          <Button
            startIcon={<Icon icon="eva:plus-fill" />}
            className="rounded-lg normal-case"
            variant="contained"
          >
            Add warehouse
          </Button>
        </Link>
      </div>

      <Table {...response} />
    </div>
  );
};

export default WarehousesPage;
export { metadata };
