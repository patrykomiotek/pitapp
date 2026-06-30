type Props = {
  label?: string;
};

export const Input = ({ label }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input />
    </div>
  );
};
