import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { UserForm } from "../components/UserForm";
import { createUser } from "@/services/users";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const metadata: Metadata = {
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

  const t = await getTranslations("users");
  const messages = await getMessages();

  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Layout>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={usersMessages}>
          <UserForm
            saveButtonLabel={t("Create user")}
            onSave={createUser}
            isPasswordRequired
            isEnableToSave
          />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export default NewUser;
export { metadata };
