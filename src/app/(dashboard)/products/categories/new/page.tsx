import Card from "@mui/material/Card";

import { ProductCategoryForm } from "../components/ProductCategoryForm";
import { createProductCategory } from "@/services/products/categories";

const NewProductCategory = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <ProductCategoryForm onSave={createProductCategory} saveButtonLabel="Create product category" />
  </Card>
);

export default NewProductCategory;
