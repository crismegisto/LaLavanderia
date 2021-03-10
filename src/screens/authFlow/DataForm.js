import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import Form from '../../components/authFlow/Form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../../theme/styleDataForm';
import {useDispatch, useSelector} from 'react-redux';
import {createClient} from '../../api/createClient';
import {fillOutData} from '../../store/actions/authAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {quaternary} from '../../theme/colors';

const DataForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let newData = {
        cliente_nombres: formData.firstName,
        cliente_apellidos: formData.lastName,
        cliente_email: userData.email,
        cliente_telefono: formData.phoneNumber,
        cliente_direccion1: 'null',
        cliente_tipo_documento: 'C.C.',
        cliente_documento: formData.document,
        cliente_codigo: '1',
        cliente_redes: userData.uid,
      };
      try {
        await createClient(newData);
        let displayName = userData.displayName
          ? userData.displayName
          : formData.firstName.split(' ')[0] + formData.lastName.split(' ')[0];
        dispatch(
          fillOutData({
            displayName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            // address1: 'null',
            document: formData.document,
          }),
        );
      } catch (err) {
        setIsLoading(false);
        Alert.alert(err.message);
      }
    };

    if (Object.keys(formData).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <View style={styles.container1}>
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={{color: quaternary}}
        color={quaternary}
      />
      <KeyboardAwareScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>DETALLES DE CONTACTO</Text>
          <Form onSubmit={onSubmit} isLoading={isLoading} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DataForm;
