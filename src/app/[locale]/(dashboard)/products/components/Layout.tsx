import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children?: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const t = await getTranslations("products");

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-row gap-5 items-center justify-between">
        <h1>{t("Products")}</h1>

        <Link href="/products/new" className="no-underline">
          <Button
            className="rounded-lg normal-case"
            startIcon={<Icon icon="eva:plus-fill" />}
            variant="contained"
          >
            {t("Add product")}
          </Button>
        </Link>
      </div>

      {children}
    </div>
  );
};

export { Layout };
