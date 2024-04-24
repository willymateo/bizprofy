import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Icon } from "@iconify-icon/react";

import { MIN_CHARACTERS_TO_SEARCH } from "@/shared/constants";
import { Customer } from "@/services/customers/interfaces";
import { getCustomers } from "@/services/customers";
import { useActive } from "@/hooks/useActive";

const CustomersHookForm = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<Customer[]>([]);
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const fetchCustomers = async ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    if (value?.length < MIN_CHARACTERS_TO_SEARCH) {
      return;
    }

    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const { rows = [] } = await getCustomers({
        limit: Number.MAX_SAFE_INTEGER,
        offset: 0,
        q: value,
      });

      setOptions(rows);
    } catch (err) {
      console.error("Error fetching customers", err);
    }

    stopLoading();
  };

  return (
    <Autocomplete
      getOptionLabel={({ idCard = "", firstNames = "", lastNames = "" }) =>
        idCard ? `${idCard} - ${firstNames} ${lastNames}` : `${firstNames} ${lastNames}`
      }
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:user-hand-up-bold-duotone" width={24} height={24} />
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
          placeholder="Type code or name of a customer"
          helperText={error?.message}
          onChange={fetchCustomers}
          error={Boolean(error)}
          label="Customer"
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

export { CustomersHookForm };
