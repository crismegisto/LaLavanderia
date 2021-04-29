/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {Platform, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../../screens/Account';
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import {primary, sextenary} from '../../theme/colors';

let {width} = Dimensions.get('window');

const Stack = createStackNavigator();

const AccountStack = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: primary,
      },
      headerTintColor: sextenary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="Account"
      component={Account}
      options={{
        title: 'Mi Perfil',
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
            onPress={() => navigation.navigate('Main')}
          />
        ),
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />
  </Stack.Navigator>
);

export default AccountStack;
