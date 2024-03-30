import { Icon } from "@iconify-icon/react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import type { Metadata } from "next";
import Link from "next/link";

import { GetCustomersPayload } from "@/services/customers/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getCustomers } from "@/services/customers";
import { Table } from "./components/Table";

const metadata: Metadata = {
  description: "Business management system",
  title: "Customers | Bizprofy",
};

type Props = {
  searchParams: GetCustomersPayload;
  params: {};
};

const CustomersPage = async ({
  searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 },
}: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/customers?${new URLSearchParams({
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      })}`,
    );
  }

  const response = await getCustomers({
    offset,
    limit,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>Customers</h1>

        <Link href="/customers/new" className="no-underline">
          <Button
            startIcon={<Icon icon="eva:plus-fill" />}
            className="rounded-lg normal-case"
            variant="contained"
          >
            Add customer
          </Button>
        </Link>
      </div>

      <Table {...response} />
    </div>
  );
};

export default CustomersPage;
export { metadata };
