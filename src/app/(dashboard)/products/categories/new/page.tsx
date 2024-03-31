import Card from "@mui/material/Card";

import { NewProductCategoryForm } from "./components/NewProductCategoryForm";

const NewProductCategory = () => (
  <Card className="flex flex-col gap-10 p-10 rounded-2xl">
    <NewProductCategoryForm />
  </Card>
);

export default NewProductCategory;
