interface Props {
  children: string;
  onClick: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

// export default Button;
