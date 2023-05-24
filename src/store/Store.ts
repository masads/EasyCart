import {configureStore, combineReducers} from '@reduxjs/toolkit';

import appSlice from './slices/AppSlice';
import userSlice from './slices/userSlice';
import adminSlice from './slices/adminSlice';

const reducers = combineReducers({
  appSlice,
  userSlice,
  adminSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
