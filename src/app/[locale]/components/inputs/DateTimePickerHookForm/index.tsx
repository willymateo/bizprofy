import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

import { DATE_FORMAT, DATE_TIME_PICKER_TIME_STEPS, DATE_TIME_PICKER_VIEWS } from "./constants";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  closeOnSelect?: boolean;
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
  className?: string;
  format?: string;
  label?: string;
}

const DateTimePickerHookForm = <T extends FieldValues>({
  closeOnSelect = true,
  format = DATE_FORMAT,
  disabled = false,
  label = "Date",
  className = "",
  minDateTime,
  maxDateTime,
  ...props
}: Props<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  return (
    <DateTimePicker
      timeSteps={DATE_TIME_PICKER_TIME_STEPS}
      slotProps={{
        textField: {
          helperText: error?.message,
          error: Boolean(error),
        },
      }}
      views={DATE_TIME_PICKER_VIEWS}
      closeOnSelect={closeOnSelect}
      minDateTime={minDateTime}
      maxDateTime={maxDateTime}
      className={className}
      onChange={onChange}
      disabled={disabled}
      onClose={onBlur}
      format={format}
      label={label}
      value={value}
    />
  );
};

export { DateTimePickerHookForm };
