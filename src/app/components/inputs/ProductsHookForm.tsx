import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { getProducts } from "@/services/products";
import TextField from "@mui/material/TextField";
import { Icon } from "@iconify-icon/react";

import { MIN_CHARACTERS_TO_SEARCH } from "@/shared/constants";
import { Product } from "@/services/products/interfaces";
import { useActive } from "@/hooks/useActive";

const ProductsHookForm = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<Product[]>([]);
  const {
    isActive: isLoadingProducts = false,
    enable: startLoadingProducts,
    disable: stopLoadingProducts,
  } = useActive();
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const fetchProducts = async ({ target: { value = "" } }: ChangeEvent<HTMLInputElement>) => {
    if (value?.length < MIN_CHARACTERS_TO_SEARCH) {
      return;
    }

    abortControllerRef?.current?.abort?.();
    startLoadingProducts();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const fetchedProducts = await getProducts({
        q: value,
        // abortController: newAbortController,
      });

      setOptions(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products", err);
    }

    stopLoadingProducts();
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
            endAdornment: isLoadingProducts ? (
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
      onChange={(_, newValue) => onChange(newValue)}
      filterOptions={option => option}
      loading={isLoadingProducts}
      options={options}
      onBlur={onBlur}
      value={value}
      autoHighlight
    />
  );
};

export { ProductsHookForm };
