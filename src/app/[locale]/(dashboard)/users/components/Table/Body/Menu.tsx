import MenuItem from "@mui/material/MenuItem";
import { useTranslations } from "next-intl";
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
    isActive: isDeactivateDialogOpen = false,
    disable: closeDeactivateDialog,
    enable: openDeactivateDialog,
  } = useActive();
  const t = useTranslations();

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
        {user?.deletedAt ? null : (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/users/${user?.id ?? ""}`}
            >
              <Icon icon="solar:pen-bold-duotone" />
              {t("Edit")}
            </Link>
          </MenuItem>
        )}

        {user?.deletedAt ? null : (
          <MenuItem
            className="flex flex-row gap-3 text-red-500"
            onClick={handleOpenDeactivateDialog}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            {t("Deactivate")}
          </MenuItem>
        )}

        {user?.deletedAt ? (
          <MenuItem onClick={handleOpenActivateDialog} className="flex flex-row gap-3">
            <Icon icon="solar:restart-bold-duotone" />
            {t("Activate")}
          </MenuItem>
        ) : null}
      </MuiMenu>

      <ActivateUser isOpen={isActivateDialogOpen} onClose={closeActivateDialog} user={user} />
      <DeactivateUser isOpen={isDeactivateDialogOpen} onClose={closeDeactivateDialog} user={user} />
    </>
  );
};

export { Menu };
