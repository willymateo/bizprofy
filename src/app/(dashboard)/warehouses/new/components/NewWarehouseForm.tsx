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

import { CreateWarehousePayload } from "@/services/warehouses/interfaces";
import { createWarehouse } from "@/services/warehouses";
import { useActive } from "@/hooks/useActive";

const NewWarehouseForm = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
  } = useForm<CreateWarehousePayload>({
    values: {
      code: "",
      name: "",
    },
  });
  const router = useRouter();

  const handleCreate = handleSubmit(async data => {
    startLoading();
    setError("");

    try {
      await createWarehouse(data);

      stopLoading();
      router.push("/warehouses");
      router.refresh();
    } catch (err) {
      console.error("Error creating warehouse", err);

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
              <Icon icon="solar:user-hands-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.code?.message}
        error={Boolean(formError?.code)}
        placeholder="warehouse-001"
        {...register("code", {})}
        label="Warehouse code"
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:user-hands-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.name?.message}
        {...register("name", {
          required: "Warehouse name is required",
        })}
        error={Boolean(formError?.name)}
        placeholder="Downtown warehouse"
        label="Warehouse name"
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
          Create warehouse
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { NewWarehouseForm };
