import Card from "@mui/material/Card";

import { NewStockInForm } from "./components/NewStockInForm";

const NewStockIn = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewStockInForm />
  </Card>
);

export default NewStockIn;
