import React, {useState} from 'react';
import {ScrollView, StyleSheet, Pressable, Image, View} from 'react-native';
import {Icon, Input, Layout, Text, Button} from '@ui-kitten/components';
import CustomHeader from '../components/Header';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../navigation/Admin';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {RootState} from '../store/Store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {setAlert} from '../store/slices/AppSlice';
import {addProduct} from '../store/actions/AdminActions';
import Loader from '../components/Loader';

type Props = NativeStackScreenProps<StackParamList, 'AddProduct'>;

export default function AddProduct({navigation, route}: Props) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const {loading} = useSelector((state: RootState) => state.adminSlice);
  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
  };

  const handleAddProduct = () => {
    if (title.length <= 0) {
      dispatch(setAlert({message: 'Please Enter title'}));
    } else if (description.length <= 0) {
      dispatch(setAlert({message: 'Please Enter description'}));
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      dispatch(setAlert({message: 'Please Enter price'}));
    } else if (
      !route.params.image ||
      (route.params.image && route.params.image.length <= 0)
    ) {
      dispatch(setAlert({message: 'Please add image'}));
    } else {
      dispatch(
        addProduct({
          title,
          description,
          price,
          image: 'data:image/png;base64,' + route.params.image.base64,
        }),
      );
      setDescription('');
      setTitle('');
      setPrice('');
      navigation.setParams({image: ''});
      navigation.goBack();
    }
  };

  return (
    <>
      <CustomHeader title="Add Product" />
      {loading ? (
        <Loader />
      ) : (
        <Layout style={styles.container}>
          {!route.params?.image ? (
            <Pressable
              onPress={() => {
                if (!route.params) {
                  navigation.navigate('OpenCamera', {image: null});
                  return;
                }
                const {image} = route.params;
                navigation.navigate('OpenCamera', {image: image ? image : ''});
              }}
              style={styles.imageContainer}>
              <Icon name="image-outline" fill="#8F9BB3" style={styles.icon} />
              <Text>Add Image</Text>
            </Pressable>
          ) : (
            <View style={{flex: 1}}>
              <Pressable
                onPress={() => {
                  navigation.setParams({image: null});
                }}
                style={{position: 'absolute', zIndex: 1, right: -10, top: -10}}>
                <Icon fill="#F9482C" name="close-circle" style={styles.icon} />
              </Pressable>
              <Image
                source={{uri: route.params.image.uri}}
                style={styles.image}
              />
            </View>
          )}
          <ScrollView style={styles.formContainer}>
            <Input
              style={{marginBottom: 16}}
              placeholder="Product Title"
              value={title}
              onChangeText={handleTitleChange}
            />
            <Input
              textStyle={{
                minHeight: 64,
                marginBottom: 20,
              }}
              placeholder="Product Description"
              value={description}
              multiline={true}
              onChangeText={handleDescriptionChange}
            />
            <Input
              style={{marginVertical: 16}}
              placeholder="Product Price"
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="phone-pad"
            />
            <Button appearance="filled" onPress={handleAddProduct}>
              Add Product
            </Button>
          </ScrollView>
        </Layout>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#8F9BB3',
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  formContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    marginBottom: 16,
  },
});
