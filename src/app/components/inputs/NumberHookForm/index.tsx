import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

import { NumericFormatCustom } from "./NumericFormatCustom";

interface Props extends Omit<TextFieldProps, "variant"> {
  isInteger?: boolean;
}

const NumberHookForm = forwardRef<HTMLDivElement, Props>(
  ({ isInteger = false, InputProps = {}, ...rest }: Props, ref) => (
    <TextField
      {...rest}
      InputProps={{
        ...InputProps,
        inputComponent: NumericFormatCustom as any,
      }}
      onKeyDown={e => {
        if (isInteger && [".", "-"].includes(e.key)) {
          e.preventDefault();
        }
      }}
      ref={ref}
    />
  ),
);

export { NumberHookForm };
