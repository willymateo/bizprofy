"use client";

import { Customer, EditCustomerPayload } from "@/services/customers/interfaces";
import { CustomerForm } from "../../components/CustomerForm";
import { editCustomer } from "@/services/customers";

const EditCustomerForm = ({ id, ...props }: Customer) => {
  const handleSave = (payload: EditCustomerPayload) => editCustomer({ id, payload });

  return <CustomerForm {...props} onSave={handleSave} saveButtonLabel="Save customer" />;
};

export { EditCustomerForm };
