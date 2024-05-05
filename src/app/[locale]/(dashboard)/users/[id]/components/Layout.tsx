import { getTranslations } from "next-intl/server";
import Chip from "@mui/material/Chip";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";

type Props = {
  children: ReactNode;
  params: Params;
};

type Params = {
  id: string;
};

const Layout = async ({ params, children }: Readonly<Props>) => {
  const t = await getTranslations("users");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1 className="flex flex-wrap gap-3 items-center">
          {t("Edit user")}
          {params?.id && <Chip label={params?.id ?? ""} color="default" />}
        </h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export { Layout };
