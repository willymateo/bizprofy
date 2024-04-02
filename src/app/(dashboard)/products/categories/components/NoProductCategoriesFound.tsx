import { Icon } from "@iconify-icon/react";

const NoProductCategoriesFound = () => (
  <div className="flex flex-col items-center justify-center h-full gap-10">
    <Icon icon="solar:ghost-smile-line-duotone" height={200} width={200} />

    <p className="text-2xl">You haven't created your first product category yet</p>
  </div>
);

export { NoProductCategoriesFound };