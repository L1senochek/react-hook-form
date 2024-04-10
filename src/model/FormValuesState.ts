type AnyPresentValue = object;

interface IFormValues {
  acceptTC?: boolean;
  image?: AnyPresentValue | FileList | undefined;
  name?: string;
  age?: string;
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
  gender?: string;
  selectedCountry?: string;
}

type FormValuesState = {
  name: string;
  age: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  gender: string;
  acceptTC: boolean;
  image: string;
  img: string[];
  isValidImage: boolean;
  countries: string[];
  selectedCountry: string;
};

type FormErrors = {
  [key in keyof FormValuesState]?: string;
};

type FormValidation = {
  [key in keyof FormValuesState]?: (
    value: FormValuesState[key]
  ) => string | undefined;
};

type PasswordStrength = {
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
};

type RootState = {
  countries: string[];
};

type FormState = {
  values: FormValuesState;
  errors: FormErrors;
  isSubmitting: boolean;
  passwordStrength: PasswordStrength;
};

type FormArrState = {
  currentForm: FormState;
  arrFormState: FormState[];
  indexArrFormState: number | null;
};

type ImageType = 'png' | 'jpeg';

type Base64<imageType extends ImageType> =
  `data:image/${imageType};base64${string}`;

export type {
  IFormValues,
  FormValuesState,
  FormErrors,
  FormValidation,
  PasswordStrength,
  RootState,
  FormState,
  FormArrState,
  Base64,
};
