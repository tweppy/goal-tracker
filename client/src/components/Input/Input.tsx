interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (str: string) => void;
}

export const Input = ({ type, id, placeholder, value, disabled, onChange }: InputProps) => {
  return (
    <fieldset>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </fieldset>
  );
};
