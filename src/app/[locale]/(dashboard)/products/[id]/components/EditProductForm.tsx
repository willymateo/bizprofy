"use client";

import { useTranslations } from "next-intl";

import { EditProductPayload, Product } from "@/services/products/types";
import { ProductForm } from "../../components/ProductForm";
import { editProductById } from "@/services/products";

const EditProductForm = async ({ id, ...props }: Product) => {
  const t = useTranslations();

  const handleSave = (payload: EditProductPayload) => editProductById({ id, payload });

  return <ProductForm {...props} onSave={handleSave} saveButtonLabel={t("Save product")} />;
};

export { EditProductForm };
