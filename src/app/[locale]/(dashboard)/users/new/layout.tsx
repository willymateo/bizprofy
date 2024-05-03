import type { Metadata } from "next";
import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";
import { Return as ReturnButton } from "@/app/[locale]/components/Buttons/Return";

const metadata: Metadata = {
  description: "Business management system",
  title: "New user | Bizprofy",
};

interface Props {
  children: ReactNode;
}

const NewUserLayout = async ({ children }: Readonly<Props>) => {
  const t = await getTranslations("users");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{t("New user")}</h1>

        <ReturnButton className="w-fit">{t("Cancel")}</ReturnButton>
      </div>

      {children}
    </div>
  );
};

export default NewUserLayout;
export { metadata };
