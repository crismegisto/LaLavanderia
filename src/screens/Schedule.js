/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';

const Schedule = ({navigation}) => {
  const balance = useSelector((state) => state.balance.balanceUser);
  const [balanceToSchedule, setBalanceToSchedule] = useState([]);
  useEffect(() => {
    let newArr = balance.map((item) => ({...item, currentValue: 0}));
    setBalanceToSchedule(newArr);
  }, [balance]);

  const addUnitToSchedule = (id) => {
    let newArr = balanceToSchedule.map((item) =>
      id === item.id && item.quantity > item.currentValue
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
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{backgroundColor: 'white', borderRadius: 10, margin: 7}}>
        <MaterialIcons
          name="schedule"
          size={50}
          style={{alignSelf: 'center', marginTop: 5}}
        />
        <FlatList
          data={balanceToSchedule}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TextInput
                style={{margin: 7, fontSize: 17, width: '65%'}}
                dense
                mode="outlined"
                label={item.quantity + '  disponibles'}
                disabled={true}
                value={item.currentValue + '  ' + item.name}
              />
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => removeUnitToSchedule(item.id)}
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#02193E',
                    borderRadius: 10,
                    height: 40,
                    width: 40,
                    marginRight: 5,
                  }}>
                  <Ionicons name="ios-remove" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addUnitToSchedule(item.id)}
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#02193E',
                    borderRadius: 10,
                    height: 40,
                    width: 40,
                  }}>
                  <Ionicons name="ios-add" size={40} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#02193E',
          paddingVertical: 12,
          borderRadius: 10,
          marginBottom: 15,
          marginTop: 15,
          width: '60%',
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate('PickUp')}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'white',
            alignSelf: 'center',
          }}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedule;
