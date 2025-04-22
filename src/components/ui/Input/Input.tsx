import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | false;
}

export const Input = ({
  label,
  error,
  id,
  name,
  className,
  ...props
}: InputProps) => {
  const inputId = id || name;

  const hasError = !!error;

  return (
    <div className={`${styles.container} ${hasError ? styles.error : ''}`}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        className={`${styles.input} ${className || ''} ${
          hasError ? styles.inputError : ''
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        {...props}
      />

      {hasError && (
        <span className={styles.errorMessage} id={`${inputId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};
