"use client";

import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { useEffect, useRef, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";

import { Country } from "@/services/countries/types";
import { getCountries } from "@/services/countries";
import { useActive } from "@/hooks/useActive";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  onChange?: (value: Country | Country[] | null) => void;
};

const CountriesHookForm = <T extends FieldValues>({ disabled = false, ...props }: Props<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const {
    field: { value, onBlur, onChange: hookFormOnChange },
    fieldState: { error },
  } = useController(props);
  const t = useTranslations();

  const fetchCountries = useCallback(async () => {
    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const countries = await getCountries();

      setOptions(countries);
    } catch (err) {
      console.error("Error fetching countries", err);
    }

    stopLoading();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <Autocomplete
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:point-on-map-bold" width={24} height={24} />
              </InputAdornment>
            ),
            endAdornment: isLoading ? (
              <InputAdornment position="end">
                <CircularProgress />
              </InputAdornment>
            ) : (
              params.InputProps?.endAdornment
            ),
          }}
          placeholder={t("Select a country")}
          helperText={error?.message}
          error={Boolean(error)}
          label={t("Country")}
        />
      )}
      getOptionLabel={({ name = "", isoCode = "" }) => `${isoCode} - ${name}`}
      onChange={(_, newValue) => {
        hookFormOnChange(newValue);
        props.onChange?.(newValue);
      }}
      loading={isLoading}
      disabled={disabled}
      options={options}
      onBlur={onBlur}
      value={value}
    />
  );
};

export { CountriesHookForm };
