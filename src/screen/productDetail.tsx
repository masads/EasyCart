import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Layout, Text as EvaText, Divider, Button} from '@ui-kitten/components';
import {normalize} from '../styles/Style';
import CustomHeader from '../components/Header';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {useDispatch} from 'react-redux';
import {userSlice} from '../store/slices/userSlice';

export default function ProductDetail({route}: any) {
  const {id, name, description, price, image} = route.params;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  return (
    <Layout style={styles.container}>
      <CustomHeader title="Product Detail" />
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.detailsContainer}>
            <EvaText style={styles.name} category="h4">
              {name}
            </EvaText>
            <EvaText style={styles.description} category="p1">
              {description}
            </EvaText>
            <Divider style={styles.divider} />
            <View style={styles.priceRow}>
              <EvaText style={styles.price} category="p1">
                {Number(price).toFixed(2)} PKR
              </EvaText>
              <Button
                onPress={() => {
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
