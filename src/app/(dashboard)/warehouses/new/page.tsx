import Card from "@mui/material/Card";

import { WarehouseForm } from "../components/WarehouseForm";
import { createWarehouse } from "@/services/warehouses";

const NewWarehouse = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <WarehouseForm onSave={createWarehouse} saveButtonLabel="Create warehouse" />
  </Card>
);

export default NewWarehouse;
