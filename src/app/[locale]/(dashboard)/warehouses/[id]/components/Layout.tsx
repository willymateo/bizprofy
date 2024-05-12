import { getTranslations } from "next-intl/server";
import Chip from "@mui/material/Chip";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";
import { getUserSession } from "@/utils/auth";

type Props = {
  warehouseId?: string;
  children: ReactNode;
};

const Layout = async ({ warehouseId, children }: Readonly<Props>) => {
  const t = await getTranslations("warehouses");
  const userSession = await getUserSession();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1 className="flex flex-wrap gap-3 items-center">
          {userSession?.entityPermissions?.warehouses?.permissions?.updateWarehouse
            ? t("Edit warehouse")
            : t("Warehouse")}
          {warehouseId && <Chip label={warehouseId ?? ""} color="default" />}
        </h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export { Layout };
