import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditCustomerForm } from "./components/EditCustomerForm";
import { getCustomerById } from "@/services/customers";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditCustomer = async ({ params: { id = "" } }: Props) => {
  const customer = await getCustomerById({ id });
  const messages = await getMessages();

  const customersMessages = messages?.customers as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={customersMessages}>
        <EditCustomerForm {...customer} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditCustomer;
