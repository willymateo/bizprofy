import Card from "@mui/material/Card";

import { EditProductCategoryForm } from "./components/EditProductCategoryForm";
import { getProductCategoryById } from "@/services/products";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProductCategory = async ({ params: { id = "" } }: Props) => {
  const productCategory = await getProductCategoryById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditProductCategoryForm {...productCategory} />
    </Card>
  );
};

export default EditProductCategory;
