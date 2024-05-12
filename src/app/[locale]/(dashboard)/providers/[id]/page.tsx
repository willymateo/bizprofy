import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { EditProviderForm } from "./components/EditProviderForm";
import { getProviderById } from "@/services/providers";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit provider | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProvider = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.providers?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const provider = await getProviderById({ id });
  const messages = await getMessages();

  const providersMessages = messages?.providers as AbstractIntlMessages;

  return (
    <Layout providerId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={providersMessages}>
          <EditProviderForm {...provider} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default EditProvider;
