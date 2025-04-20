import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} name={label} type="text" {...props} />
    </div>
  );
};
