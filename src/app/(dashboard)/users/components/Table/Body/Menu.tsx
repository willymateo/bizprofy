import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify-icon/react";
import MuiMenu from "@mui/material/Menu";
import Link from "next/link";

import { DeactivateUser } from "../../Dialogs/DeactivateUser";
import { ActivateUser } from "../../Dialogs/ActivateUser";
import { User } from "@/services/users/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  anchorEl: Element | null;
  onClose: () => void;
  isOpen?: boolean;
  user: User;
};

const Menu = ({ isOpen = false, anchorEl, onClose, user }: Props) => {
  const {
    isActive: isDeleteUserDialogOpen = false,
    disable: closeDeleteUserDialog,
    enable: openDeleteUserDialog,
  } = useActive();

  const {
    isActive: isRestoreUserDialogOpen = false,
    disable: closeRestoreUserDialog,
    enable: openRestoreUserDialog,
  } = useActive();

  const handleOpenDeleteUserDialog = () => {
    openDeleteUserDialog();
    onClose();
  };

  const handleOpenRestoreUserDialog = () => {
    openRestoreUserDialog();
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
        {user?.deletedAt ? null : (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/users/${user?.id ?? ""}`}
            >
              <Icon icon="solar:pen-bold-duotone" />
              Edit
            </Link>
          </MenuItem>
        )}

        {user?.deletedAt ? null : (
          <MenuItem
            onClick={handleOpenDeleteUserDialog}
            className="flex flex-row gap-3 text-red-500"
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            Deactivate
          </MenuItem>
        )}

        {user?.deletedAt ? (
          <MenuItem onClick={handleOpenRestoreUserDialog} className="flex flex-row gap-3">
            <Icon icon="solar:restart-bold-duotone" />
            Activate
          </MenuItem>
        ) : null}
      </MuiMenu>

      <DeactivateUser isOpen={isDeleteUserDialogOpen} onClose={closeDeleteUserDialog} user={user} />
      <ActivateUser isOpen={isRestoreUserDialogOpen} onClose={closeRestoreUserDialog} user={user} />
    </>
  );
};

export { Menu };
