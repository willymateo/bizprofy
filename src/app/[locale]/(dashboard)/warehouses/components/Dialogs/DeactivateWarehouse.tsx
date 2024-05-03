import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { manageWarehouseActivationById } from "@/services/warehouses";
import { Warehouse } from "@/services/warehouses/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  warehouse: Warehouse;
  onClose: () => void;
  isOpen?: boolean;
};

const DeactivateWarehouse = ({
  warehouse: { id = "", name = "", code = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const deactivateWarehouse = async () => {
    setError(null);
    startLoading();

    try {
      await manageWarehouseActivationById({
        payload: {
          activate: false,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deactivating warehouse", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{t("Deactivate warehouse")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            {t("An error occurred while deactivating the warehouse Please try again later")}.
          </Alert>
        ) : null}

        <DialogContentText>
          {`${t("Are you sure you want to deactivate the warehouse")}`} <strong>{name}</strong>
          {code ? (
            <>
              {` ${t("with code")} `}
              <strong>{code}</strong>
            </>
          ) : null}
          ?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {t("Cancel")}
        </Button>

        <Button onClick={deactivateWarehouse} autoFocus disabled={isLoading}>
          {t("Yes, deactivate")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeactivateWarehouse };
