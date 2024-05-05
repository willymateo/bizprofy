import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { NewStockOutForm } from "./components/NewStockOutForm";

const NewStockOut = async () => {
  const messages = await getMessages();
  const stockOutMessages = (messages?.stock as AbstractIntlMessages).out as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={stockOutMessages}>
        <NewStockOutForm />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewStockOut;
