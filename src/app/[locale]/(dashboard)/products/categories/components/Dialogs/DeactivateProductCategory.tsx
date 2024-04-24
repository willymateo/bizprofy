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

import { manageProductCategoryActivationById } from "@/services/products/categories";
import { ProductCategory } from "@/services/products/categories/types";
import { useActive } from "@/hooks/useActive";

type Props = {
  productCategory: ProductCategory;
  onClose: () => void;
  isOpen?: boolean;
};

const DeactivateProductCategory = ({
  productCategory: { id = "", name = "" },
  isOpen = false,
  onClose,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const deactivateProductCategory = async () => {
    setError(null);
    startLoading();

    try {
      await manageProductCategoryActivationById({
        payload: {
          activate: false,
          force: false,
        },
        id,
      });

      onClose();
      router.refresh();
    } catch (err) {
      console.log("Error deactivating product category", err);

      setError(err as Error);
    }

    stopLoading();
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Deactivate product category</DialogTitle>

      <DialogContent className="flex flex-col gap-5 items-center">
        {error ? (
          <Alert variant="filled" severity="error" className="w-full">
            An error occurred while deactivating the product category. Please try again later.
          </Alert>
        ) : null}

        <DialogContentText>
          Are you sure you want to deactivate the product category <strong>{name}</strong>?
        </DialogContentText>

        {isLoading ? <CircularProgress /> : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button onClick={deactivateProductCategory} autoFocus disabled={isLoading}>
          Yes, deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeactivateProductCategory };
