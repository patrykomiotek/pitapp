import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

// <Text value="Costam" />
// <Text>Costam <span>ostylowany</span></Text>
export const Text = memo(({ children }: Props) => {
  // porównanie po wartości
  return <p>{children}</p>;
});

Text.displayName = "memo(Text)";

// export default memo(Text);
