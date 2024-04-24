import Card from "@mui/material/Card";

import { EditCustomerForm } from "./components/EditCustomerForm";
import { getCustomerById } from "@/services/customers";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditCustomer = async ({ params: { id = "" } }: Props) => {
  const customer = await getCustomerById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditCustomerForm {...customer} />
    </Card>
  );
};

export default EditCustomer;
