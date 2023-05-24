import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
// import { Button, Text, TextInput } from 'react-native-paper';
import {Button, Layout, Input, Text} from '@ui-kitten/components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/Auth';
import {register} from '../store/actions/UserActions';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../store/Store';
import {useDispatch} from 'react-redux';
import {setAlert} from '../store/slices/AppSlice';
type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({navigation}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const handlRegister = async () => {
    if (name.length <= 0) {
      dispatch(setAlert({message: 'Please Enter Name'}));
    } else if (email.length <= 0) {
      dispatch(setAlert({message: 'Please Enter Email'}));
    } else if (password.length < 6) {
      dispatch(setAlert({message: 'Password to short'}));
    } else {
      dispatch(register({name, email, password}));
    }
  };
  return (
    <Layout style={Style.container} level="1">
      <Layout style={Style.heading} level="1">
        <Text category="h1" status="primary">
          EasyCart
        </Text>
      </Layout>
      <Input
        placeholder="Full Name"
        value={name}
        onChangeText={nextValue => setName(nextValue)}
        keyboardType="name-phone-pad"
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={nextValue => setEmail(nextValue)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Button style={Style.button} onPress={handlRegister} appearance="filled">
        Register
      </Button>
      <View style={Style.signupAction}>
        <Text>Don't have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text status="primary">login</Text>
        </Pressable>
      </View>
    </Layout>
  );
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  button: {
    margin: 2,
    borderRadius: 16,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupAction: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
  },
});
