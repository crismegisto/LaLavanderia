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

const NequiData = (props) => {
  const dispatch = useDispatch();

  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 500);
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  useEffect(() => {
    if (props.payment[0].wompiData.phone_number) {
      setPhoneNumber(props.payment[0].wompiData.phone_number);
      setIsPhoneNumberValid(true);
      props.validateForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
    let newPhoneNumber = phone.replace(/\s/g, '').replace(/\./, '');
    if (newPhoneNumber > 0 && newPhoneNumber.length === 10) {
      const wompiData = {type: 'NEQUI', phone_number: newPhoneNumber};
      dispatch(updateWompiData(1, wompiData));
      setIsPhoneNumberValid(true);
      props.validateForm(true);
    } else {
      if (isPhoneNumberValid) {
        setIsPhoneNumberValid(false);
        props.validateForm(false);
      }
    }
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
      <View
        style={
          phoneNumber.length > 0 && phoneNumber.length === 10
            ? styles.containerInput
            : [styles.containerInput, {borderColor: 'red', borderWidth: 2}]
        }>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Número Nequi</Text>
        <TextInput
          keyboardType="numeric"
          value={phoneNumber}
          style={styles.textInput}
          maxLength={10}
          onChangeText={(text) => handlePhoneNumberChange(text)}
        />
      </View>
      {!isPhoneNumberValid && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          Número invalido
        </Text>
      )}
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
    marginTop: 20,
  },
  textInput: {fontSize: 16},
});

export default NequiData;
