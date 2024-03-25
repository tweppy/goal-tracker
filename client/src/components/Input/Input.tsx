import "./style.scss";

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, type, id, name, placeholder, value, disabled, onChange }: InputProps) => {
  return (
    <>
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-field"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};
