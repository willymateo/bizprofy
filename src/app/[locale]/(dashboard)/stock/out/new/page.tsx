import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { NewStockOutForm } from "./components/NewStockOutForm";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "New stock out | Bizprofy",
};

const NewStockOut = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.stock?.hasAccess &&
    userSession?.entityPermissions?.stock?.permissions?.createStockOut;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const messages = await getMessages();
  const stockOutMessages = (messages?.stock as AbstractIntlMessages).out as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={stockOutMessages}>
          <NewStockOutForm isEnableToSave />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default NewStockOut;
