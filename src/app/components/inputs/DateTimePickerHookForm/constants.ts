import { DateOrTimeView, TimeStepOptions } from "@mui/x-date-pickers";

const DATE_TIME_PICKER_TIME_STEPS: TimeStepOptions = {
  seconds: 1,
  minutes: 1,
  hours: 1,
};

const DATE_TIME_PICKER_VIEWS: DateOrTimeView[] = [
  "year",
  "month",
  "day",
  "hours",
  "minutes",
  "seconds",
];

const DATE_FORMAT = "DD MMMM YYYY HH:mm:ss";

export { DATE_TIME_PICKER_TIME_STEPS, DATE_TIME_PICKER_VIEWS, DATE_FORMAT };
