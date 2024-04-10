import { FieldValues, Control, FieldError } from 'react-hook-form';
import { IFormValues } from '@/model/FormValuesState';

interface IAutoCompleteHookProps<
  TFieldValues extends FieldValues = IFormValues,
> {
  label: string;
  name: keyof TFieldValues;
  control: Control<IFormValues>;
  rules: { required: string };
  error: FieldError | undefined;
}

export default IAutoCompleteHookProps;
