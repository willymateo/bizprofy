import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import Link from "next/link";

import { getUserSession } from "@/utils/auth";

type Props = {
  children?: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const t = await getTranslations("warehouses");
  const userSession = await getUserSession();

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{t("Warehouses")}</h1>

        {userSession?.entityPermissions?.warehouses?.permissions?.createWarehouse ? (
          <Link href="/warehouses/new" className="no-underline">
            <Button
              startIcon={<Icon icon="eva:plus-fill" />}
              className="rounded-lg normal-case"
              variant="contained"
            >
              {t("Add warehouse")}
            </Button>
          </Link>
        ) : null}
      </div>

      {children}
    </div>
  );
};

export { Layout };
