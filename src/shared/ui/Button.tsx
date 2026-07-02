import { memo, type ComponentProps } from "react";

const colors = {
  emerald: "#2ecc71",
  "peter-river": "#3498db",
  carrot: "#e67e22",
  clouds: "#ecf0f1",
  alizarin: "#e74c3c",
};

type Color = keyof typeof colors;

// type Colors = "red" | 'green';
// const ColorsValues: Record<Colors, string> = {red: "red", green: "green"};

type Props = {
  // children: string;
  // onClick: () => void; // id, disabled, type=submit|reset|button, className, style
  bgColor?: Color;
  color?: Color;
} & ComponentProps<"button">;

// <Button bgColor="alizarin" color="clouds">Click me</Button>

export const Button = memo(
  ({
    children,
    style,
    bgColor = "peter-river",
    color = "clouds",
    ...rest
  }: Props) => {
    const styles = {
      ...style,
      color: colors[color],
      backgroundColor: colors[bgColor],
    };

    return (
      <button {...rest} style={styles}>
        {children}
      </button>
    );
  },
);

Button.displayName = "memo(Button)";

// export default memo(Button);
