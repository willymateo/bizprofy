"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import {
  CreateProductCategoryPayload,
  ProductCategory,
} from "@/services/products/categories/types";
import { useActive } from "@/hooks/useActive";

type Props<T, U> = Partial<ProductCategory> & {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
  isEnableToSave?: boolean;
};

const ProductCategoryForm = <T, U>({
  isEnableToSave = false,
  saveButtonLabel,
  onSave,
  ...props
}: Props<T, U>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
  } = useForm<CreateProductCategoryPayload>({
    values: {
      name: props.name ?? "",
    },
  });
  const t = useTranslations();
  const router = useRouter();

  const handleCreate = handleSubmit(async data => {
    startLoading();
    setError("");

    try {
      await onSave(data as T);

      stopLoading();
      router.push("/products/categories");
      router.refresh();
    } catch (err) {
      console.error("Error creating product category", err);

      setError((err as Error).message);
      stopLoading();
    }
  });

  return (
    <form className="flex flex-col gap-5 justify-center">
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:bag-smile-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("name", {
          required: t("Product category name is required"),
        })}
        helperText={formError?.name?.message}
        label={t("Product category name")}
        error={Boolean(formError?.name)}
        disabled={!isEnableToSave}
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      {isEnableToSave ? (
        <div className="flex flex-row items-center justify-center">
          <Button
            className="flex flex-row gap-3 rounded-lg normal-case"
            onClick={handleCreate}
            disabled={isLoading}
            variant="contained"
          >
            {saveButtonLabel ?? t("Save")}
            {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export { ProductCategoryForm };
