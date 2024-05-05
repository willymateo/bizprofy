"use client";

import { useTranslations } from "next-intl";

import { EditProductCategoryPayload, ProductCategory } from "@/services/products/categories/types";
import { ProductCategoryForm } from "../../components/ProductCategoryForm";
import { editProductCategoryById } from "@/services/products/categories";

const EditProductCategoryForm = ({ id, ...props }: ProductCategory) => {
  const t = useTranslations();

  const handleSave = (payload: EditProductCategoryPayload) =>
    editProductCategoryById({ id, payload });

  return (
    <ProductCategoryForm
      saveButtonLabel={t("Save product category")}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditProductCategoryForm };
