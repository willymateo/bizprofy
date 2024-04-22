import Card from "@mui/material/Card";

import { EditProductForm } from "./components/EditProductForm";
import { getProductById } from "@/services/products";

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

const EditProduct = async ({ params: { id = "" } }: Props) => {
  const product = await getProductById({ id });

  return (
    <Card className="flex flex-col gap-10 p-10 rounded-2xl">
      <EditProductForm {...product} />
    </Card>
  );
};

export default EditProduct;
