// In App.js in a new project
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDraweContent';
import HomeStack from './Stacks/HomeStack';
import ShoppingCartStack from './Stacks/ShoppingCartStack';
import BalanceStack from './Stacks/BalanceStack';
import PaymentMethodsStack from './Stacks/PaymentMethodsStack';
import AccountStack from './Stacks/AccountStack';
import SignIn from '../screens/authFlow/SignIn';
import Login from '../screens/authFlow/Login';
import SignUp from '../screens/authFlow/SignUp';
import ForgotPassword from '../screens/authFlow/ForgotPassword';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function IndexNavigation() {
  const userPhoneNumber = useSelector(
    (state) => state.userData.user.phoneNumber,
  );
  return (
    <NavigationContainer>
      {userPhoneNumber === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false, animationTypeForReplace: 'push'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 30},
          }}
          initialRouteName="HomeStack"
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="HomeStack" component={HomeStack} />
          <Drawer.Screen
            name="BalanceStack"
            component={BalanceStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ShoppingCartStack"
            component={ShoppingCartStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="PaymentMethodsStack"
            component={PaymentMethodsStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="AccountStack"
            component={AccountStack}
            options={{swipeEnabled: false}}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default IndexNavigation;
