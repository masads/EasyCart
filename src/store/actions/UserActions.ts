import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../Store';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {setAlert} from '../slices/AppSlice';
import firestore from '@react-native-firebase/firestore';
import {UserState} from '../slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserActions {
  isAuthenticated: boolean;
  email: string;
  userId: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export const getToken = createAsyncThunk<
  UserActions,
  void,
  {state: RootState; rejectValue: any}
>('userSlice/getToken', async (_, {rejectWithValue}) => {
  try {
    const user = await new Promise<FirebaseAuthTypes.User | null>(resolve => {
      const unsubscribe = auth().onAuthStateChanged(data => {
        unsubscribe();
        resolve(data);
      });
    });

    console.log(user);

    if (!user) {
      throw new Error('User not logged in');
    } else {
      return {
        isAuthenticated: true,
        email: user.email ?? '',
        userId: user.uid,
        name: user.displayName ?? '',
      };
    }
  } catch (error: any) {
    console.log(error);
    return rejectWithValue('Something went worng');
  }
});

export const register = createAsyncThunk<
  UserActions,
  {email: string; password: string; name: string},
  {state: RootState; rejectValue: any}
>(
  'userSlice/register',
  async ({email, password, name}, {rejectWithValue, dispatch}) => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      if (!user.user) {
        throw 'User not created';
      } else {
        await user.user.updateProfile({displayName: name});
        return {
          isAuthenticated: true,
          email: user.user.email ?? '',
          userId: user.user.uid,
          name: user.user.displayName ?? '',
        };
      }
    } catch (error: any) {
      let message = 'Something went wrong!';
      if (error.code === 'credential not found') {
        message = 'Please Enter your credentials!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email is invalid!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters!';
      } else if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use!';
      }
      dispatch(setAlert({message}));
      return rejectWithValue('Something went worng');
    }
  },
);

export const login = createAsyncThunk<
  UserActions,
  {email: string; password: string},
  {state: RootState}
>('userSlice/login', async ({email, password}, {rejectWithValue, dispatch}) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
      return {
        isAuthenticated: true,
        email: user.email ?? '',
        userId: user.uid,
        name: user.displayName ?? '',
      };
    } else {
      throw 'User not logged in';
    }
  } catch (error: any) {
    console.log(error);
    let message = 'Something went wrong!';
    if (error.code === 'credential not found') {
      message = 'Please Enter your credentials!';
    } else if (
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/user-not-found'
    ) {
      message = 'Email is invalid!';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Wrong password!';
    } else if (error.code === 'recaptcha was invalid') {
      message = 'Recaptcha was invalid!';
    }
    dispatch(setAlert({message}));
    return rejectWithValue('Something went worng');
  }
});

export const logout = createAsyncThunk<UserActions, void, {state: RootState}>(
  'userSlice/logout',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      return {
        isAuthenticated: false,
        email: '',
        userId: '',
        name: '',
      };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue('Something went worng');
    }
  },
);

export const getProducts = createAsyncThunk<
  Product[],
  {productId?: string; navigation?: any},
  {state: RootState; rejectValue: any}
>(
  'userSlice/getProducts',
  async function ({productId, navigation}, {rejectWithValue, dispatch}) {
    try {
      // Retrieve products from Firebase Firestore
      const querySnapshot = await firestore().collection('products').get();
      let products: Product[] = [];
      const data: any = await AsyncStorage.getItem('cart');
      const productIds = JSON.parse(data) as any[];
      querySnapshot.forEach(doc => {
        const product = {
          id: doc.id,
          ...doc.data(),
        } as Product;
        products.push(product);
      });
      if (productIds && productIds.length > 0) {
        products = products.filter(productItem => {
          const product: Product | undefined = productIds.find(
            item => item.id === productItem.id,
          );
          if (product) {
            return false;
          } else {
            return true;
          }
        });
      }
      if (productId && navigation) {
        navigation.navigate('ProductDetail', {
          id: productId,
        });
      }
      return products;
    } catch (error: any) {
      console.log(error);
      let message = 'Something went wrong!';
      dispatch(setAlert({message}));
      return rejectWithValue('Something went wrong');
    }
  },
);

function AdminOn(state: UserState) {
  state.admin = true;
}
function AdminOff(state: UserState) {
  state.admin = false;
}
function AddToCart(state: UserState, action: any) {
  const product: Product | undefined = state.products.find(
    item => item.id === action.payload,
  );
  if (product) {
    AsyncStorage.setItem(
      'cart',
      JSON.stringify([
        {id: product.id},
        ...state.cart.map(item => ({id: item.id})),
      ]),
    );
    state.cart.push(product);
    state.products = state.products.filter(item => item.id !== action.payload);
  }
}
function DeleteFromCart(state: UserState, action: any) {
  const product: Product | undefined = state.cart.find(
    item => item.id === action.payload,
  );
  console.log(product);
  if (product) {
    state.products.push(product);
    state.cart = state.cart.filter(item => item.id !== action.payload);
    AsyncStorage.setItem(
      'cart',
      JSON.stringify([...state.cart.map(item => ({id: item.id}))]),
    );
  }
}
export const fetchCartItems = createAsyncThunk(
  'userSlice/fetchCartItems',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const querySnapshot = await firestore().collection('products').get();
      let products: Product[] = [];
      const data: any = await AsyncStorage.getItem('cart');
      const productIds = JSON.parse(data) as any[];
      querySnapshot.forEach(doc => {
        const product = {
          id: doc.id,
          ...doc.data(),
        } as Product;
        products.push(product);
      });
      products = products.filter(productItem => {
        const product: Product | undefined = productIds.find(
          item => item.id === productItem.id,
        );
        if (product) {
          return true;
        } else {
          return false;
        }
      });
      return products;
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong!';
      dispatch(setAlert({message}));
      return rejectWithValue('Something went wrong');
    }
  },
);

export const getNotifications = createAsyncThunk<
  any[],
  void,
  {state: RootState; rejectValue: any; dispatch: any}
>('userSlice/getNotifications', async (_, {dispatch, rejectWithValue}) => {
  try {
    const data: any = await AsyncStorage.getItem('notifications');
    const notifications = JSON.parse(data) as any[];
    if (notifications) {
      return notifications;
    }
    return [];
  } catch (error) {
    console.log(error);
    let message = 'Something went wrong!';
    dispatch(setAlert({message}));
    return rejectWithValue('Something went wrong');
  }
});

export const addNotification = createAsyncThunk<
  any,
  {data?: []; title: string; description: string; read: boolean},
  {state: RootState; rejectValue: any; dispatch: any}
>(
  'userSlice/addNotification',
  async (
    {data, title, description, read},
    {dispatch, getState, rejectWithValue},
  ) => {
    try {
      const state = getState();
      let findit = state.userSlice.notifications.find(
        (item: any) => item.description === description,
      );
      if (findit) {
        return false;
      }
      const temp = {
        title,
        description,
        time: new Date().toLocaleString(),
        read,
        data,
      };
      const tempnotifications: any = await AsyncStorage.getItem(
        'notifications',
      );
      const notifications = JSON.parse(tempnotifications) as any[];

      if (notifications) {
        AsyncStorage.setItem(
          'notifications',
          JSON.stringify([temp, ...state.userSlice.notifications]),
        );
      } else {
        AsyncStorage.setItem('notifications', JSON.stringify([temp]));
      }
      return temp;
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong!';
      dispatch(setAlert({message}));
      return rejectWithValue('Something went wrong');
    }
  },
);

export const readNotification = createAsyncThunk<
  any[],
  string,
  {state: RootState; rejectValue: any; dispatch: any}
>('userSlice/readNotification', async (data, {dispatch, rejectWithValue}) => {
  try {
    const tempnotifications: any = await AsyncStorage.getItem('notifications');
    const notifications = JSON.parse(tempnotifications) as any[];

    if (notifications) {
      let temp = notifications.map((item: any) =>
        item.title === data ? {...item, read: true} : item,
      );
      AsyncStorage.setItem('notifications', JSON.stringify(temp));
      return temp;
    }
    return [];
  } catch (error) {
    console.log(error);
    let message = 'Something went wrong!';
    dispatch(setAlert({message}));
    return rejectWithValue('Something went wrong');
  }
});
const userActions = {AdminOff, AdminOn, AddToCart, DeleteFromCart};

export default userActions;
