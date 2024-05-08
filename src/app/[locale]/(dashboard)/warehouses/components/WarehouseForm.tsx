"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { CreateWarehousePayload, Warehouse } from "@/services/warehouses/interfaces";
import { useActive } from "@/hooks/useActive";

type Props<T, U> = Partial<Warehouse> & {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
  isEnableToSave?: boolean;
};

const WarehouseForm = <T, U>({
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
  } = useForm<CreateWarehousePayload>({
    values: {
      code: props.code ?? "",
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
              <Icon icon="solar:code-scan-line-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.code?.message}
        error={Boolean(formError?.code)}
        placeholder={t("warehouse-001")}
        label={t("Warehouse code")}
        disabled={!isEnableToSave}
        {...register("code", {})}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:user-hands-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("name", {
          required: t("Warehouse name is required"),
        })}
        placeholder={t("Downtown warehouse")}
        helperText={formError?.name?.message}
        error={Boolean(formError?.name)}
        label={t("Warehouse name")}
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
            {saveButtonLabel || t("Save")}
            {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export { WarehouseForm };
