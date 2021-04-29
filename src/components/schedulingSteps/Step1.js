import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {primary, secondary, sextenary} from '../../theme/colors';

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
      persistentScrollbar
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.container}>
          <TextInput
            style={{margin: 7, fontSize: 17, width: '65%'}}
            dense
            mode="outlined"
            label={item.saldo_cantidad + '  disponibles'}
            disabled={true}
            value={
              item.saldo_ancho
                ? `${item.currentValue} ${item.producto.producto_nombre} ${item.saldo_ancho}cm x ${item.saldo_largo}cm`
                : `${item.currentValue}  ${item.producto.producto_nombre}`
            }
            theme={{colors: {disabled: primary, text: primary}}}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => removeUnitToSchedule(item.id)}
              disabled={!item.currentValue}
              style={
                item.currentValue
                  ? [styles.button, {marginRight: 5}]
                  : {
                      ...styles.button,
                      backgroundColor: sextenary,
                      marginRight: 5,
                    }
              }>
              <Ionicons name="ios-remove" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addUnitToSchedule(item.id)}
              disabled={item.currentValue === item.saldo_cantidad}
              style={
                item.currentValue < item.saldo_cantidad
                  ? [styles.button, {marginRight: 5}]
                  : {
                      ...styles.button,
                      backgroundColor: sextenary,
                      marginRight: 5,
                    }
              }>
              <Ionicons name="ios-add" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: secondary,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Step1;
