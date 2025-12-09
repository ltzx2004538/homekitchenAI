"use client";
import { useRouter } from 'next/navigation';
import styles from '../styles/Pages/Home.module.scss';
import Button from '../components/Button/Button';

export default function HomePage() {
  const router = useRouter();
  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>Welcome to your HomeKitchen app</h1>
      <Button
        type="button"
        label="Go to Recipe"
        className={styles['home-page__buttons']}
        style={{ marginBottom: '1rem' }}
        onClick={() => router.push('/recipe')}
      />
    </div>
  );
}
