import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { GetCustomersPayload } from "@/services/customers/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getCustomers } from "@/services/customers";
import { Table } from "./components/Table";
import { Layout } from "./components/Layout";

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

  const data = await getCustomers({
    offset,
    limit,
  });

  return (
    <Layout>
      <Table {...data} offset={offset} limit={limit} />
    </Layout>
  );
};

export default CustomersPage;
export { metadata };
