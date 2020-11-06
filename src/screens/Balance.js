import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-elements';

const Balance = () => {
  const balance = useSelector((state) => state.balance.balanceUser);

  return (
    <Card>
      {balance.map((item, index) => {
        return (
          <View key={item.id}>
            <View
              key={index}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {item.quantity} Unidades
              </Text>
              <Text style={{fontSize: 18}}>{item.name}</Text>
            </View>
            <Card.Divider />
          </View>
        );
      })}
    </Card>
  );
};

export default Balance;
