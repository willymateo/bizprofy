import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify-icon/react";

import { ProductCategory } from "@/services/products/categories/types";
import { getProductCategories } from "@/services/products/categories";
import { MIN_CHARACTERS_TO_SEARCH } from "@/shared/constants";
import { useActive } from "@/hooks/useActive";

const ProductCategoriesHookForm = <T extends FieldValues>(props: UseControllerProps<T>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [options, setOptions] = useState<ProductCategory[]>([]);
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);
  const t = useTranslations();

  const fetchProductCategories = async ({
    target: { value = "" },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value?.length < MIN_CHARACTERS_TO_SEARCH) {
      return;
    }

    abortControllerRef?.current?.abort?.();
    startLoading();

    try {
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController;

      const { rows = [] } = await getProductCategories({
        limit: Number.MAX_SAFE_INTEGER,
        offset: 0,
        q: value,
      });

      setOptions(rows);
    } catch (err) {
      console.error("Error fetching product categories", err);
    }

    stopLoading();
  };

  return (
    <Autocomplete
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:bag-smile-bold-duotone" width={24} height={24} />
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
          placeholder={t("Type a product category name")}
          onChange={fetchProductCategories}
          label={t("Product category")}
          helperText={error?.message}
          error={Boolean(error)}
        />
      )}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={({ name = "" }) => name}
      filterOptions={option => option}
      loading={isLoading}
      options={options}
      onBlur={onBlur}
      value={value}
      autoHighlight
    />
  );
};

export { ProductCategoriesHookForm };
