import Card from "@mui/material/Card";

import { NewStockForm } from "./components/NewStockForm";

const NewStock = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewStockForm />
  </Card>
);

export default NewStock;
