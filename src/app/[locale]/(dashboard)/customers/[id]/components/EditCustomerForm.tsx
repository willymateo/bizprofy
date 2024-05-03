"use client";

import { useTranslations } from "next-intl";

import { Customer, EditCustomerPayload } from "@/services/customers/interfaces";
import { CustomerForm } from "../../components/CustomerForm";
import { editCustomerById } from "@/services/customers";

const EditCustomerForm = ({ id, ...props }: Customer) => {
  const t = useTranslations();

  const handleSave = (payload: EditCustomerPayload) => editCustomerById({ id, payload });

  return <CustomerForm {...props} onSave={handleSave} saveButtonLabel={t("Save customer")} />;
};

export { EditCustomerForm };
