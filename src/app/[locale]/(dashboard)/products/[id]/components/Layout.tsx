import { getTranslations } from "next-intl/server";
import Chip from "@mui/material/Chip";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";
import { getUserSession } from "@/utils/auth";

type Props = {
  children: ReactNode;
  productId?: string;
};

const Layout = async ({ productId, children }: Readonly<Props>) => {
  const t = await getTranslations("products");
  const userSession = await getUserSession();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1 className="flex flex-wrap gap-3 items-center">
          {userSession?.entityPermissions?.products?.permissions?.updateProduct
            ? t("Edit product")
            : t("Product")}
          {productId && <Chip label={productId ?? ""} color="default" />}
        </h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export default Layout;
