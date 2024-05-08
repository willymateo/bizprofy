"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditUserPayload, User } from "@/services/users/interfaces";
import { SessionPayload } from "@/services/interfaces";
import { UserForm } from "../../components/UserForm";
import { editUserById } from "@/services/users";

const EditUserForm = ({ id, ...props }: User) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const userSession = session?.user as SessionPayload;
  const isEnableToSave = userSession?.entityPermissions?.users?.permissions?.updateUser ?? false;
  const handleSave = (payload: EditUserPayload) => editUserById({ id, payload });

  return (
    <UserForm
      {...props}
      saveButtonLabel={t("Save user")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
    />
  );
};

export { EditUserForm };
