interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, id, name, placeholder, value, disabled, onChange }: InputProps) => {
  return (
    <fieldset>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </fieldset>
  );
};
