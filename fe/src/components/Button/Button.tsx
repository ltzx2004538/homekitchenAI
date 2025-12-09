"use client";
import React from 'react';
import './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
  variant?: 'default' | 'round';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ label, className = '', variant = 'default', size = 'small', disabled = false, ...props }: ButtonProps) {
  const btnClass = [
    className,
    `button--${variant}--${size}`,
    disabled ? 'button--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <button className={btnClass} disabled={disabled} {...props}>
      {label}
    </button>
  );
}
