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

import { manageProductActivationById } from "@/services/products";
import { Product } from "@/services/products/types";
import { useActive } from "@/hooks/useActive";

type Props = {
  onClose: () => void;
  product: Product;
  isOpen?: boolean;
};

const ActivateProduct = ({ product: { id = "", name = "" }, isOpen = false, onClose }: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations();
  const router = useRouter();

  const activateProduct = async () => {
    setError(null);
    startLoading();

    try {
      await manageProductActivationById({
        payload: {
          activate: true,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error activating product", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>{t("Activate product")}</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            {t("An error occurred while activating the product Please try again later")}.
          </Alert>
        ) : null}

        <DialogContentText>
          {`${t("Are you sure you want to activate the product")}`} <strong>{name}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {t("Cancel")}
        </Button>

        <Button onClick={activateProduct} autoFocus disabled={isLoading}>
          {t("Yes, activate")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ActivateProduct };
