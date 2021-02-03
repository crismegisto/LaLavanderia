import React, {useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {primary, secondary, sextenary} from '../../theme/colors';
import geocoding from '../../api/geocoding';
import checkString from '../../utils/checkString';

export default function Form(props) {
  const {control, handleSubmit, errors} = useForm();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const addressInputRef = useRef();
  const documentInputRef = useRef();

  return (
    <View style={styles.mainContainer}>
      <Controller
        name="firstName"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Nombres</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. Pedro Fernando'}
              placeholderTextColor={secondary}
              value={value}
              ref={firstNameInputRef}
              maxLength={25}
              autoCapitalize="words"
            />
          </View>
        )}
        rules={{
          required: {value: true, message: 'Campo requerido'},
          validate: (value) =>
            !value.match(/[^a-zA-Z]+$/) || 'Por favor ingrese sólo letras',
        }}
        onFocus={() => firstNameInputRef.current.focus()}
        defaultValue=""
      />
      {errors.firstName && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {errors.firstName.message}
        </Text>
      )}

      <Controller
        name="lastName"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Apellidos</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. Rivera Martínez'}
              placeholderTextColor={secondary}
              value={value}
              ref={lastNameInputRef}
              maxLength={25}
              autoCapitalize="words"
            />
          </View>
        )}
        rules={{
          required: {value: true, message: 'Campo requerido'},
          validate: (value) =>
            !value.match(/[^a-zA-Z]+$/) || 'Por favor ingrese sólo letras',
        }}
        onFocus={() => lastNameInputRef.current.focus()}
        defaultValue=""
      />
      {errors.lastName && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {errors.lastName.message}
        </Text>
      )}

      <Controller
        name="phoneNumber"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Teléfono</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. 3203112345'}
              placeholderTextColor={secondary}
              value={value}
              ref={phoneNumberInputRef}
              maxLength={10}
              autoCapitalize="words"
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
      {errors.phoneNumber && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {errors.phoneNumber.message}
        </Text>
      )}

      <Controller
        name="address"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Dirección</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. Carrera 11 # 30-10'}
              placeholderTextColor={secondary}
              value={value}
              ref={addressInputRef}
              maxLength={35}
              autoCapitalize="words"
            />
          </View>
        )}
        rules={{
          required: {value: true, message: 'Campo requerido'},
          validate: {
            additionalAddress: (value) =>
              !checkString(value) ||
              'Por favor coloque la dirección sin complementos',
            asyncValidate: async (value) =>
              (await geocoding(value)) || 'Dirección no valida',
          },
        }}
        onFocus={() => addressInputRef.current.focus()}
        defaultValue=""
      />
      {errors.address && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {errors.address.message}
        </Text>
      )}

      <Controller
        name="complementAddress"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Detalles Dirección
            </Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. Apto 401 torre 3'}
              placeholderTextColor={secondary}
              value={value}
              maxLength={35}
              autoCapitalize="words"
            />
          </View>
        )}
        defaultValue=""
      />

      <Controller
        name="document"
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.formContainer}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Documento</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              placeholder={'p. ej. 1022506678'}
              placeholderTextColor={secondary}
              value={value}
              ref={documentInputRef}
              maxLength={10}
              autoCapitalize="words"
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
      {errors.document && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          {errors.document.message}
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(props.onSubmit)}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: sextenary,
    width: '92%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  input: {
    fontSize: 14,
    textAlign: 'right',
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
