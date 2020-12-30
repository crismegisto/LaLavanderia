import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getDelivery} from '../../api/collectionAndDelivery/getDeliveryApi';

const Step3 = (props) => {
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState({});
  const [deliveryDate, setDeliveryDate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getDelivery();
        let newResults = results.map((item) => ({...item, isSelected: false}));
        setDeliveryDate(newResults);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(selectedDeliveryDate).length > 0) {
      props.getDeliveryDate(selectedDeliveryDate);
    }
  }, [selectedDeliveryDate, props]);

  const onSelection = (selection) => {
    let newDeliveryDate = deliveryDate.map((item) =>
      selection.id === item.id
        ? {...item, isSelected: true}
        : {...item, isSelected: false},
    );
    setDeliveryDate(newDeliveryDate);
    setSelectedDeliveryDate(selection);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          alignSelf: 'center',
          color: 'black',
          marginVertical: 10,
          fontWeight: 'bold',
        }}>
        Fecha y Hora de Entrega
      </Text>
      <View style={{alignItems: 'center'}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={16}>
          {deliveryDate.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelection(item)}
              style={
                item.isSelected
                  ? {...styles.buttonCard, backgroundColor: '#02193E'}
                  : styles.buttonCard
              }>
              <Text
                style={
                  item.isSelected
                    ? {...styles.buttonCardText, color: '#98D7E8'}
                    : styles.buttonCardText
                }>
                {item.horario_entrega_fecha.split('-')[2]}
              </Text>
              <Text
                style={
                  item.isSelected
                    ? {...styles.buttonCardDateText, color: '#98D7E8'}
                    : styles.buttonCardDateText
                }>
                {item.horario_entrega_fecha.split('-')[1] === '12'
                  ? 'DIC.'
                  : 'ENE.'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          Horario Desde: {selectedDeliveryDate.horario_entrega_hora_desde}
        </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          Horario Hasta: {selectedDeliveryDate.horario_entrega_hora_hasta}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCard: {
    backgroundColor: '#98D7E8',
    height: 80,
    width: 60,
    marginTop: 15,
    marginHorizontal: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02193E',
  },
  buttonCardDateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#02193E',
    marginTop: 5,
  },
});

export default Step3;
