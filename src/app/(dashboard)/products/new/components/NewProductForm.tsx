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

import { useActive } from "@/hooks/useActive";

interface FormInputs {
  description: string;
  unitPrice: number;
  code: string;
  name: string;
}

const NewProductForm = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<FormInputs>();

  const handleCreate = handleSubmit(async data => {
    startLoading();
    setError("");

    try {
      console.log("Creating product", data);
    } catch (err) {
      console.error("Error creating product", err);
    }

    stopLoading();
    router.push("/products");
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
        helperText={formError?.code?.message}
        error={Boolean(formError?.code)}
        label="Additional description"
        {...register("code")}
        multiline
        rows={3}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:tag-price-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("unitPrice", {
          required: "Unit price is required",
        })}
        helperText={formError?.unitPrice?.message}
        error={Boolean(formError?.unitPrice)}
        label="Unit price"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        className="flex flex-row gap-3 rounded-lg normal-case"
        onClick={handleCreate}
        disabled={isLoading}
        variant="contained"
      >
        Create product
        {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
      </Button>
    </form>
  );
};

export { NewProductForm };
