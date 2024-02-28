import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

import { NumericFormatCustom } from "./NumericFormatCustom";

const NumberHookForm = forwardRef<HTMLDivElement, Omit<TextFieldProps, "variant">>(
  ({ InputProps = {}, ...rest }: Omit<TextFieldProps, "variant">, ref) => (
    <TextField
      {...rest}
      InputProps={{
        ...InputProps,
        inputComponent: NumericFormatCustom as any,
      }}
      ref={ref}
    />
  ),
);

export { NumberHookForm };
