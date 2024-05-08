"use client";

import { useSession } from "next-auth/react";
import Switch from "@mui/material/Switch";

import { DeactivateProduct } from "../Dialogs/DeactivateProduct";
import { ActivateProduct } from "../Dialogs/ActivateProduct";
import { SessionPayload } from "@/services/interfaces";
import { Product } from "@/services/products/types";
import { useActive } from "@/hooks/useActive";

type Props = {
  product: Product;
};

const ActivationSwitch = ({ product }: Props) => {
  const { data: session } = useSession({ required: true });
  const userSession = session?.user as SessionPayload;

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

  const isEnabled = () => {
    if (product?.deletedAt) {
      return userSession?.entityPermissions?.products?.permissions?.activateProduct;
    }

    return userSession?.entityPermissions?.products?.permissions?.deactivateProduct;
  };

  return (
    <>
      <Switch
        onClick={handleClickActivationSwitch}
        checked={!product?.deletedAt}
        disabled={!isEnabled()}
      />

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
