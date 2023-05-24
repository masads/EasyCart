/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {Layout, Text, Card, Button, Icon} from '@ui-kitten/components';
import {normalize} from '../styles/Style';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/Admin';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {useDispatch, useSelector} from 'react-redux';
import {userSlice} from '../store/slices/userSlice';
import {deleteProduct, getProducts} from '../store/actions/AdminActions';
import {RefreshControl} from 'react-native-gesture-handler';
import Theme from '../styles/Theme';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<StackParamList, 'Inventory'>;

const ItemCard = ({item}: any) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <Card style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title} category="h6">
        {item.title}
      </Text>
      <Text style={styles.description}>
        {item.description.substring(0, 100)}...
      </Text>
      <View style={styles.bottomRow}>
        <Text status="primary" style={styles.price}>
          {Number(item.price).toFixed(2)} PKR
        </Text>
        <Button
          onPress={() => {
            dispatch(deleteProduct({productId: item.id}));
          }}
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
};

export default function Inventory({navigation}: Props) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {loading, products} = useSelector(
    (state: RootState) => state.adminSlice,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getProducts());
      setRefreshing(false);
    }, 2000);
  }, []);

  console.log(products);
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
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={products}
            refreshControl={
              <RefreshControl
                colors={['#3366FF']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={(prop: any) => (
              <ItemCard {...prop} navigation={navigation} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
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
