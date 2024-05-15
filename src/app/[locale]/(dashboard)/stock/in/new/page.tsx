import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { NewStockInForm } from "./components/NewStockInForm";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

export const metadata: Metadata = {
  description: "Business management system",
  title: "New stock in | Bizprofy",
};

const NewStockIn = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.stock?.hasAccess &&
    userSession?.entityPermissions?.stock?.permissions?.createStockIn;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const messages = await getMessages();
  const stockInMessages = (messages?.stock as AbstractIntlMessages).in as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={stockInMessages}>
          <NewStockInForm isEnableToSave />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default NewStockIn;
