import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Readonly<Props>) => {
  const t = await getTranslations("warehouses");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{t("New warehouse")}</h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export { Layout };
