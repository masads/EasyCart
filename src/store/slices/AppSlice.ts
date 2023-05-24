import {createSlice} from '@reduxjs/toolkit';
import appActions from '../actions/AppActions';

export const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    alert: false,
    alertMessage: 'Something went wrong!',
    mode: 'danger',
  },
  reducers: appActions,
});

export const {setAlert, AlertOff} = appSlice.actions;

export default appSlice.reducer;
