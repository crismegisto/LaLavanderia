/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

const PaymentMethods = ({navigation}) => {
  const payment = useSelector((state) => state.userData.payment);

  const [toggleCheckBoxPayment, setToggleCheckBoxPayment] = useState([]);
  useEffect(() => {
    setToggleCheckBoxPayment(payment);
  }, [payment]);

  const toggleCheckBox = (indexParam) => {
    let newArr = toggleCheckBoxPayment.map((item, index) => {
      if (index === indexParam) {
        item.active = true;
      } else {
        item.active = false;
      }
      return {...item};
    });
    setToggleCheckBoxPayment(newArr);
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={toggleCheckBoxPayment}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => toggleCheckBox(index)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 15,
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <Image
                  key={index}
                  source={
                    item.type === 'cash'
                      ? require('../assets/icons-credit-card/cash.png')
                      : item.type === 'nequi'
                      ? require('../assets/icons-credit-card/nequi.png')
                      : item.type === 'pse'
                      ? require('../assets/icons-credit-card/pse.png')
                      : item.type === 'visa'
                      ? require('../assets/icons-credit-card/visa.png')
                      : require('../assets/icons-credit-card/mastercard.png')
                  }
                  style={{width: 45, height: 35, resizeMode: 'contain'}}
                />
                <Text style={{marginLeft: 15}}>
                  {item.id > 3 ? item.data.number.substring(12) : item.type}
                </Text>
              </View>
              {item.active && <Icon name="check" size={30} color="green" />}
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{alignItems: 'center'}}>
        <Button
          title="Agregar Tarjeta"
          onPress={() => navigation.navigate('AddCard')}
        />
      </View>
    </View>
  );
};

export default PaymentMethods;
