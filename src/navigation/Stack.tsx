import {createStackNavigator} from '@react-navigation/stack';
import Feed from '../screen/feed';
import Notification from '../screen/notification';
import React from 'react';
import ProductDetail from '../screen/productDetail';
const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}
