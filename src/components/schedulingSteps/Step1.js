import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';

const Step1 = (props) => {
  const balance = useSelector((state) => state.balance.balanceUser);
  const [balanceToSchedule, setBalanceToSchedule] = useState([]);
  useEffect(() => {
    let newArr = balance.map((item) => ({...item, currentValue: 0}));
    setBalanceToSchedule(newArr);
  }, [balance]);

  useEffect(() => {
    let productsToUse = balanceToSchedule.filter(
      (item) => item.currentValue > 0,
    );
    props.getProductsToUse(productsToUse);
  }, [balanceToSchedule, props]);

  const addUnitToSchedule = (id) => {
    let newArr = balanceToSchedule.map((item) =>
      id === item.id && item.saldo_cantidad > item.currentValue
        ? {...item, currentValue: ++item.currentValue}
        : item,
    );
    setBalanceToSchedule(newArr);
  };

  const removeUnitToSchedule = (id) => {
    let newArr = balanceToSchedule.map((item) =>
      id === item.id && item.currentValue > 0
        ? {...item, currentValue: --item.currentValue}
        : item,
    );
    setBalanceToSchedule(newArr);
  };

  return (
    <FlatList
      data={balanceToSchedule}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            flex: 1,
          }}>
          <TextInput
            style={{margin: 7, fontSize: 17, width: '65%'}}
            dense
            mode="outlined"
            label={item.saldo_cantidad + '  disponibles'}
            disabled={true}
            value={item.currentValue + '  ' + item.producto.producto_nombre}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => removeUnitToSchedule(item.id)}
              disabled={!item.currentValue}
              style={
                item.currentValue
                  ? [styles.button, {marginRight: 5}]
                  : {...styles.button, backgroundColor: 'gray', marginRight: 5}
              }>
              <Ionicons name="ios-remove" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addUnitToSchedule(item.id)}
              disabled={item.currentValue === item.saldo_cantidad}
              style={
                item.currentValue < item.saldo_cantidad
                  ? [styles.button, {marginRight: 5}]
                  : {...styles.button, backgroundColor: 'gray', marginRight: 5}
              }>
              <Ionicons name="ios-add" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02193E',
    borderRadius: 10,
    height: 40,
    width: 40,
  },
});

export default Step1;
