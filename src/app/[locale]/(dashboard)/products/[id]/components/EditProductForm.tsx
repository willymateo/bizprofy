"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { EditProductPayload, Product } from "@/services/products/types";
import { ProductForm } from "../../components/ProductForm";
import { SessionPayload } from "@/services/interfaces";
import { editProductById } from "@/services/products";

const EditProductForm = async ({ id, ...props }: Product) => {
  const { data: session } = useSession({ required: true });
  const t = useTranslations();

  const handleSave = (payload: EditProductPayload) => editProductById({ id, payload });
  const userSession = session?.user as SessionPayload;
  const isEnableToSave =
    userSession?.entityPermissions?.products?.permissions?.updateProduct ?? false;

  return (
    <ProductForm
      saveButtonLabel={t("Save product")}
      isEnableToSave={isEnableToSave}
      onSave={handleSave}
      {...props}
    />
  );
};

export { EditProductForm };
