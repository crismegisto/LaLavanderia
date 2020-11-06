import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../stylesheets/styleLogin';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }

    if (password.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [email, password]);

  const signInWithEmail = async () => {
    try {
      const confirmation = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log(confirmation);
    } catch (err) {
      Alert.alert('Ocurrió un error', 'Email y/o contraseña incorrectos');
      console.log(err);
    }
  };

  const handleEmailChange = (text) => {
    if (text.length <= 35) {
      setEmail(text);
    }
  };

  const handlePasswordChange = (text) => {
    if (text.length <= 25) {
      setPassword(text);
    }
  };

  const validateForm = () => {
    if (isEmailValid && isPasswordValid) {
      signInWithEmail();
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={35} />
      </TouchableOpacity>
      <View style={styles.containerInput}>
        <Icon name="envelope" size={24} color="#02193E" />
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholder="Correo electrónico"
          autoCapitalize="none"
          onChangeText={(text) => handleEmailChange(text)}
          value={email}
        />
      </View>
      {showErrorMessage && !isEmailValid && (
        <View style={{width: '80%'}}>
          <Text style={{color: 'red'}}>Email invalido</Text>
        </View>
      )}
      <View style={{marginBottom: 30}} />
      <View style={styles.containerInput}>
        <Icon name="lock" size={24} color="#02193E" />
        <TextInput
          style={styles.textInput}
          secureTextEntry={securePassword}
          placeholder="Contraseña"
          autoCapitalize="none"
          onChangeText={(text) => handlePasswordChange(text)}
        />
        <TouchableOpacity
          style={styles.btnSecurePassword}
          onPress={() => setSecurePassword(!securePassword)}>
          <Entypo name="eye" size={24} color="#02193E" />
        </TouchableOpacity>
      </View>
      {showErrorMessage && !isPasswordValid && (
        <View style={{width: '80%'}}>
          <Text style={{color: 'red'}}>Contraseña requerida</Text>
        </View>
      )}
      <View style={{marginBottom: 30}} />
      <TouchableOpacity style={styles.btnLogin} onPress={validateForm}>
        <Text style={styles.textBtnLogin}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnForgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.textBtnForgotPassword}>¿Olvidó la contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
