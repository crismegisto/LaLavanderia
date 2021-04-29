import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Categories from '../../screens/Categories';
import Products from '../../screens/Products';
import Schedule from '../../screens/Schedule';
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import {Platform, Image} from 'react-native';
import {sextenary} from '../../theme/colors';
import ShoppingCart from '../../screens/paymentProcess/ShoppingCart';
import BeforePayment from '../../screens/paymentProcess/BeforePayment';
import MakePayment from '../../screens/paymentProcess/MakePayment';
import PDFReader from '../../screens/PDFReader';
import HeaderBackgroundImage from '../../components/stack/HeaderBackgroundImage';
import Icon from '../../components/stack/Icon';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        height: 85,
      },
      headerTintColor: sextenary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => (
          <Ionicon
            name="ios-menu"
            color={sextenary}
            size={35}
            style={[Platform.OS === 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => <ShoppingCartIcon {...navigation} />,
        headerTitle: () => (
          <Image
            source={require('../../assets/icon-laundry.png')}
            style={[
              Platform.OS == 'ios'
                ? {width: 40, height: 40, resizeMode: 'contain'}
                : {width: 50, height: 50, resizeMode: 'contain'},
            ]}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Categories"
      component={Categories}
      options={{
        title: 'Categorías',
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => <Icon navigation={navigation} screen="Home" />,
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />
    <Stack.Screen
      name="Products"
      component={Products}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => <Icon navigation={navigation} screen="Categories" />,
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={Schedule}
      options={{
        title: 'Agendar Servicio',
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => <Icon navigation={navigation} screen="Home" />,
      }}
    />
    <Stack.Screen
      name="ShoppingCart"
      component={ShoppingCart}
      options={{
        title: 'Carrito de compras',
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => (
          <Ionicon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.goBack()}
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
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => (
          <Icon navigation={navigation} screen="ShoppingCart" />
        ),
      }}
    />
    <Stack.Screen
      name="MakePayment"
      component={MakePayment}
      options={{
        title: 'Método de Pago',
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => (
          <Icon navigation={navigation} screen="BeforePayment" />
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
        headerBackground: () => <HeaderBackgroundImage />,
        headerLeft: () => <Icon navigation={navigation} screen="MakePayment" />,
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
