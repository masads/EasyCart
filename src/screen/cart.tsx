import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {Button, Card, Modal, Text, Icon} from '@ui-kitten/components';
import MenuHeader from '../components/MenuHeader';
import {normalize} from '../styles/Style';

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

export default function CartScreen({navigation}: any) {
  const [visible, setVisible] = useState(false);

  const renderItem = ({item}: any) => (
    <>
      <Card style={styles.item}>
        <Image style={styles.itemImage} source={{uri: item.picture}} />
        <Text category="h6" style={styles.itemName}>
          {item.title}
        </Text>
        <Text category="s1" style={styles.itemPrice}>
          {item.price.toFixed(2)} PKR
        </Text>
      </Card>
      <View style={{position: 'absolute', right: 5}}>
        <Icon fill="#F9482C" name="close-circle" style={styles.icon} />
      </View>
    </>
  );

  const getTotalPrice = () => {
    return data.reduce((total, item) => total + item.price, 0);
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.list}
      />
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
