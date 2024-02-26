import Card from "@mui/material/Card";

import { Return as ReturnButton } from "@/app/components/Buttons/Return";
import { NewProductForm } from "./components/NewProductForm";

const Products = () => (
  <div className="flex flex-col gap-5">
    <ReturnButton className="w-fit" />

    <h1>New product</h1>

    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <NewProductForm />
    </Card>
  </div>
);

export default Products;
