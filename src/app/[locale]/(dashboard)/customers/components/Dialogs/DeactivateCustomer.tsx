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

import { manageCustomerActivationById } from "@/services/customers";
import { Customer } from "@/services/customers/interfaces";
import { useActive } from "@/hooks/useActive";

type Props = {
  onClose: () => void;
  customer: Customer;
  isOpen?: boolean;
};

const DeactivateCustomer = ({
  customer: { id = "", idCard = "", firstNames = "", lastNames = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const deactivateCustomer = async () => {
    setError(null);
    startLoading();

    try {
      await manageCustomerActivationById({
        payload: {
          activate: false,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deactivating customer", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{t("Deactivate customer")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            {t("An error occurred while deactivating the customer Please try again later")}.
          </Alert>
        ) : null}

        <DialogContentText>
          {`${t("Are you sure you want to deactivate the customer")} `}
          <strong>
            {firstNames} {lastNames}
          </strong>
          {` ${t("with ID card")} `}
          <strong>{idCard}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {t("Cancel")}
        </Button>

        <Button onClick={deactivateCustomer} autoFocus disabled={isLoading}>
          {t("Yes, deactivate")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeactivateCustomer };
