import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  name: string;
  onClick?: () => void;
  title?: string;
  className?: string;
  styleType?: "default" | "delete";
}

const Icon: React.FC<IconProps> = ({ name, onClick, title, className, styleType = "default" }) => {
  const styleClass =
    styleType === "delete"
      ? styles["icon__delete"]
      : styles["icon__default"];
  return (
    <span
      className={`material-symbols-outlined ${styles.icon} ${styleClass} ${className || ""}`.trim()}
      onClick={onClick}
      title={title}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {name}
    </span>
  );
};

export default Icon;
