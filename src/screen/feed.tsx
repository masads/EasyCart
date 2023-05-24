import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Layout, Text, Card, Button, Icon} from '@ui-kitten/components';
import {normalize} from '../styles/Style';
import MenuHeader from '../components/MenuHeader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import {AnyAction} from 'redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getProducts} from '../store/actions/UserActions';
import {RefreshControl} from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import {userSlice} from '../store/slices/userSlice';

const ItemCard = ({item, navigation}: any) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <Card
      onPress={() => {
        navigation.navigate('ProductDetail', {
          name: item.title,
          description: item.description,
          price: item.price,
          image: item.image,
          id: item.id,
        });
      }}
      style={styles.card}>
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
            dispatch(userSlice.actions.AddToCart(item.id));
            navigation.navigate('Feed');
          }}
          style={styles.button}
          status="primary"
          size="small"
          accessoryRight={() => (
            <Icon fill="#ffff" style={styles.icon} name="arrow-right-outline" />
          )}>
          Add to Cart
        </Button>
      </View>
    </Card>
  );
};

export default function Feed({navigation}: any) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {loading, products} = useSelector(
    (state: RootState) => state.userSlice,
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
  return (
    <Layout style={styles.container} level="1">
      <MenuHeader navigation={navigation} />
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
          // ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={(prop: any) => (
            <ItemCard {...prop} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
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
    backgroundColor: '#3366FF',
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});
