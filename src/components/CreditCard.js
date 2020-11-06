import React from 'react';
import {View, Button} from 'react-native';
import {CreditCardInput} from 'react-native-input-credit-card';

const PaymentMethods = () => {
  const onChange = (data) => {
    console.log(data);
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <CreditCardInput requiresName onChange={onChange} />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Button title="Guardar Tarjeta" />
      </View>
    </View>
  );
};

export default PaymentMethods;
