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
import Link from "next/link";

import { useActive } from "@/hooks/useActive";

interface FormInputs {
  emailOrUsername: string;
  password: string;
}

const CredentialsForm = () => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const { isActive: isPasswordVisible = false, toggle: togglePasswordVisibility } = useActive();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<FormInputs>();

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
        helperText={formError?.emailOrUsername?.message}
        error={Boolean(formError?.emailOrUsername)}
        {...register("emailOrUsername", {
          required: "This field is required",
        })}
        label="Email or username"
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
        })}
        placeholder="●●●●●●●●"
        label="Password"
      />

      <div className="flex flex-row items-center justify-end">
        <Link href="/auth/recovery">Forgot password?</Link>
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row gap-5 items-center justify-center">
        <Button
          className="!rounded-lg !normal-case"
          onClick={handleLogin}
          disabled={isLoading}
          variant="contained"
        >
          Login
        </Button>

        {isLoading && <CircularProgress />}
      </div>
    </form>
  );
};

export { CredentialsForm };
