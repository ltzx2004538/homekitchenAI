import React from "react";
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ title, children, className = "" }: PageLayoutProps) {
  return (
    <div className={styles["page-layout"]}>
      <span className={styles["page-layout__title"]}>{title}</span>
      {children}
    </div>
  );
}
