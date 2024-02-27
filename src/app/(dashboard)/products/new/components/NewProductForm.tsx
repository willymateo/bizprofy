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

import { NumberHookForm } from "@/app/components/Inputs/NumberHookForm";
import { CreateProductPayload } from "@/services/interfaces";
import { createProduct } from "@/services/products";
import { useActive } from "@/hooks/useActive";

const NewProductForm = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
  } = useForm<CreateProductPayload>({
    values: {
      description: "",
      unitPrice: 0,
      code: "",
      name: "",
    },
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleCreate = handleSubmit(async data => {
    startLoading();
    setError("");

    try {
      await createProduct(data);

      stopLoading();
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("Error creating product", err);

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
              <Icon icon="solar:code-scan-line-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.code?.message}
        error={Boolean(formError?.code)}
        {...register("code")}
        label="Product code"
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:bag-4-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("name", {
          required: "Product name is required",
        })}
        helperText={formError?.name?.message}
        error={Boolean(formError?.name)}
        label="Product name"
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:chat-line-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.description?.message}
        error={Boolean(formError?.description)}
        label="Additional description"
        {...register("description")}
        multiline
        rows={3}
      />

      <NumberHookForm
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="solar:tag-price-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        helperText={formError?.unitPrice?.message}
        error={Boolean(formError?.unitPrice)}
        {...register("unitPrice", {
          required: "Unit price is required",
          valueAsNumber: true,
          min: 0,
        })}
        label="Unit price"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          Create product
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { NewProductForm };
