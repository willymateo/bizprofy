import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { useActive } from "@/hooks/useActive";
import { Provider } from "@/services/providers/interfaces";
import { manageProviderActivationById } from "@/services/providers";

type Props = {
  onClose: () => void;
  provider: Provider;
  isOpen?: boolean;
};

const DeactivateProvider = ({
  provider: { id = "", companyName = "", firstNames = "", lastNames = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const deactivateProvider = async () => {
    setError(null);
    startLoading();

    try {
      await manageProviderActivationById({
        payload: {
          activate: false,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deactivating provider", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Deactivate provider</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            An error occurred while deactivating the provider. Please try again later.
          </Alert>
        ) : null}

        <DialogContentText>
          Are you sure you want to deactivate the provider{" "}
          <strong>
            {firstNames} {lastNames}
          </strong>{" "}
          from company <strong>{companyName}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button onClick={deactivateProvider} autoFocus disabled={isLoading}>
          Yes, deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeactivateProvider };
