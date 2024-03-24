"use client";

import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import dayjs, { Dayjs } from "dayjs";

import { DateTimePickerHookForm } from "@/app/components/inputs/DateTimePickerHookForm";
import { ProductsHookForm } from "@/app/components/inputs/ProductsHookForm";
import { NumberHookForm } from "@/app/components/inputs/NumberHookForm";
import { STOCK_ROUTES_BY_TYPE, STOCK_TYPE_IDS } from "../../constants";
import { CREATE_BUTTON_LABEL_BY_STOCK_TYPE } from "../constants";
import { Product } from "@/app/(dashboard)/products/interfaces";
import { CreatableStockTypes } from "../../interfaces";
import { createStock } from "@/services/stock";
import { useActive } from "@/hooks/useActive";

const NOW_DAYJS = dayjs();

interface StockFormProps {
  product: Product | null;
  transactionDate: Dayjs;
  quantity: number;
}

interface Props {
  stockType: CreatableStockTypes;
  stockTypeId: number;
}

const NewStockForm = ({
  stockTypeId = STOCK_TYPE_IDS[CreatableStockTypes.stockIn],
  stockType = CreatableStockTypes.stockIn,
}: Props) => {
  const { isActive: isLoading = false, enable: startLoading, disable: stopLoading } = useActive();
  const [error, setError] = useState<string>("");
  const {
    formState: { errors: formError },
    handleSubmit,
    register,
    control,
  } = useForm<StockFormProps>({
    values: {
      transactionDate: NOW_DAYJS,
      product: null,
      quantity: 0,
    },
  });
  const router = useRouter();

  // change this logic to server side
  useEffect(() => {
    if (!Object.values(CreatableStockTypes).includes(stockType)) {
      router.push("/stock/in");
    }
  }, [router, stockType]);

  const handleCreate = handleSubmit(async ({ product, quantity = 0, transactionDate }) => {
    startLoading();
    setError("");

    try {
      const newRoute = `/stock/${STOCK_ROUTES_BY_TYPE[stockType]}`;

      await createStock({
        transactionDate: transactionDate.toISOString(),
        productId: product?.id as string,
        stockTypeId,
        quantity,
      });

      stopLoading();
      router.push(newRoute);
      router.refresh();
    } catch (err) {
      console.error("Error creating stock", err);

      setError((err as Error).message);
      stopLoading();
    }
  });

  return (
    <form className="flex flex-col gap-5 justify-center">
      <ProductsHookForm
        rules={{
          validate: value => {
            const product = value as Product;

            return Boolean(product?.id) || "Product is required";
          },
        }}
        control={control}
        name="product"
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
          min: 0,
        })}
        helperText={formError?.quantity?.message}
        error={Boolean(formError?.quantity)}
        label="Product quantity"
        isInteger
        required
      />

      <DateTimePickerHookForm
        rules={{ required: "Transaction date is required" }}
        label="Transaction date"
        name="transactionDate"
        control={control}
        closeOnSelect
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div className="flex flex-row items-center justify-center">
        <Button
          className="flex flex-row gap-3 rounded-lg normal-case"
          onClick={handleCreate}
          disabled={isLoading}
          variant="contained"
        >
          {CREATE_BUTTON_LABEL_BY_STOCK_TYPE[stockType] ?? "Create"}
          {isLoading && <CircularProgress className="!w-6 !h-6" disableShrink color="inherit" />}
        </Button>
      </div>
    </form>
  );
};

export { NewStockForm };
