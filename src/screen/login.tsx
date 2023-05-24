import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
// import { Button, Text, TextInput } from 'react-native-paper';
import {Button, Layout, Input, Text} from '@ui-kitten/components';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/Auth';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {RootState} from '../store/Store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {login} from '../store/actions/UserActions';
import {setAlert} from '../store/slices/AppSlice';
import {userSlice} from '../store/slices/userSlice';
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const handlLogin = async () => {
    if (email.length <= 0) {
      dispatch(setAlert({message: 'Please Enter Email'}));
    } else if (password.length < 6) {
      dispatch(setAlert({message: 'Password to short'}));
    } else {
      dispatch(login({email, password}));
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
        placeholder="Email"
        value={email}
        onChangeText={nextValue => setEmail(nextValue)}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Button style={Style.button} appearance="filled" onPress={handlLogin}>
        Login
      </Button>
      <View style={Style.signupAction}>
        <Text>Already have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text status="primary">sign up</Text>
        </Pressable>
      </View>
      <View style={Style.signupAction}>
        <Text>Are you admin?</Text>
        <Pressable
          onPress={() => {
            dispatch(userSlice.actions.AdminOn());
          }}>
          <Text status="primary">Click Here</Text>
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
