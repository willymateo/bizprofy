"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { CountryStateHookForm } from "@/app/[locale]/components/inputs/CountryStatesHookForm";
import { CountriesHookForm } from "@/app/[locale]/components/inputs/CountriesHookForm";
import { CitiesHookForm } from "@/app/[locale]/components/inputs/CitiesHookForm";
import { City, Country, CountryState } from "@/services/countries/types";
import { EmailVerificationDialog } from "./EmailVerificationDialog";
import { SignUpPayload } from "@/services/auth/types";
import { useActive } from "@/hooks/useActive";
import { signUp } from "@/services/auth";
import {
  AT_LEAST_ONE_SPECIAL_CHARACTER_REGEX,
  AT_LEAST_ONE_LOWERCASE_REGEX,
  AT_LEAST_ONE_UPPERCASE_REGEX,
  AT_LEAST_ONE_NUMBER_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_REGEX,
  EMAIL_REGEX,
} from "@/constants";

type FormInputs = Omit<
  SignUpPayload,
  | "companyCountryStateCode"
  | "companyCountryStateName"
  | "companyCountryCode"
  | "companyCountryName"
  | "companyCityName"
> & {
  countryState: CountryState | null;
  repeatedPassword: string;
  country: Country | null;
  city: City | null;
};

const CredentialsForm = () => {
  const { isActive: isRepeatedPasswordVisible = false, toggle: toggleRepeatedPasswordVisibility } =
    useActive();
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const { isActive: isOpenEmailVerificationDialog = false, enable: openEmailVerificationDialog } =
    useActive();
  const { isActive: isPasswordVisible = false, toggle: togglePasswordVisibility } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    setValue,
    register,
    control,
    watch,
  } = useForm<FormInputs>();
  const countryState = watch("countryState");
  const password = watch("password");
  const country = watch("country");
  const t = useTranslations();

  const handleSignUp = handleSubmit(
    async ({ repeatedPassword: _, country, countryState, city, ...data }) => {
      startLoading();
      setError("");

      try {
        await signUp({
          ...data,
          companyCountryStateCode: countryState?.isoCode as string,
          companyCountryStateName: countryState?.name as string,
          companyCountryCode: country?.isoCode as string,
          companyCountryName: country?.name as string,
          companyCityName: city?.name as string,
        });

        openEmailVerificationDialog();
      } catch (err) {
        console.log("Error creating user: ", err);

        setError((err as Error).message);
      }

      stopLoading();
    },
  );

  const handleChangeCountry = (newCountryValue: Country | Country[] | null) => {
    if (newCountryValue) {
      return;
    }

    setValue("countryState", null);
    setValue("city", null);
  };

  const handleChangeCountryState = (newCountryStateValue: CountryState | CountryState[] | null) => {
    if (newCountryStateValue) {
      return;
    }

    setValue("city", null);
  };

  return (
    <>
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

        <CountriesHookForm
          rules={{
            validate: value => {
              const country = value as Country;

              if (!country?.isoCode) {
                return t("Country is required");
              }

              return true;
            },
          }}
          onChange={handleChangeCountry}
          control={control}
          name="country"
        />

        {country?.isoCode ? (
          <CountryStateHookForm
            onChange={handleChangeCountryState}
            countryCode={country?.isoCode}
            name="countryState"
            control={control}
          />
        ) : null}

        {country?.isoCode && countryState?.isoCode ? (
          <CitiesHookForm
            countryStateCode={countryState?.isoCode}
            countryCode={country?.isoCode}
            control={control}
            name="city"
          />
        ) : null}

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
            validate: value => {
              if (!AT_LEAST_ONE_NUMBER_REGEX.test(value)) {
                return t("Password must have at least 1 number");
              }

              if (!AT_LEAST_ONE_UPPERCASE_REGEX.test(value)) {
                return t("Password must have at least 1 uppercase letter");
              }

              if (!AT_LEAST_ONE_LOWERCASE_REGEX.test(value)) {
                return t("Password must have at least 1 lowercase letter");
              }

              if (!AT_LEAST_ONE_SPECIAL_CHARACTER_REGEX.test(value)) {
                return t("Password must have at least 1 special character");
              }

              return true;
            },
            minLength: {
              message: t("Password must be at least {minLength} characters", {
                minLength: PASSWORD_MIN_LENGTH,
              }),
              value: PASSWORD_MIN_LENGTH,
            },
            required: t("Password is required"),
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

      <EmailVerificationDialog isOpen={isOpenEmailVerificationDialog} />
    </>
  );
};

export { CredentialsForm };
