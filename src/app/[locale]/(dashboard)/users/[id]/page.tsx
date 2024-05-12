import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";
import type { Metadata } from "next";

import { UnAuthorized } from "@/app/[locale]/components/UnAuthorized";
import { EditUserForm } from "./components/EditUserForm";
import { getUserById } from "@/services/users";
import { getUserSession } from "@/utils/auth";
import { Layout } from "./components/Layout";

const runtime = "edge";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit user | Bizprofy",
};

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditUser = async ({ params: { id = "" } }: Props) => {
  const userSession = await getUserSession();

  const hasAccess = userSession?.entityPermissions?.users?.hasAccess;

  if (!hasAccess) {
    return <UnAuthorized />;
  }

  const user = await getUserById({ id });
  const messages = await getMessages();

  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Layout userId={id}>
      <Card className="flex flex-col gap-10 p-10 rounded-2xl">
        <NextIntlClientProvider messages={usersMessages}>
          <EditUserForm {...user} />
        </NextIntlClientProvider>
      </Card>
    </Layout>
  );
};

export { metadata, runtime };
export default EditUser;
