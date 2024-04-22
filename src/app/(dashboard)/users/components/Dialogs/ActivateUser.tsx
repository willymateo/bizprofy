import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { User } from "@/services/users/interfaces";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { manageUserActivationById } from "@/services/users";
import { useActive } from "@/hooks/useActive";

type Props = {
  onClose: () => void;
  isOpen?: boolean;
  user: User;
};

const ActivateUser = ({
  user: { id = "", username = "", email = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const handleRestoreUser = async () => {
    setError(null);
    startLoading();

    try {
      await manageUserActivationById({
        payload: {
          activate: true,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deleting user", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Activate user</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            An error occurred while activating the user. Please try again later.
          </Alert>
        ) : null}

        <DialogContentText id="alert-dialog-description">
          Are you sure you want to activate the user <strong>{username}</strong> with email{" "}
          <strong>{email}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button onClick={handleRestoreUser} autoFocus disabled={isLoading}>
          Yes, activate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ActivateUser };
