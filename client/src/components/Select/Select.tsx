import "./style.scss";

export interface SelectProps {
  id: string;
  name: string;
  value?: number | string;
  label: string;
  disabled?: boolean;
  selectOptions: SelectOptionProps[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface SelectOptionProps {
  text: string;
  value: string | number;
  disabled?: string;
  hidden?: boolean;
  dayValue?: number[];
}

export const Select = ({
  id,
  name,
  value,
  label,
  disabled,
  selectOptions,
  onChange,
}: SelectProps) => {
  return (
    <>
      <label className="select-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="select-field"
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {selectOptions.map((option: SelectOptionProps, index: number) => (
          <option key={index} value={option.value} hidden={option.hidden}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};
