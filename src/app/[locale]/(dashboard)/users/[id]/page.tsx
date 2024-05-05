import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Card from "@mui/material/Card";

import { EditUserForm } from "./components/EditUserForm";
import { getUserById } from "@/services/users";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditUser = async ({ params: { id = "" } }: Props) => {
  const user = await getUserById({ id });
  const messages = await getMessages();

  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={usersMessages}>
        <EditUserForm {...user} />
      </NextIntlClientProvider>
    </Card>
  );
};

export default EditUser;
