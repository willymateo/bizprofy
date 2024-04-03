import { DateTimePicker } from "@mui/x-date-pickers";
import MaterialToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";

import { GetStockInPayload } from "@/services/stock/in/interfaces";
import {
  DATE_TIME_PICKER_TIME_STEPS,
  DATE_TIME_PICKER_VIEWS,
  DATE_FORMAT,
} from "@/app/components/inputs/DateTimePickerHookForm/constants";

interface Props extends GetStockInPayload {
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
      className="flex flex-row flex-wrap items-center gap-3 py-7"
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
        <>
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

          <Button variant="contained" endIcon={<Icon icon="icon-park-outline:search" />}>
            Search
          </Button>
        </>
      )}
    </MaterialToolbar>
  );
};

export { ToolBar };
