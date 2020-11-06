/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCart from '../../screens/ShoppingCart';

const Stack = createStackNavigator();

const ShoppingCartStack = ({ navigation }) => (
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
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            style={[
              Platform.OS == 'ios' ? { bottom: 4 } : null,
              { padding: 10 }
            ]}
            onPress={() => navigation.navigate('Categories')
            }
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default ShoppingCartStack;
