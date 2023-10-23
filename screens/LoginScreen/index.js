import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {userActions} from '../../features/user/userSlice';
import {kApiLogin} from '../../config/WebServices';
import {PersistanceHelper} from '../../helpers';

const {request} = userActions;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleButtonPress = () => {
    if (!email) {
      Alert('Please fill a valid email');
    }
    if (!password) {
      Alert('Please enter a password');
    }
    setValueForEmail();
    dispatch(request({url: kApiLogin, data: {email, password}}));
  };

  const setValueForEmail = async => {
    PersistanceHelper.setValue('email', email);
    console.log(email);
  };
  return (
    <View style={{flex: 1}}>
      <Text>Login</Text>

      <TextInput
        autoCapitalize="none"
        value={email}
        onChangeText={changedText => {
          setEmail(changedText);
        }}
        placeholder="Email"
        style={{
          backgroundColor: 'lightgrey',
          padding: 10,
          margin: 10,
          height: 40,
        }}
      />
      <TextInput
        value={password}
        onChangeText={changedText => {
          setPassword(changedText);
        }}
        secureTextEntry
        placeholder="Password"
        style={{
          backgroundColor: 'lightgrey',
          padding: 10,
          margin: 10,
          height: 40,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          handleButtonPress();
        }}
        style={{
          marginHorizontal: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'lightblue',
        }}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
