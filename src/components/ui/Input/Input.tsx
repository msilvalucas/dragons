import React from 'react';
import styles from './Input.module.css';
interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={label}
        type="text"
        className={styles.input}
        {...props}
      />
    </div>
  );
};
