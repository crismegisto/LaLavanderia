/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../../stylesheets/styleSignIn';
import auth from '@react-native-firebase/auth';
import {signIn} from '../../store/actions/authAction';
import GoogleSignIn from '../../components/GoogleSignIn';
import FacebookSignIn from '../../components/FacebookSignIn';
import PhoneAuth from './PhoneAuth';
import {useSelector} from 'react-redux';
import DataForm from './DataForm';

const SignIn = ({navigation}) => {
  const {uid} = useSelector((state) => state.userData.user);

  if (!uid) {
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
        <View style={styles.containerLoginMethods}>
          <GoogleSignIn />
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

  return <DataForm />;
};

export default SignIn;
