import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import MainApp from './src/MainApp';
import Style from './src/styles/Style';
import {store} from './src/store/Store';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {default as theme} from './theme.json';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
};

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={Style.container}>
        <StatusBar backgroundColor={'#ffff'} barStyle={'dark-content'} />
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <Provider store={store}>
            <MainApp />
          </Provider>
        </ApplicationProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
