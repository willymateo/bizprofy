"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { EmailVerificationDialog } from "./EmailVerificationDialog";
import { UserForm } from "../../components/UserForm";
import { createUser } from "@/services/users";
import { useActive } from "@/hooks/useActive";

const NewUserForm = () => {
  const { isActive: isOpenEmailVerificationDialog = false, enable: openEmailVerificationDialog } =
    useActive();
  const [newUserEmail, setNewUserEmail] = useState("");
  const t = useTranslations();

  return (
    <>
      <UserForm
        saveButtonLabel={t("Create user")}
        onSuccess={({ email = "" }) => {
          setNewUserEmail(email);
          openEmailVerificationDialog();
        }}
        onSave={createUser}
        isPasswordRequired
        isEnableToSave
      />

      <EmailVerificationDialog isOpen={isOpenEmailVerificationDialog} email={newUserEmail} />
    </>
  );
};

export { NewUserForm };
