"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { CreateUserPayload, User } from "@/services/users/interfaces";
import { useActive } from "@/hooks/useActive";
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
} from "@/shared/constants";

type Props<T, U> = {
  onSave: (data: T) => Promise<U>;
  isPasswordRequired?: boolean;
  saveButtonLabel?: string;
} & Partial<User>;

type FormInputs = {
  repeatedPassword: string;
} & CreateUserPayload;

const UserForm = <T, U>({
  isPasswordRequired = false,
  saveButtonLabel,
  onSave,
  ...props
}: Props<T, U>) => {
  const { isActive: isRepeatedPasswordVisible = false, toggle: toggleRepeatedPasswordVisibility } =
    useActive();
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const { isActive: isPasswordVisible = false, toggle: togglePasswordVisibility } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
    watch,
  } = useForm<FormInputs>({
    values: {
      firstNames: props.firstNames ?? "",
      lastNames: props.lastNames ?? "",
      username: props.username ?? "",
      email: props.email ?? "",
      repeatedPassword: "",
      password: "",
    },
  });
  const password = watch("password");
  const t = useTranslations();
  const router = useRouter();

  const handleCreate = handleSubmit(async ({ repeatedPassword: _, ...data }) => {
    startLoading();
    setError("");

    try {
      await onSave(data as T);

      stopLoading();
      router.push("/users");
      router.refresh();
    } catch (err) {
      console.error("Error creating user", err);

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
        helperText={formError?.firstNames?.message}
        {...register("firstNames", {
          required: t("First names are required"),
        })}
        error={Boolean(formError?.firstNames)}
        placeholder="John William"
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
        placeholder="Doe Smith"
        label={t("Last names")}
        required
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
          required: t("Email is required"),
          pattern: {
            message: t("Invalid email address"),
            value: EMAIL_REGEX,
          },
        })}
        error={Boolean(formError?.email)}
        placeholder="johndoe@mail.com"
        label={t("Email address")}
        required
      />

      <TextField
        {...register("username", {
          pattern: {
            message: t(
              "Username should be in lowercase and can have numbers The only allowed special characters are '_' and ''",
            ),
            value: USERNAME_REGEX,
          },
          maxLength: {
            message: t("Username must be less than {maxLength} characters", {
              maxLength: USERNAME_MAX_LENGTH,
            }),
            value: USERNAME_MAX_LENGTH,
          },
          minLength: {
            message: t("Username must be at least {minLength} characters", {
              minLength: USERNAME_MIN_LENGTH,
            }),
            value: USERNAME_MIN_LENGTH,
          },
          required: t("Username is required"),
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:user-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.username?.message}
        error={Boolean(formError?.username)}
        placeholder="johndoesmith"
        label={t("Username")}
        required
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:lock-password-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => togglePasswordVisibility()}>
                {isPasswordVisible ? (
                  <Icon icon="solar:eye-closed-line-duotone" />
                ) : (
                  <Icon icon="solar:eye-bold-duotone" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={isPasswordVisible ? "text" : "password"}
        helperText={formError?.password?.message}
        error={Boolean(formError?.password)}
        {...register("password", {
          minLength: {
            message: t("Password must be at least {minLength} characters", {
              minLength: PASSWORD_MIN_LENGTH,
            }),
            value: PASSWORD_MIN_LENGTH,
          },
          ...(isPasswordRequired && {
            required: t("Password is required"),
          }),
        })}
        required={isPasswordRequired}
        placeholder="●●●●●●●●"
        label={t("Password")}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:lock-password-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => toggleRepeatedPasswordVisibility()}>
                {isRepeatedPasswordVisible ? (
                  <Icon icon="solar:eye-closed-line-duotone" />
                ) : (
                  <Icon icon="solar:eye-bold-duotone" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register("repeatedPassword", {
          validate: value => value === password || t("Passwords don't match"),
          ...(isPasswordRequired && {
            required: t("This field is required"),
          }),
        })}
        type={isRepeatedPasswordVisible ? "text" : "password"}
        helperText={formError?.repeatedPassword?.message}
        error={Boolean(formError?.repeatedPassword)}
        required={isPasswordRequired}
        label={t("Repeat password")}
        placeholder="●●●●●●●●"
      />

      {error && <Alert severity="error">{error}</Alert>}

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
    </form>
  );
};

export { UserForm };
