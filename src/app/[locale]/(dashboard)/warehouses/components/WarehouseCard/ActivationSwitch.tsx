"use client";

import { useSession } from "next-auth/react";
import Switch from "@mui/material/Switch";

import { DeactivateWarehouse } from "../Dialogs/DeactivateWarehouse";
import { ActivateWarehouse } from "../Dialogs/ActivateWarehouse";
import { Warehouse } from "@/services/warehouses/interfaces";
import { SessionPayload } from "@/services/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  warehouse: Warehouse;
};

const ActivationSwitch = ({ warehouse }: Props) => {
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
    if (warehouse?.deletedAt) {
      return openActivateDialog();
    }

    openDeactivateDialog();
  };

  const isEnabled = () => {
    if (warehouse?.deletedAt) {
      return userSession?.entityPermissions?.warehouses?.permissions?.activateWarehouse;
    }

    return userSession?.entityPermissions?.warehouses?.permissions?.deactivateWarehouse;
  };

  return (
    <>
      <Switch
        onClick={handleClickActivationSwitch}
        checked={!warehouse?.deletedAt}
        disabled={!isEnabled()}
      />

      <ActivateWarehouse
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
        warehouse={warehouse}
      />
      <DeactivateWarehouse
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
        warehouse={warehouse}
      />
    </>
  );
};

export { ActivationSwitch };
