import MenuItem from "@mui/material/MenuItem";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import MuiMenu from "@mui/material/Menu";
import Link from "next/link";

import { DeactivateProvider } from "../../Dialogs/DeactivateProvider";
import { ActivateProvider } from "../../Dialogs/ActivateProvider";
import { Provider } from "@/services/providers/interfaces";
import { SessionPayload } from "@/services/interfaces";
import { useActive } from "@/hooks/useActive";
import { useSession } from "next-auth/react";

type Props = {
  anchorEl: Element | null;
  onClose: () => void;
  provider: Provider;
  isOpen?: boolean;
};

const Menu = ({ isOpen = false, anchorEl, onClose, provider }: Props) => {
  const { data: session } = useSession({ required: true });
  const userSession = session?.user as SessionPayload;
  const t = useTranslations();

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
        {!provider?.deletedAt ? (
          <MenuItem>
            <Link
              className="flex flex-row gap-3 w-full items-center no-underline text-black"
              href={`/providers/${provider?.id ?? ""}`}
            >
              <Icon
                icon={
                  userSession?.entityPermissions?.providers?.permissions?.updateProvider
                    ? "solar:pen-bold-duotone"
                    : "solar:eye-bold-duotone"
                }
              />
              {userSession?.entityPermissions?.providers?.permissions?.updateProvider
                ? t("Edit")
                : t("View")}
            </Link>
          </MenuItem>
        ) : null}

        {!provider?.deletedAt &&
        userSession?.entityPermissions?.providers?.permissions?.deactivateProvider ? (
          <MenuItem
            className="flex flex-row gap-3 text-red-500"
            onClick={handleOpenDeactivateDialog}
          >
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
            {t("Deactivate")}
          </MenuItem>
        ) : null}

        {provider?.deletedAt &&
        userSession?.entityPermissions?.providers?.permissions?.activateProvider ? (
          <MenuItem onClick={handleOpenActivateDialog} className="flex flex-row gap-3">
            <Icon icon="solar:restart-bold-duotone" />
            {t("Activate")}
          </MenuItem>
        ) : null}
      </MuiMenu>

      <ActivateProvider
        isOpen={isActivateDialogOpen}
        onClose={closeActivateDialog}
        provider={provider}
      />
      <DeactivateProvider
        isOpen={isDeactivateDialogOpen}
        onClose={closeDeactivateDialog}
        provider={provider}
      />
    </>
  );
};

export { Menu };
