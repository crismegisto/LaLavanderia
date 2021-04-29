import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Modal} from 'react-native';
import Form from '../Form';
import styles from '../../theme/styleDataForm';
import {useDispatch, useSelector} from 'react-redux';
import createCustomer from '../../api/createCustomer';
import {fillInTheData} from '../../store/actions/authAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {quaternary} from '../../theme/colors';

const DataForm = ({isVisible}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let newData = {
        cliente_nombres: formData.firstName,
        cliente_apellidos: formData.lastName,
        cliente_email: user.email,
        cliente_telefono: formData.phoneNumber,
        cliente_tipo_documento: 'C.C.',
        cliente_documento: formData.document,
        cliente_codigo: '1',
        cliente_redes: user.uid,
      };
      try {
        await createCustomer(newData);
        let displayName = user.displayName
          ? user.displayName
          : formData.firstName.split(' ')[0] + formData.lastName.split(' ')[0];
        dispatch(
          fillInTheData({
            displayName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            document: formData.document,
          }),
        );
        setIsLoading(false);
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
    <Modal animationType="slide" transparent visible={!isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Spinner
            visible={isLoading}
            textContent={'Cargando...'}
            textStyle={{color: quaternary}}
            color={quaternary}
          />
          <Text style={styles.formTitle}>Datos Para Facturación</Text>
          <Form onSubmit={onSubmit} isLoading={isLoading} />
        </View>
      </View>
    </Modal>
  );
};

export default DataForm;
