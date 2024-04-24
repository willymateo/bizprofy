import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { getProducts } from "@/services/products";
import TextField from "@mui/material/TextField";
import { Icon } from "@iconify-icon/react";

import { MIN_CHARACTERS_TO_SEARCH } from "@/shared/constants";
import { Product } from "@/services/products/types";
import { useActive } from "@/hooks/useActive";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  onChange?: (value: Product | Product[] | null) => void;
};

const ProductsHookForm = <T extends FieldValues>(props: Props<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<Product[]>([]);
  const {
    field: { value, onChange: hookFormOnChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const fetchProducts = async ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    if (value?.length < MIN_CHARACTERS_TO_SEARCH) {
      return;
    }

    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const { rows = [] } = await getProducts({
        limit: Number.MAX_SAFE_INTEGER,
        offset: 0,
        q: value,
      });

      setOptions(rows);
    } catch (err) {
      console.error("Error fetching products", err);
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
                <Icon icon="solar:bag-4-bold-duotone" width={24} height={24} />
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
          placeholder="Type code, name or description of a product"
          helperText={error?.message}
          onChange={fetchProducts}
          error={Boolean(error)}
          label="Product"
        />
      )}
      filterOptions={option => option}
      onChange={(_, newValue) => {
        hookFormOnChange(newValue);
        props?.onChange?.(newValue);
      }}
      loading={isLoading}
      options={options}
      onBlur={onBlur}
      value={value}
      autoHighlight
    />
  );
};

export { ProductsHookForm };
