interface Props {
  children: string; // React.ReactNode;
}

// <Text value="Costam" />
// <Text>Costam <span>ostylowany</span></Text>
export const Text = ({ children }: Props) => {
  return <p>{children}</p>;
};

// export default Text;
