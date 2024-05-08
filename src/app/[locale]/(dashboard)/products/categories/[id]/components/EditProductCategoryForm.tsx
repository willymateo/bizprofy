"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditProductCategoryPayload, ProductCategory } from "@/services/products/categories/types";
import { ProductCategoryForm } from "../../components/ProductCategoryForm";
import { editProductCategoryById } from "@/services/products/categories";
import { SessionPayload } from "@/services/interfaces";

const EditProductCategoryForm = ({ id, ...props }: ProductCategory) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const handleSave = (payload: EditProductCategoryPayload) =>
    editProductCategoryById({ id, payload });
  const userSession = session?.user as SessionPayload;
  const isEnableToSave =
    userSession?.entityPermissions?.products?.permissions?.updateProductCategory ?? false;

  return (
    <ProductCategoryForm
      saveButtonLabel={t("Save product category")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditProductCategoryForm };
