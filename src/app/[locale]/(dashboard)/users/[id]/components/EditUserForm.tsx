"use client";

import { useTranslations } from "next-intl";

import { EditUserPayload, User } from "@/services/users/interfaces";
import { UserForm } from "../../components/UserForm";
import { editUserById } from "@/services/users";

const EditUserForm = ({ id, ...props }: User) => {
  const t = useTranslations();

  const handleSave = (payload: EditUserPayload) => editUserById({ id, payload });

  return <UserForm {...props} onSave={handleSave} saveButtonLabel={t("Save user")} />;
};

export { EditUserForm };
