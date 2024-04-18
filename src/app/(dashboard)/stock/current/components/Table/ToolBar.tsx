import { useDispatch, useSelector } from "react-redux";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify-icon/react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import dayjs, { Dayjs } from "dayjs";

import { DateTimePickerHookForm } from "@/app/components/inputs/DateTimePickerHookForm";
import { GetCurrentStockPayload } from "@/services/stock/current/interfaces";
import { setFiltersByWarehoseId } from "@/redux/states/stock/current";
import { Warehouse } from "@/services/warehouses/interfaces";
import { Store } from "@/redux/types";

type FormInputs = Omit<
  GetCurrentStockPayload,
  "transactionDateLessThanOrEqualTo" | "transactionDateGreaterThanOrEqualTo"
> & {
  transactionDateGreaterThanOrEqualTo: Dayjs;
  transactionDateLessThanOrEqualTo: Dayjs;
};

interface Props {
  numRowsSelected?: number;
  warehouse: Warehouse;
}

const ToolBar = ({ numRowsSelected = 0, warehouse }: Props) => {
  const transactionDateGreaterThanOrEqualToStore = useSelector(
    (state: Store) =>
      state?.currentStock?.filters?.[warehouse?.id ?? ""]?.transactionDateGreaterThanOrEqualTo ||
      dayjs().startOf("day").toISOString(),
  );

  const transactionDateLessThanOrEqualToStore = useSelector(
    (state: Store) =>
      state?.currentStock?.filters?.[warehouse?.id ?? ""]?.transactionDateLessThanOrEqualTo ||
      dayjs().endOf("day").toISOString(),
  );

  const { handleSubmit, control, watch } = useForm<FormInputs>({
    values: {
      transactionDateGreaterThanOrEqualTo: dayjs(transactionDateGreaterThanOrEqualToStore),
      transactionDateLessThanOrEqualTo: dayjs(transactionDateLessThanOrEqualToStore),
      offset: 0,
    },
  });

  const transactionDateGreaterThanOrEqualTo = watch("transactionDateGreaterThanOrEqualTo");
  const transactionDateLessThanOrEqualTo = watch("transactionDateLessThanOrEqualTo");
  const dispatch = useDispatch();

  const applyFilters = handleSubmit(data =>
    dispatch(
      setFiltersByWarehoseId({
        warehouseId: warehouse.id,
        filters: {
          transactionDateLessThanOrEqualTo: data?.transactionDateLessThanOrEqualTo?.toISOString(),
          transactionDateGreaterThanOrEqualTo:
            data?.transactionDateGreaterThanOrEqualTo?.toISOString(),
          offset: 0,
        },
      }),
    ),
  );

  return (
    <MaterialToolbar
      className="flex flex-col items-start gap-10 py-7"
      sx={{
        p: theme => theme.spacing(0, 1, 0, 3),
        ...(numRowsSelected > 0 && {
          bgcolor: "primary.lighter",
          color: "primary.main",
        }),
      }}
    >
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <h3 className="text-xl">{warehouse?.name ?? ""}</h3>
        {warehouse?.code && <Chip label={warehouse?.code} color="info" />}
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center gap-3 w-full">
        {numRowsSelected > 0 ? (
          <Typography component="div" variant="subtitle1" className="grow">
            {numRowsSelected} selected
          </Typography>
        ) : (
          <>
            <DateTimePickerHookForm
              rules={{ required: "This field is required" }}
              maxDateTime={transactionDateLessThanOrEqualTo}
              name="transactionDateGreaterThanOrEqualTo"
              label="Start transaction date"
              control={control}
              className="grow"
              closeOnSelect
            />

            <DateTimePickerHookForm
              minDateTime={transactionDateGreaterThanOrEqualTo}
              rules={{ required: "This field is required" }}
              name="transactionDateLessThanOrEqualTo"
              label="End transaction date"
              control={control}
              className="grow"
              closeOnSelect
            />

            <Button
              endIcon={<Icon icon="icon-park-outline:search" />}
              onClick={applyFilters}
              variant="contained"
            >
              Search
            </Button>
          </>
        )}
      </div>
    </MaterialToolbar>
  );
};

export { ToolBar };
