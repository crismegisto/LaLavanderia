/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {Platform, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Balance from '../../screens/Balance';
import {primary, sextenary} from '../../theme/colors';

let {width} = Dimensions.get('window');

const Stack = createStackNavigator();

const BalanceStack = ({navigation}) => (
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
      name="Balance"
      component={Balance}
      options={{
        title: 'Saldos',
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
      }}
    />
  </Stack.Navigator>
);

export default BalanceStack;
