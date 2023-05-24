import {configureStore, combineReducers} from '@reduxjs/toolkit';

import appSlice from './slices/AppSlice';
import userSlice from './slices/userSlice';

const reducers = combineReducers({
  appSlice,
  userSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
