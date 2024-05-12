import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { CustomerForm } from "../components/CustomerForm";
import { createCustomer } from "@/services/customers";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "New customer | Bizprofy",
};

const NewCustomer = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.customers?.hasAccess &&
    userSession?.entityPermissions?.customers?.permissions?.createCustomer;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const t = await getTranslations("customers");
  const messages = await getMessages();

  const customersMessages = messages?.customers as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={customersMessages}>
          <CustomerForm
            saveButtonLabel={t("Create customer")}
            onSave={createCustomer}
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default NewCustomer;
