import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Icon } from "@iconify-icon/react";

import { MIN_CHARACTERS_TO_SEARCH } from "@/shared/constants";
import { Warehouse } from "@/services/warehouses/interfaces";
import { getWarehouses } from "@/services/warehouses";
import { useActive } from "@/hooks/useActive";

const WarehousesHookForm = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<Warehouse[]>([]);
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const fetchWarehouses = async ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    if (value?.length < MIN_CHARACTERS_TO_SEARCH) {
      return;
    }

    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const { rows = [] } = await getWarehouses({
        limit: Number.MAX_SAFE_INTEGER,
        offset: 0,
        q: value,
      });

      setOptions(rows);
    } catch (err) {
      console.error("Error fetching warehouses", err);
    }

    stopLoading();
  };

  return (
    <Autocomplete
      getOptionLabel={({ code = "", name = "" }) => (code ? `${code} - ${name}` : name)}
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:buildings-bold-duotone" width={24} height={24} />
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
          placeholder="Type code or name of a warehouse"
          helperText={error?.message}
          onChange={fetchWarehouses}
          error={Boolean(error)}
          label="Warehouse"
        />
      )}
      onChange={(_, newValue) => onChange(newValue)}
      filterOptions={option => option}
      loading={isLoading}
      options={options}
      onBlur={onBlur}
      value={value}
      autoHighlight
    />
  );
};

export { WarehousesHookForm };
