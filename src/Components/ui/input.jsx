import React from 'react';

const Input = ({ type = "text", placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-black opacity-50 rounded-md px-4 py-2 text-sm ${className}`}
      {...props}
    />
  );
};

export default Input;
