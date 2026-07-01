type Props = {
  children: string | React.ReactElement;
};

export const Header = ({ children }: Props) => {
  return <h1 className="text-3xl font-medium">{children}</h1>;
};
