import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {modifyPayments} from '../store/actions/modifyPaymentsAction';
import styles from '../stylesheets/stylePaymentMethod';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentMethod = (props) => {
  const dispatch = useDispatch();

  const changePaymentMethod = (paymentId) => {
    dispatch(modifyPayments(paymentId));
  };

  const payment = useSelector((state) => state.userData.paymentMethods);

  return (
    <View style={styles.container}>
      {payment.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={
            method.active
              ? styles.activeMethod
              : {
                  ...styles.activeMethod,
                  borderColor: 'lightgray',
                  borderWidth: 2,
                }
          }
          onPress={() => changePaymentMethod(method.id)}>
          {method.id === 3 ? (
            <Icon name="credit-card-alt" size={35} color="darkblue" />
          ) : (
            <Image
              style={styles.selectedLogo}
              source={
                method.type === 'Nequi'
                  ? require('../assets/icons-credit-card/nequi.png')
                  : require('../assets/icons-credit-card/pse.png')
              }
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PaymentMethod;
