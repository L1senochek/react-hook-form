import { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from 'react';
import { useController } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedCountry } from '@/store/slices/reactHookFormSlice';
import IAutoCompleteHookProps from '@/model/components/AutoCompleteHook/AutoCompleteHook';
import styles from './auto-complete-hook.module.scss';

const AutoCompleteHook = ({
  label,
  name,
  control,
  rules,
  error,
  ...rest
}: IAutoCompleteHookProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const countries = useAppSelector(
    (state) => state.reactHookForm.currentForm.values.countries
  );
  const { field } = useController({
    name,
    control,
    defaultValue: '',
    rules: { ...rules },
  });

  useEffect(() => {
    const filtered = countries.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, countries]);

  useEffect(() => {
    if (optionsRef.current && focusedIndex !== null) {
      const focusedItem = optionsRef.current.children[focusedIndex];
      if (focusedItem) {
        focusedItem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredOptions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filteredOptions.length - 1
          : prevIndex - 1
      );
    } else if (e.key === 'Enter' && focusedIndex !== null) {
      e.preventDefault();
      const selectedOption = filteredOptions[focusedIndex];
      field.onChange(selectedOption);
      dispatch(setSelectedCountry(selectedOption));
    }
  };

  const handleOptionClick = (option: string) => {
    field.onChange(option);
    dispatch(setSelectedCountry(option));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFocusedIndex(null);
    field.onChange(e.target.value);
  };

  return (
    <div className={styles['auto-complete-hook']}>
      <label className={styles['auto-complete-hook__label']}>{label}</label>
      <input
        {...field}
        {...rest}
        value={(field.value as string) || searchTerm || ''}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${styles['auto-complete-hook__input']} ${
          error ? styles['error-input'] : ''
        }`}
      />
      {filteredOptions.length > 0 && (
        <div className={styles['auto-complete-hook__option']} ref={optionsRef}>
          {filteredOptions.map((option, index) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${styles['auto-complete-hook__item']} ${
                index === focusedIndex ? styles['focused'] : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteHook;
