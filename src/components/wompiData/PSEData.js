import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateWompiData} from '../../store/actions/modifyPaymentsAction';
import RNPickerSelect from 'react-native-picker-select';
import {getFinancialInstitutions} from '../../api/wompi/pseApi';

const PSEData = (props) => {
  const dispatch = useDispatch();

  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 500);
  }, []);

  const [financialInstitution, setFinancialInstitution] = useState(null);
  const [financialInstitutions, setFinancialInstitutions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFinancialInstitutions();
        setFinancialInstitutions(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const [typePerson, setTypePerson] = useState(null);
  const [typeDocument, setTypeDocument] = useState(null);
  const [document, setDocument] = useState('');
  // useEffect(() => {
  //   if (props.payment[0].wompiData.phone_number) {
  //     setDocument(props.payment[0].wompiData.phone_number);
  //     setIsDocumsetDocumentValid(true);
  //     props.validateForm();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (
      document.length > 7 &&
      financialInstitution &&
      typeDocument &&
      typePerson !== null
    ) {
      const wompiData = {
        type: 'PSE',
        user_type: typePerson,
        user_legal_id_type: typeDocument,
        user_legal_id: document,
        financial_institution_code: financialInstitution,
        payment_description: 'Pago a Tienda LaLavanderia',
      };
      dispatch(updateWompiData(2, wompiData));
      props.validateForm(true);
    } else {
      props.validateForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, document, financialInstitution, typeDocument, typePerson]);

  const handleDocumentChange = (documentNumber) => {
    let newDocument = documentNumber.replace(/[^0-9 ]/g, '').replace(/\s/g, '');
    setDocument(newDocument);
  };

  if (showActivityIndicator) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.containerForm}>
      <RNPickerSelect
        placeholder={{
          label: 'Tipo Persona',
          value: null,
          color: 'green',
        }}
        onValueChange={(value) => setTypePerson(value)}
        value={typePerson}
        items={[
          {label: 'Natural', value: 0},
          {label: 'Jurídica', value: 1},
        ]}
        style={{
          inputAndroid: {
            color: 'black',
            height: 50,
            width: 200,
          },
        }}
      />
      <RNPickerSelect
        placeholder={{
          label: 'Tipo Documento',
          value: null,
          color: 'green',
        }}
        onValueChange={(value) => setTypeDocument(value)}
        value={typeDocument}
        items={[
          {label: 'CC', value: 'CC'},
          {label: 'NIT', value: 'NIT'},
        ]}
        style={{
          inputAndroid: {
            color: 'black',
            height: 50,
            width: 200,
          },
        }}
      />

      <View
        style={
          document.length > 7
            ? styles.containerInput
            : [styles.containerInput, {borderColor: 'red', borderWidth: 2}]
        }>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Número Documento</Text>
        <TextInput
          keyboardType="numeric"
          value={document}
          style={styles.textInput}
          maxLength={11}
          placeholder={'Documento'}
          placeholderTextColor="gray"
          onChangeText={(text) => handleDocumentChange(text)}
        />
      </View>
      {document.length === 0 && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          Documento requerido
        </Text>
      )}
      <RNPickerSelect
        placeholder={{
          label: 'A continuación seleccione su banco',
          value: null,
          color: 'black',
        }}
        onValueChange={(value) => setFinancialInstitution(value)}
        value={financialInstitution}
        items={financialInstitutions}
        style={{
          inputAndroid: {
            color: 'black',
            height: 50,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
  },
  containerInput: {
    borderWidth: 1,
    width: '95%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textInput: {fontSize: 16},
});

export default PSEData;
