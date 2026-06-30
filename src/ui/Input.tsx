import type { ComponentProps } from "react";

type Props = {
  label?: string;
} & ComponentProps<"input">;

export const Input = ({ label, ...rest }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
};
