import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { NewStockInForm } from "./components/NewStockInForm";

const NewStockIn = async () => {
  const messages = await getMessages();
  const stockInMessages = (messages?.stock as AbstractIntlMessages).in as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={stockInMessages}>
        <NewStockInForm />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewStockIn;
