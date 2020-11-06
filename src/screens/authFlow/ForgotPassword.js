import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';
import styles from '../../stylesheets/styleForgotPassword';

const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={35} />
      </TouchableOpacity>
      <Text style={styles.text}>¿Olvidó la contraseña?</Text>
      <Input
        placeholder="Ingrese correo electrónico"
        leftIcon={<Icon name="envelope" size={24} color="#02193E" />}
        containerStyle={{width: '90%'}}
      />
      <TouchableOpacity style={styles.btnSendPassword}>
        <Text style={styles.textSendPassword}>Enviar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
