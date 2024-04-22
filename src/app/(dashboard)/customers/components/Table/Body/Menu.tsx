import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify-icon/react";
import MuiMenu from "@mui/material/Menu";
import Link from "next/link";

import { DeactivateCustomer } from "../../Dialogs/DeactivateCustomer";
import { ActivateCustomer } from "../../Dialogs/ActivateCustomer";
import { Customer } from "@/services/customers/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  anchorEl: Element | null;
  onClose: () => void;
  customer: Customer;
  isOpen?: boolean;
};

const Menu = ({ isOpen = false, anchorEl, onClose, customer }: Props) => {
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

  const handleOpenDeactivateDialog = () => {
    openDeactivateDialog();
    onClose();
  };

  const handleOpenActivateDialog = () => {
    openActivateDialog();
    onClose();
  };

  return (
    <>
      <MuiMenu
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        anchorEl={anchorEl}
        onClose={onClose}
        open={isOpen}
      >
        {customer?.deletedAt ? null : (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/customers/${customer?.id ?? ""}`}
            >
              <Icon icon="solar:pen-bold-duotone" />
              Edit
            </Link>
          </MenuItem>
        )}

        {customer?.deletedAt ? null : (
          <MenuItem
            className="flex flex-row gap-3 text-red-500"
            onClick={handleOpenDeactivateDialog}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            Deactivate
          </MenuItem>
        )}

        {customer?.deletedAt ? (
          <MenuItem onClick={handleOpenActivateDialog} className="flex flex-row gap-3">
            <Icon icon="solar:restart-bold-duotone" />
            Activate
          </MenuItem>
        ) : null}
      </MuiMenu>

      <DeactivateCustomer
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
        customer={customer}
      />
      <ActivateCustomer
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
        customer={customer}
      />
    </>
  );
};

export { Menu };
