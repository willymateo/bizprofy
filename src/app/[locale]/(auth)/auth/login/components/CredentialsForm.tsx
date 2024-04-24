"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Link from "next/link";

import { LoginPayload } from "@/services/auth/interfaces";
import { useActive } from "@/hooks/useActive";
import { useTranslations } from "next-intl";

const CredentialsForm = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const { isActive: isPasswordVisible = false, toggle: togglePasswordVisibility } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
  } = useForm<LoginPayload>();
  const t = useTranslations();
  const router = useRouter();

  const handleLogin = handleSubmit(async data => {
    startLoading();
    setError("");

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      stopLoading();
      return setError(res.error);
    }

    stopLoading();
    router.push("/");
    router.refresh();
  });

  return (
    <form className="flex flex-col gap-5 justify-center">
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:chat-line-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.emailOrUsername?.message}
        error={Boolean(formError?.emailOrUsername)}
        {...register("emailOrUsername", {
          required: t("This field is required"),
        })}
        label={t("Email or username")}
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
          required: t("Password is required"),
        })}
        placeholder="●●●●●●●●"
        label={t("Password")}
        required
      />

      <div className="flex flex-row items-center justify-end">
        <Link href="/auth/recovery">{t("Forgot password?")}</Link>
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        className="flex flex-row gap-3 rounded-lg normal-case"
        onClick={handleLogin}
        disabled={isLoading}
        variant="contained"
      >
        {t("Login")}
        {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
      </Button>
    </form>
  );
};

export { CredentialsForm };
