interface FormInputProps {
    id: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }
  
  export const FormInput = ({ id, name, type, value, onChange, disabled }: FormInputProps) => {
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  };