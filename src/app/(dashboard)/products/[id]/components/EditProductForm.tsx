"use client";

import { EditProductPayload, Product } from "@/services/products/types";
import { ProductForm } from "../../components/ProductForm";
import { editProduct } from "@/services/products";

const EditProductForm = ({ id, ...props }: Product) => {
  const handleSave = (payload: EditProductPayload) => editProduct({ id, payload });

  return <ProductForm {...props} onSave={handleSave} saveButtonLabel="Save product" />;
};

export { EditProductForm };
