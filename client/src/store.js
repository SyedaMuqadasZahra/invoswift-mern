import { configureStore } from '@reduxjs/toolkit';
import userReducer from './_reducers/user_reducer';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: { user: userReducer },
});
