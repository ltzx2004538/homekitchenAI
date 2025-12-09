"use client";
import React, { useState } from 'react';
import styles from '../../styles/Pages/Auth.module.scss';
import { useAuth } from '../../hooks/auth';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.auth}>
      <LoginForm
        email={email}
        password={password}
        loading={loading}
        error={error}
        onEmailChange={e => setEmail(e.target.value)}
        onPasswordChange={e => setPassword(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
