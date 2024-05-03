import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { CustomerForm } from "../components/CustomerForm";
import { createCustomer } from "@/services/customers";

const NewCustomer = async () => {
  const t = await getTranslations("customers");
  const messages = await getMessages();

  const customersMessages = messages?.customers as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={customersMessages}>
        <CustomerForm onSave={createCustomer} saveButtonLabel={t("Create customer")} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewCustomer;
