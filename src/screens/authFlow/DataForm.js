import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import Form from '../../components/authFlow/Form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../theme/styleDataForm';
import {useDispatch, useSelector} from 'react-redux';
import {createClient} from '../../api/createClient';
import {fillOutData} from '../../store/actions/authAction';
import useDetermineZone from '../../hooks/useDetermineZone';
import Spinner from 'react-native-loading-spinner-overlay';
import {quaternary} from '../../theme/colors';

const DataForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.user);

  const [address, setAddress] = useState('');
  const [validatedFormData, setValidatedFormData] = useState({});
  const {activeZone, isLoading} = useDetermineZone(address);
  console.log(validatedFormData, activeZone, isLoading);
  useEffect(() => {
    const fetchData = async () => {
      let newData = {
        cliente_nombres: validatedFormData.firstName,
        cliente_apellidos: validatedFormData.lastName,
        cliente_email: userData.email,
        cliente_telefono: validatedFormData.phoneNumber,
        cliente_direccion1: address,
        cliente_tipo_documento: 'C.C.',
        cliente_documento: validatedFormData.document,
        cliente_codigo: '1',
        cliente_redes: userData.uid,
      };
      try {
        await createClient(newData);
        let displayName = userData.displayName
          ? userData.displayName
          : validatedFormData.firstName.split(' ')[0] +
            validatedFormData.lastName.split(' ')[0];
        dispatch(
          fillOutData({
            displayName,
            firstName: validatedFormData.firstName,
            lastName: validatedFormData.lastName,
            phoneNumber: validatedFormData.phoneNumber,
            address1: address,
            document: validatedFormData.document,
          }),
        );
      } catch (err) {
        Alert.alert(err.message);
      }
    };

    if (Object.keys(validatedFormData).length > 0 && activeZone && !isLoading) {
      fetchData();
    } else {
      if (Object.keys(validatedFormData).length > 0 && !activeZone) {
        Alert.alert(
          'Lo sentimos',
          'En este momento no tenemos cobertura en tu zona.',
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatedFormData, activeZone, isLoading]);

  const onSubmit = (data) => {
    setAddress(data.address);
    setValidatedFormData(data);
  };

  return (
    <View style={styles.container1}>
      <Spinner
        visible={isLoading}
        textContent={'Validando dirección...'}
        textStyle={{color: quaternary}}
        color={quaternary}
      />
      <KeyboardAwareScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>DETALLES DE CONTACTO</Text>
          <Form onSubmit={onSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DataForm;
