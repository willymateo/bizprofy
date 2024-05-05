import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify-icon/react";

const NoWarehousesFound = async () => {
  const t = await getTranslations("warehouses");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />

      <p className="text-2xl">{t("You haven't created your first warehouse yet")}</p>
    </div>
  );
};

export { NoWarehousesFound };
