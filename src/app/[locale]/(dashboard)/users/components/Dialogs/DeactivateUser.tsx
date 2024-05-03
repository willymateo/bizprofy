import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { manageUserActivationById } from "@/services/users";
import { User } from "@/services/users/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
  user: User;
};

const DeactivateUser = ({
  user: { id = "", username = "", email = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const deactivateUser = async () => {
    setError(null);
    startLoading();

    try {
      await manageUserActivationById({
        payload: {
          activate: false,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deactivating user", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{t("Deactivate user")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            {t("An error occurred while deactivating the user Please try again later")}.
          </Alert>
        ) : null}

        <DialogContentText>
          {`${t("Are you sure you want to deactivate the user")} `}
          <strong>{username}</strong>
          {` ${t("with email")} `}
          <strong>{email}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {t("Cancel")}
        </Button>

        <Button onClick={deactivateUser} autoFocus disabled={isLoading}>
          {t("Yes, deactivate")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeactivateUser };
