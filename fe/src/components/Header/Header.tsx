import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <span className={styles.header__text}>Home Kitchen APP</span>
  </header>
);

export default Header;
