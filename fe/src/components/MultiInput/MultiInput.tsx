import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './MultiInput.module.scss';
import Button from '../Button/Button';

interface MultiInputProps {
  values: string[];
  onChange: (values: string[], focusIdx?: number) => void;
  label?: string;
  inputClassName?: string;
}

const MultiInput: React.FC<MultiInputProps> = ({ values, onChange, label, inputClassName }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const prevLength = useRef<number>(values.length);
  const [currentFocus, setCurrentFocus] = useState<number | null>(null);

  useEffect(() => {
    if (currentFocus !== null) {
      setTimeout(() => {
        if (inputRefs.current[currentFocus]) {
          console.log('Focusing currentFocus:', currentFocus);
          inputRefs.current[currentFocus]?.focus();
        } else {
          console.log('No input found for currentFocus:', currentFocus);
        }
      }, 0);
    }
    prevLength.current = values.length;
  }, [values.length, currentFocus]);

  const renderInputItem = useCallback((value: string, idx: number) => {
    const isLast = idx === (values?.length ?? 0) - 1;
    return (
      <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
        <input
          ref={el => {
            inputRefs.current[idx] = el;
          }}
          value={value}
          onChange={e => {
            const newValues = [...(values ?? [])];
            newValues[idx] = e.target.value;
            setCurrentFocus(idx);
            onChange(newValues);
          }}
          className={inputClassName}
        />
        <Button
          label="+"
          type="button"
          variant="round"
          size="small"
          style={{ marginLeft: '0.5rem' }}
          className={styles.addIngredientBtn}
          disabled={!value || !isLast}
          onClick={() => {
            setCurrentFocus(values.length);
            onChange([...(values ?? []), '']);
          }}
        />
        {values.length > 1 && (
          <Button
            label="−"
            type="button"
            variant="round"
            size="small"
            style={{ marginLeft: '0.5rem' }}
            className={styles.removeIngredientBtn}
            onClick={() => {
              const newValues = values.filter((_, i) => i !== idx);
              setCurrentFocus(Math.max(0, newValues.length - 1));
              onChange(newValues);
            }}
          />
        )}
      </div>
    );
  }, [values, onChange, inputClassName]);

  const renderItems = useCallback(() => {
    const currentValues = values.length === 0 ? [''] : values;
    return currentValues.map((value, idx) => renderInputItem(value, idx));
  }, [values, renderInputItem]);

  return (
    <label className={styles.multiInputLabel}>
      {label}
      <div>
        {renderItems()}
      </div>
    </label>
  );
};

export default MultiInput;
