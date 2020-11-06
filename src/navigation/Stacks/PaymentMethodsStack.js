/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Platform } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentMethods from '../../screens/PaymentMethods';
import AddCard from '../../screens/AddCard';
import ShoppingCartIcon from '../../components/ShoppingCartIcon';

const Stack = createStackNavigator();

const PaymentMethodsStack = ({ navigation }) => (
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
      name="PaymentMethods"
      component={PaymentMethods}
      options={{
        title: 'Métodos de pago',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicon
            name="ios-arrow-back"
            size={35}
            style={[
              Platform.OS == 'ios' ? { bottom: 4 } : null,
              { padding: 10 }
            ]}
            onPress={() => navigation.navigate("HomeStack")}
          />
        ),
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />
    <Stack.Screen
      name="AddCard"
      options={{ title: 'Agregar Tarjeta' }}
      component={AddCard} />
  </Stack.Navigator>
);

export default PaymentMethodsStack;
