import { FC, useState } from 'react';
import EyeOn from '../EyeForPassword/EyeOn';
import EyeOff from '../EyeForPassword/EyeOff';
import styles from './password.module.scss';

const Password: FC<{ value: string }> = ({ value }): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles['password']}`}>
      <input
        type={showPassword ? 'text' : 'password'}
        autoComplete="false"
        className={styles['password__input']}
        value={value}
        readOnly={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          e.preventDefault()
        }
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={styles['password__btn']}
      >
        {showPassword ? <EyeOn /> : <EyeOff />}
      </button>
    </div>
  );
};

export default Password;
