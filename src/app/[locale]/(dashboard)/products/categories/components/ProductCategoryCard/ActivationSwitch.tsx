"use client";

import { useSession } from "next-auth/react";
import Switch from "@mui/material/Switch";

import { DeactivateProductCategory } from "../Dialogs/DeactivateProductCategory";
import { ActivateProductCategory } from "../Dialogs/ActivateProductCategory";
import { ProductCategory } from "@/services/products/categories/types";
import { SessionPayload } from "@/services/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  productCategory: ProductCategory;
};

const ActivationSwitch = ({ productCategory }: Props) => {
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
    if (productCategory?.deletedAt) {
      return openActivateDialog();
    }

    openDeactivateDialog();
  };

  const isEnabled = () => {
    if (productCategory?.deletedAt) {
      return userSession?.entityPermissions?.products?.permissions?.activateProductCategory;
    }

    return userSession?.entityPermissions?.products?.permissions?.deactivateProductCategory;
  };

  return (
    <>
      <Switch
        checked={!productCategory?.deletedAt}
        onClick={handleClickActivationSwitch}
        disabled={!isEnabled()}
      />

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
