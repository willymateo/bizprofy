import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { DATE_FORMAT } from "@/shared/constants";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  format?: string;
}

const DateTimePickerHookForm = <T extends FieldValues>({
  format = DATE_FORMAT,
  ...props
}: Props<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  return (
    <DateTimePicker
      onChange={onChange}
      label="Stock date"
      onClose={onBlur}
      format={format}
      value={value}
    />
  );
};

export { DateTimePickerHookForm };
