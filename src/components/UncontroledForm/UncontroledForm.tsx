import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setAge,
  setArrFormState,
  setEmail,
  setGender,
  setImg,
  setName,
  setPasswordOne,
  setSelectedCountry,
} from '@/store/slices/uncontroledFormSlice';
import { RootState } from '@/store/store';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import styles from './uncontroled-form.module.scss';
import validatePassword from '@/utils/validation/validatePassword';
import schemaUncontrol from '@/utils/validation/schemaUncontrol';
import IFormErrors from '@/model/components/UncontroledForm/UncontroledForm';
import AutocompleteHookUncontroled from '../AutocompleteHookUncontroled/AutocompleteHookUncontroled';
import { useNavigate } from 'react-router';

const UncontroledForm: FC = (): JSX.Element => {
  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState<IFormErrors>({});
  const [errorsPassword, setErrorsPassword] = useState<string[]>([]);
  const [passwordValue, setPasswordValue] = useState('');

  const uncontroledFormValue = useAppSelector(
    (state: RootState) => state.ucontroledForm.currentForm
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setName('UncontroledForm'));
  }, [dispatch, uncontroledFormValue]);

  const strongPassword = () => {
    if (errorsPassword.length <= 0) {
      return 'Password is strong!';
    } else if (errorsPassword.length > 0 && errorsPassword.length < 2) {
      return 'Password is medium!';
    } else if (errorsPassword.length >= 2 && errorsPassword.length < 4) {
      return 'Password is easy!';
    } else if (errorsPassword.length >= 4) {
      return 'Password is over easy!';
    }
  };

  const validated = async (e: string): Promise<void> => {
    const password = e;
    setPasswordValue(password);
    const result = await validatePassword(password);
    if (typeof result === 'string') {
      setErrorsPassword([]);
    } else {
      setErrorsPassword(Object.values(result.errors));
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const data: Record<string, string | File> = {
      acceptTC: '',
    };

    formData.forEach((value, key: string) => {
      if (key === 'passwordOne') {
        validated(value as string);
      }
      data[key] = value;
    });

    schemaUncontrol
      .validate(data, { abortEarly: false })
      .then((validData) => {
        const file = validData.image;
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64String = event.target?.result;
          dispatch(setImg(base64String as string));
        };
        reader.readAsDataURL(file!);

        dispatch(setName(validData.name));
        dispatch(setAge(validData.age));
        dispatch(setEmail(validData.email));
        dispatch(setPasswordOne(validData.passwordOne));
        dispatch(setGender(validData.gender));
        dispatch(setSelectedCountry(validData.selectedCountry));

        dispatch(setArrFormState());
        navigate('/');
      })
      .catch((validationErrors) => {
        setFormErrors(
          validationErrors.inner.reduce(
            (errors: object, error: yup.ValidationError) => ({
              ...errors,
              [error.path!]: error.message,
            }),
            {}
          )
        );
      });
  };

  return (
    <div className={styles['uncontrolled-form']}>
      <h2>UncontroledForm</h2>
      <form className={styles['form']} ref={formRef}>
        <label className={styles['form__label']}>Name:</label>
        <input
          name="name"
          placeholder={'Name'}
          className={`${styles['form__input']} ${
            formErrors.name ? styles['error-input'] : ''
          }`}
        />
        <p className={styles['form__error']}>
          <span className={styles['form__error_message']}>
            {formErrors.name}
          </span>
        </p>
        <label className={styles['form__label']}>Age:</label>
        <input
          name="age"
          placeholder={'Age'}
          className={`${styles['form__input']} ${
            formErrors.age ? styles['error-input'] : ''
          }`}
          type="number"
        />
        <p className={styles['form__error']}>
          <span className={styles['form__error_message']}>
            {formErrors.age}
          </span>
        </p>
        <label className={styles['form__label']}>Email:</label>
        <input
          name="email"
          placeholder={'Email'}
          className={`${styles['form__input']} ${
            formErrors.email ? styles['error-input'] : ''
          }`}
        />
        <p className={styles['form__error']}>
          <span className={styles['form__error_message']}>
            {formErrors.email}
          </span>
        </p>
        <label className={styles['form__label']}>Password:</label>
        <input
          name="passwordOne"
          placeholder={'Password'}
          className={`${styles['form__input']} ${
            errorsPassword.length > 0 ? styles['error-input'] : ''
          }`}
          type="password"
          autoComplete="false"
        />
        <p className={styles['form__error']}>
          {errorsPassword.length > 0 && (
            <span className={styles['form__error_message']}>
              Should contain{' '}
              {errorsPassword.map((error) =>
                error !== 'P' ? error + ' ' : ''
              )}
            </span>
          )}
        </p>
        <p className={styles['form__error']}>
          <span className={styles['form__error_message']}>
            {passwordValue ? strongPassword() : null}
          </span>
        </p>
        <label className={styles['form__label']}>Confirm Password:</label>
        <input
          name="passwordTwo"
          placeholder={'Confirm Password'}
          className={`${styles['form__input']} ${
            formErrors.passwordTwo ? styles['error-input'] : ''
          }`}
          type="password"
          autoComplete="false"
        />
        <p className={styles['form__error']}>
          <span className={styles['form__error_message']}>
            {formErrors.passwordTwo}
          </span>
        </p>
        <div className={styles['form__gender']}>
          <label className={styles['form__gender_item']}>
            Male
            <input type="radio" value="male" name="gender" />
          </label>
          <label className={styles['form__gender_item']}>
            Female
            <input type="radio" value="female" name="gender" />
          </label>
          <label className={styles['form__gender_item']}>
            Other
            <input type="radio" value="other" name="gender" />
          </label>
        </div>
        <p className={styles['form__error']}>
          {formErrors.gender && (
            <span className={styles['form__error_message']}>
              {formErrors.gender}
            </span>
          )}
        </p>
        <label className={styles['form__label']}>
          Accept Terms & Conditions
          <input type="checkbox" name="acceptTC" />
        </label>
        <p className={styles['form__error']}>
          {formErrors.acceptTC && (
            <span className={styles['form__error_message']}>
              Should accept Terms & Conditions
            </span>
          )}
        </p>
        <label className={styles['form__label']}>Image:</label>
        <input
          name="image"
          type="file"
          accept="image/jpeg, image/png"
          className={styles['form__img']}
        />
        <p className={styles['form__error']}>
          {formErrors.image && (
            <span className={styles['form__error_message']}>
              {formErrors.image}
            </span>
          )}
        </p>
        <AutocompleteHookUncontroled label="Country" name="selectedCountry" />
        <p className={styles['form__error']}></p>

        <button
          className={`${styles['form__submit']} btn`}
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontroledForm;
