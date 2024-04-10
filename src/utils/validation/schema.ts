import * as yup from 'yup';

export const passwordOne = yup
  .string()
  .required('Password is required')
  .matches(/\d+/, { message: { number: '1 number' } })
  .matches(/[a-z]+/, { message: { lowercase: '1 lowercase letter' } })
  .matches(/[A-Z]+/, { message: { uppercase: '1 uppercase letter' } })
  .matches(/[!@#$%^&*()-+]+/, {
    message: { special: '1 special character' },
  });

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z][a-zA-Z\s]*$/, 'Should start with an uppercase letter'),
    age: yup
      .string()
      .required('Age is required')
      .matches(/^\d+$/, 'Should not contain negative values'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^\S+@\S+\.\S+$/i,
        'Should be a valid email address(example@example.com)'
      ),
    passwordOne: passwordOne,
    passwordTwo: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('passwordOne')], 'Should match entered password'),
    gender: yup.string().required('Gender is required'),
    acceptTC: yup.boolean().oneOf([true], 'Should accept Terms & Conditions'),
    image: yup
      .mixed()
      .test('fileSize', 'File size is too large', (value) =>
        value instanceof FileList && value.length > 0
          ? value[0].size <= 2036388
          : false
      )
      .test('fileType', 'Unsupported file type', (value) =>
        value instanceof FileList && value.length > 0
          ? ['image/jpeg', 'image/png'].includes(value[0].type)
          : false
      ),
    selectedCountry: yup
      .string()
      .required('Country is required')
      .matches(/^[a-zA-Z]+$/, 'Should selected country'),
  })
  .required();

export default schema;
