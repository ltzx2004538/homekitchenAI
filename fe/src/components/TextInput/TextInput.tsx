import React from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  min?: number;
  required?: boolean;
  className?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styleType?: 'row' | 'col'; // renamed from layoutType
}

const TextInput: React.FC<TextInputProps> = ({ label, name, type = 'text', value, min, required, className, maxLength = 200, onChange, styleType = 'row' }) => {
  const inputClass = [
    styles['textInput__right__input'],
    styles[`textInput__right__input-${type}`],
    className
  ].filter(Boolean).join(' ');

  const containerClass = [
    styles['textInput'],
    styles[`textInput--${styleType}`]
  ].join(' ');

  return (
    <div className={containerClass}>
      {label ? (
        <div className={styles['textInput__left']}>
          <span className={styles['textInput__left__label']}>{label}</span>
        </div>
      ) : null}
      <div className={styles['textInput__right']}>
        <input
          name={name}
          type={type}
          value={value}
          min={min}
          required={required}
          maxLength={maxLength}
          className={inputClass}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
