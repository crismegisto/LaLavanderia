import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDraweContent';
import MainStack from './Stacks/MainStack';
import BalanceStack from './Stacks/BalanceStack';
import AccountStack from './Stacks/AccountStack';
import SignIn from '../screens/authFlow/SignIn';
import Login from '../screens/authFlow/Login';
import SignUp from '../screens/authFlow/SignUp';
import ForgotPassword from '../screens/authFlow/ForgotPassword';
import {useSelector, useDispatch} from 'react-redux';
import {fillInTheData} from '../store/actions/authAction';
import {saveNavigation} from '../store/actions/navigationAction';
import auth from '@react-native-firebase/auth';
import PDFReader from '../screens/PDFReader';
import Loader from '../components/Loader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function IndexNavigation() {
  const dispatch = useDispatch();
  const {uid} = useSelector((state) => state.user);
  useEffect(() => {
    function onAuthStateChanged(user) {
      if (user && !uid) {
        dispatch(
          fillInTheData({
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
          }),
        );
      }
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [dispatch, uid]);

  const initialStateRedux = useSelector((state) => state.navigation[0]);
  const transactionId = useSelector((state) => state.transaction[0]);
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState(null);
  useEffect(() => {
    if (initialStateRedux && transactionId) {
      setInitialState(initialStateRedux);
    } else {
      if (!initialState) {
        setInitialState(null);
      }
    }

    if (!isReady) {
      setIsReady(true);
    }
  }, [initialState, initialStateRedux, isReady, transactionId]);

  if (!isReady) {
    return <Loader />;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        dispatch(saveNavigation(state));
      }}>
      {uid === null ? (
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
          <Stack.Screen
            name="TermsAndConditions"
            component={PDFReader}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 30},
          }}
          drawerType="slide"
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Main" component={MainStack} />
          <Drawer.Screen
            name="Balance"
            component={BalanceStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="Account"
            component={AccountStack}
            options={{swipeEnabled: false}}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default IndexNavigation;
