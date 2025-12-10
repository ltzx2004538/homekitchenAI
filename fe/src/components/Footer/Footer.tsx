import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__icons}>
      <Link href="/" className={styles.footer__icon}>
        <span className="material-symbols-outlined">home</span>
      </Link>
      <Link href="/recipe" className={styles.footer__icon}>
        <span className="material-symbols-outlined">restaurant_menu</span>
      </Link>
      <Link href="/favorites" className={styles.footer__icon}>
        <span className="material-symbols-outlined">star</span>
      </Link>
      <Link href="/setting" className={styles.footer__icon}>
        <span className="material-symbols-outlined">settings</span>
      </Link>
    </div>
  </footer>
);

export default Footer;
