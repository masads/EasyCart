import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Layout, Text as EvaText, Divider, Button} from '@ui-kitten/components';
import {normalize} from '../styles/Style';
import CustomHeader from '../components/Header';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {useDispatch, useSelector} from 'react-redux';
import {userSlice} from '../store/slices/userSlice';
import Loader from '../components/Loader';

export default function ProductDetail({navigation, route}: any) {
  const {id} = route.params;
  const product = useSelector((state: RootState) =>
    state.userSlice.products.find(item => id === item.id),
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <Layout style={styles.container}>
      <CustomHeader title="Product Detail" />
      <ScrollView>
        <View style={styles.content}>
          {product?.image ? (
            <Image
              source={{uri: product?.image}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={{height: normalize(200)}}>
              <Loader />
            </View>
          )}
          <View style={styles.detailsContainer}>
            <EvaText style={styles.name} category="h4">
              {product?.title}
            </EvaText>
            <EvaText style={styles.description} category="p1">
              {product?.description}
            </EvaText>
            <Divider style={styles.divider} />
            <View style={styles.priceRow}>
              <EvaText style={styles.price} category="p1">
                {Number(product?.price).toFixed(2)} PKR
              </EvaText>
              <Button
                onPress={() => {
                  navigation.goBack();
                  navigation.navigate('Cart');
                  dispatch(userSlice.actions.AddToCart(id));
                }}
                style={styles.addToCartButton}>
                Add to Cart
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#3366FF',
  },
  cartButton: {
    padding: 8,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#3366FF',
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 16,
  },
  divider: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0DCDAA',
  },
  addToCartButton: {
    borderRadius: 50,
    backgroundColor: '#3366FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});
