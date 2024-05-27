"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditUserPayload, User } from "@/services/users/interfaces";
import { SessionPayload } from "@/services/interfaces";
import { UserForm } from "../../components/UserForm";
import { editUserById } from "@/services/users";
import { useRouter } from "next/navigation";

const EditUserForm = ({ id, ...props }: User) => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const t = useTranslations();

  const userSession = session?.user as SessionPayload;
  const isEnableToSave = userSession?.entityPermissions?.users?.permissions?.updateUser ?? false;
  const handleSave = (payload: EditUserPayload) => editUserById({ id, payload });

  const onSuccess = () => {
    router.push("/users");
    router.refresh();
  };

  return (
    <UserForm
      {...props}
      saveButtonLabel={t("Save user")}
      isEnableToSave={isEnableToSave}
      onSuccess={onSuccess}
      onSave={handleSave}
    />
  );
};

export { EditUserForm };
