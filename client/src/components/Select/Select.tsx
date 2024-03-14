export interface SelectProps {
  id: string;
  label: string;
  disabled?: boolean;
  selectOptions: SelectOptionProps[];
  onChange: (option: SelectOptionProps) => void;
}

export interface SelectOptionProps {
  text: string;
  value: string | number;
  disabled?: string;
  hidden?: boolean;
  dayValue?: number[];
}

export const Select = ({ id, label, selectOptions, onChange, disabled }: SelectProps) => {
  return (
    <fieldset>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="select"
        disabled={disabled}
        onChange={e => {
          onChange && onChange(selectOptions[e.currentTarget.selectedIndex]);
        }}
      >
        {selectOptions.map((option: SelectOptionProps, index: number) => (
          <option key={index} value={option.value} hidden={option.hidden}>
            {option.text}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
