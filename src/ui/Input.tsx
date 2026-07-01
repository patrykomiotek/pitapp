import {
  forwardRef,
  type ComponentProps,
  type ForwardedRef,
  useId,
} from "react";
import type { FieldError } from "react-hook-form";

type Props = {
  label?: string;
  error?: FieldError;
} & ComponentProps<"input">;

// forwardRef jest wymagany w React < 19
// w React >= 19 nie trzeba korzystać z forwardRef
export const Input = forwardRef(
  ({ label, error, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();
    return (
      <div className="space-y-2">
        <label htmlFor={id}>{label}</label>
        <input id={id} ref={ref} {...rest} className="border" />
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  },
);

Input.displayName = "forwardRef(Input)";
