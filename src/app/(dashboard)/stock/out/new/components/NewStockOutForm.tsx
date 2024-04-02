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
import { CreateStockOutPayload } from "@/services/stockOut/interfaces";
import { Warehouse } from "@/services/warehouses/interfaces";
import { Customer } from "@/services/customers/interfaces";
import { Product } from "@/services/products/interfaces";
import { createStockOut } from "@/services/stockOut";
import { useActive } from "@/hooks/useActive";
import { CustomersHookForm } from "@/app/components/inputs/CustomersHookForm";

const NOW_DAYJS = dayjs();

interface FormInputs
  extends Omit<
    CreateStockOutPayload,
    "transactionDate" | "warehouseId" | "productId" | "customerId"
  > {
  warehouse: Warehouse | null;
  customer: Customer | null;
  product: Product | null;
  transactionDate: Dayjs;
}

const NewStockOutForm = () => {
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
        onChange={setDefaultUnitPrice}
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
          required: "Unit price is required",
          valueAsNumber: true,
          min: 0,
        })}
        label="Unit price"
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

      <CustomersHookForm control={control} name="customer" />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          Register sale
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { NewStockOutForm };
