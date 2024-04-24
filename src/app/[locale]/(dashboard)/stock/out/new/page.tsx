import Card from "@mui/material/Card";

import { NewStockOutForm } from "./components/NewStockOutForm";

const NewStockOut = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewStockOutForm />
  </Card>
);

export default NewStockOut;
