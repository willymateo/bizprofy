"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Alert from "@mui/material/Alert";
import { Icon } from "@iconify/react";
import { useState } from "react";

import { useActive } from "@/hooks/useActive";
import { createUser } from "@/services/users";
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
} from "@/shared/constants";

interface FormInputs {
  repeatedPassword: string;
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
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
  const router = useRouter();

  const handleSignUp = handleSubmit(async ({ repeatedPassword: _, ...data }) => {
    startLoading();
    setError("");

    try {
      await createUser(data);

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
        helperText={formError?.firstNames?.message}
        {...register("firstNames", {
          required: "First names are required",
        })}
        error={Boolean(formError?.firstNames)}
        placeholder="John William"
        label="First names"
      />

      <TextField
        helperText={formError?.lastNames?.message}
        {...register("lastNames", {
          required: "Last names are required",
        })}
        error={Boolean(formError?.lastNames)}
        placeholder="Doe Smith"
        label="Last names"
      />

      <TextField
        helperText={formError?.email?.message}
        {...register("email", {
          required: "Email is required",
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
        helperText={formError?.username?.message}
        error={Boolean(formError?.username)}
        {...register("username", {
          pattern: {
            message:
              "Username should be in lowercase and can have numbers. The only allowed special characters are '_' and '.'",
            value: USERNAME_REGEX,
          },
          maxLength: {
            message: `Username must be less than ${USERNAME_MAX_LENGTH} characters`,
            value: USERNAME_MAX_LENGTH,
          },
          minLength: {
            message: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
            value: USERNAME_MIN_LENGTH,
          },
          required: "Username is required",
        })}
        placeholder="johndoesmith"
        label="Username"
      />

      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => togglePasswordVisibility()}>
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
          required: "Password is required",
          minLength: {
            message: `Password must be at least ${USERNAME_MIN_LENGTH} characters`,
            value: PASSWORD_MIN_LENGTH,
          },
        })}
        placeholder="●●●●●●●●"
        label="Password"
      />

      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => toggleRepeatedPasswordVisibility()}>
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
          validate: value => value === password || "Passwords don't match",
          required: "This field is required",
        })}
        type={isRepeatedPasswordVisible ? "text" : "password"}
        helperText={formError?.repeatedPassword?.message}
        error={Boolean(formError?.repeatedPassword)}
        label="Repeat password"
        placeholder="●●●●●●●●"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row gap-5 items-center justify-center">
        <Button
          className="!rounded-lg !normal-case"
          onClick={handleSignUp}
          disabled={isLoading}
          variant="contained"
        >
          Create account
        </Button>

        {isLoading && <CircularProgress />}
      </div>
    </form>
  );
};

export { CredentialsForm };
