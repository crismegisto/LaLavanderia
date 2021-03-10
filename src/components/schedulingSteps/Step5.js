import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Step5 = (props) => {
  console.log(props);
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginVertical: 12,
          alignSelf: 'center',
        }}>
        Resumen
      </Text>

      <ScrollView persistentScrollbar>
        {/* <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>
          Dirección
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16}}>{props.address}</Text> */}

        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Productos Agendados
        </Text>
        {props.productsToUse.map((item, index) => (
          <Text key={index} style={{marginLeft: 10, fontSize: 16}}>
            {item.producto.producto_nombre} {'\t --> \t'} {item.currentValue}{' '}
            Unidades
          </Text>
        ))}

        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Fecha Recogida
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16}}>
          {props.collectionDate.horario_recogida_fecha}
        </Text>

        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Horario Recogida
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16}}>
          {props.collectionHour.label}
        </Text>

        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Fecha Entrega
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16}}>
          {props.deliveryDate.horario_entrega_fecha}
        </Text>

        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Horario Entrega
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16}}>
          {props.deliveryHour.label}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Observaciones
        </Text>
        <Text style={{marginLeft: 10, fontSize: 16, marginBottom: 10}}>
          {props.observations}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Step5;
