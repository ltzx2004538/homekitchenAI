import React from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  rows?: number;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({ value, onChange, className = '', rows = 6, placeholder }) => {
  return (
    <textarea
      className={`${styles.textfield} ${className}`.trim()}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
    />
  );
};

export default TextField;
