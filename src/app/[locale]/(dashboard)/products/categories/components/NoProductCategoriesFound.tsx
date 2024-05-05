import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify-icon/react";

const NoProductCategoriesFound = async () => {
  const t = await getTranslations("products.categories");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />

      <p className="text-2xl">{t("You haven't created your first product category yet")}</p>
    </div>
  );
};

export { NoProductCategoriesFound };
