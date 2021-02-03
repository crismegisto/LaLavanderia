/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Balance from '../../screens/Balance';
import {primary, sextenary} from '../../theme/colors';

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
      name="Balance"
      component={Balance}
      options={{
        title: 'Saldos',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('HomeStack')}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default AccountStack;
