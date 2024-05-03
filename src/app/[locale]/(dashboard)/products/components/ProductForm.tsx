"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { useState } from "react";

import { ProductCategoriesHookForm } from "@/app/[locale]/components/inputs/ProductCategoriesHookForm";
import { ProvidersHookForm } from "@/app/[locale]/components/inputs/ProvidersHookForm";
import { NumberHookForm } from "@/app/[locale]/components/inputs/NumberHookForm";
import { CreateProductPayload, Product } from "@/services/products/types";
import { ProductCategory } from "@/services/products/categories/types";
import { Provider } from "@/services/providers/interfaces";
import { useActive } from "@/hooks/useActive";

type Props<T, U> = {
  onSave: (data: T) => Promise<U>;
  saveButtonLabel?: string;
} & Partial<Product>;

interface FormInputs extends Omit<CreateProductPayload, "productCategoryId" | "providerId"> {
  productCategory: ProductCategory | null;
  provider: Provider | null;
}

const ProductForm = <T, U>({ onSave, saveButtonLabel, ...props }: Props<T, U>) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
    control,
  } = useForm<FormInputs>({
    values: {
      productCategory: props.productCategory ?? null,
      description: props.description ?? "",
      provider: props.provider ?? null,
      unitPrice: props.unitPrice ?? 0,
      unitCost: props.unitCost ?? 0,
      code: props.code ?? "",
      name: props.name ?? "",
    },
  });
  const t = useTranslations();
  const router = useRouter();

  const handleCreate = handleSubmit(async ({ provider, productCategory, ...data }) => {
    startLoading();
    setError("");

    try {
      await onSave({
        ...data,
        productCategoryId: productCategory?.id as string,
        providerId: provider?.id as string,
      } as T);

      stopLoading();
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("Error creating product", err);

      setError((err as Error).message);
      stopLoading();
    }
  });

  return (
    <form className="flex flex-col gap-5 justify-center">
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:bag-heart-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("name", {
          required: t("Product name is required"),
        })}
        helperText={formError?.name?.message}
        error={Boolean(formError?.name)}
        label={t("Product name")}
        required
      />

      <NumberHookForm
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="solar:tag-price-line-duotone" width={24} height={24} />
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        helperText={formError?.unitCost?.message}
        {...register("unitCost", {
          required: t("Unit cost is required"),
          valueAsNumber: true,
          min: 0,
        })}
        error={Boolean(formError?.unitCost)}
        label={t("Unit cost")}
        required
      />

      <NumberHookForm
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="solar:tag-price-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        helperText={formError?.unitPrice?.message}
        error={Boolean(formError?.unitPrice)}
        {...register("unitPrice", {
          required: t("Unit price is required"),
          valueAsNumber: true,
          min: 0,
        })}
        label={t("Unit price")}
        required
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:code-scan-line-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.code?.message}
        error={Boolean(formError?.code)}
        label={t("Product code")}
        {...register("code")}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:chat-line-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        helperText={formError?.description?.message}
        error={Boolean(formError?.description)}
        label={t("Additional description")}
        {...register("description")}
        multiline
        rows={3}
      />

      <ProductCategoriesHookForm name="productCategory" control={control} />

      <ProvidersHookForm control={control} name="provider" />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          {saveButtonLabel || t("Save")}
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { ProductForm };
