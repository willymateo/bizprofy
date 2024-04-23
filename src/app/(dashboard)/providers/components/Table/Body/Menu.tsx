import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify-icon/react";
import MuiMenu from "@mui/material/Menu";
import Link from "next/link";

import { DeactivateProvider } from "../../Dialogs/DeactivateProvider";
import { ActivateProvider } from "../../Dialogs/ActivateProvider";
import { Provider } from "@/services/providers/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  anchorEl: Element | null;
  onClose: () => void;
  provider: Provider;
  isOpen?: boolean;
};

const Menu = ({ isOpen = false, anchorEl, onClose, provider }: Props) => {
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
        {provider?.deletedAt ? null : (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/providers/${provider?.id ?? ""}`}
            >
              <Icon icon="solar:pen-bold-duotone" />
              Edit
            </Link>
          </MenuItem>
        )}

        {provider?.deletedAt ? null : (
          <MenuItem
            className="flex flex-row gap-3 text-red-500"
            onClick={handleOpenDeactivateDialog}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            Deactivate
          </MenuItem>
        )}

        {provider?.deletedAt ? (
          <MenuItem onClick={handleOpenActivateDialog} className="flex flex-row gap-3">
            <Icon icon="solar:restart-bold-duotone" />
            Activate
          </MenuItem>
        ) : null}
      </MuiMenu>

      <DeactivateProvider
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
        provider={provider}
      />
      <ActivateProvider
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
        provider={provider}
      />
    </>
  );
};

export { Menu };
