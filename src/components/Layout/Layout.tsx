import { FC } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './layout.module.scss';

const Layout: FC = (): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <Link to={'/'}>React Forms</Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
