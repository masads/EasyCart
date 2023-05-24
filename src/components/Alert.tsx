import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {ZoomInEasyUp, ZoomOutEasyUp} from 'react-native-reanimated';

import {RootState} from '../store/Store';
import Theme from '../styles/Theme';
import {normalize} from '../styles/Style';
import {appSlice} from '../store/slices/AppSlice';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';

function Alert() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {alert, alertMessage, mode} = useSelector(
    (state: RootState) => state.appSlice,
  );

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        dispatch(appSlice.actions.AlertOff());
      }, 3000);
    }
  }, [alert, dispatch]);

  return (
    <Animated.View
      style={[
        Style.container,
        {
          backgroundColor:
            mode === 'danger'
              ? Theme.color.redLite
              : mode === 'warning'
              ? Theme.color.YellowLite
              : Theme.color.primaryLiteLight,
          borderColor:
            mode === 'danger'
              ? Theme.color.red
              : mode === 'warning'
              ? Theme.color.Yellow
              : Theme.color.primary,
        },
      ]}
      entering={ZoomInEasyUp}
      exiting={ZoomOutEasyUp}>
      <Text
        style={[
          Style.text,
          {
            color:
              mode === 'danger'
                ? Theme.color.red
                : mode === 'warning'
                ? Theme.color.Yellow
                : Theme.color.primary,
          },
        ]}>
        {alertMessage + ' '}
      </Text>
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 15,
    zIndex: 2,
    width: '90%',
    alignItems: 'center',
    top: normalize(20),
    borderRadius: 20,
    borderWidth: 1.5,
  },
  text: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default Alert;
