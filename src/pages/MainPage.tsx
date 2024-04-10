import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  PATH_REACT_HOOK_FORM,
  PATH_UNCONTROLED_FORM,
} from '@/utils/constants/constants';
import styles from './main-page.module.scss';
import SubmitInfo from '@/components/SubmitInfo/SubmitInfo';

const MainPage: FC = (): JSX.Element => {
  return (
    <>
      <div className={styles.links}>
        <Link className={styles['links__item']} to={PATH_UNCONTROLED_FORM}>
          Uncontroled Form
        </Link>
        <Link className={styles['links__item']} to={PATH_REACT_HOOK_FORM}>
          React Hook Form
        </Link>
      </div>
      <SubmitInfo />
    </>
  );
};

export default MainPage;
