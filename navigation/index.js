import React from 'react';
import {Button} from 'react-native';
import {UseSelector, useDispatch, useSelector} from 'react-redux/';
import {LoginScreen, UserProfileScreen, SplashScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const isUserLoggedIn = () => {
    return user?.data?.id && user?.data?.id?.length > 15;
  };

  const getMainScreens = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="userProfileScreen"
          component={UserProfileScreen}
          options={{title: 'User Profile Screen'}}
        />
      </Stack.Group>
    );
  };
  const getLoginScreen = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{title: 'Login Screen'}}
        />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>
      {isUserLoggedIn() ? getMainScreens() : getLoginScreen()}
    </Stack.Navigator>
  );
};

export default Navigator;
