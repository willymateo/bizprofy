"use client";

import { EditProviderPayload, Provider } from "@/services/providers/interfaces";
import { ProviderForm } from "../../components/ProviderForm";
import { editProviderById } from "@/services/providers";

const EditProviderForm = ({ id, ...props }: Provider) => {
  const handleSave = (payload: EditProviderPayload) => editProviderById({ id, payload });

  return <ProviderForm {...props} onSave={handleSave} saveButtonLabel="Save provider" />;
};

export { EditProviderForm };
