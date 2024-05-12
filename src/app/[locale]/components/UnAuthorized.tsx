import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import Link from "next/link";

const UnAuthorized = async () => {
  const t = await getTranslations("Authorization");

  return (
    <div className="flex flex-col gap-5 h-full items-center justify-center">
      <h1>{t("You don't have permission to access to this page")}</h1>

      <Icon icon="solar:shield-cross-bold-duotone" height={300} width={300} />

      <Link href="/" className="no-underline">
        <Button className="rounded-lg normal-case" variant="contained">
          {t("Go back to home page")}
        </Button>
      </Link>
    </div>
  );
};

export { UnAuthorized };
