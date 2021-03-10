import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {LiteCreditCardInput} from 'react-native-input-credit-card';
import {useDispatch} from 'react-redux';
import {updateWompiData} from '../../store/actions/modifyPaymentsAction';
import {primary} from '../../theme/colors';

const CreditCardData = (props) => {
  const dispatch = useDispatch();

  const [showActivityIndicator, setShowActivityIndicator] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowActivityIndicator(false);
    }, 500);
  }, []);

  const [isCardValid, setIsCardValid] = useState(false);
  const [cardValues, setCardValues] = useState({});
  const [name, setName] = useState('');

  useEffect(() => {
    if (Object.keys(cardValues).length > 0 && name) {
      setIsCardValid(true);
    } else {
      setIsCardValid(false);
    }
  }, [cardValues, name]);

  useEffect(() => {
    if (isCardValid) {
      const wompiData = {
        ...cardValues,
        card_holder: name,
      };
      dispatch(updateWompiData(3, wompiData));
      props.validateForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues, dispatch, isCardValid, name]);

  const CCInput = useRef(null);

  const onChange = (data) => {
    if (data.valid) {
      let date = data.values.expiry.split('/');
      let values = {
        number: data.values.number.replace(/\s+/g, ''),
        cvc: data.values.cvc,
        exp_month: date[0],
        exp_year: date[1],
      };
      setCardValues(values);
      CCInput.current.focus('number');
    }
  };

  if (showActivityIndicator) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View style={{marginVertical: 20, alignItems: 'center'}}>
      <LiteCreditCardInput ref={CCInput} onChange={onChange} />
      <View
        style={
          name.length > 0
            ? styles.containerInput
            : [styles.containerInput, {borderColor: 'red', borderWidth: 2}]
        }>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Tarjetahabiente</Text>
        <TextInput
          value={name}
          autoCapitalize="words"
          style={styles.textInput}
          maxLength={40}
          placeholder={'Pedro Pérez'}
          placeholderTextColor="gray"
          onChangeText={(text) => setName(text)}
        />
      </View>
      {name.length === 0 && (
        <Text style={{alignSelf: 'flex-end', marginRight: 20, color: 'red'}}>
          Nombre requerido
        </Text>
      )}
      {isCardValid && (
        <Text
          style={{
            marginTop: 20,
            color: 'green',
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Tarjeta Valida
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
  textInput: {fontSize: 14},
});

export default CreditCardData;
