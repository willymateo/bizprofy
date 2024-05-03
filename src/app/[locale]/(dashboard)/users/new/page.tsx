import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Card from "@mui/material/Card";

import { UserForm } from "../components/UserForm";
import { createUser } from "@/services/users";

const NewUser = async () => {
  const t = await getTranslations("users");
  const messages = await getMessages();

  const usersMessages = messages?.users as AbstractIntlMessages;

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NextIntlClientProvider messages={usersMessages}>
        <UserForm onSave={createUser} saveButtonLabel={t("Create user")} isPasswordRequired />
      </NextIntlClientProvider>
    </Card>
  );
};

export default NewUser;
