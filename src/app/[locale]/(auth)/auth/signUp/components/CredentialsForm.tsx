"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { SignUpPayload } from "@/services/auth/interfaces";
import { useActive } from "@/hooks/useActive";
import { signUp } from "@/services/auth";
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
} from "@/shared/constants";

interface FormInputs extends SignUpPayload {
  repeatedPassword: string;
}

const CredentialsForm = () => {
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
  } = useForm<FormInputs>();
  const password = watch("password");
  const t = useTranslations();
  const router = useRouter();

  const handleSignUp = handleSubmit(async ({ repeatedPassword: _, ...data }) => {
    startLoading();
    setError("");

    try {
      await signUp(data);

      const { email, password } = data ?? {};
      const res = await signIn("credentials", {
        emailOrUsername: email,
        redirect: false,
        password,
      });

      if (res?.error) {
        stopLoading();

        return setError(res.error);
      }

      stopLoading();
      router.push("/");
      return router.refresh();
    } catch (err) {
      console.log("Error creating user: ", err);

      setError((err as Error).message);
    }

    stopLoading();
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
          required: t("Password is required"),
          minLength: {
            message: t("Password must be at least {minLength} characters", {
              minLength: PASSWORD_MIN_LENGTH,
            }),
            value: PASSWORD_MIN_LENGTH,
          },
        })}
        placeholder="●●●●●●●●"
        label={t("Password")}
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
          required: t("This field is required"),
        })}
        type={isRepeatedPasswordVisible ? "text" : "password"}
        helperText={formError?.repeatedPassword?.message}
        error={Boolean(formError?.repeatedPassword)}
        label={t("Repeat password")}
        placeholder="●●●●●●●●"
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        className="flex flex-row gap-3 rounded-lg normal-case"
        onClick={handleSignUp}
        disabled={isLoading}
        variant="contained"
      >
        {t("Create account")}
        {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
      </Button>
    </form>
  );
};

export { CredentialsForm };
