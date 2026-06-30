import { memo } from "react";

interface Props {
  children: string;
  onClick: () => void;
}

export const Button = memo(({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
});

Button.displayName = "memo(Button)";

// export default memo(Button);
