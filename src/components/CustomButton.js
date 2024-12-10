import React from 'react';

const CustomButton = ({ onClick, children, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      className={`CustomButton text-center ${className}}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;

