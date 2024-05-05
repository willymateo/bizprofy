"use client";

import Switch from "@mui/material/Switch";

import { DeactivateProduct } from "../Dialogs/DeactivateProduct";
import { ActivateProduct } from "../Dialogs/ActivateProduct";
import { Product } from "@/services/products/types";
import { useActive } from "@/hooks/useActive";

type Props = {
  product: Product;
};

const ActivationSwitch = ({ product }: Props) => {
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
    if (product?.deletedAt) {
      return openActivateDialog();
    }

    openDeactivateDialog();
  };

  return (
    <>
      <Switch checked={!product?.deletedAt} onClick={handleClickActivationSwitch} />
      <ActivateProduct
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
        product={product}
      />
      <DeactivateProduct
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
        product={product}
      />
    </>
  );
};

export { ActivationSwitch };
