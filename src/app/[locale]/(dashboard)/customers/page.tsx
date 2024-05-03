import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { GetCustomersPayload } from "@/services/customers/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getCustomers } from "@/services/customers";
import { Layout } from "./components/Layout";
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

  const data = await getCustomers({
    offset,
    limit,
  });

  const messages = await getMessages();
  const customersMessages = messages?.customers as AbstractIntlMessages;

  return (
    <Layout>
      <NextIntlClientProvider messages={customersMessages}>
        <Table {...data} offset={offset} limit={limit} />
      </NextIntlClientProvider>
    </Layout>
  );
};

export default CustomersPage;
export { metadata };
