import { getTranslations } from "next-intl/server";
import Chip from "@mui/material/Chip";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";
import { getUserSession } from "@/utils/auth";

const metadata: Metadata = {
  description: "Business management system",
  title: "Edit product category | Bizprofy",
};

type Props = {
  productCategoryId?: string;
  children: ReactNode;
};

const Layout = async ({ productCategoryId, children }: Readonly<Props>) => {
  const t = await getTranslations("products.categories");
  const userSession = await getUserSession();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1 className="flex flex-wrap gap-3 items-center">
          {userSession?.entityPermissions?.products?.permissions?.updateProductCategory
            ? t("Edit product category")
            : t("Product category")}
          {productCategoryId && <Chip label={productCategoryId ?? ""} color="default" />}
        </h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export default Layout;
export { metadata };
