import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { ProviderForm } from "../components/ProviderForm";
import { createProvider } from "@/services/providers";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "New provider | Bizprofy",
};

const NewProvider = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.providers?.hasAccess &&
    userSession?.entityPermissions?.providers?.permissions?.createProvider;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const t = await getTranslations("providers");
  const messages = await getMessages();

  const providersMessages = messages?.providers as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={providersMessages}>
          <ProviderForm
            saveButtonLabel={t("Create provider")}
            onSave={createProvider}
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default NewProvider;
