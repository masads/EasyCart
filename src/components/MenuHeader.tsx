import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Layout, Icon, Text} from '@ui-kitten/components';
import {normalize} from '../styles/Style';
import {DrawerActions} from '@react-navigation/native';

type Header = {
  navigation: any;
};

export default function MenuHeader({navigation}: Header) {
  return (
    <Layout style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}>
        <Icon fill="#7366FF" style={styles.icon} name="grid-outline" />
      </Pressable>
      <Text category="h6" status="primary">
        EasyCart
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Notification');
        }}>
        <Icon fill="#7366FF" style={styles.icon} name="bell-outline" />
      </Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});
