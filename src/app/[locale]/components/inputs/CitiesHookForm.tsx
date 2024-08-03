"use client";

import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";

import { getCitiesByCountryCodeAndStateCode } from "@/services/countries";
import { City } from "@/services/countries/types";
import { useActive } from "@/hooks/useActive";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  onChange?: (value: City | City[] | null) => void;
  countryStateCode?: string;
  countryCode?: string;
};

const CitiesHookForm = <T extends FieldValues>({
  countryStateCode = "",
  countryCode = "",
  disabled = false,
  ...props
}: Props<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const {
    field: { value, onBlur, onChange: hookFormOnChange },
    fieldState: { error },
  } = useController(props);
  const [options, setOptions] = useState<City[]>([]);
  const t = useTranslations();

  const fetchCities = useCallback(async () => {
    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const cities = await getCitiesByCountryCodeAndStateCode({
        countryStateCode,
        countryCode,
      });

      setOptions(cities);
    } catch (err) {
      console.error("Error fetching cities", err);
    }

    stopLoading();
  }, [countryStateCode, countryCode]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Autocomplete
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:point-on-map-line-duotone" width={24} height={24} />
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
          placeholder={t("Select a city")}
          helperText={error?.message}
          error={Boolean(error)}
          label={t("City")}
        />
      )}
      getOptionLabel={({ name = "" }) => name}
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

export { CitiesHookForm };
