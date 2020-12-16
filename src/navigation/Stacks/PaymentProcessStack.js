import React from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCart from '../../screens/paymentProcess/ShoppingCart';
import MakePayment from '../../screens/paymentProcess/MakePayment';
import PDFReader from '../../screens/PDFReader';

const Stack = createStackNavigator();

const PaymentProcessStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#98D7E8',
      },
      headerTintColor: '#02193E',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="ShoppingCart"
      component={ShoppingCart}
      options={{
        title: 'Carrito de compras',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('Categories')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="MakePayment"
      component={MakePayment}
      options={{
        title: 'Método de Pago',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('ShoppingCart')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="TermsAndConditions"
      component={PDFReader}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default PaymentProcessStack;
