import { getTranslations } from "next-intl/server";
import Chip from "@mui/material/Chip";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";
import { getUserSession } from "@/utils/auth";

type Props = {
  children: ReactNode;
  userId?: string;
};

const Layout = async ({ userId = "", children }: Readonly<Props>) => {
  const userSession = await getUserSession();
  const t = await getTranslations("users");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1 className="flex flex-wrap gap-3 items-center">
          {userSession?.entityPermissions?.users?.permissions?.updateUser
            ? t("Edit user")
            : t("User")}
          {userId && <Chip label={userId ?? ""} color="default" />}
        </h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export { Layout };
