import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";

const metadata: Metadata = {
  description: "Business management system",
  title: "New product | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const NewProductLayout = async ({ children }: Readonly<Props>) => {
  const t = await getTranslations("products");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{t("New product")}</h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export default NewProductLayout;
export { metadata };
