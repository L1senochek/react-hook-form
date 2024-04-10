import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormArrState, FormState } from '@/model/FormValuesState';
import { initialCountries } from '@/utils/constants/constants';

const initialCurrentForm: FormState = {
  values: {
    name: '',
    age: '0',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    gender: 'male',
    acceptTC: false,
    image: '',
    img: [],
    isValidImage: false,
    countries: initialCountries,
    selectedCountry: '',
  },
  errors: {},
  isSubmitting: false,
  passwordStrength: {
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
  },
};

const initialState: FormArrState = {
  currentForm: initialCurrentForm,
  arrFormState: [],
  indexArrFormState: 0,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookFormValue',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.currentForm.values.name = action.payload;
    },
    setAge: (state, action: PayloadAction<string>) => {
      state.currentForm.values.age = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.currentForm.values.email = action.payload;
    },
    setPasswordOne: (state, action: PayloadAction<string>) => {
      state.currentForm.values.passwordOne = action.payload;
    },
    setPasswordTwo: (state, action: PayloadAction<string>) => {
      state.currentForm.values.passwordTwo = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.currentForm.values.gender = action.payload;
    },
    setAcceptTC: (state, action: PayloadAction<boolean>) => {
      state.currentForm.values.acceptTC = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.currentForm.values.selectedCountry = action.payload;
    },
    clearSelectedCountry: (state) => {
      state.currentForm.values.selectedCountry = '';
    },
    setImage: (
      state,
      action: PayloadAction<{ image: string; isValidImage: boolean }>
    ) => {
      state.currentForm.values.image = action.payload.image;
      state.currentForm.values.isValidImage = action.payload.isValidImage;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.currentForm.values.img = [
        ...state.currentForm.values.img,
        action.payload,
      ];
    },
    resetArrForms: () => initialState,
    setArrFormState: (state) => {
      state.arrFormState.push({ ...state.currentForm });
    },
    setIndexArrFormState: (state, action: PayloadAction<number>) => {
      state.indexArrFormState = action.payload;
    },
  },
});

export const {
  setName,
  setAge,
  setEmail,
  setPasswordOne,
  setPasswordTwo,
  setGender,
  setAcceptTC,
  setSelectedCountry,
  clearSelectedCountry,
  setImage,
  setImg,
  resetArrForms,
  setArrFormState,
  setIndexArrFormState,
} = reactHookFormSlice.actions;
export default reactHookFormSlice;
