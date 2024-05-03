import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { ProviderForm } from "../components/ProviderForm";
import { createProvider } from "@/services/providers";

const NewProvider = async () => {
  const t = await getTranslations("providers");
  const messages = await getMessages();

  const providersMessages = messages?.providers as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={providersMessages}>
        <ProviderForm onSave={createProvider} saveButtonLabel={t("Create provider")} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewProvider;
