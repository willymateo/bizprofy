"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { DateTimePickerHookForm } from "@/app/components/inputs/DateTimePickerHookForm";
import { WarehousesHookForm } from "@/app/components/inputs/WarehousesHookForm";
import { ProductsHookForm } from "@/app/components/inputs/ProductsHookForm";
import { NumberHookForm } from "@/app/components/inputs/NumberHookForm";
import { CreateStockInPayload } from "@/services/stock/in/interfaces";
import { Warehouse } from "@/services/warehouses/interfaces";
import { Product } from "@/services/products/types";
import { createStockIn } from "@/services/stock/in";
import { useActive } from "@/hooks/useActive";

const NOW_DAYJS = dayjs();

interface FormInputs
  extends Omit<CreateStockInPayload, "transactionDate" | "warehouseId" | "productId"> {
  warehouse: Warehouse | null;
  product: Product | null;
  transactionDate: Dayjs;
}

const NewStockInForm = () => {
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
      product: null,
      quantity: 1,
      unitCost: 0,
    },
  });
  const router = useRouter();

  const handleCreate = handleSubmit(async ({ product, warehouse, transactionDate, ...data }) => {
    startLoading();
    setError("");

    try {
      await createStockIn({
        ...data,
        transactionDate: transactionDate.toISOString(),
        warehouseId: warehouse?.id as string,
        productId: product?.id as string,
      });

      stopLoading();
      router.push("/stock/in");
      router.refresh();
    } catch (err) {
      console.error("Error creating stock in", err);

      setError((err as Error).message);
      stopLoading();
    }
  });

  const setDefaultUnitCost = (newProduct: Product | Product[] | null) => {
    if (!newProduct || Array.isArray(newProduct)) {
      return;
    }

    setValue("unitCost", newProduct.unitCost);
  };

  return (
    <form className="flex flex-col gap-5 justify-center">
      <DateTimePickerHookForm
        rules={{ required: "Transaction date is required" }}
        label="Transaction date"
        name="transactionDate"
        control={control}
        closeOnSelect
      />

      <WarehousesHookForm
        rules={{
          validate: value => {
            const warehouse = value as Warehouse;

            return Boolean(warehouse?.id) || "Warehouse is required";
          },
        }}
        control={control}
        name="warehouse"
      />

      <ProductsHookForm
        rules={{
          validate: value => {
            const product = value as Product;

            return Boolean(product?.id) || "Product is required";
          },
        }}
        onChange={setDefaultUnitCost}
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
        helperText={formError?.unitCost?.message}
        error={Boolean(formError?.unitCost)}
        {...register("unitCost", {
          required: "Unit cost is required",
          valueAsNumber: true,
          min: 0,
        })}
        label="Unit cost"
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
          required: "Product quantity is required",
          valueAsNumber: true,
          min: 1,
        })}
        helperText={formError?.quantity?.message}
        error={Boolean(formError?.quantity)}
        label="Product quantity"
        isInteger
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          Register purchase
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { NewStockInForm };
