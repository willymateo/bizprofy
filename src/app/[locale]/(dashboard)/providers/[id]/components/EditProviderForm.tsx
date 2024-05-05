"use client";

import { useTranslations } from "next-intl";

import { EditProviderPayload, Provider } from "@/services/providers/interfaces";
import { ProviderForm } from "../../components/ProviderForm";
import { editProviderById } from "@/services/providers";

const EditProviderForm = ({ id, ...props }: Provider) => {
  const t = useTranslations();

  const handleSave = (payload: EditProviderPayload) => editProviderById({ id, payload });

  return <ProviderForm {...props} onSave={handleSave} saveButtonLabel={t("Save provider")} />;
};

export { EditProviderForm };
