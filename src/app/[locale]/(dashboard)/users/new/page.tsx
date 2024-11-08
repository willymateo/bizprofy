import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { NewUserForm } from "./components/NewUserForm";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

export const metadata: Metadata = {
  description: "Business management system",
  title: "New user | Bizprofy",
};

const NewUser = async () => {
  const userSession = await getUserSession();

  const hasAccess =
    userSession?.entityPermissions?.users?.hasAccess &&
    userSession?.entityPermissions?.users?.permissions?.createUser;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const messages = await getMessages();
  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={usersMessages}>
          <NewUserForm />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default NewUser;
