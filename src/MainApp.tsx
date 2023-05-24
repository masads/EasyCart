import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/Auth';
import React, {useEffect} from 'react';
import Home from './navigation/Home';
import Admin from './navigation/Admin';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from './store/actions/UserActions';
import {AnyAction} from 'redux';
import {RootState} from './store/Store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import Alert from './components/Alert';

export default function MainApp(): JSX.Element {
  const {admin, isAuthenticated} = useSelector(
    (state: RootState) => state.userSlice,
  );
  const {alert} = useSelector((state: RootState) => state.appSlice);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {admin ? <Admin /> : !isAuthenticated ? <AuthStack /> : <Home />}
      {alert ? <Alert /> : <></>}
    </NavigationContainer>
  );
}
