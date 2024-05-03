import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const t = await getTranslations("stock.current");

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1>{t("Current stock status")}</h1>

      {children}
    </div>
  );
};

export { Layout };
