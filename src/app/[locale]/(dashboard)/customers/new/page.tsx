import Card from "@mui/material/Card";

import { CustomerForm } from "../components/CustomerForm";
import { createCustomer } from "@/services/customers";

const NewCustomer = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <CustomerForm onSave={createCustomer} saveButtonLabel="Create customer" />
  </Card>
);

export default NewCustomer;
