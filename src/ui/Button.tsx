import { memo } from "react";

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

interface Props {
  children: string;
  onClick: () => void;
  bgColor?: Color;
  color?: Color;
}

// <Button bgColor="alizarin" color="clouds">Click me</Button>

export const Button = memo(
  ({ children, onClick, bgColor = "peter-river", color = "clouds" }: Props) => {
    const styles = {
      color: colors[color],
      backgroundColor: colors[bgColor],
    };

    return (
      <button style={styles} onClick={onClick}>
        {children}
      </button>
    );
  },
);

Button.displayName = "memo(Button)";

// export default memo(Button);
