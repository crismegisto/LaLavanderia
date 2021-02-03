import React, {useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {primary, sextenary} from '../theme/colors';
import geocoding from '../api/geocoding';
import checkString from '../utils/checkString';
import {TextInput} from 'react-native-paper';

export default function MyProfileForm(props) {
  const phoneNumberInputRef = useRef();
  const address1InputRef = useRef();
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

      <>
        <Controller
          name="address1"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Dirección 1'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
                ref={address1InputRef}
              />
            </View>
          )}
          rules={{
            required: {value: true, message: 'Campo requerido'},
            validate: {
              additionalAddress: (value) =>
                !checkString(value) ||
                'Por favor coloque la dirección sin adicionales',
              asyncValidate: async (value) =>
                (await geocoding(value)) || 'Dirección no valida',
            },
          }}
          onFocus={() => address1InputRef.current.focus()}
          defaultValue=""
        />
        {props.errors.address1 && (
          <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
            {props.errors.address1.message}
          </Text>
        )}

        <Controller
          name="complementAddress1"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Complemento Dirección 1'}
                placeholder={'p. ej. Apto 401 torre 3'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
              />
            </View>
          )}
          defaultValue=""
        />
      </>

      <>
        <Controller
          name="address2"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Dirección 2'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
              />
            </View>
          )}
          rules={{
            validate: {
              additionalAddress: (value) =>
                !checkString(value) ||
                'Por favor coloque la dirección sin adicionales',
              asyncValidate: async (value) =>
                (await geocoding(value)) || 'Dirección no valida',
            },
          }}
          defaultValue=""
        />
        {props.errors.address2 && (
          <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
            {props.errors.address2.message}
          </Text>
        )}

        <Controller
          name="complementAddress2"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Complemento Dirección 2'}
                placeholder={'p. ej. Apto 401 torre 3'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
              />
            </View>
          )}
          defaultValue=""
        />
      </>

      <>
        <Controller
          name="address3"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Dirección 3'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
              />
            </View>
          )}
          rules={{
            validate: {
              additionalAddress: (value) =>
                !checkString(value) ||
                'Por favor coloque la dirección sin adicionales',
              asyncValidate: async (value) =>
                (await geocoding(value)) || 'Dirección no valida',
            },
          }}
          defaultValue=""
        />
        {props.errors.address3 && (
          <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
            {props.errors.address3.message}
          </Text>
        )}

        <Controller
          name="complementAddress3"
          control={props.control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                dense
                mode="outlined"
                label={'Complemento Dirección 3'}
                placeholder={'p. ej. Apto 401 torre 3'}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                disabled={!props.isFormActive}
                value={value}
              />
            </View>
          )}
          defaultValue=""
        />
      </>
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
