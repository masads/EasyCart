import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Inventory from '../screen/inventory';
import AddProduct from '../screen/AddProduct';
import OpenCamera from '../screen/openCamera';

export type StackParamList = {
  Inventory: undefined;
  AddProduct: {image?: any};
  OpenCamera: {image: any};
};

const AdminStack = createStackNavigator<StackParamList>();

export default function Admin() {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AdminStack.Screen name="Inventory" component={Inventory} />
      <AdminStack.Screen name="AddProduct" component={AddProduct} />
      <AdminStack.Screen name="OpenCamera" component={OpenCamera} />
    </AdminStack.Navigator>
  );
}
