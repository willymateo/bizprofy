"use client";

import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { useEffect, useRef, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";

import { getStatesByCountryCode } from "@/services/countries";
import { CountryState } from "@/services/countries/types";
import { useActive } from "@/hooks/useActive";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  onChange?: (value: CountryState | CountryState[] | null) => void;
  countryCode?: string;
};

const CountryStateHookForm = <T extends FieldValues>({
  disabled = false,
  countryCode = "",
  ...props
}: Props<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<CountryState[]>([]);
  const {
    field: { value, onBlur, onChange: hookFormOnChange },
    fieldState: { error },
  } = useController(props);
  const t = useTranslations();

  const fetchCountryStates = useCallback(async () => {
    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const countryStates = await getStatesByCountryCode({
        countryCode,
      });

      setOptions(countryStates);
    } catch (err) {
      console.error("Error fetching country states", err);
    }

    stopLoading();
  }, [countryCode]);

  useEffect(() => {
    fetchCountryStates();
  }, [fetchCountryStates]);

  return (
    <Autocomplete
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:point-on-map-bold-duotone" width={24} height={24} />
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
          placeholder={t("Select a country state")}
          helperText={error?.message}
          label={t("Country state")}
          error={Boolean(error)}
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

export { CountryStateHookForm };
