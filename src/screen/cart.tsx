import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image, Pressable} from 'react-native';
import {Button, Card, Modal, Text, Icon} from '@ui-kitten/components';
import MenuHeader from '../components/MenuHeader';
import {normalize} from '../styles/Style';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/Store';
import Loader from '../components/Loader';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {userSlice} from '../store/slices/userSlice';

export default function CartScreen({navigation}: any) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [visible, setVisible] = useState(false);
  const {loading, cart} = useSelector((state: RootState) => state.userSlice);
  const renderItem = ({item}: any) => (
    <>
      <Card style={styles.item}>
        <Image style={styles.itemImage} source={{uri: item.image}} />
        <Text category="h6" style={styles.itemName}>
          {item.title}
        </Text>
        <Text category="s1" style={styles.itemPrice}>
          {Number(item.price).toFixed(2)} PKR
        </Text>
      </Card>
      <Pressable
        onPress={() => {
          dispatch(userSlice.actions.DeleteFromCart(item.id));
        }}
        style={{position: 'absolute', right: 5}}>
        <Icon fill="#F9482C" name="close-circle" style={styles.icon} />
      </Pressable>
    </>
  );

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };

  const handlePayPress = () => {
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <MenuHeader navigation={navigation} />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      <View style={styles.totalContainer}>
        <Text category="h5" style={styles.totalText}>
          Total:
        </Text>
        <Text category="h5" style={styles.totalPrice}>
          {getTotalPrice().toFixed(2)} PKR
        </Text>
      </View>
      <Button style={styles.payButton} onPress={handlePayPress}>
        PAY NOW
      </Button>
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <View style={styles.modalCard}>
          <Icon
            style={styles.modalIcon}
            fill="#0DCDAA"
            name="checkmark-circle-outline"
          />
          <Text category="h4" style={styles.modalText}>
            Payment Successfully
          </Text>
          <Button style={styles.modalButton} onPress={handleModalClose}>
            CLOSE
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {},
  item: {
    borderRadius: 16,
    elevation: 3,
    marginVertical: 8,
    overflow: 'hidden',
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
  },
  itemImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  itemName: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#888',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalPrice: {
    fontWeight: 'bold',
    color: '#0DCDAA',
  },
  payButton: {
    marginHorizontal: 24,
    marginVertical: 16,
    borderRadius: 16,
    paddingVertical: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    padding: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  modalText: {
    fontWeight: 'bold',
    marginVertical: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  modalButton: {
    marginVertical: 16,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalIcon: {
    width: 48,
    height: 48,
  },
  removeItemButton: {
    height: 24,
    width: 24,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});
