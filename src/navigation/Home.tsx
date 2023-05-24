/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Layout,
  Text,
  IndexPath,
  Icon,
} from '@ui-kitten/components';
import MainStackNavigator from './Stack';
import CartScreen from '../screen/cart';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {logout} from '../store/actions/UserActions';

export type RootDrawerParamList = {
  Home: undefined;
  Cart: undefined;
};

const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

const FeedIcon = (props: any) => (
  <Icon {...props} name="shopping-bag-outline" />
);

const CartIcon = (props: any) => (
  <Icon {...props} name="shopping-cart-outline" />
);

const ForwardIcon = (props: any) => (
  <Icon {...props} name="arrow-ios-forward" />
);
const LogoutIcon = (props: any) => <Icon {...props} name="log-out" />;

const DrawerHeader = () => {
  const {name} = useSelector((state: RootState) => state.userSlice);
  return (
    <Layout style={{marginVertical: 20}}>
      <Text style={{textAlign: 'center'}} category="h5">
        {name}
      </Text>
    </Layout>
  );
};

const DrawerContent = ({navigation, state}: any) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      header={DrawerHeader}
      // onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
    >
      <DrawerItem
        title="Feed"
        accessoryLeft={FeedIcon}
        accessoryRight={ForwardIcon}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <DrawerItem
        title="Cart"
        accessoryLeft={CartIcon}
        accessoryRight={ForwardIcon}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
      <DrawerItem
        title="Logout"
        accessoryLeft={LogoutIcon}
        onPress={() => {
          dispatch(logout());
        }}
      />
      {/* <Pressable style={styles.button}>
      <Text>Logout</Text>
      <LogoutIcon />
    </Pressable> */}
    </Drawer>
  );
};

export default function Home() {
  return (
    <RootDrawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: any) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <RootDrawer.Screen name="Home" component={MainStackNavigator} />
      <RootDrawer.Screen name="Cart" component={CartScreen} />
    </RootDrawer.Navigator>
  );
}
