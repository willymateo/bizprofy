"use client";

import Switch from "@mui/material/Switch";

import { DeactivateProductCategory } from "../Dialogs/DeactivateProductCategory";
import { ActivateProductCategory } from "../Dialogs/ActivateProductCategory";
import { ProductCategory } from "@/services/products/categories/types";
import { useActive } from "@/hooks/useActive";

type Props = {
  productCategory: ProductCategory;
};

const ActivationSwitch = ({ productCategory }: Props) => {
  const {
    isActive: isDeactivateDialogOpen = false,
    disable: closeDeactivateDialog,
    enable: openDeactivateDialog,
  } = useActive();

  const {
    isActive: isActivateDialogOpen = false,
    disable: closeActivateDialog,
    enable: openActivateDialog,
  } = useActive();

  const handleClickActivationSwitch = () => {
    if (productCategory?.deletedAt) {
      return openActivateDialog();
    }

    openDeactivateDialog();
  };

  return (
    <>
      <Switch checked={!productCategory?.deletedAt} onClick={handleClickActivationSwitch} />
      <ActivateProductCategory
        productCategory={productCategory}
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
      />
      <DeactivateProductCategory
        productCategory={productCategory}
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
      />
    </>
  );
};

export { ActivationSwitch };
