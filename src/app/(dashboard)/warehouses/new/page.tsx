import Card from "@mui/material/Card";

import { NewCustomerForm } from "./components/NewCustomerForm";

const NewCustomer = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewCustomerForm />
  </Card>
);

export default NewCustomer;
