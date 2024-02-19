interface CheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }
  
  export const Checkbox = ({ id, name, checked, onChange, disabled }: CheckboxProps) => {
    return (
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    );
  };