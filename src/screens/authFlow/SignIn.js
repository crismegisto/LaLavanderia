/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../../stylesheets/styleSignIn';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {signIn} from '../../store/actions/authAction';
import GoogleSignIn from '../../components/GoogleSignIn';
import FacebookSignIn from '../../components/FacebookSignIn';
import PhoneAuth from './PhoneAuth';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user, 'user');
    if (user) {
      dispatch(
        signIn({
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photo: user.photoURL,
          id: user.uid,
          address: null,
        }),
      );
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}>LALAVANDERIA</Text>
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon-laundry.png')}
            style={{width: '75%', height: '75%', resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.containerSocialLogin}>
          <Text style={styles.textContinue}>Continuar con</Text>
          <View flexDirection="row">
            <GoogleSignIn />
            <FacebookSignIn />
          </View>
          <View flexDirection="row">
            <View style={styles.linesLeft} />
            <Text style={styles.textBetweenLines}>O</Text>
            <View style={styles.linesRight} />
          </View>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.loginButtonText}>Crear Nueva Cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <PhoneAuth />;
};

export default SignIn;
