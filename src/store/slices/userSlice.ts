import {createSlice} from '@reduxjs/toolkit';
import userActions, {
  getToken,
  login,
  logout,
  register,
} from '../actions/UserActions';

export interface UserState {
  token: string;
  email: string;
  userId: string;
  name: string;
  loading: boolean;
  isAuthenticated: boolean;
  admin: boolean;
}

const initialState: UserState = {
  token: '',
  email: '',
  userId: '',
  name: '',
  loading: false,
  isAuthenticated: false,
  admin: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: userActions,
  extraReducers: builder => {
    builder.addCase(getToken.pending, (state: UserState) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state: UserState, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    });
    builder.addCase(getToken.rejected, (state: UserState) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(login.pending, (state: UserState) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state: UserState, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    });
    builder.addCase(login.rejected, (state: UserState) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(register.pending, (state: UserState) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state: UserState, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    });
    builder.addCase(register.rejected, (state: UserState) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.pending, (state: UserState) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state: UserState, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    });
    builder.addCase(logout.rejected, (state: UserState) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const {AdminOff, AdminOn} = userSlice.actions;

export default userSlice.reducer;
