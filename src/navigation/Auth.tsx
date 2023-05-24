import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/login';
import Register from '../screen/register';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Register" component={Register} />
    </RootStack.Navigator>
  );
}
