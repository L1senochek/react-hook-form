import { useAppSelector } from '@/store/hooks';
import { FC } from 'react';
import styles from './autocomplete-hook-uncontroled.module.scss';
import IAutocompleteHookUncontroled from '@/model/components/AutocompleteHookUncontroled/AutocompleteHookUncontroled';

const AutocompleteHookUncontroled: FC<IAutocompleteHookUncontroled> = ({
  label,
  name,
}) => {
  const countries = useAppSelector(
    (state) => state.reactHookForm.currentForm.values.countries
  );

  return (
    <div className={styles['autocomplete-hook-uncontroled']}>
      <label className={styles['autocomplete-hook-uncontroled__label']}>
        {label}
      </label>
      <select
        className={styles['autocomplete-hook-uncontroled__input']}
        name={name}
      >
        <option
          className={styles['autocomplete-hook-uncontroled__option']}
          value=""
          disabled
        >
          Select an option
        </option>
        {countries.map((country) => (
          <option
            className={styles['autocomplete-hook-uncontroled__option']}
            key={country}
            value={country}
          >
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};
export default AutocompleteHookUncontroled;
