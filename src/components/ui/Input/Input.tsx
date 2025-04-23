import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | false;
  showPasswordToggle?: boolean;
}

export const Input = ({
  label,
  error,
  id,
  name,
  className,
  type = 'text',
  showPasswordToggle = false,
  ...props
}: InputProps) => {
  const inputId = id || name;
  const hasError = !!error;

  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password' && showPasswordToggle;
  const realType = isPassword ? (visible ? 'text' : 'password') : type;

  return (
    <div className={`${styles.container} ${hasError ? styles.error : ''}`}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          name={name}
          type={realType}
          className={`${styles.input} ${className || ''} ${
            hasError ? styles.inputError : ''
          }`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className={styles.toggleIcon}
            tabIndex={-1}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {hasError && (
        <span className={styles.errorMessage} id={`${inputId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};
