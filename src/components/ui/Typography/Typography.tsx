import React, { ElementType } from 'react';

import styles from './Typography.module.css';

type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption';
type Align = 'left' | 'center' | 'right' | 'justify';
type Color = 'primary' | 'secondary' | 'danger' | 'light' | 'dark';
type Weight = 'normal' | 'bold' | 'light' | 'medium';
type Transform = 'uppercase' | 'lowercase' | 'capitalize';
type Margin = 'none' | 'sm' | 'md' | 'lg';

interface TypographyProps {
  children: React.ReactNode;
  as?: ElementType;
  variant?: TypographyVariant;
  align?: Align;
  color?: Color;
  weight?: Weight;
  transform?: Transform;
  margin?: Margin;
  className?: string;
}

export const Typography = ({
  children,
  as: Component = 'p',
  variant = 'body',
  align = 'left',
  color = 'dark',
  weight = 'normal',
  transform,
  margin = 'none',
  className = '',
}: TypographyProps) => {
  const classes = [
    styles.typography,
    styles[variant],
    styles[`align-${align}`],
    styles[`color-${color}`],
    styles[`weight-${weight}`],
    transform && styles[`transform-${transform}`],
    styles[`margin-${margin}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};
