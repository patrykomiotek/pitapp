import { forwardRef, type ComponentProps, type ForwardedRef } from "react";

type Props = {
  label?: string;
} & ComponentProps<"input">;

// forwardRef jest wymagany w React < 19
// w React >= 19 nie trzeba korzystać z forwardRef
export const Input = forwardRef(
  ({ label, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...rest} />
      </div>
    );
  },
);
