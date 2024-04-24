"use client";

import { Customer, EditCustomerPayload } from "@/services/customers/interfaces";
import { CustomerForm } from "../../components/CustomerForm";
import { editCustomerById } from "@/services/customers";

const EditCustomerForm = ({ id, ...props }: Customer) => {
  const handleSave = (payload: EditCustomerPayload) => editCustomerById({ id, payload });

  return <CustomerForm {...props} onSave={handleSave} saveButtonLabel="Save customer" />;
};

export { EditCustomerForm };
