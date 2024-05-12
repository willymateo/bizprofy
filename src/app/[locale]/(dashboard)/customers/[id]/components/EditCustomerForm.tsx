"use client";

import { SessionPayload } from "@/services/interfaces";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Customer, EditCustomerPayload } from "@/services/customers/interfaces";
import { CustomerForm } from "../../components/CustomerForm";
import { editCustomerById } from "@/services/customers";

const EditCustomerForm = ({ id, ...props }: Customer) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const handleSave = (payload: EditCustomerPayload) => editCustomerById({ id, payload });
  const userSession = session?.user as SessionPayload;
  const isEnableToSave =
    userSession?.entityPermissions?.customers?.permissions?.updateCustomer ?? false;

  return (
    <CustomerForm
      saveButtonLabel={t("Save customer")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditCustomerForm };
