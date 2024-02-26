import Card from "@mui/material/Card";

import { NewProductForm } from "./components/NewProductForm";

const NewProduct = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewProductForm />
  </Card>
);

export default NewProduct;
