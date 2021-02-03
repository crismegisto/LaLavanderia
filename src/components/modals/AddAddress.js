import React, {useRef} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  View,
} from 'react-native';
import {primary, tertiary, quaternary, sextenary} from '../../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm, Controller} from 'react-hook-form';
import geocoding from '../../api/geocoding';
import checkString from '../../utils/checkString';
import {useDispatch} from 'react-redux';
import {fillOutData} from '../../store/actions/authAction';

const AddAddress = (props) => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const addressInputRef = useRef();

  const onSubmit = (data) => {
    if (props.numAddresses === 1) {
      dispatch(fillOutData({address2: data.address}));
    } else {
      dispatch(fillOutData({address3: data.address}));
    }

    return props.hideModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.containerModal}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 15}}>
            Nueva Dirección
          </Text>

          <Controller
            name="address"
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder={'Ingresar Dirección'}
                  value={value}
                  ref={addressInputRef}
                  maxLength={35}
                  autoCapitalize="words"
                />
                <View style={{marginRight: 20}}>
                  <Icon name="home" size={22} color={primary} />
                </View>
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
            <Text
              style={{alignSelf: 'flex-start', marginLeft: 10, color: 'red'}}>
              {errors.address.message}
            </Text>
          )}

          <Controller
            name="complementAddress"
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={{...styles.textInputView, marginTop: 10}}>
                <TextInput
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  placeholder={'Complemento dirección'}
                  value={value}
                  maxLength={35}
                  autoCapitalize="words"
                />
                <View style={{marginRight: 20}}>
                  <Icon name="plus-circle" size={22} color={primary} />
                </View>
              </View>
            )}
            defaultValue=""
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: quaternary}}
              onPress={props.hideModal}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{...styles.openButton, marginLeft: 30}}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.textStyle}>Agregar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,34,65,0.8)',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputView: {
    backgroundColor: sextenary,
    width: '90%',
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: sextenary,
    fontSize: 14,
    borderRadius: 30,
    marginLeft: 20,
    width: '85%',
  },
  openButton: {
    backgroundColor: tertiary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddAddress;
