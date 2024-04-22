import Card from "@mui/material/Card";

import { EditWarehouseForm } from "./components/EditWarehouseForm";
import { getWarehouseById } from "@/services/warehouses";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditWarehouse = async ({ params: { id = "" } }: Props) => {
  const warehouse = await getWarehouseById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditWarehouseForm {...warehouse} />
    </Card>
  );
};

export default EditWarehouse;
