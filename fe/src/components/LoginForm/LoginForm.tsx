import React, { useMemo } from 'react';
import styles from './LoginForm.module.scss';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

interface LoginFormProps {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, loading, error, onEmailChange, onPasswordChange, onSubmit }) => {
  const isDisabled = useMemo(() => {
    return loading || !email.trim() || !password.trim();
  }, [loading, email, password]);

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <h2 className={styles.loginForm__title}>Login</h2>
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={onEmailChange}
        required
        styleType="col"
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
        styleType="col"
      />
      {error && <div className={styles.loginForm__error}>{error}</div>}
      {loading ? (
        <div className={styles.loginForm__loading}>Logging in...</div>
      ) : (
        <Button className={styles.loginForm__submit} label="Login" type="submit" disabled={isDisabled} />
      )}
    </form>
  );
};

export default LoginForm;
