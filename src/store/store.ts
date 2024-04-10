import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import uncontroledFormSlice from './slices/uncontroledFormSlice';
import reactHookFormSlice from './slices/reactHookFormSlice';

const rootReducer = combineReducers({
  ucontroledForm: uncontroledFormSlice.reducer,
  reactHookForm: reactHookFormSlice.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export default store;
