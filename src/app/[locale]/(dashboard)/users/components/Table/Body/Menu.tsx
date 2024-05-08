import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import MuiMenu from "@mui/material/Menu";
import Link from "next/link";

import { DeactivateUser } from "../../Dialogs/DeactivateUser";
import { ActivateUser } from "../../Dialogs/ActivateUser";
import { SessionPayload } from "@/services/interfaces";
import { User } from "@/services/users/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  anchorEl: Element | null;
  onClose: () => void;
  isOpen?: boolean;
  user: User;
};

const Menu = ({ isOpen = false, anchorEl, onClose, user }: Props) => {
  const { data: session } = useSession({ required: true });
  const userSession = session?.user as SessionPayload;
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
        {!user?.deletedAt ? (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/users/${user?.id ?? ""}`}
            >
              <Icon
                icon={
                  userSession?.entityPermissions?.providers?.permissions?.updateProvider
                    ? "solar:pen-bold-duotone"
                    : "solar:eye-bold-duotone"
                }
              />
              {userSession?.entityPermissions?.users?.permissions?.updateUser
                ? t("Edit")
                : t("View")}
            </Link>
          </MenuItem>
        ) : null}

        {!user?.deletedAt && userSession?.entityPermissions?.users?.permissions?.deactivateUser ? (
          <MenuItem
            className="flex flex-row gap-3 text-red-500"
            onClick={handleOpenDeactivateDialog}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            {t("Deactivate")}
          </MenuItem>
        ) : null}

        {user?.deletedAt && userSession?.entityPermissions?.users?.permissions?.activateUser ? (
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
