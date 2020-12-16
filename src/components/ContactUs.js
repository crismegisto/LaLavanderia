import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';

const ContactUs = () => {
  const sendWhatsapp = async () => {
    try {
      await Linking.openURL('whatsapp://send?phone=573203621233');
    } catch (error) {
      alert('Asegúrese de tener Whatsapp instalado en el dispositivo.');
    }
  };

  return (
    <TouchableOpacity style={styles.bottom} onPress={sendWhatsapp}>
      <Text style={styles.text}>Contactenos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    backgroundColor: '#98D7E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#02193E',
    fontSize: 22,
  },
});

export default ContactUs;
