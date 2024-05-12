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

import { CreateProviderPayload, Provider } from "@/services/providers/interfaces";
import { useActive } from "@/hooks/useActive";
import { EMAIL_REGEX } from "@/constants";

type Props<T, U> = Partial<Provider> & {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
  isEnableToSave?: boolean;
};

const ProviderForm = <T, U>({
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
  } = useForm<CreateProviderPayload>({
    values: {
      companyName: props.companyName ?? "",
      phoneNumber: props.phoneNumber ?? "",
      firstNames: props.firstNames ?? "",
      lastNames: props.lastNames ?? "",
      address: props.address ?? "",
      idCard: props.idCard ?? "",
      email: props.email ?? "",
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
      router.push("/providers");
      router.refresh();
    } catch (err) {
      console.error("Error creating provider", err);

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
              <Icon icon="solar:buildings-3-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.companyName?.message}
        {...register("companyName", {
          required: t("Company name is required"),
        })}
        error={Boolean(formError?.companyName)}
        placeholder={t("Company Inc")}
        disabled={!isEnableToSave}
        label={t("Company name")}
        required
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:user-hands-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.firstNames?.message}
        {...register("firstNames", {
          required: t("First names are required"),
        })}
        error={Boolean(formError?.firstNames)}
        placeholder="John William"
        disabled={!isEnableToSave}
        label={t("First names")}
        required
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:user-hands-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.lastNames?.message}
        {...register("lastNames", {
          required: t("Last names are required"),
        })}
        error={Boolean(formError?.lastNames)}
        disabled={!isEnableToSave}
        label={t("Last names")}
        placeholder="Doe Smith"
        required
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:card-2-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.idCard?.message}
        error={Boolean(formError?.idCard)}
        {...register("idCard", {})}
        disabled={!isEnableToSave}
        placeholder="1234567890"
        label={t("ID card")}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:chat-line-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.email?.message}
        {...register("email", {
          pattern: {
            message: t("Invalid email address"),
            value: EMAIL_REGEX,
          },
        })}
        error={Boolean(formError?.email)}
        placeholder="johndoe@mail.com"
        label={t("Email address")}
        disabled={!isEnableToSave}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:phone-calling-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.phoneNumber?.message}
        error={Boolean(formError?.phoneNumber)}
        {...register("phoneNumber", {})}
        placeholder="+1 99 999 9999"
        disabled={!isEnableToSave}
        label={t("Phone number")}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:point-on-map-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        placeholder={t("1234 Main St, City, Country")}
        helperText={formError?.address?.message}
        error={Boolean(formError?.address)}
        {...register("address", {})}
        disabled={!isEnableToSave}
        label={t("Address")}
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

export { ProviderForm };
