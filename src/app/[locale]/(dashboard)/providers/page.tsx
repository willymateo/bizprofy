import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { GetProvidersPayload } from "@/services/providers/interfaces";
import { PAGE_SIZE_OPTIONS } from "./components/Table/constants";
import { getProviders } from "@/services/providers";
import { Table } from "./components/Table";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Providers | Bizprofy",
};

type Props = {
  searchParams: GetProvidersPayload;
  params: {};
};

const ProvidersPage = async ({
  searchParams: { limit = PAGE_SIZE_OPTIONS[0], offset = 0 },
}: Props) => {
  offset = parseInt(offset.toString(), 10);
  limit = parseInt(limit.toString(), 10);

  if (isNaN(offset) || isNaN(limit)) {
    redirect(
      `/providers?${new URLSearchParams({
        limit: PAGE_SIZE_OPTIONS[0].toString(),
        offset: "0",
      })}`,
    );
  }

  const data = await getProviders({
    offset,
    limit,
  });

  const messages = await getMessages();
  const providersMessages = messages?.providers as AbstractIntlMessages;

  return (
    <Layout>
      <NextIntlClientProvider messages={providersMessages}>
        <Table {...data} limit={limit} offset={offset} />
      </NextIntlClientProvider>
    </Layout>
  );
};

export default ProvidersPage;
export { metadata };
