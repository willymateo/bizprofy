import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";
import { forwardRef, useCallback } from "react";

interface NumericFormatCustomProps {
  onChange: (event: { target: { value: number; name: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, NumericFormatCustomProps>(
  ({ onChange, name, ...rest }, ref) => {
    const handleChange = useCallback(
      (values: NumberFormatValues) =>
        onChange({
          target: {
            value: (values.floatValue as number) || 0,
            name: name,
          },
        }),
      [name, onChange],
    );

    return <NumericFormat {...rest} onValueChange={handleChange} getInputRef={ref} name={name} />;
  },
);

export { NumericFormatCustom };
