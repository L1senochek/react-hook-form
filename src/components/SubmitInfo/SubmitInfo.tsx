import { FC, useEffect, useState } from 'react';
import styles from './submit-info.module.scss';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import SubmitCardDescription from '../SubmitCardDescription/SubmitCardDescription';
import { FormState } from '@/model/FormValuesState';

const SubmitInfo: FC = (): JSX.Element => {
  const [reactHookFormArr, setReactHookFormArr] = useState<FormState[]>();
  const [reactHookFormImgArr, setReactHookFormImgArr] = useState<string[]>();
  const [uncontroledFormArr, setUncontroledFormArr] = useState<FormState[]>();
  const [uncontroledFormImgArr, setUncontroledFormImgArr] =
    useState<string[]>();
  const ucontroledFormValue = useAppSelector(
    (state: RootState) => state.ucontroledForm.arrFormState
  );
  const ucontroledImage = useAppSelector(
    (state) => state.ucontroledForm.currentForm.values.img
  );
  const reactHookFormValue = useAppSelector(
    (state: RootState) => state.reactHookForm.arrFormState
  );
  const reactHookFormImage = useAppSelector(
    (state) => state.reactHookForm.currentForm.values.img
  );

  useEffect(() => {
    setReactHookFormArr([...reactHookFormValue].reverse());
    setReactHookFormImgArr([...reactHookFormImage].reverse());
    setUncontroledFormArr([...ucontroledFormValue].reverse());
    setUncontroledFormImgArr([...ucontroledImage].reverse());
  }, [
    reactHookFormImage,
    reactHookFormValue,
    ucontroledFormValue,
    ucontroledImage,
  ]);

  return (
    <>
      <div className={styles['submit-info']}>
        <h3 className={styles['submit-info__title']}>Submit info:</h3>
        <div className={styles['submit-info__wrapper']}>
          <div className={styles['submit-info__form']}>
            <h4 className={styles['submit-info__form_title']}>
              Uncontroled form submit info:
            </h4>
            {uncontroledFormImgArr &&
              uncontroledFormArr?.map((formValue, index) => (
                <SubmitCardDescription
                  key={index}
                  title={`Card ${index + 1}`}
                  description={formValue}
                  image={uncontroledFormImgArr[index]}
                  LastClassName={index === 0 ? 'last-card' : ''}
                />
              ))}
          </div>
          <div className={styles['submit-info__form']}>
            <h4 className={styles['submit-info__form_title']}>
              React Hook form submit info:
            </h4>
            {reactHookFormImgArr &&
              reactHookFormArr?.map((formValue, index) => (
                <SubmitCardDescription
                  key={index}
                  title={`Card ${index + 1}`}
                  description={formValue}
                  image={reactHookFormImgArr[index]}
                  LastClassName={index === 0 ? 'last-card' : ''}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitInfo;
