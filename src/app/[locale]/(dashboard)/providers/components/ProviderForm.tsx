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

import { CreateProviderPayload, Provider } from "@/services/providers/interfaces";
import { EMAIL_REGEX } from "@/shared/constants";
import { useActive } from "@/hooks/useActive";

type Props<T, U> = {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
} & Partial<Provider>;

const ProviderForm = <T, U>({ onSave, saveButtonLabel = "Save", ...props }: Props<T, U>) => {
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
          required: "Company name is required",
        })}
        error={Boolean(formError?.companyName)}
        placeholder="Company Inc."
        label="Company name"
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
          required: "First names are required",
        })}
        error={Boolean(formError?.firstNames)}
        placeholder="John William"
        label="First names"
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
          required: "Last names are required",
        })}
        error={Boolean(formError?.lastNames)}
        placeholder="Doe Smith"
        label="Last names"
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
        placeholder="1234567890"
        label="Id card"
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
            message: "Invalid email address",
            value: EMAIL_REGEX,
          },
        })}
        error={Boolean(formError?.email)}
        placeholder="johndoe@mail.com"
        label="Email address"
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
        label="Phone number"
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:point-on-map-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.address?.message}
        error={Boolean(formError?.address)}
        {...register("address", {})}
        placeholder="1234 Main St, City, Country"
        label="Address"
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

export { ProviderForm };
