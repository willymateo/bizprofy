"use client";

import Switch from "@mui/material/Switch";

import { DeactivateWarehouse } from "../Dialogs/DeactivateWarehouse";
import { ActivateWarehouse } from "../Dialogs/ActivateWarehouse";
import { Warehouse } from "@/services/warehouses/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  warehouse: Warehouse;
};

const ActivationSwitch = ({ warehouse }: Props) => {
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

  return (
    <>
      <Switch checked={!warehouse?.deletedAt} onClick={handleClickActivationSwitch} />
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
