import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from '../../theme/styleSignUp';
import FormFieldWithIcon from '../../components/authFlow/FormFieldWithIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessageForEmail, setErrorMessageForEmail] = useState('');
  useEffect(() => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.length > 0) {
      if (!email.match(mailformat)) {
        setIsEmailValid(false);
        setErrorMessageForEmail('El email no es valido.');
      } else {
        setIsEmailValid(true);
        setErrorMessageForEmail('');
      }
    }
  }, [email]);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessageForPassword, setErrorMessageForPassword] = useState('');
  useEffect(() => {
    if (password.length > 0) {
      if (password.length > 8) {
        setIsPasswordValid(true);
        setErrorMessageForPassword('');
      } else {
        setIsPasswordValid(false);
        setErrorMessageForPassword('La contraseña es débil.');
      }
    }
  }, [password]);

  const commitForm = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.navigate('SignIn');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Error',
          '¡Esa dirección de correo electrónico ya está en uso!',
        );
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Error',
          '¡Esa dirección de correo electrónico no es válida!',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={35} />
      </TouchableOpacity>
      <Text style={styles.title}>Registro con Email</Text>
      <>
        <FormFieldWithIcon
          fieldName="Correo electrónico"
          iconName="envelope"
          autoCapitalize="none"
          isPassword={false}
          onChangeText={(text) => setEmail(text)}
          errorMessage={errorMessageForEmail}
        />
        <FormFieldWithIcon
          fieldName="Contraseña"
          iconName="lock"
          autoCapitalize="none"
          isPassword={true}
          onChangeText={(text) => setPassword(text)}
          errorMessage={errorMessageForPassword}
        />
      </>
      <TouchableOpacity
        style={
          isEmailValid && isPasswordValid
            ? styles.button
            : {...styles.button, backgroundColor: 'lightgray'}
        }
        disabled={!isEmailValid || !isPasswordValid}
        onPress={commitForm}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
