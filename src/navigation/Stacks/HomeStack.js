/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Categories from '../../screens/Categories';
import Products from '../../screens/Products';
import Schedule from '../../screens/Schedule';
import PickUp from '../../screens/PickUp';
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import {Platform, Image} from 'react-native';
import {primary, sextenary} from '../../theme/colors';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => (
  <Stack.Navigator
    initialRouteName="Home"
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
      name="Home"
      component={Home}
      options={{
        headerTitleAlign: 'center',
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
        headerLeft: () => (
          <Ionicon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('Home')}
          />
        ),
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />
    <Stack.Screen
      name="Products"
      component={Products}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('Categories')}
          />
        ),
        headerRight: () => <ShoppingCartIcon {...navigation} />,
      }}
    />

    <Stack.Screen
      name="Schedule"
      component={Schedule}
      options={{
        title: 'Agendar Servicio',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicon
            name="ios-arrow-back"
            size={35}
            color={sextenary}
            style={[Platform.OS == 'ios' ? {bottom: 4} : null, {padding: 10}]}
            onPress={() => navigation.navigate('Home')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="PickUp"
      component={PickUp}
      options={{
        title: 'Recogida',
        headerTitleAlign: 'center',
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
  </Stack.Navigator>
);

export default HomeStack;
