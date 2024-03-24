import Card from "@mui/material/Card";

import { NewWarehouseForm } from "./components/NewWarehouseForm";

const NewWarehouse = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewWarehouseForm />
  </Card>
);

export default NewWarehouse;
