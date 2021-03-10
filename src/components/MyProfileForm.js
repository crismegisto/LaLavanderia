import React, {useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {primary, sextenary} from '../theme/colors';
import {TextInput} from 'react-native-paper';

export default function MyProfileForm(props) {
  const phoneNumberInputRef = useRef();
  const documentInputRef = useRef();

  return (
    <View style={styles.mainContainer}>
      <Controller
        name="document"
        control={props.control}
        render={({onChange, onBlur, value}) => (
          <View style={[styles.formContainer, {marginTop: 0}]}>
            <TextInput
              style={styles.input}
              dense
              mode="outlined"
              label={'Documento'}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              disabled={!props.isFormActive}
              value={value}
              ref={documentInputRef}
            />
          </View>
        )}
        rules={{
          required: {value: true, message: 'Campo requerido'},
          validate: (value) =>
            !value.match(/[^0-9]/) || 'Por favor ingrese sólo números',
        }}
        onFocus={() => documentInputRef.current.focus()}
        defaultValue=""
      />
      {props.errors.document && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {props.errors.document.message}
        </Text>
      )}

      <Controller
        name="phoneNumber"
        control={props.control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              dense
              mode="outlined"
              label={'Celular'}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              disabled={!props.isFormActive}
              value={value}
              ref={phoneNumberInputRef}
            />
          </View>
        )}
        rules={{
          required: {value: true, message: 'Campo requerido'},
          validate: (value) =>
            !value.match(/[^0-9]/) || 'Por favor ingrese sólo números',
        }}
        onFocus={() => phoneNumberInputRef.current.focus()}
        defaultValue=""
      />
      {props.errors.phoneNumber && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {props.errors.phoneNumber.message}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  formContainer: {
    width: '92%',
    marginTop: 15,
  },
  input: {
    fontSize: 16,
  },
  button: {
    backgroundColor: primary,
    alignItems: 'center',
    paddingVertical: 10,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 35,
  },
  buttonText: {
    color: sextenary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
