import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditProviderForm } from "./components/EditProviderForm";
import { getProviderById } from "@/services/providers";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProvider = async ({ params: { id = "" } }: Props) => {
  const provider = await getProviderById({ id });
  const messages = await getMessages();

  const providersMessages = messages?.providers as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={providersMessages}>
        <EditProviderForm {...provider} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditProvider;
