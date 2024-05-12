import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { EditCustomerForm } from "./components/EditCustomerForm";
import { getCustomerById } from "@/services/customers";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit customer | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditCustomer = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.customers?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const customer = await getCustomerById({ id });
  const messages = await getMessages();

  const customersMessages = messages?.customers as AbstractIntlMessages;

  return (
    <Layout customerId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={customersMessages}>
          <EditCustomerForm {...customer} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default EditCustomer;
export { metadata };
