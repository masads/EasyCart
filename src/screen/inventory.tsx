/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {Layout, Text, Card, Button, Icon} from '@ui-kitten/components';
import {normalize} from '../styles/Style';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/Admin';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {useDispatch} from 'react-redux';
import {userSlice} from '../store/slices/userSlice';

type Props = NativeStackScreenProps<StackParamList, 'Inventory'>;

const data = [
  {
    id: 1,
    title: 'Samsung 55-inch Smart 4K UHD TV',
    description:
      "Experience breathtaking visuals with this Samsung 55-inch Smart 4K UHD TV. Featuring a crystal-clear display, powerful speakers, and smart features like voice control and screen mirroring, it's the perfect choice for your home entertainment needs.",
    price: 139,
    picture:
      'https://images.unsplash.com/photo-1574597146034-2f166efd78a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 2,
    title: 'Apple iPhone 13 Pro Max',
    description:
      "The Apple iPhone 13 Pro Max is the latest and greatest smartphone from Apple, featuring a stunning 6.7-inch Super Retina XDR display, A15 Bionic chip, and 5G connectivity. With its advanced camera system, long-lasting battery, and sleek design, it's the ultimate choice for the tech-savvy user.",
    price: 284,
    picture:
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: 3,
    title: 'Dell Inspiron 15 3000 Laptop',
    description:
      "The Dell Inspiron 15 3000 is a versatile and affordable laptop that's perfect for work and play. Featuring a 10th Gen Intel Core processor, 8GB RAM, and a 512GB SSD, it delivers fast and responsive performance for all your computing needs.",
    price: 899,
    picture:
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
  {
    id: 4,
    title: 'Sony WH-1000XM4 Wireless Headphones',
    description:
      'The Sony WH-1000XM4 Wireless Headphones are the ultimate choice for audiophiles and music lovers. Featuring advanced noise-cancellation technology, Hi-Res audio, and up to 30 hours of battery life, they offer an immersive and high-quality listening experience.',
    price: 524,
    picture:
      'https://images.unsplash.com/photo-1520005258079-0b2cfc298a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const ItemCard = ({item}: any) => (
  <Card style={styles.card}>
    <Image source={{uri: item.picture}} style={styles.image} />
    <Text style={styles.title} category="h6">
      {item.title}
    </Text>
    <Text style={styles.description}>
      {item.description.substring(0, 100)}...
    </Text>
    <View style={styles.bottomRow}>
      <Text status="primary" style={styles.price}>
        {item.price.toFixed(2)} PKR
      </Text>
      <Button
        style={styles.button}
        status="danger"
        size="small"
        accessoryRight={() => (
          <Icon fill="#ffff" style={styles.icon} name="trash-2" />
        )}
      />
    </View>
  </Card>
);

export default function Inventory({navigation}: Props) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <>
      <Layout style={styles.container} level="1">
        <Layout style={styles.header}>
          <Button
            style={styles.button}
            onPress={() => {
              dispatch(userSlice.actions.AdminOff());
            }}
            status="danger"
            size="small"
            accessoryRight={() => (
              <Icon fill="#ffff" style={styles.icon} name="log-out" />
            )}
          />
          <Text category="h4" status="primary">
            Inventory
          </Text>
        </Layout>
        <FlatList
          data={data}
          renderItem={(prop: any) => (
            <ItemCard {...prop} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Layout>
      <Pressable
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 40,
          right: 30,
          backgroundColor: '#4333FF',
          borderRadius: 60,
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Icon fill="#ffff" style={styles.plusIcon} name="plus" />
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    gap: normalize(80),
  },
  separator: {
    height: 10,
  },
  card: {
    borderRadius: 16,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginBottom: 5,
    fontSize: 14,
    color: '#444444',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0DCDAA',
  },
  button: {
    borderRadius: 16,
  },
  icon: {
    width: normalize(24),
    height: normalize(24),
  },
  plusIcon: {
    width: normalize(35),
    height: normalize(35),
  },
});
