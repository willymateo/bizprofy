import InputAdornment from "@mui/material/InputAdornment";
import { DateTimePicker } from "@mui/x-date-pickers";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import { GetStockOutPayload } from "@/services/stockOut/interfaces";
import {
  DATE_TIME_PICKER_TIME_STEPS,
  DATE_TIME_PICKER_VIEWS,
  DATE_FORMAT,
} from "@/app/components/inputs/DateTimePickerHookForm/constants";

interface Props extends GetStockOutPayload {
  transactionDateGreaterThanOrEqualTo: string;
  transactionDateLessThanOrEqualTo: string;
  numRowsSelected?: number;
  href: string;
}

const ToolBar = ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  numRowsSelected = 0,
  href,
}: Props) => {
  const router = useRouter();
  const transactionDateGreaterThanOrEqualToDayJs = dayjs(transactionDateGreaterThanOrEqualTo);
  const transactionDateLessThanOrEqualToDateDayJs = dayjs(transactionDateLessThanOrEqualTo);

  const onAcceptMinDateTime = (newMinDateTime: Dayjs | null) => {
    if (
      !newMinDateTime?.isValid() ||
      newMinDateTime.isSame(transactionDateGreaterThanOrEqualToDayJs, "minute")
    ) {
      return;
    }

    router.replace(
      `${href}?${new URLSearchParams({
        transactionDateGreaterThanOrEqualTo: newMinDateTime.toISOString(),
        transactionDateLessThanOrEqualTo,
      })}`,
    );
  };

  const onAcceptMaxDateTime = (newMaxDateTime: Dayjs | null) => {
    if (
      !newMaxDateTime?.isValid() ||
      newMaxDateTime.isSame(transactionDateLessThanOrEqualToDateDayJs, "minute")
    ) {
      return;
    }

    router.replace(
      `${href}?${new URLSearchParams({
        transactionDateLessThanOrEqualTo: newMaxDateTime.toISOString(),
        transactionDateGreaterThanOrEqualTo,
      })}`,
    );
  };

  return (
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
            <DateTimePicker
              maxDateTime={transactionDateLessThanOrEqualToDateDayJs}
              value={transactionDateGreaterThanOrEqualToDayJs}
              name="transactionDateGreaterThanOrEqualTo"
              timeSteps={DATE_TIME_PICKER_TIME_STEPS}
              onAccept={onAcceptMinDateTime}
              views={DATE_TIME_PICKER_VIEWS}
              label="Start transaction date"
              format={DATE_FORMAT}
              className="grow"
              closeOnSelect
            />

            <DateTimePicker
              minDateTime={transactionDateGreaterThanOrEqualToDayJs}
              value={transactionDateLessThanOrEqualToDateDayJs}
              name="transactionDateLessThanOrEqualTo"
              timeSteps={DATE_TIME_PICKER_TIME_STEPS}
              onAccept={onAcceptMaxDateTime}
              views={DATE_TIME_PICKER_VIEWS}
              label="End transaction date"
              format={DATE_FORMAT}
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
};

export { ToolBar };
