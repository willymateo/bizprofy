"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditProviderPayload, Provider } from "@/services/providers/interfaces";
import { ProviderForm } from "../../components/ProviderForm";
import { editProviderById } from "@/services/providers";
import { SessionPayload } from "@/services/interfaces";

const EditProviderForm = ({ id, ...props }: Provider) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const handleSave = (payload: EditProviderPayload) => editProviderById({ id, payload });
  const userSession = session?.user as SessionPayload;
  const isEnableToSave =
    userSession?.entityPermissions?.providers?.permissions?.updateProvider ?? false;

  return (
    <ProviderForm
      saveButtonLabel={t("Save provider")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditProviderForm };
