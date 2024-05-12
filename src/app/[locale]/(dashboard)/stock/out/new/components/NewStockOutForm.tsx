"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { DateTimePickerHookForm } from "@/app/[locale]/components/inputs/DateTimePickerHookForm";
import { WarehousesHookForm } from "@/app/[locale]/components/inputs/WarehousesHookForm";
import { CustomersHookForm } from "@/app/[locale]/components/inputs/CustomersHookForm";
import { ProductsHookForm } from "@/app/[locale]/components/inputs/ProductsHookForm";
import { NumberHookForm } from "@/app/[locale]/components/inputs/NumberHookForm";
import { CreateStockOutPayload } from "@/services/stock/out/interfaces";
import { Warehouse } from "@/services/warehouses/interfaces";
import { Customer } from "@/services/customers/interfaces";
import { createStockOut } from "@/services/stock/out";
import { Product } from "@/services/products/types";
import { useActive } from "@/hooks/useActive";

const NOW_DAYJS = dayjs();

type FormInputs = Omit<
  CreateStockOutPayload,
  "transactionDate" | "warehouseId" | "productId" | "customerId"
> & {
  warehouse: Warehouse | null;
  customer: Customer | null;
  product: Product | null;
  transactionDate: Dayjs;
};

type Props = {
  isEnableToSave?: boolean;
};

const NewStockOutForm = ({ isEnableToSave = false }: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
    setValue,
    control,
  } = useForm<FormInputs>({
    values: {
      transactionDate: NOW_DAYJS,
      warehouse: null,
      customer: null,
      product: null,
      unitPrice: 0,
      quantity: 1,
    },
  });
  const t = useTranslations();
  const router = useRouter();

  const handleCreate = handleSubmit(
    async ({ product, warehouse, transactionDate, customer, ...data }) => {
      startLoading();
      setError("");

      try {
        await createStockOut({
          ...data,
          transactionDate: transactionDate.toISOString(),
          warehouseId: warehouse?.id as string,
          customerId: customer?.id as string,
          productId: product?.id as string,
        });

        stopLoading();
        router.push("/stock/out");
        router.refresh();
      } catch (err) {
        console.error("Error creating stock out", err);

        setError((err as Error).message);
        stopLoading();
      }
    },
  );

  const setDefaultUnitPrice = (newProduct: Product | Product[] | null) => {
    if (!newProduct || Array.isArray(newProduct)) {
      return;
    }

    setValue("unitPrice", newProduct.unitPrice);
  };

  return (
    <form className="flex flex-col gap-5 justify-center">
      <DateTimePickerHookForm
        rules={{ required: t("Transaction date is required") }}
        label={t("Transaction date")}
        disabled={!isEnableToSave}
        name="transactionDate"
        control={control}
        closeOnSelect
      />

      <WarehousesHookForm
        rules={{
          validate: value => {
            const warehouse = value as Warehouse;

            if (!warehouse?.id) {
              return t("Warehouse is required");
            }

            return true;
          },
        }}
        disabled={!isEnableToSave}
        control={control}
        name="warehouse"
      />

      <ProductsHookForm
        rules={{
          validate: value => {
            const product = value as Product;

            if (!product?.id) {
              return t("Product is required");
            }

            return true;
          },
        }}
        onChange={setDefaultUnitPrice}
        disabled={!isEnableToSave}
        control={control}
        name="product"
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
        helperText={formError?.unitPrice?.message}
        error={Boolean(formError?.unitPrice)}
        {...register("unitPrice", {
          required: t("Unit price is required"),
          valueAsNumber: true,
          min: 0,
        })}
        disabled={!isEnableToSave}
        label={t("Unit price")}
        required
      />

      <NumberHookForm
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="solar:document-add-bold-duotone" width={24} height={24} />
            </InputAdornment>
          ),
        }}
        {...register("quantity", {
          required: t("Product quantity is required"),
          valueAsNumber: true,
          min: 1,
        })}
        helperText={formError?.quantity?.message}
        error={Boolean(formError?.quantity)}
        label={t("Product quantity")}
        disabled={!isEnableToSave}
        isInteger
        required
      />

      <CustomersHookForm control={control} name="customer" disabled={!isEnableToSave} />

      {error && <Alert severity="error">{error}</Alert>}

      {isEnableToSave ? (
        <div className="flex flex-row items-center justify-center">
          <Button
            className="flex flex-row gap-3 rounded-lg normal-case"
            onClick={handleCreate}
            disabled={isLoading}
            variant="contained"
          >
            {t("Register sale")}
            {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
          </Button>
        </div>
      ) : null}
    </form>
  );
};

export { NewStockOutForm };
