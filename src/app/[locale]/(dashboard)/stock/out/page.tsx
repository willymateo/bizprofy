import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { getWarehouses } from "@/services/warehouses";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";
import { Table } from "./components/Table";

export const metadata: Metadata = {
  description: "Business management system",
  title: "Stock out | Bizprofy",
};

const StockOut = async () => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.stock?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const messages = await getMessages();
  const { rows: warehouses = [] } =
    (await getWarehouses({
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
    })) ?? {};

  const stockOutMessages = (messages?.stock as AbstractIntlMessages).out as AbstractIntlMessages;

  return (
    <Layout>
      <NextIntlClientProvider messages={stockOutMessages}>
        <div className="flex flex-col gap-20">
          {warehouses?.map(warehouse => <Table warehouse={warehouse} key={warehouse.id} />)}
        </div>
      </NextIntlClientProvider>
    </Layout>
  );
};

export default StockOut;
