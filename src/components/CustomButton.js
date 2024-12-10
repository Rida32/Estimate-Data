import React from 'react';

const CustomButton = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`CustomButton text-center }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;

