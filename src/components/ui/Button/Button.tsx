import React from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'warning';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant: Variant;
}

export const Button = ({ children, variant, ...props }: ButtonProps) => {
  return (
    <button className={`${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
