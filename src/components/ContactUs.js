import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking, Image} from 'react-native';

const ContactUs = () => {
  const sendWhatsapp = async () => {
    try {
      await Linking.openURL('whatsapp://send?phone=573227230247');
    } catch (error) {
      alert('Asegúrese de tener Whatsapp instalado en el dispositivo.');
    }
  };

  return (
    <TouchableOpacity
      style={{position: 'absolute', bottom: 25, right: 5}}
      onPress={sendWhatsapp}>
      <Image
        style={{height: 90, width: 90}}
        source={require('../assets/whatsapp-icon.png')}
      />
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
