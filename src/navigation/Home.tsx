/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import {
  addNotification,
  getProducts,
  logout,
} from '../store/actions/UserActions';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from '../../App';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  useEffect(() => {
    (async () => {
      if (await requestUserPermission()) {
        if (await requestUserPermission()) {
          messaging()
            .getToken()
            .then(token => {
              console.log('token', token);
            });
        } else {
          console.log('Failed Token Status');
          return;
        }

        messaging().onNotificationOpenedApp(handleNotification);
        messaging().getInitialNotification().then(handleNotification);
        const unsubscribe = messaging().onMessage((notification: any) => {
          if (!notification) {
            return;
          }
          console.log(notification);
          if (notification.data.screen === 'newProduct') {
            dispatch(
              addNotification({
                data: notification.data,
                title: notification.notification.title,
                description: notification.notification.body,
                read: false,
              }),
            );
          }
        });
        messaging().setBackgroundMessageHandler(handleNotification);

        messaging()
          .subscribeToTopic('newProduct')
          .then(() => console.log('Subscribed to newProduct!'));
        return unsubscribe;
      }
    })();
  }, []);
  const handleNotification = async (notification: any) => {
    if (!notification) {
      return;
    }
    if (notification.data.screen === 'newProduct') {
      dispatch(getProducts({productId: notification.data.id, navigation}));
      dispatch(
        addNotification({
          data: notification.data,
          title: notification.notification.title,
          description: notification.notification.body,
          read: true,
        }),
      );
    }
  };
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
