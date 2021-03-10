import React from 'react';
import {Platform, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCart from '../../screens/paymentProcess/ShoppingCart';
import BeforePayment from '../../screens/paymentProcess/BeforePayment';
import MakePayment from '../../screens/paymentProcess/MakePayment';
import PDFReader from '../../screens/PDFReader';
import {primary, sextenary} from '../../theme/colors';

let {width} = Dimensions.get('window');

const Stack = createStackNavigator();

const PaymentProcessStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: sextenary,
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
        headerBackground: () => (
          <Image
            source={require('../../assets/bubbles.png')}
            style={{height: 85, width}}
          />
        ),
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('Categories')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="BeforePayment"
      component={BeforePayment}
      options={{
        title: 'Antes de Pagar',
        headerTitleAlign: 'center',
        headerBackground: () => (
          <Image
            source={require('../../assets/bubbles.png')}
            style={{height: 85, width}}
          />
        ),
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('ShoppingCart')}
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
        headerBackground: () => (
          <Image
            source={require('../../assets/bubbles.png')}
            style={{height: 85, width}}
          />
        ),
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('ShoppingCart')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="TermsAndConditions"
      component={PDFReader}
      // options={{headerShown: false}}
      options={{
        title: 'Términos Wompi',
        headerTitleAlign: 'center',
        headerBackground: () => (
          <Image
            source={require('../../assets/bubbles.png')}
            style={{height: 85, width}}
          />
        ),
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('MakePayment')}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default PaymentProcessStack;
