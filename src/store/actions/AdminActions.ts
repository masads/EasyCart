import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import {setAlert} from '../slices/AppSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export interface AdminActionAddProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export const addProduct = createAsyncThunk<
  AdminActionAddProduct,
  {title: string; description: string; price: string; image: string},
  {state: RootState; rejectValue: any}
>(
  'adminSlice/addProduct',
  async ({title, description, price, image}, {rejectWithValue, dispatch}) => {
    try {
      //add product in firebase get id
      const productRef = await firestore().collection('products').add({
        title,
        description,
        price,
      });
      // Upload image to Firebase Storage and get the download URL
      const imageRef = storage().ref().child(`products/${productRef.id}`);
      await imageRef.putString(image, 'data_url');
      const imageUrl = await imageRef.getDownloadURL();

      // Update the product with the image URL in Firebase Firestore
      await productRef.update({image: imageUrl});

      // Return the product details
      const product: AdminActionAddProduct = {
        id: productRef.id,
        title,
        description,
        price,
        image: imageUrl,
      };
      dispatch(
        setAlert({message: 'Product Added Successfully', mode: 'success'}),
      );
      return product;
    } catch (error: any) {
      console.log(error);
      let message = 'Something went wrong!';
      dispatch(setAlert({message}));
      return rejectWithValue('Something went wrong');
    }
  },
);

export const getProducts = createAsyncThunk<
  AdminActionAddProduct[],
  void,
  {state: RootState; rejectValue: any}
>('adminSlice/getProducts', async function (_, {rejectWithValue, dispatch}) {
  try {
    // Retrieve products from Firebase Firestore
    const querySnapshot = await firestore().collection('products').get();
    const products: AdminActionAddProduct[] = [];
    querySnapshot.forEach(doc => {
      const product = {
        id: doc.id,
        ...doc.data(),
      } as AdminActionAddProduct;
      products.push(product);
    });
    return products;
  } catch (error: any) {
    console.log(error);
    let message = 'Something went wrong!';
    dispatch(setAlert({message}));
    return rejectWithValue('Something went wrong');
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  {productId: string},
  {state: RootState; rejectValue: any}
>(
  'adminSlice/deleteProduct',
  async function ({productId}, {rejectWithValue, dispatch}) {
    try {
      // Delete product data from the collection and its image from storage using productId
      // Perform the necessary deletion operations here
      await firestore().collection('products').doc(productId).delete();
      await storage().ref(`products/${productId}`).delete();
      dispatch(
        setAlert({message: 'Product Deleted Successfully', mode: 'success'}),
      );
      return productId;
    } catch (error: any) {
      console.log(error);
      let message = 'Something went wrong!';
      dispatch(setAlert({message}));
      return rejectWithValue('Something went wrong');
    }
  },
);

const adminActions = {};

export default adminActions;
