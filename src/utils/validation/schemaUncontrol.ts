import * as yup from 'yup';
import { passwordOne } from './schema';

const schemaUncontrol = yup
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
    acceptTC: yup
      .string()
      .test('Should accept Terms & Conditions', (value) => value === 'on'),
    image: yup
      .mixed<File>()
      .test('fileSize', 'File size is too large', (value) => {
        const size: number | undefined = value?.size;
        return size! <= 2036388;
      })
      .test('fileType', 'Unsupported file type', (value) => {
        const type: string | undefined = value?.type;
        return type === 'image/jpeg' || type === 'image/png';
      }),
    selectedCountry: yup
      .string()
      .required('Country is required')
      .matches(/^[a-zA-Z]+$/, 'Should selected country'),
  })
  .required();

export default schemaUncontrol;
