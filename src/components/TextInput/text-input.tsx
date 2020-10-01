import React from 'react';

interface TextInputProps {
  name: string;
  onChange: ([string]: any) => void;
  value: string;
  label?: string;
  maxLength?: number;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  label,
  value,
  name,
  maxLength,
  type,
  placeholder,
  required,
}): React.ReactElement => {
  return (
    <>
      <div className="text-input mb-4">
        {label && (
          <label
            htmlFor={`${name}-text-input`}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {label}
          </label>
        )}
        <input
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={`${name}-text-input`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </>
  );
};

export default TextInput;
