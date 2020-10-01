import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  buttonSize?: string;
  buttonStyle?: string;
  type: string;
  btnClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  buttonSize,
  buttonStyle,
  children,
  type,
  btnClass,
}): React.ReactElement => {
  return (
    <>
      {type === 'submit' ? (
        <button
          className={`btn ${buttonStyle} ${buttonSize}`}
          onClick={onClick}
          type="submit"
        >
          {children}
        </button>
      ) : (
        <button
          className={`btn ${buttonStyle} ${buttonSize} ${btnClass}`}
          onClick={onClick}
          type="button"
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
