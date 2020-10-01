import React from 'react';

interface TextAreaProps {
  name: string;
  onChange: ([string]: any) => void;
  value: string;
  label?: string;
  maxLength?: number;
  rows: number;
  cols: number;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  onChange,
  label,
  value,
  name,
  maxLength,
  rows,
  cols,
  placeholder,
}): React.ReactElement => {
  return (
    <>
      <div className="text-area mb-4">
        {label && (
          <label
            htmlFor={`${name}-text-area`}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={`${name}-text-area`}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default TextArea;
