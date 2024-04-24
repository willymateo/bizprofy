import Card from "@mui/material/Card";

import { ProductForm } from "../components/ProductForm";
import { createProduct } from "@/services/products";

const NewProduct = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <ProductForm onSave={createProduct} saveButtonLabel="Create product" />
  </Card>
);

export default NewProduct;
