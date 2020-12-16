import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FormField from '../../components/FormField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../stylesheets/styleDataForm';
import {useDispatch, useSelector} from 'react-redux';
import {createClientApi} from '../../api/createClientApi';
import {fillOutData} from '../../store/actions/authAction';

const DataForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.user);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [document, setDocument] = useState('');
  const [isFormsValid, setIsFormsValid] = useState(false);
  const [startValidate, setStartValidate] = useState(false);

  useEffect(() => {
    if (name && lastName && phoneNumber && address && document) {
      setIsFormsValid(true);
    } else {
      setIsFormsValid(false);
    }
  }, [address, document, lastName, name, phoneNumber]);

  const commitForm = async () => {
    if (!startValidate) {
      setStartValidate(true);
    }

    if (isFormsValid) {
      let newData = {
        cliente_nombres: name,
        cliente_apellidos: lastName,
        cliente_email: userData.email,
        cliente_telefono: phoneNumber,
        cliente_direccion1: address,
        cliente_tipo_documento: 'C.C.',
        cliente_documento: document,
        cliente_codigo: '1',
        cliente_redes: userData.uid,
      };
      try {
        await createClientApi(newData);
        dispatch(
          fillOutData({
            name,
            lastName,
            phoneNumber,
            address1: address,
            document,
          }),
        );
      } catch (err) {
        Alert.alert(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>DETALLES DE CONTACTO</Text>
          <FormField
            title="Nombres"
            keyboardType="default"
            maxLength={25}
            setRegistry={(value) => setName(value)}
            showError={startValidate}
          />
          <FormField
            title="Apellidos"
            keyboardType="default"
            maxLength={25}
            setRegistry={(value) => setLastName(value)}
            showError={startValidate}
          />
          <FormField
            title="Teléfono"
            keyboardType="number-pad"
            maxLength={10}
            setRegistry={(value) => setPhoneNumber(value)}
            showError={startValidate}
          />
          <FormField
            title="Dirección"
            keyboardType="default"
            maxLength={35}
            setRegistry={(value) => setAddress(value)}
            showError={startValidate}
          />
          <FormField
            title="Documento"
            keyboardType="number-pad"
            maxLength={11}
            setRegistry={(value) => setDocument(value)}
            showError={startValidate}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={commitForm}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DataForm;
