"use client";

import { EditProductCategoryPayload, ProductCategory } from "@/services/products/categories/types";
import { ProductCategoryForm } from "../../components/ProductCategoryForm";
import { editProductCategory } from "@/services/products/categories";

const EditProductCategoryForm = ({ id, ...props }: ProductCategory) => {
  const handleSave = (payload: EditProductCategoryPayload) => editProductCategory({ id, payload });

  return (
    <ProductCategoryForm {...props} onSave={handleSave} saveButtonLabel="Save product category" />
  );
};

export { EditProductCategoryForm };
