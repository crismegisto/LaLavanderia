import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../../theme/styleSignIn';
import GoogleSignIn from '../../components/authFlow/GoogleSignIn';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>LALAVANDERIA</Text>
      </View>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/icon-laundry.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.containerLoginMethods}>
        <GoogleSignIn />
        <View flexDirection="row">
          <View style={styles.linesLeft} />
          <Text style={styles.textBetweenLines}>O</Text>
          <View style={styles.linesRight} />
        </View>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUp')}>
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
};

export default SignIn;
