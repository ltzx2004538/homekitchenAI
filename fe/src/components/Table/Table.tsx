import React from "react";
import styles from './Table.module.scss';

interface TableColumn<T> {
  key: string;
  label: string;
  flex?: number; // new: flex grow value
  render?: (row: T, idx: number) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
}

export default function Table<T extends { _id?: string }>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <div className={styles.table__container}>
      <div className={styles.table__header}>
        {columns.map((col) => (
          <div
            key={col.key}
            className={styles.table__cell + ' ' + styles.table__headerCell}
            style={{ flex: col.flex || 1, minWidth: 0 }}
          >
            {col.label}
          </div>
        ))}
      </div>
      <div className={styles.table__body}>
        {data.map((row, idx) => (
          <div
            key={row._id || idx}
            className={styles.table__row}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            style={onRowClick ? { cursor: 'pointer' } : undefined}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className={styles.table__cell}
                style={{ flex: col.flex || 1, minWidth: 0 }}
              >
                {col.render ? col.render(row, idx) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
