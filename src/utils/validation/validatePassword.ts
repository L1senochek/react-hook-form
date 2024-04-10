import IValidationErrors from '@/model/utils/validatePassword';
import { passwordOne } from './schema';

const validatePassword = (password: string) =>
  passwordOne.validate(password, { abortEarly: false }).catch(({ errors }) => {
    const validationErrors: IValidationErrors = errors.reduce(
      (acc: IValidationErrors, error: Record<string, string>) => {
        const [key, value] = Object.entries(error)[0] as [
          keyof IValidationErrors,
          string,
        ];
        acc[key] = value;
        return acc;
      },
      {}
    );
    return Promise.resolve({ errors: validationErrors });
  });

export default validatePassword;
