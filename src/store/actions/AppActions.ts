import {PayloadAction} from '@reduxjs/toolkit';

function setAlert(
  state: any,
  action: PayloadAction<{message: string; mode?: string}>,
) {
  const {message, mode = 'danger'} = action.payload;
  state.alert = true;
  state.alertMessage = message;
  state.mode = mode;
}
function AlertOff(state: any) {
  state.alert = false;
  state.alertMessage = 'Something went wrong!';
  state.mode = 'danger';
}

const appActions = {
  setAlert,
  AlertOff,
};

export default appActions;
