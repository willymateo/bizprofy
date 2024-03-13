import InputAdornment from "@mui/material/InputAdornment";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@iconify-icon/react";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";

import { DateTimePickerHookForm } from "@/app/components/inputs/DateTimePickerHookForm";

interface Props {
  setCurrentPageNumber: (pageNumber: number) => void;
  transactionDateGreaterThanOrEqualTo: Dayjs;
  transactionDateLessThanOrEqualTo: Dayjs;
  numRowsSelected?: number;
  control: any;
}

const ToolBar = ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  numRowsSelected = 0,
  control,
}: Props) => (
  <MaterialToolbar
    className="flex flex-row flex-wrap items-center justify-center gap-3 py-7"
    sx={{
      p: theme => theme.spacing(0, 1, 0, 3),
      ...(numRowsSelected > 0 && {
        bgcolor: "primary.lighter",
        color: "primary.main",
      }),
    }}
  >
    {numRowsSelected > 0 ? (
      <Typography component="div" variant="subtitle1" className="grow">
        {numRowsSelected} selected
      </Typography>
    ) : (
      <div className="flex flex-col justify-center gap-5 grow">
        <div className="flex flex-row flex-wrap items-center gap-5">
          <DateTimePickerHookForm
            rules={{
              validate: (value: Dayjs) =>
                value.isBefore(transactionDateLessThanOrEqualTo) ||
                "Start transaction date must be before end transaction date",
              required: "Start transaction date is required",
            }}
            maxDateTime={transactionDateLessThanOrEqualTo}
            name="transactionDateGreaterThanOrEqualTo"
            label="Start transaction date"
            control={control}
            className="grow"
            closeOnSelect
          />

          <DateTimePickerHookForm
            rules={{
              validate: (value: Dayjs) =>
                value.isAfter(transactionDateGreaterThanOrEqualTo) ||
                "End transaction date must be after start transaction date",
              required: "End transaction date is required",
            }}
            minDateTime={transactionDateGreaterThanOrEqualTo}
            name="transactionDateLessThanOrEqualTo"
            label="End transaction date"
            control={control}
            className="grow"
            closeOnSelect
          />
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="eva:search-fill" />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            className="grow"
          />

          <Tooltip title="Filter list">
            <IconButton>
              <Icon icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )}
  </MaterialToolbar>
);

export { ToolBar };
