"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { CreateProductCategoryPayload, ProductCategory } from "@/services/products/interfaces";
import { useActive } from "@/hooks/useActive";

type Props<T, U> = {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
} & Partial<ProductCategory>;

const ProductCategoryForm = <T, U>({ onSave, saveButtonLabel = "Save", ...props }: Props<T, U>) => {
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
          required: "Product category name is required",
        })}
        helperText={formError?.name?.message}
        error={Boolean(formError?.name)}
        label="Product category name"
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          {saveButtonLabel}
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { ProductCategoryForm };
