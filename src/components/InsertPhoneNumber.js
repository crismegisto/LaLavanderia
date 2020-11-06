import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const InsertPhoneNumber = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (phone) => {
    if (+phone >= 0) {
      setPhoneNumber(phone.replace(/\s/g, '').replace(/\./, ''));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.codeZone}>+57</Text>
        <TextInput
          value={phoneNumber}
          style={styles.input}
          maxLength={10}
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => handlePhoneNumberChange(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.verifyPhoneNumber('+57 ' + phoneNumber)}>
        <Text style={styles.buttonText}>Enviar Código</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeZone: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#C8D6DE',
    alignItems: 'center',
    width: '55%',
    height: 50,
    borderRadius: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#02193E',
    paddingVertical: 12,
    borderRadius: 10,
    width: '85%',
    marginTop: 30,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  buttonText: {
    color: '#fafafa',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default InsertPhoneNumber;
