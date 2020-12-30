import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card} from 'react-native-elements';
import {fetchBalance} from '../store/actions/balanceAction';

const Balance = () => {
  const balance = useSelector((state) => state.balance.balanceUser);

  return (
    <Card>
      {balance.map((item, index) => {
        return (
          <View key={item.producto.id}>
            <View
              key={index}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.saldo_cantidad} Unidades
              </Text>
              <Text style={{fontSize: 18}}>
                {item.producto.producto_nombre}
              </Text>
            </View>
            <Card.Divider />
          </View>
        );
      })}
    </Card>
  );
};

export default Balance;
